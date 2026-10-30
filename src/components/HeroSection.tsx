import React from 'react';
import { NavigationTab, Apprentice } from '../types/sena';
import { Award, CheckCircle2, ChevronRight, Compass, ShieldCheck, Sparkles, BookOpen, Clock, Scale } from 'lucide-react';
import { SenaLogo } from './SenaLogo';

interface HeroSectionProps {
  onSelectTab: (tab: NavigationTab) => void;
  activeApprentice: Apprentice;
  onOpenCertificate: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSelectTab,
  activeApprentice,
  onOpenCertificate,
}) => {
  const hasPassed = activeApprentice.evaluationResult?.passed;

  return (
    <div className="space-y-8">
      {/* Hero 2-column split with high-fidelity visual */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden transition-colors duration-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[460px]">
          {/* Left Column: Induction Welcome and Context */}
          <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 flex flex-col justify-between">
            <div>
              {/* Unboxed metadata without pills */}
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-400 tracking-wide uppercase mb-3">
                <SenaLogo className="w-4 h-4 shrink-0" fill="#39A900" />
                <span>Servicio Nacional de Aprendizaje</span>
                <span aria-hidden="true">·</span>
                <span>Inducción Integral 2026</span>
                <span aria-hidden="true">·</span>
                <span>Ficha {activeApprentice.fichaId === 'ficha_1' ? '2824102' : '2715890'}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight text-balance">
                Bienvenido a tu camino de formación profesional integral en el SENA
              </h1>

              <p className="mt-4 text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                Apropia la identidad institucional, conoce a fondo tus derechos y deberes consagrados
                en el Reglamento del Aprendiz (Actualizaciones vigentes 2026) y certifica tus competencias
                mediante la evaluación oficial interactiva.
              </p>

              {/* Apprentice Current Progress Banner */}
              <div className="mt-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900 dark:text-white">{activeApprentice.fullName}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-slate-500 dark:text-slate-400">{activeApprentice.programName}</span>
                  </div>
                  <span className="font-mono font-medium text-slate-900 dark:text-white">
                    {activeApprentice.progressPercent}% completado
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#39A900] h-full transition-all duration-500 rounded-full"
                    style={{ width: `${activeApprentice.progressPercent}%` }}
                  />
                </div>
                <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <span>Estado: {hasPassed ? 'Inducción aprobada y certificada' : 'En proceso formativo'}</span>
                    <span aria-hidden="true">·</span>
                    <button
                      onClick={() => onSelectTab('portal')}
                      className="hover:text-[#39A900] dark:hover:text-emerald-400 transition-colors underline"
                      title="Volver a la landing page de selección de rol"
                    >
                      Cambiar rol / perfil
                    </button>
                  </div>
                  {hasPassed && (
                    <button
                      onClick={onOpenCertificate}
                      className="text-[#39A900] font-semibold hover:underline inline-flex items-center gap-1"
                    >
                      <Award className="w-3.5 h-3.5" />
                      Ver Certificado Oficial
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onSelectTab('identidad')}
                className="px-5 py-2.5 rounded-xl bg-[#39A900] text-white font-medium text-sm hover:bg-[#2d8500] transition-colors flex items-center gap-2 shadow-xs whitespace-nowrap"
              >
                <span>Explorar Identidad y Valores</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onSelectTab('tramites_comite')}
                className="px-5 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-medium text-sm transition-colors flex items-center gap-2 shadow-xs whitespace-nowrap"
              >
                <Scale className="w-4 h-4" />
                <span>Ruta y Comité (Ac. 009)</span>
              </button>
              <button
                onClick={() => onSelectTab('evaluacion')}
                className="px-5 py-2.5 rounded-xl bg-[#00324D] dark:bg-slate-800 text-white font-medium text-sm hover:bg-[#002235] dark:hover:bg-slate-700 transition-colors flex items-center gap-2 shadow-xs whitespace-nowrap border border-transparent dark:border-slate-700"
              >
                <ShieldCheck className="w-4 h-4 text-[#39A900]" />
                <span>Presentar Evaluación</span>
              </button>
            </div>
          </div>

          {/* Right Column: High Fidelity SENA Photo with Fallback Container */}
          <div className="lg:col-span-5 relative bg-slate-900 min-h-[280px] lg:min-h-full">
            <img
              src="/src/assets/images/sena_apprentices_campus_1793115153313.jpg"
              alt="Aprendices del SENA colaborando en centro de formación tecnológica"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 text-white text-xs pointer-events-none">
              <p className="font-semibold text-white/95">Ambiente de Innovación y Formación Integral</p>
              <p className="text-white/70 text-[11px] mt-0.5">SENA · Formación Profesional para el Desarrollo de Colombia</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Pillars of the Induction Process */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Ruta de Inducción del Aprendiz</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Recorre cada estación pedagógica para asegurar la apropiación del rol SENA</p>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
            <span>5 módulos formativos</span>
            <span aria-hidden="true" className="mx-1.5">·</span>
            <span>Evaluación sumativa</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Card 1: Identidad */}
          <div
            onClick={() => onSelectTab('identidad')}
            className="cursor-pointer bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-[#39A900] dark:hover:border-[#39A900] transition-all hover:shadow-xs group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-[#39A900] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Compass className="w-5 h-5" />
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Módulo 01</div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-[#39A900] transition-colors">
                Identidad y Valores SENA
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-3">
                Conoce el escudo, la bandera, el himno oficial, la misión institucional y los principios éticos que rigen nuestra comunidad educativa.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Símbolos e historia</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#39A900] group-hover:translate-x-0.5 transition-all" />
            </div>
          </div>

          {/* Card 2: Reglamento */}
          <div
            onClick={() => onSelectTab('reglamento')}
            className="cursor-pointer bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-[#39A900] dark:hover:border-[#39A900] transition-all hover:shadow-xs group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-[#00324D] dark:text-blue-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5 text-blue-700 dark:text-blue-400" />
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Módulo 02</div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-[#39A900] transition-colors">
                Derechos y Deberes
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-3">
                Explora las normas de convivencia, ética en IA, deberes en Zajuna, prohibiciones y derechos formativos del aprendiz.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Actualización Vigente</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#39A900] group-hover:translate-x-0.5 transition-all" />
            </div>
          </div>

          {/* Card 3: Acuerdo 009 de 2024 */}
          <div
            onClick={() => onSelectTab('tramites_comite')}
            className="cursor-pointer bg-white dark:bg-slate-900 p-5 rounded-xl border border-purple-200 dark:border-purple-900/60 hover:border-purple-500 dark:hover:border-purple-400 transition-all hover:shadow-xs group flex flex-col justify-between ring-1 ring-purple-100 dark:ring-purple-900/30"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Scale className="w-5 h-5" />
              </div>
              <div className="text-xs text-purple-700 dark:text-purple-400 font-semibold mb-1">Acuerdo 009/2024</div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                Ruta, Faltas y Comité
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-3">
                Ciclo de ingreso, permanencia, novedades (aplazamiento/deserción), reingreso, certificación, faltas y debido proceso en Comité.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-purple-700 dark:text-purple-400 font-medium">
              <span>Trámites y garantías</span>
              <ChevronRight className="w-3.5 h-3.5 text-purple-400 group-hover:translate-x-0.5 transition-all" />
            </div>
          </div>

          {/* Card 4: Dilemas */}
          <div
            onClick={() => onSelectTab('dilemas')}
            className="cursor-pointer bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-[#39A900] dark:hover:border-[#39A900] transition-all hover:shadow-xs group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Módulo 04</div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-[#39A900] transition-colors">
                Dilemas y Casos
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-3">
                Enfrenta situaciones reales del día a día SENA: incapacidades médicas, normas de SST, novedades y descargos.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Casos prácticos interactivos</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#39A900] group-hover:translate-x-0.5 transition-all" />
            </div>
          </div>

          {/* Card 5: Evaluacion */}
          <div
            onClick={() => onSelectTab('evaluacion')}
            className="cursor-pointer bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-[#39A900] dark:hover:border-[#39A900] transition-all hover:shadow-xs group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-[#39A900] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Award className="w-5 h-5" />
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Módulo 05</div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-[#39A900] transition-colors">
                Evaluación y Certificado
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-3">
                Demuestra la asimilación del proceso con la prueba diagnóstica y obtén tu Acta Oficial de Inducción con verificación.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Evaluación integral</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#39A900] group-hover:translate-x-0.5 transition-all" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
