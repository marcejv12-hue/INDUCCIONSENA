import React, { useState } from 'react';
import { SENA_INSTITUTIONAL_SYMBOLS, SENA_VALUES, HIMNO_SENA_LYRICS } from '../data/senaData';
import { Compass, Volume2, VolumeX, Shield, Award, Sparkles, Building2, BookOpen, CheckCircle, ExternalLink } from 'lucide-react';
import { SenaLogo } from './SenaLogo';

export const IdentityModule: React.FC = () => {
  const [selectedSymbolId, setSelectedSymbolId] = useState<string>('escudo');
  const [activeStanzaIndex, setActiveStanzaIndex] = useState<number>(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  const selectedSymbol = SENA_INSTITUTIONAL_SYMBOLS.find(s => s.id === selectedSymbolId) || SENA_INSTITUTIONAL_SYMBOLS[0];

  // Simulated audio narration of the himno using SpeechSynthesis if available
  const handleTogglePlayHimno = () => {
    if ('speechSynthesis' in window) {
      if (isPlayingAudio) {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(false);
      } else {
        const textToRead = `${HIMNO_SENA_LYRICS[activeStanzaIndex].stanza}. ${HIMNO_SENA_LYRICS[activeStanzaIndex].text}`;
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.lang = 'es-CO';
        utterance.rate = 0.95;
        utterance.onend = () => setIsPlayingAudio(false);
        utterance.onerror = () => setIsPlayingAudio(false);
        setIsPlayingAudio(true);
        window.speechSynthesis.speak(utterance);
      }
    } else {
      setIsPlayingAudio(!isPlayingAudio);
    }
  };

  return (
    <div className="space-y-10">
      {/* Module Title Banner */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 transition-colors duration-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider mb-2">
              <span>Módulo 01</span>
              <span aria-hidden="true">·</span>
              <span>Identidad Institucional</span>
              <span aria-hidden="true">·</span>
              <span>Historia y Principios</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Identidad, Símbolos y Valores del SENA
            </h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              El Servicio Nacional de Aprendizaje (SENA) nació en 1957 como iniciativa de Rodolfo Martínez Tono.
              Desde entonces, ha formado a millones de colombianos en habilidades técnicas, tecnológicas y humanas.
              Comprender sus símbolos y valores es el primer paso para apropiar el sentido de pertenencia institucional.
            </p>
          </div>

          <div className="w-full md:w-64 h-36 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 relative shrink-0">
            <img
              src="/src/assets/images/sena_institutional_center_1793115155061.jpg"
              alt="Centro Tecnológico de Formación SENA"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2.5">
              <span className="text-[11px] font-medium text-white">Sede de Formación Tecnológica</span>
            </div>
          </div>
        </div>
      </section>

      {/* Símbolos Institucionales Explorer */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Símbolos Institucionales</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Selecciona cada símbolo para explorar su significado patrimonial</p>
          </div>
        </div>

        {/* Interactive Segmented Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
          {SENA_INSTITUTIONAL_SYMBOLS.map((symbol) => (
            <button
              key={symbol.id}
              onClick={() => {
                setSelectedSymbolId(symbol.id);
                if (isPlayingAudio) {
                  window.speechSynthesis?.cancel();
                  setIsPlayingAudio(false);
                }
              }}
              className={`px-3 py-2.5 text-xs font-semibold rounded-lg transition-all text-center whitespace-nowrap ${
                selectedSymbolId === symbol.id
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs border border-slate-200/80 dark:border-slate-700'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {symbol.name}
            </button>
          ))}
        </div>

        {/* Selected Symbol Display Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 transition-colors duration-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center text-center">
                {selectedSymbol.id === 'escudo' && (
                  <div className="w-42 h-42 rounded-2xl bg-white border border-slate-200 p-3 shadow-xs flex items-center justify-center mb-3">
                    <img
                      src="https://www.sena.edu.co/assets/escudo-CKAC4aSg.png"
                      alt="Escudo Oficial del SENA"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/src/assets/escudo-sena.png';
                      }}
                    />
                  </div>
                )}
                {selectedSymbol.id === 'bandera' && (
                  <div className="w-36 h-24 rounded-md bg-white border border-slate-300 shadow-sm flex items-center justify-center relative mb-3 overflow-hidden p-2">
                    <SenaLogo className="w-16 h-16" fill="#39A900" />
                  </div>
                )}
                {selectedSymbol.id === 'logosimbolo' && (
                  <div className="w-24 h-24 rounded-2xl bg-white border border-emerald-200 p-3 shadow-xs flex items-center justify-center mb-3">
                    <SenaLogo className="w-full h-full" fill="#39A900" />
                  </div>
                )}
                {selectedSymbol.id === 'himno' && (
                  <div className="w-24 h-24 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-[#00324D] dark:text-blue-400 border border-blue-100 dark:border-blue-900 flex items-center justify-center mb-3">
                    <Award className="w-12 h-12" />
                  </div>
                )}

                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{selectedSymbol.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs">{selectedSymbol.tagline}</p>

                {/* Fun fact callout */}
                <div className="mt-4 pt-4 border-t border-slate-200/60 dark:border-slate-700 text-left text-xs text-slate-600 dark:text-slate-300 w-full">
                  <span className="font-semibold text-slate-900 dark:text-white block mb-0.5">Dato Histórico:</span>
                  {selectedSymbol.funFact}
                </div>
              </div>

              {/* Special Interactive Himno Audio Player if Himno is active */}
              {selectedSymbol.id === 'himno' && (
                <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900 dark:text-white">Audio Narrado del Himno</span>
                    <button
                      onClick={handleTogglePlayHimno}
                      className="px-3 py-1.5 rounded-lg bg-[#39A900] text-white font-medium hover:bg-[#2d8500] transition-colors flex items-center gap-1.5"
                    >
                      {isPlayingAudio ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                      <span>{isPlayingAudio ? 'Detener' : 'Escuchar Estrofa'}</span>
                    </button>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300">
                    Pulsa para escuchar la declamación de la estrofa seleccionada y entonar con orgullo patrio.
                  </p>
                </div>
              )}
            </div>

            {/* Elements and details */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wide">
                  Descripción y Significado
                </h4>
                <p className="mt-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {selectedSymbol.description}
                </p>
              </div>

              {/* Interactive Stanza Selector if Himno */}
              {selectedSymbol.id === 'himno' ? (
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Estrofas del Himno Oficial</h4>
                  <div className="flex gap-2">
                    {HIMNO_SENA_LYRICS.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setActiveStanzaIndex(idx);
                          if (isPlayingAudio) {
                            window.speechSynthesis?.cancel();
                            setIsPlayingAudio(false);
                          }
                        }}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-md border transition-all ${
                          activeStanzaIndex === idx
                            ? 'bg-[#39A900] text-white border-[#39A900]'
                            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                        }`}
                      >
                        {item.stanza}
                      </button>
                    ))}
                  </div>

                  <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 font-serif text-slate-800 dark:text-slate-200 text-sm whitespace-pre-line leading-relaxed italic text-center">
                    {HIMNO_SENA_LYRICS[activeStanzaIndex].text}
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Elementos Constitutivos</h4>
                  <div className="space-y-2.5">
                    {selectedSymbol.elements.map((el, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
                      >
                        <div className="font-semibold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-[#39A900] shrink-0" />
                          <span>{el.title}</span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 pl-6 leading-relaxed">
                          {el.meaning}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Misión y Visión SENA */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-2xl border border-slate-200 dark:border-slate-800 transition-colors duration-200">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-400 uppercase tracking-wide mb-2">
            <span>Razón de Ser</span>
            <span aria-hidden="true">·</span>
            <span>Compromiso Nacional</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Misión Institucional</h3>
          <p className="mt-3 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            El SENA está encargado de cumplir la función que le corresponde al Estado de invertir en el
            desarrollo social y técnico de los trabajadores colombianos, ofreciendo y ejecutando la
            formación profesional integral, para la incorporación y el desarrollo de las personas en
            actividades productivas que contribuyan al desarrollo social, económico y tecnológico del país.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-2xl border border-slate-200 dark:border-slate-800 transition-colors duration-200">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-900 dark:text-blue-400 uppercase tracking-wide mb-2">
            <span>Horizonte Estratégico</span>
            <span aria-hidden="true">·</span>
            <span>Hacia el Futuro</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Visión Institucional</h3>
          <p className="mt-3 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            El SENA se consolidará como una entidad referente de formación integral para el trabajo, con
            altos estándares de calidad internacional, innovación, bilingüismo y pertinencia en la era
            de la transformación digital y la transición energética sostenible en Colombia.
          </p>
        </div>
      </section>

      {/* Principios y Valores Éticos SENA */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Principios y Valores Éticos</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Valores innegociables que orientan la conducta diaria de aprendices, instructores y administrativos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SENA_VALUES.map((val) => (
            <div key={val.id} className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between transition-colors duration-200">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-[#39A900]" />
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">{val.title}</h4>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{val.description}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                <span className="font-semibold text-slate-800 dark:text-slate-200 block mb-0.5">En el ambiente de aprendizaje:</span>
                <span className="text-slate-500 dark:text-slate-400">{val.applicationInSena}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Servicios del Ecosistema SENA para el Aprendiz */}
      <section className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 transition-colors duration-200">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Ecosistema y Servicios para Aprendices</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
          Aprovecha los programas complementarios que el SENA tiene para potenciar tu vida académica y laboral
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="bg-white dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Bienestar al Aprendiz</h4>
            <p className="text-slate-600 dark:text-slate-300">
              Liderazgo, salud integral, arte, deporte, apoyos de sostenimiento regular e incentivos por excelencia.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Agencia Pública de Empleo (APE)</h4>
            <p className="text-slate-600 dark:text-slate-300">
              Intermediación laboral gratuita, talleres de hoja de vida, entrevistas y convocatorias nacionales e internacionales.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">SENNOVA</h4>
            <p className="text-slate-600 dark:text-slate-300">
              Semilleros de investigación aplicada, modernización tecnológica, desarrollo experimental y proyectos de innovación.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Fondo Emprender</h4>
            <p className="text-slate-600 dark:text-slate-300">
              Capital semilla condonable para aprendices y egresados con ideas de negocio innovadoras y sostenibles.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
