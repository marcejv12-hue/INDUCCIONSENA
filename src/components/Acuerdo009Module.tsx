import React, { useState, useEffect } from 'react';
import { 
  SENA_LIFECYCLE_STAGES, 
  SENA_NOVEDADES_CATALOGO, 
  SENA_FALTAS_REGIMEN, 
  SENA_MEDIDAS_CATALOGO, 
  SENA_COMITE_ETAPAS, 
  SENA_COMITE_MIEMBROS 
} from '../data/senaData';
import { 
  Acuerdo009SubSection,
  LifecycleStage, 
  NovedadMatricula, 
  FaltaDisciplinariaAcademica, 
  MedidaFormativaDisciplinaria, 
  ComiteEtapa 
} from '../types/sena';
import { 
  Scale, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Users, 
  ChevronRight, 
  GraduationCap, 
  RefreshCw, 
  ShieldAlert, 
  Sparkles,
  Search,
  BookOpen,
  Award,
  Layers,
  ArrowRight
} from 'lucide-react';

interface Acuerdo009ModuleProps {
  currentSubSection?: Acuerdo009SubSection;
  onSubSectionChange?: (subSection: Acuerdo009SubSection) => void;
}

export const Acuerdo009Module: React.FC<Acuerdo009ModuleProps> = ({
  currentSubSection = 'ciclo',
  onSubSectionChange,
}) => {
  // Main subtabs for Acuerdo 009 de 2024 (exact 4 sections)
  const [activeSubTab, setActiveSubTab] = useState<Acuerdo009SubSection>(currentSubSection);

  useEffect(() => {
    if (currentSubSection && currentSubSection !== activeSubTab) {
      setActiveSubTab(currentSubSection);
    }
  }, [currentSubSection]);

  const handleSelectSubTab = (tab: Acuerdo009SubSection) => {
    setActiveSubTab(tab);
    onSubSectionChange?.(tab);
  };

  // Selected stage in the Lifecycle (Paso 1 al 5)
  const [selectedStageId, setSelectedStageId] = useState<string>('ingreso');

  // Interactive Novedades Simulator State
  const [simulatorNovedad, setSimulatorNovedad] = useState<string>('aplazamiento');
  const [simulatorReason, setSimulatorReason] = useState<string>('medica');
  const [simulationResult, setSimulationResult] = useState<boolean>(false);

  // Faltas Filter
  const [faltaFilter, setFaltaFilter] = useState<'all' | 'academica' | 'disciplinaria'>('all');
  const [severityFilter, setSeverityFilter] = useState<'all' | 'leve' | 'grave' | 'gravisima'>('all');

  // Selected Comite Step (1 a 6)
  const [activeComiteStep, setActiveComiteStep] = useState<number>(2);

  const currentStage = SENA_LIFECYCLE_STAGES.find(s => s.id === selectedStageId) || SENA_LIFECYCLE_STAGES[0];

  const filteredFaltas = SENA_FALTAS_REGIMEN.filter(f => {
    const matchesType = faltaFilter === 'all' || f.type === faltaFilter;
    const matchesSeverity = severityFilter === 'all' || f.severity === severityFilter;
    return matchesType && matchesSeverity;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200">


      {/* Navigation Pill Bar for the 4 Sections requested */}
      <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-x-auto no-scrollbar">
        <button
          onClick={() => handleSelectSubTab('ciclo')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 ${
            activeSubTab === 'ciclo'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs border border-slate-200/80 dark:border-slate-700'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <GraduationCap className={`w-4 h-4 ${activeSubTab === 'ciclo' ? 'text-[#39A900]' : 'text-slate-400'}`} />
          <span>1. Ciclo Formativo Integral</span>
        </button>

        <button
          onClick={() => handleSelectSubTab('faltas')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 ${
            activeSubTab === 'faltas'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs border border-slate-200/80 dark:border-slate-700'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <AlertTriangle className={`w-4 h-4 ${activeSubTab === 'faltas' ? 'text-amber-500' : 'text-slate-400'}`} />
          <span>2. Régimen de Faltas y Criterios</span>
        </button>

        <button
          onClick={() => handleSelectSubTab('medidas')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 ${
            activeSubTab === 'medidas'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs border border-slate-200/80 dark:border-slate-700'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <ShieldAlert className={`w-4 h-4 ${activeSubTab === 'medidas' ? 'text-blue-600' : 'text-slate-400'}`} />
          <span>3. Medidas Formativas vs Sancionatorias</span>
        </button>

        <button
          onClick={() => handleSelectSubTab('comite')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 ${
            activeSubTab === 'comite'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs border border-slate-200/80 dark:border-slate-700'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Scale className={`w-4 h-4 ${activeSubTab === 'comite' ? 'text-purple-500' : 'text-slate-400'}`} />
          <span>4. Comité de Evaluación y Debido Proceso</span>
        </button>
      </div>

      {/* ============================================================== */}
      {/* 1. CICLO FORMATIVO INTEGRAL DE LA RUTA DEL APRENDIZ            */}
      {/* ============================================================== */}
      {activeSubTab === 'ciclo' && (
        <div className="space-y-8 animate-in fade-in duration-150">
          {/* Section Header */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
            <span className="text-xs font-semibold text-[#39A900] uppercase tracking-wider block mb-1">
              Sección 1 · Acuerdo 009 de 2024
            </span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Ciclo Formativo Integral de la Ruta del Aprendiz
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Trayectoria completa: Ingreso, Permanencia, Novedades de Matrícula, Reingreso y Certificación con sus requisitos reglamentarios.
            </p>
          </div>

          {/* 5 Stages Interactive Stepper Header */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#39A900]"></span>
              <span>Las 5 Estaciones de la Trayectoria del Aprendiz</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {SENA_LIFECYCLE_STAGES.map((stage, idx) => (
                <button
                  key={stage.id}
                  onClick={() => setSelectedStageId(stage.id)}
                  className={`p-3.5 rounded-xl text-left transition-all border ${
                    selectedStageId === stage.id
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-[#39A900] shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono font-bold text-slate-400">PASO 0{idx + 1}</span>
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${
                      selectedStageId === stage.id 
                        ? 'bg-[#39A900] text-white' 
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}>
                      {stage.badge}
                    </span>
                  </div>
                  <h4 className={`text-xs font-bold leading-snug ${
                    selectedStageId === stage.id ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'
                  }`}>
                    {stage.title.split('. ')[1] || stage.title}
                  </h4>
                </button>
              ))}
            </div>
          </div>

          {/* Detailed View of Selected Stage */}
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-xs font-semibold text-[#39A900] uppercase tracking-wider block mb-1">
                  {currentStage.badge} · {currentStage.articleAcuerdo009}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  {currentStage.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                  {currentStage.subtitle}
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-right sm:max-w-xs shrink-0">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Norma Reguladora:</span>
                <span className="text-xs font-semibold text-slate-900 dark:text-white font-mono">
                  {currentStage.articleAcuerdo009}
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
              {currentStage.description}
            </p>

            {/* Key Phases */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#39A900]" />
                <span>Fases y Momentos Clave en Esta Etapa</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {currentStage.keyPhases.map((phase, pIdx) => (
                  <div key={pIdx} className="p-4 rounded-xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700/80 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-mono font-bold text-[#39A900] block mb-1">Fase 0{pIdx + 1}</span>
                      <h5 className="text-sm font-bold text-slate-900 dark:text-white mb-2">{phase.name}</h5>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                        {phase.description}
                      </p>
                    </div>
                    <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">Acción esperada:</span> {phase.deliverableOrAction}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements & Tips Split */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
              <div className="p-5 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 dark:text-blue-300 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>Requisitos Reglamentarios Obligatorios</span>
                </h4>
                <ul className="space-y-2">
                  {currentStage.regulatoryRequirements.map((req, rIdx) => (
                    <li key={rIdx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 dark:text-emerald-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#39A900]" />
                  <span>Recomendaciones Prácticas para el Aprendiz</span>
                </h4>
                <ul className="space-y-2">
                  {currentStage.tipsForApprentices.map((tip, tIdx) => (
                    <li key={tIdx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#39A900] mt-0.5 shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sub-component: Novedades de Matrícula Catalog */}
          <div className="space-y-4 pt-4">
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Catálogo de Novedades de Matrícula (Trámites y Deserción)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Aprende a radicar formalmente tus solicitudes antes de ausentarte para salvaguardar tu cupo institucional.
                </p>
              </div>
              <span className="text-xs font-mono px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                Capítulo IV Acuerdo 009
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {SENA_NOVEDADES_CATALOGO.map((novedad) => (
                <div 
                  key={novedad.id}
                  className={`p-5 rounded-2xl border flex flex-col justify-between transition-all bg-white dark:bg-slate-900 ${
                    novedad.type === 'desercion'
                      ? 'border-rose-200 dark:border-rose-900/60 shadow-xs'
                      : 'border-slate-200 dark:border-slate-800 hover:border-[#39A900]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full font-bold ${
                        novedad.type === 'desercion'
                          ? 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-400'
                          : novedad.type === 'aplazamiento'
                          ? 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400'
                          : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400'
                      }`}>
                        {novedad.type.replace('_', ' ')}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">{novedad.articleAcuerdo009.split(',')[1] || novedad.articleAcuerdo009}</span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                      {novedad.title}
                    </h4>

                    <p className="text-xs text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                      {novedad.shortDesc}
                    </p>

                    <div className="space-y-3 text-xs mb-4">
                      <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700">
                        <span className="font-semibold text-slate-900 dark:text-white block mb-1">Causales Válidas:</span>
                        <ul className="space-y-1 text-[11px] text-slate-600 dark:text-slate-300">
                          {novedad.validCauses.map((cause, cIdx) => (
                            <li key={cIdx} className="flex items-start gap-1.5">
                              <span className="text-[#39A900] font-bold">·</span>
                              <span>{cause}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 text-[11px]">
                        <span className="font-semibold text-slate-900 dark:text-white block mb-0.5">Tiempos y Condiciones:</span>
                        <p className="text-slate-600 dark:text-slate-400">{novedad.maxPeriodAndConditions}</p>
                      </div>
                    </div>
                  </div>

                  <div className={`pt-3 border-t text-[11px] ${
                    novedad.type === 'desercion'
                      ? 'border-rose-100 dark:border-rose-900/40 text-rose-800 dark:text-rose-300'
                      : 'border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400'
                  }`}>
                    <span className="font-semibold">Efecto:</span> {novedad.consequencesAndImpact}
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Novedad Simulator Sandbox */}
            <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-lg mt-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-xl bg-[#39A900]/20 border border-[#39A900]/30 text-[#39A900]">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Simulador Interactivo de Solicitud de Novedad</h4>
                  <p className="text-xs text-slate-400">Verifica qué documentación y plazos aplican a tu caso particular según el Acuerdo 009 de 2024</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">1. ¿Qué novedad deseas radicar?</label>
                  <select 
                    value={simulatorNovedad}
                    onChange={(e) => {
                      setSimulatorNovedad(e.target.value);
                      setSimulationResult(false);
                    }}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#39A900]"
                  >
                    <option value="aplazamiento">Aplazamiento de Formación</option>
                    <option value="traslado">Traslado de Centro o Ficha</option>
                    <option value="retiro_voluntario">Retiro Voluntario</option>
                    <option value="reingreso">Reingreso a la Formación</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">2. Causa o Motivo Principal</label>
                  <select
                    value={simulatorReason}
                    onChange={(e) => {
                      setSimulatorReason(e.target.value);
                      setSimulationResult(false);
                    }}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#39A900]"
                  >
                    <option value="medica">Incapacidad médica prolongada</option>
                    <option value="militar">Servicio militar obligatorio</option>
                    <option value="laboral">Cambio de horario laboral / Nuevo empleo</option>
                    <option value="calamidad">Calamidad doméstica comprobada</option>
                    <option value="domicilio">Cambio de ciudad o residencia</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={() => setSimulationResult(true)}
                    className="w-full py-2.5 px-4 bg-[#39A900] hover:bg-[#329200] text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Evaluar Viabilidad Reglamentaria</span>
                  </button>
                </div>
              </div>

              {simulationResult && (
                <div className="mt-6 p-4 rounded-xl bg-slate-800/90 border border-slate-700 animate-in fade-in duration-150">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#39A900] mt-0.5 shrink-0" />
                    <div className="space-y-2 text-xs">
                      <h5 className="font-bold text-white text-sm">
                        Dictamen del Sistema para: {simulatorNovedad.toUpperCase()} por {simulatorReason.toUpperCase()}
                      </h5>
                      <p className="text-slate-300 leading-relaxed">
                        {simulatorNovedad === 'aplazamiento' && 'Tu solicitud es procedente bajo el Acuerdo 009 de 2024. Recuerda radicarla antes de incurrir en 3 inasistencias consecutivas. El periodo máximo concedido es de hasta 6 meses con opción de prórroga soportada.'}
                        {simulatorNovedad === 'traslado' && 'Procede si has cursado y aprobado al menos el primer trimestre del programa y si existe disponibilidad de cupo en la ficha o centro de destino.'}
                        {simulatorNovedad === 'retiro_voluntario' && 'Es una decisión libre y voluntaria. Al radicarla formalmente evitas la sanción de deserción, aunque tendrás una inhabilidad preventiva de 6 meses para nueva inscripción.'}
                        {simulatorNovedad === 'reingreso' && 'Debes radicar la solicitud con al menos 15 días hábiles de anticipación a la finalización del aplazamiento para permitir a la Coordinación asignarte cupo en una ficha afín.'}
                      </p>
                      <div className="pt-2 flex flex-wrap gap-2 text-[11px] text-slate-400">
                        <span className="px-2 py-0.5 bg-slate-700 rounded-md">Canal: Sistema SofíaPlus / Ventanilla de Centro</span>
                        <span className="px-2 py-0.5 bg-slate-700 rounded-md">Soporte requerido: Certificación original firmada</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 2. RÉGIMEN DE FALTAS Y CRITERIOS DE CALIFICACIÓN               */}
      {/* ============================================================== */}
      {activeSubTab === 'faltas' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider block mb-1">
                Sección 2 · Acuerdo 009 de 2024
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Régimen de Faltas y Criterios de Calificación
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Tipificación formal de faltas según su naturaleza (académicas o disciplinarias) y graduación (leves, graves o gravísimas).
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={faltaFilter}
                onChange={(e) => setFaltaFilter(e.target.value as any)}
                className="px-3 py-1.5 text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none"
              >
                <option value="all">Todas las naturalezas</option>
                <option value="academica">Faltas Académicas</option>
                <option value="disciplinaria">Faltas Disciplinarias</option>
              </select>

              <select
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value as any)}
                className="px-3 py-1.5 text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none"
              >
                <option value="all">Todas las severidades</option>
                <option value="leve">Faltas Leves</option>
                <option value="grave">Faltas Graves</option>
                <option value="gravisima">Faltas Gravísimas</option>
              </select>
            </div>
          </div>

          {/* Criterios Legales de Calificación Banner */}
          <div className="bg-amber-50/50 dark:bg-amber-950/20 p-5 rounded-2xl border border-amber-200/70 dark:border-amber-900/40 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300 flex items-center gap-2">
              <Scale className="w-4 h-4 text-amber-600" />
              <span>Criterios Reglamentarios para Calificar la Gravedad de la Falta</span>
            </h3>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Para determinar si una falta es <strong>Leve, Grave o Gravísima</strong>, el Comité y el Subdirector de Centro deben valorar obligatoriamente:
              1) Grado de culpabilidad (dolo o culpa); 2) Grado de perturbación del servicio formativo; 3) Daño patrimonial o físico ocasionado;
              4) Reiteración de la conducta; y 5) Confesión espontánea o resarcimiento oportuno del daño antes de iniciarse la actuación disciplinaria.
            </p>
          </div>

          {/* Faltas Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFaltas.map((falta) => (
              <div 
                key={falta.id}
                className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      falta.severity === 'leve'
                        ? 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                        : falta.severity === 'grave'
                        ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                        : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
                    }`}>
                      Falta {falta.severity} · {falta.type}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">Acuerdo 009</span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                    {falta.title}
                  </h4>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                    {falta.description}
                  </p>

                  <div className="space-y-2 mb-3">
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 text-[11px]">
                      <span className="font-semibold text-slate-900 dark:text-white block mb-0.5">Criterios de Calificación:</span>
                      <ul className="space-y-0.5 text-slate-600 dark:text-slate-400">
                        {falta.qualificationCriteria.map((crit, cIdx) => (
                          <li key={cIdx}>• {crit}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 text-[11px]">
                      <span className="font-semibold text-slate-900 dark:text-white block mb-0.5">Casos Prácticos Típicos:</span>
                      <ul className="space-y-0.5 text-slate-600 dark:text-slate-400">
                        {falta.typicalCases.map((cas, csIdx) => (
                          <li key={csIdx}>• {cas}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Medida Aplicable:</span> {falta.associatedMeasure}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 3. MEDIDAS FORMATIVAS VS MEDIDAS SANCIONATORIAS                */}
      {/* ============================================================== */}
      {activeSubTab === 'medidas' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
            <span className="text-xs font-semibold text-blue-700 dark:text-blue-400 uppercase tracking-wider block mb-1">
              Sección 3 · Acuerdo 009 de 2024
            </span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Medidas Formativas (Pedagógicas) vs Medidas Sancionatorias
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              El régimen distingue tajantemente entre medidas pedagógicas para corregir dificultades y sanciones formales privativas del cupo.
            </p>
          </div>

          {/* Cards of the 4 Measures */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {SENA_MEDIDAS_CATALOGO.map((medida) => (
              <div
                key={medida.id}
                className={`p-5 rounded-2xl border flex flex-col justify-between bg-white dark:bg-slate-900 ${
                  medida.category === 'formativa'
                    ? 'border-emerald-200 dark:border-emerald-900/50'
                    : 'border-rose-200 dark:border-rose-900/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                      medida.category === 'formativa'
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                        : 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300'
                    }`}>
                      {medida.category}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {medida.authority.includes('Subdirector') ? 'Subdirección' : 'Instructor/Coord.'}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                    {medida.name}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                    {medida.definition}
                  </p>

                  <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700 text-[11px] space-y-1 mb-3">
                    <span className="font-semibold text-slate-900 dark:text-white block">Término de Ejecución:</span>
                    <p className="text-slate-600 dark:text-slate-400">{medida.executionTerm}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 text-[11px] space-y-1 mb-3">
                    <span className="font-semibold text-slate-900 dark:text-white block">Efectos Jurídicos:</span>
                    <ul className="space-y-0.5 text-slate-600 dark:text-slate-400">
                      {medida.legalEffects.map((eff, eIdx) => (
                        <li key={eIdx}>• {eff}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Enfoque:</span> {medida.restorativeApproach}
                </div>
              </div>
            ))}
          </div>

          {/* Differences Table */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-x-auto">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
              Cuadro Comparativo: Medidas Formativas vs Sanciones Disciplinarias
            </h3>
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">
                  <th className="py-2.5 pr-4 font-semibold">Aspecto Comparado</th>
                  <th className="py-2.5 px-4 font-semibold text-emerald-700 dark:text-emerald-400">Medidas Formativas (Pedagógicas)</th>
                  <th className="py-2.5 px-4 font-semibold text-rose-700 dark:text-rose-400">Medidas Sancionatorias (Disciplinarias)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="py-3 pr-4 font-semibold text-slate-900 dark:text-white">Autoridad Competente</td>
                  <td className="py-3 px-4">Instructor del área formativa y/o Coordinador Académico.</td>
                  <td className="py-3 px-4">Subdirector de Centro de Formación (mediante resolución motivada).</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-semibold text-slate-900 dark:text-white">Propósito Fundamental</td>
                  <td className="py-3 px-4">Pedagógico y preventivo: superar deficiencias y acordar compromisos de mejora.</td>
                  <td className="py-3 px-4">Punitivo y correctivo formal ante faltas graves o gravísimas comprobadas.</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-semibold text-slate-900 dark:text-white">Antecedente en SofiaPlus</td>
                  <td className="py-3 px-4">No genera sanción registral inhabilitante en la base de datos nacional.</td>
                  <td className="py-3 px-4">Genera registro formal e inhabilidad nacional (de 6 meses a 2 años en cancelación).</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-semibold text-slate-900 dark:text-white">Exige Comité Previo</td>
                  <td className="py-3 px-4">No requiere sesión del Comité de Evaluación; se tramita en el ambiente formativo.</td>
                  <td className="py-3 px-4">Obligatorio dictamen y recomendación colegiada del Comité de Evaluación y Seguimiento.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 4. FUNCIONAMIENTO DEL COMITÉ DE EVALUACIÓN Y SEGUIMIENTO       */}
      {/* ============================================================== */}
      {activeSubTab === 'comite' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="max-w-3xl">
              <span className="text-xs font-semibold text-purple-700 dark:text-purple-400 uppercase tracking-wider block mb-1">
                Sección 4 · Acuerdo 009 de 2024
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Funcionamiento del Comité de Evaluación y Seguimiento (Debido Proceso)
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                El Comité es el órgano asesor del Subdirector de Centro que investiga y analiza las quejas académicas o disciplinarias graves.
                Garantiza el <strong>Derecho Constitucional a la Defensa (Art. 29 de la Constitución Política)</strong> mediante 6 etapas estrictas.
              </p>
            </div>
          </div>

          {/* Members of the Committee */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-600" />
              <span>Conformación Reglamentaria del Comité</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {SENA_COMITE_MIEMBROS.map((miembro) => (
                <div key={miembro.id} className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        miembro.voteRight === 'Voz y Voto'
                          ? 'bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                      }`}>
                        {miembro.voteRight}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">{miembro.title}</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
                      {miembro.roleDescription}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Rol:</span> {miembro.importance}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Step-by-Step Due Process Timeline */}
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
              <Scale className="w-5 h-5 text-[#39A900]" />
              <span>Simulador del Debido Proceso: Las 6 Etapas Reglamentarias</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Selecciona cada etapa para conocer sus términos legales perentorios, procedimientos y garantías del aprendiz
            </p>

            {/* Stepper Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 mb-6">
              {SENA_COMITE_ETAPAS.map((etapa) => (
                <button
                  key={etapa.step}
                  onClick={() => setActiveComiteStep(etapa.step)}
                  className={`p-3 rounded-xl text-left border transition-all ${
                    activeComiteStep === etapa.step
                      ? 'bg-purple-50 dark:bg-purple-950/40 border-purple-500 shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span className="text-[10px] font-mono font-bold text-slate-400 block mb-0.5">ETAPA 0{etapa.step}</span>
                  <span className={`text-xs font-bold line-clamp-2 ${
                    activeComiteStep === etapa.step ? 'text-purple-900 dark:text-purple-300' : 'text-slate-700 dark:text-slate-300'
                  }`}>
                    {etapa.phaseName}
                  </span>
                </button>
              ))}
            </div>

            {/* Active Stage Details */}
            {(() => {
              const currentEtapa = SENA_COMITE_ETAPAS.find(e => e.step === activeComiteStep) || SENA_COMITE_ETAPAS[0];
              return (
                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 space-y-5 animate-in fade-in duration-150">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-700">
                    <div>
                      <span className="text-[11px] font-mono font-bold text-purple-600 dark:text-purple-400 block mb-1">
                        ETAPA {currentEtapa.step} DE 6 · DEBIDO PROCESO SENA
                      </span>
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                        {currentEtapa.phaseName}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                        Actor Responsable: <span className="font-semibold text-slate-900 dark:text-white">{currentEtapa.responsibleActor}</span>
                      </p>
                    </div>

                    <div className="bg-purple-100 dark:bg-purple-950/60 p-3 rounded-xl border border-purple-200 dark:border-purple-800 text-purple-900 dark:text-purple-300 text-xs font-semibold shrink-0">
                      <Clock className="w-4 h-4 inline mr-1.5" />
                      <span>Plazo: {currentEtapa.legalTimeLimit}</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {currentEtapa.summary}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-2">
                      <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-blue-600" />
                        <span>Trámite y Procedimiento Específico:</span>
                      </h5>
                      <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                        {currentEtapa.detailedProcess.map((proc, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-1.5">
                            <ChevronRight className="w-3.5 h-3.5 text-[#39A900] mt-0.5 shrink-0" />
                            <span>{proc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-800/40 space-y-2">
                      <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#39A900]" />
                        <span>Garantías Protegidas para el Aprendiz:</span>
                      </h5>
                      <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                        {currentEtapa.guaranteesForApprentice.map((gar, gIdx) => (
                          <li key={gIdx} className="flex items-start gap-1.5">
                            <span className="text-[#39A900] font-bold">✓</span>
                            <span>{gar}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};
