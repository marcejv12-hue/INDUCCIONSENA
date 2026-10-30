import React, { useState } from 'react';
import { NavigationTab, Apprentice } from '../types/sena';
import { 
  GraduationCap, 
  Users, 
  ArrowRight, 
  BookOpen, 
  Scale, 
  Award, 
  CheckCircle2, 
  HelpCircle, 
  ShieldCheck, 
  ChevronRight,
  Sparkles,
  BarChart3,
  FileText,
  UserCheck,
  Play,
  Video
} from 'lucide-react';
import { SenaLogo } from './SenaLogo';
import { ApprenticeRegistrationModal } from './ApprenticeRegistrationModal';
import { VideoTutorialModal } from './VideoTutorialModal';

interface RoleLandingPageProps {
  onSelectRole: (role: 'aprendiz' | 'instructor', apprenticeId?: string) => void;
  onRegisterApprentice?: (newApprentice: Apprentice) => void;
  apprentices: Apprentice[];
  activeApprentice: Apprentice;
  onSelectApprentice: (id: string) => void;
  onOpenTutor: () => void;
  onSelectTab: (tab: NavigationTab) => void;
}

export const RoleLandingPage: React.FC<RoleLandingPageProps> = ({
  onSelectRole,
  onRegisterApprentice,
  apprentices,
  activeApprentice,
  onSelectApprentice,
  onOpenTutor,
  onSelectTab,
}) => {
  const [selectedAppId, setSelectedAppId] = useState<string>(activeApprentice.id);
  const [showRegisterModal, setShowRegisterModal] = useState<boolean>(false);
  const [showVideoModal, setShowVideoModal] = useState<boolean>(false);

  const selectedApprentice = apprentices.find(a => a.id === selectedAppId) || activeApprentice;
  const approvedCount = apprentices.filter(a => a.evaluationResult?.passed).length;
  const approvalRate = Math.round((approvedCount / (apprentices.length || 1)) * 100);

  const handleApprenticeChange = (id: string) => {
    setSelectedAppId(id);
    onSelectApprentice(id);
  };

  const handleRegisterSuccess = (newApp: Apprentice) => {
    setShowRegisterModal(false);
    if (onRegisterApprentice) {
      onRegisterApprentice(newApp);
    } else {
      onSelectRole('aprendiz', newApp.id);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-300">
      {/* Institutional Hero Banner */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 shadow-xs transition-colors duration-200 relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-[#39A900]/5 dark:bg-[#39A900]/10 blur-3xl pointer-events-none" />
        
        <div className="max-w-3xl relative z-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-400 tracking-wider uppercase mb-3">
            <SenaLogo className="w-5 h-5 shrink-0" fill="#39A900" />
            <span>Servicio Nacional de Aprendizaje</span>
            <span aria-hidden="true">·</span>
            <span>Portal de Inducción</span>
            <span aria-hidden="true">·</span>
            <span>Vigencia 2026</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight text-balance">
            Portal Institucional de Inducción y Apropiación SENA
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            Bienvenido al entorno interactivo de inducción para la Formación Profesional Integral. 
            Selecciona tu rol para acceder a la ruta formativa de derechos, deberes y debido proceso según el 
            <strong> Acuerdo 009 de 2024</strong> y las actualizaciones normativas 2026.
          </p>

          {/* Action buttons: Video Tutorial & Registro */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowVideoModal(true)}
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-[#39A900] hover:bg-[#2e8800] text-white font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-lg group cursor-pointer"
              title="Reproducir Video Tutorial de la Inducción SENA"
            >
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-3.5 h-3.5 fill-white text-white translate-x-0.5" />
              </span>
              <span>Video Tutorial</span>
              <span className="text-[11px] font-normal bg-black/20 text-emerald-100 px-2 py-0.5 rounded-full">
                Guía Oficial
              </span>
            </button>

            <button
              onClick={() => setShowRegisterModal(true)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-semibold text-sm border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
            >
              <UserCheck className="w-4 h-4 text-[#39A900]" />
              <span>Registro de Aprendiz</span>
            </button>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#39A900]" />
              <span>Reglamento del Aprendiz 2026</span>
            </div>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#39A900]" />
              <span>Garantía del Debido Proceso (Ac. 009)</span>
            </div>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#39A900]" />
              <span>Certificación Digital Inmediata</span>
            </div>
          </div>
        </div>
      </section>

      {/* Role Selection Interactive Grid */}
      <section aria-labelledby="role-selection-title">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block mb-1">
            Acceso por Perfil
          </span>
          <h2 id="role-selection-title" className="text-2xl sm:text-3xl font-bold tracking-tight text-[#f7eded]" style={{ color: '#f7eded' }}>
            ¿Cómo deseas ingresar al sistema?
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Elige tu perfil de usuario para ingresar a las herramientas y contenidos diseñados para tu experiencia.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Card 1: Rol Aprendiz */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-800 hover:border-[#39A900] dark:hover:border-[#39A900] p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 shadow-xs hover:shadow-md group relative">
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-[#39A900] shrink-0 group-hover:scale-105 transition-transform duration-200">
                  <GraduationCap className="w-8 h-8" />
                </div>
                <div className="text-right text-xs text-slate-500 dark:text-slate-400">
                  <span>Rol Principal</span>
                  <span aria-hidden="true" className="mx-1">·</span>
                  <span className="font-semibold text-[#39A900]">Etapa Lectiva</span>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                <span>Soy Aprendiz SENA</span>
              </h3>

              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Ingresa al proceso de inducción integral para conocer la historia, símbolos y principios institucionales,
                apropiar tus derechos y deberes, recorrer la ruta formativa de novedades y comités, y certificar tus conocimientos.
              </p>

              {/* Persona selector for rapid testing / preview */}
              <div className="mt-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <label htmlFor="select-apprentice-persona" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Seleccionar Aprendiz de Prueba:
                </label>
                <select
                  id="select-apprentice-persona"
                  value={selectedAppId}
                  onChange={(e) => handleApprenticeChange(e.target.value)}
                  className="w-full text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-3 py-2 focus:ring-2 focus:ring-[#39A900] focus:border-transparent outline-none"
                >
                  {apprentices.map((app) => (
                    <option key={app.id} value={app.id}>
                      {app.fullName} ({app.programName}) · Ficha {app.fichaId === 'ficha_1' ? '2824102' : '2715890'}
                    </option>
                  ))}
                </select>

                <div className="mt-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>Progreso actual:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {selectedApprentice.progressPercent}% completado
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden mt-1">
                  <div
                    className="bg-[#39A900] h-full rounded-full transition-all duration-300"
                    style={{ width: `${selectedApprentice.progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Module features for apprentice */}
              <div className="mt-6 space-y-2 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#39A900] shrink-0 mt-0.5" />
                  <span>Símbolos, himno, escudo y cultura institucional SENA.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#39A900] shrink-0 mt-0.5" />
                  <span>Derechos, deberes y prohibiciones según reglamento vigente 2026.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#39A900] shrink-0 mt-0.5" />
                  <span>Ciclo formativo, novedades de matrícula y debido proceso (Ac. 009 de 2024).</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#39A900] shrink-0 mt-0.5" />
                  <span>Evaluación interactiva de conocimientos con certificado digital inmediato.</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
              <button
                onClick={() => setShowRegisterModal(true)}
                className="w-full py-3 px-5 rounded-xl bg-[#39A900] hover:bg-[#2e8800] text-white font-semibold text-sm transition-all duration-200 shadow-xs flex items-center justify-center gap-2 group-hover:shadow-md cursor-pointer"
              >
                <span>Ingresar como Aprendiz</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => setShowVideoModal(true)}
                className="w-full py-2.5 px-4 rounded-xl border border-emerald-300 dark:border-emerald-800/80 bg-emerald-50/50 dark:bg-emerald-950/30 hover:bg-emerald-100/60 dark:hover:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Ver Video Tutorial</span>
              </button>
            </div>
          </div>

          {/* Card 2: Rol Instructor */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-800 hover:border-[#00324D] dark:hover:border-sky-500 p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 shadow-xs hover:shadow-md group relative">
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-sky-50 dark:bg-sky-950/70 border border-sky-200 dark:border-sky-800 flex items-center justify-center text-[#00324D] dark:text-sky-400 shrink-0 group-hover:scale-105 transition-transform duration-200">
                  <Users className="w-8 h-8" />
                </div>
                <div className="text-right text-xs text-slate-500 dark:text-slate-400">
                  <span>Rol Directivo / Docente</span>
                  <span aria-hidden="true" className="mx-1">·</span>
                  <span className="font-semibold text-[#00324D] dark:text-sky-400">Gestión de Ficha</span>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                <span>Soy Instructor / Coordinador</span>
              </h3>

              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Supervisa el nivel de apropiación de tu cohorte en tiempo real, gestiona expedientes de aprendices,
                tramita medidas formativas, coordina casos ante el Comité de Evaluación y Seguimiento y emite certificados.
              </p>

              {/* Cohort Live Metrics Snapshot */}
              <div className="mt-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Cohorte Activa: Ficha 2824102 / 2715890
                  </span>
                  <span className="text-[11px] font-mono text-emerald-800 dark:text-emerald-400 font-bold">
                    {approvalRate}% Aprobados
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <span className="block font-bold text-slate-900 dark:text-white text-base">
                      {apprentices.length}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">Aprendices</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <span className="block font-bold text-emerald-800 dark:text-emerald-400 text-base">
                      {approvedCount}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">Certificados</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <span className="block font-bold text-amber-800 dark:text-amber-400 text-base">
                      {apprentices.length - approvedCount}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">En Curso</span>
                  </div>
                </div>
              </div>

              {/* Module features for instructor */}
              <div className="mt-6 space-y-2 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                  <span>Tablero de control y trazabilidad de avance por aprendiz.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                  <span>Registro de nuevos aprendices y actualización de expedientes formativos.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                  <span>Citación formal al Comité de Evaluación y Seguimiento con traslado de pruebas.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                  <span>Descarga y validación institucional de actas y certificados oficiales.</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => onSelectRole('instructor')}
                className="w-full py-3 px-5 rounded-xl bg-[#00324D] hover:bg-[#002235] text-white font-semibold text-sm transition-all duration-200 shadow-xs flex items-center justify-center gap-2 group-hover:shadow-md"
              >
                <span>Ingresar al Panel del Instructor</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Induction Journey Overview (4 key areas) */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-xs transition-colors duration-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Estructura Pedagógica del Proceso de Inducción
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Cuatro componentes diseñados para garantizar la apropiación del entorno formativo del SENA.
            </p>
          </div>
          <button
            onClick={onOpenTutor}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#39A900] hover:underline"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Consultar con el Tutor Virtual</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div 
            onClick={() => onSelectRole('aprendiz', selectedAppId)}
            className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800 cursor-pointer transition-all hover:border-[#39A900] group"
          >
            <div className="text-xs font-semibold text-[#39A900] mb-2 flex items-center justify-between">
              <span>Módulo 01</span>
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
              Identidad Institucional
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Escudo, bandera, logosímbolo, himno oficial, principios éticos y valores que orientan al aprendiz SENA.
            </p>
          </div>

          <div 
            onClick={() => onSelectRole('aprendiz', selectedAppId)}
            className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800 cursor-pointer transition-all hover:border-[#39A900] group"
          >
            <div className="text-xs font-semibold text-[#39A900] mb-2 flex items-center justify-between">
              <span>Módulo 02</span>
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
              Reglamento y Deberes
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Derechos, deberes y prohibiciones vigentes (actualizaciones 2026) aplicables en las etapas lectiva y productiva.
            </p>
          </div>

          <div 
            onClick={() => onSelectRole('aprendiz', selectedAppId)}
            className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800 cursor-pointer transition-all hover:border-[#39A900] group"
          >
            <div className="text-xs font-semibold text-[#39A900] mb-2 flex items-center justify-between">
              <span>Módulo 03</span>
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
              Acuerdo 009 de 2024
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Ciclo formativo, novedades de matrícula, régimen de faltas y procedimiento formal del Comité de Evaluación.
            </p>
          </div>

          <div 
            onClick={() => onSelectRole('aprendiz', selectedAppId)}
            className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800 cursor-pointer transition-all hover:border-[#39A900] group"
          >
            <div className="text-xs font-semibold text-[#39A900] mb-2 flex items-center justify-between">
              <span>Módulo 04</span>
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
              Evaluación y Certificado
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Cuestionario interactivo con retroalimentación pedagógica y expedición del certificado oficial de inducción.
            </p>
          </div>
        </div>
      </section>

      {/* Modal de Registro del Aprendiz */}
      <ApprenticeRegistrationModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onRegister={handleRegisterSuccess}
        onQuickDemoLogin={(demoId) => {
          setShowRegisterModal(false);
          onSelectRole('aprendiz', demoId);
        }}
        existingApprentices={apprentices}
      />

      {/* Modal Flotante de Video Tutorial */}
      <VideoTutorialModal
        isOpen={showVideoModal}
        onClose={() => setShowVideoModal(false)}
        onStartRegistration={() => setShowRegisterModal(true)}
      />
    </div>
  );
};
