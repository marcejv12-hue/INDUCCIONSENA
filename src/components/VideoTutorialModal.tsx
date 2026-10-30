import React, { useRef, useState, useEffect } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Clock, 
  CheckCircle2, 
  BookmarkCheck,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { SenaLogo } from './SenaLogo';

interface VideoTutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartRegistration?: () => void;
}

interface Chapter {
  title: string;
  time: number; // in seconds
  description: string;
}

const CHAPTERS: Chapter[] = [
  { time: 0, title: 'Introducción y 3 Pilares', description: 'Identidad, Acuerdo 009 de 2024 y Juicio Ético' },
  { time: 22, title: 'Acceso y Correo @soysena', description: 'Requisitos de conectividad y cuenta institucional' },
  { time: 34, title: 'Mapa de la Inducción', description: 'Ruta completa de los módulos formativos' },
  { time: 43, title: 'Paso 1: Registro Oficial', description: 'Formulario con documento, ficha y correo' },
  { time: 55, title: 'Paso 2: Símbolos Institucionales', description: 'Escudo, bandera, logosímbolo e himno' },
  { time: 65, title: 'Paso 3: Derechos, Deberes y Faltas', description: 'Tipificación de faltas leves, graves y gravísimas' },
  { time: 88, title: 'Paso 4: Ruta y Debido Proceso', description: 'Novedades de matrícula y Comité de Evaluación' },
  { time: 112, title: 'Paso 5: Simulador de Decisiones', description: 'Casos éticos con retroalimentación inmediata' },
  { time: 124, title: 'Paso 6: Evaluación y Constancia', description: 'Aprobación (70/100) y certificado con código QR' },
  { time: 135, title: 'Motor Tecnológico y Apoyo', description: 'Sincronización en la nube y tutor virtual' }
];

export const VideoTutorialModal: React.FC<VideoTutorialModalProps> = ({
  isOpen,
  onClose,
  onStartRegistration
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Pause video when modal closes, reset states
  useEffect(() => {
    if (!isOpen && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else if (isOpen && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Autoplay may require user gesture on some browsers
        setIsPlaying(false);
      });
    }
  }, [isOpen]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleSeek = (timeInSeconds: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = timeInSeconds;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    setCurrentTime(current);

    // Update active chapter
    let currentIdx = 0;
    for (let i = 0; i < CHAPTERS.length; i++) {
      if (current >= CHAPTERS[i].time) {
        currentIdx = i;
      }
    }
    setActiveChapterIndex(currentIdx);
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const changePlaybackRate = (rate: number) => {
    if (!videoRef.current) return;
    videoRef.current.playbackRate = rate;
    setPlaybackRate(rate);
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-tutorial-title"
    >
      {/* Click outside backdrop */}
      <div 
        className="fixed inset-0 -z-10" 
        onClick={onClose}
        aria-hidden="true" 
      />

      <div className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-[#39A900] shrink-0">
              <SenaLogo className="w-6 h-6" fill="#39A900" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 bg-emerald-100/70 dark:bg-emerald-950 px-2 py-0.5 rounded-md">
                  Guía Oficial SENA 2026
                </span>
                <span className="text-xs text-slate-400 hidden sm:inline">·</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline">
                  Acuerdo 009 de 2024
                </span>
              </div>
              <h2 id="video-tutorial-title" className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">
                Video Tutorial: Tu Ruta de Inducción Digital
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Cerrar video tutorial"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Area */}
        <div className="relative bg-black flex-1 flex flex-col justify-center items-center overflow-hidden">
          <div className="w-full relative aspect-video max-h-[56vh] bg-black">
            <video
              ref={videoRef}
              src="/assets/aistudio/2026__11_51_a.m._e7e86990.mp4"
              className="w-full h-full object-contain"
              controls
              autoPlay
              playsInline
              preload="metadata"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              Tu navegador no soporta la reproducción de video HTML5.
            </video>
          </div>
        </div>

        {/* Enhanced Controls & Chapter Navigator */}
        <div className="p-4 sm:p-5 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 overflow-y-auto">
          
          {/* Quick Helper Actions Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <button
                onClick={togglePlay}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#39A900] hover:bg-[#2e8800] text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 fill-white" /> : <Play className="w-3.5 h-3.5 fill-white" />}
                <span>{isPlaying ? 'Pausar' : 'Reproducir'}</span>
              </button>

              <button
                onClick={() => handleSeek(0)}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                title="Reiniciar desde el inicio"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reiniciar</span>
              </button>

              <button
                onClick={toggleMute}
                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                title={isMuted ? 'Activar sonido' : 'Silenciar'}
                aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <span className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            {/* Playback speed selector */}
            <div className="flex items-center gap-1">
              <span className="text-[11px] text-slate-400 font-medium mr-1 hidden sm:inline">Velocidad:</span>
              {[1, 1.25, 1.5].map((rate) => (
                <button
                  key={rate}
                  onClick={() => changePlaybackRate(rate)}
                  className={`px-2 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                    playbackRate === rate
                      ? 'bg-[#00324D] text-white dark:bg-sky-600'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {rate}x
                </button>
              ))}

              <button
                onClick={handleFullscreen}
                className="p-1.5 ml-1 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                title="Pantalla completa"
                aria-label="Pantalla completa"
              >
                <Maximize className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chapters / Key Topics */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 uppercase tracking-wide">
                <BookmarkCheck className="w-4 h-4 text-[#39A900]" />
                <span>Capítulos y Temas de la Guía:</span>
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                Haz clic en cualquier punto para saltar al tema
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              {CHAPTERS.map((chapter, idx) => {
                const isActive = activeChapterIndex === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSeek(chapter.time)}
                    className={`text-left p-2 rounded-xl text-xs transition-all border cursor-pointer ${
                      isActive
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 border-[#39A900] text-emerald-950 dark:text-emerald-200 shadow-xs ring-1 ring-[#39A900]'
                        : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono font-bold mb-0.5">
                      <span className={isActive ? 'text-[#39A900]' : 'text-slate-400'}>
                        {formatTime(chapter.time)}
                      </span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#39A900] animate-pulse" />
                      )}
                    </div>
                    <div className="font-semibold truncate text-[11px]">
                      {chapter.title}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer Call to Action */}
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#39A900] shrink-0" />
              <span>
                Al finalizar el video, ingresa con tu correo institucional <strong>@soysena.edu.co</strong> para iniciar tu registro oficial.
              </span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium transition-colors cursor-pointer"
              >
                Cerrar Video
              </button>
              {onStartRegistration && (
                <button
                  onClick={() => {
                    onClose();
                    onStartRegistration();
                  }}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#39A900] hover:bg-[#2e8800] text-white font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>Registrarme</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
