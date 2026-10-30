import React, { useState, useMemo } from 'react';
import { SENA_RIGHTS_DUTIES } from '../data/senaData';
import { RightDutyItem } from '../types/sena';
import { BookOpen, Search, ShieldCheck, AlertTriangle, FileText, CheckCircle2, ChevronRight, Scale, Clock, AlertOctagon } from 'lucide-react';

export const RegulationsModule: React.FC = () => {
  const [filterType, setFilterType] = useState<'all' | 'derecho' | 'deber' | 'prohibicion' | 'medidas' | 'novedades'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<RightDutyItem | null>(null);

  const filteredItems = useMemo(() => {
    if (filterType === 'medidas' || filterType === 'novedades') return [];

    return SENA_RIGHTS_DUTIES.filter(item => {
      const matchesType = filterType === 'all' || item.type === filterType;
      const matchesSearch = searchQuery === '' || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.article.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.realWorldExample.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [filterType, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 transition-colors duration-200">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-900 dark:text-blue-400 uppercase tracking-wider mb-2">
            <span>Módulo 02</span>
            <span aria-hidden="true">·</span>
            <span>Reglamento del Aprendiz</span>
            <span aria-hidden="true">·</span>
            <span>Actualización Vigente 2026</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Derechos, Deberes y Normas de Convivencia (Actualización 2026)
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            El marco normativo actualizado del aprendiz SENA moderniza los lineamientos de convivencia,
            incorporando la ética en el uso de Inteligencia Artificial, los entornos virtuales en Zajuna, la mediación
            pedagógica restaurativa y nuevas alternativas productivas en la economía popular y comunitaria.
          </p>

          {/* 2026 Novelties Highlight Strip */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-white block mb-0.5">Ética e IA en Zajuna</span>
              <p className="text-slate-600 dark:text-slate-400 text-[11px]">Uso transparente y citado de modelos de IA; prohibido el plagio generativo.</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-white block mb-0.5">Mediación Restaurativa</span>
              <p className="text-slate-600 dark:text-slate-400 text-[11px]">Diálogo pedagógico y acuerdos formativos previos a cualquier comité disciplinario.</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-white block mb-0.5">Economía Popular</span>
              <p className="text-slate-600 dark:text-slate-400 text-[11px]">Nuevas opciones de etapa productiva en proyectos comunitarios, Campesena y teletrabajo.</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-white block mb-0.5">Ciberconvivencia</span>
              <p className="text-slate-600 dark:text-slate-400 text-[11px]">Cero tolerancia con ciberacoso y hostigamiento digital en canales virtuales.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Segmented Filter Control */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                filterType === 'all'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Todos ({SENA_RIGHTS_DUTIES.length})
            </button>
            <button
              onClick={() => setFilterType('derecho')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                filterType === 'derecho'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Derechos (7)
            </button>
            <button
              onClick={() => setFilterType('deber')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                filterType === 'deber'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Deberes (6)
            </button>
            <button
              onClick={() => setFilterType('prohibicion')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                filterType === 'prohibicion'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Prohibiciones (3)
            </button>
            <button
              onClick={() => setFilterType('medidas')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                filterType === 'medidas'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Faltas y Sanciones
            </button>
            <button
              onClick={() => setFilterType('novedades')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                filterType === 'novedades'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Trámites de Novedad
            </button>
          </div>

          {/* Search box */}
          {filterType !== 'medidas' && filterType !== 'novedades' && (
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar por artículo o palabra clave..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#39A900]"
              />
            </div>
          )}
        </div>

        {/* Content depending on selected filter */}
        {filterType === 'medidas' ? (
          /* Medidas Formativas y Faltas View */
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-semibold text-blue-700 dark:text-blue-400 uppercase tracking-wide block mb-1">Faltas Leves</span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Comportamiento en Ambientes</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Llegadas tarde esporádicas, olvido ocasional del carné o desatención leve en clase sin riesgo físico ni daño material.
                </p>
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Medida:</span> Llamado de atención verbal pedagógico y registro en el anecdotario.
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wide block mb-1">Faltas Graves</span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Afectación de Procesos</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Reincidencia en inasistencias injustificadas, desacato de normas de SST, daño negligente de maquinaria o irrespeto a compañeros.
                </p>
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Medida:</span> Plan de mejoramiento académico/disciplinario o condicionamiento de matrícula.
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-semibold text-rose-700 dark:text-rose-400 uppercase tracking-wide block mb-1">Faltas Gravísimas</span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Vulneración Ética y Legal</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Plagio comprobado, suplantación de identidad, agresión física o verbal, hurto, porte de armas o sustancias psicoactivas.
                </p>
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Medida:</span> Cancelación definitiva de matrícula e inhabilidad de 6 meses a 2 años.
                </div>
              </div>
            </div>

            {/* Debido Proceso Timeline */}
            <div className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-2xl border border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
                <Scale className="w-5 h-5 text-[#39A900]" />
                <span>Ruta del Debido Proceso (Garantía Constitucional)</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                Ningún aprendiz puede ser sancionado sin que se cumpla estrictamente este protocolo reglamentario
              </p>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <span className="text-xs font-mono font-bold text-slate-400 block mb-1">01. INFORME</span>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Reporte de Novedad</h4>
                  <p className="text-slate-600 dark:text-slate-300">
                    El instructor o cualquier miembro radica el informe motivado con pruebas y soportes ante la coordinación.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <span className="text-xs font-mono font-bold text-slate-400 block mb-1">02. CITACIÓN</span>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Comité de Evaluación</h4>
                  <p className="text-slate-600 dark:text-slate-300">
                    Se cita formalmente al aprendiz con antelación mínima de 3 días hábiles informando los cargos imputados.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <span className="text-xs font-mono font-bold text-slate-400 block mb-1">03. DESCARGOS</span>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Audiencia y Pruebas</h4>
                  <p className="text-slate-600 dark:text-slate-300">
                    El aprendiz ejerce su derecho a la defensa, es escuchado, presenta sus descargos y aporta testigos o documentos.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <span className="text-xs font-mono font-bold text-slate-400 block mb-1">04. DECISIÓN</span>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Acto y Recurso</h4>
                  <p className="text-slate-600 dark:text-slate-300">
                    El Subdirector emite la resolución. El aprendiz tiene derecho a interponer Recurso de Reposición en los 5 días siguientes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : filterType === 'novedades' ? (
          /* Trámites de Novedades View */
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 block mb-1">Trámite 01</span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Aplazamiento</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                  Permite desvincularse temporalmente de la formación por fuerza mayor comprobada, servicio militar o incapacidad médica prolongada.
                </p>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Plazo máximo:</span> Hasta 6 meses calendario, prorrogables por una sola vez.
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 block mb-1">Trámite 02</span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Traslado de Centro o Jornada</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                  Solicitud para cambiar de sede geográfica, centro de formación o jornada horaria manteniendo el mismo programa y competencias aprobadas.
                </p>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Requisito:</span> Haber cursado mínimo un trimestre y que el centro receptor tenga cupo disponible.
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 block mb-1">Trámite 03</span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Reingreso</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                  Solicitud que radica el aprendiz que había obtenido aplazamiento formal para incorporarse nuevamente a continuar su ruta formativa.
                </p>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Oportunidad:</span> Debe radicarse mínimo 1 mes antes de culminar el periodo de aplazamiento.
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 block mb-1">Trámite 04</span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Retiro Voluntario</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                  Manifestación formal e irrevocable del aprendiz de no continuar en el programa formativo por motivos personales.
                </p>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Sanción:</span> Inhabilidad de seis (6) meses para inscribirse a nuevos programas en el SENA.
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-mono text-rose-700 dark:text-rose-400 block mb-1">Alerta Reglamentaria</span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Causal de Deserción</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                  Inasistencia injustificada durante tres (3) días hábiles consecutivos o cuando no se presenta a etapa productiva tras culminar la lectiva.
                </p>
                <div className="text-[11px] bg-rose-50 dark:bg-rose-950/40 p-2.5 rounded-lg border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-300">
                  <span className="font-semibold">Consecuencia:</span> Cancelación de matrícula e inhabilidad de seis (6) meses en el sistema SofiaPlus.
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 block mb-1">Etapa Productiva</span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Modalidades de Práctica</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                  Contrato de aprendizaje con patrocinio empresarial, vínculo laboral, monitoría en el SENA, pasantía institucional o proyecto formativo productivo.
                </p>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Seguimiento:</span> Visitas concertadas de instructor de seguimiento y bitácoras quincenales.
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Standard Cards Grid for Derechos, Deberes, Prohibiciones */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="cursor-pointer bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-[#39A900] dark:hover:border-[#39A900] transition-all hover:shadow-xs flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className={`font-semibold uppercase tracking-wider ${
                      item.type === 'derecho' ? 'text-emerald-700 dark:text-emerald-400' :
                      item.type === 'deber' ? 'text-blue-700 dark:text-blue-400' : 'text-rose-700 dark:text-rose-400'
                    }`}>
                      {item.type}
                    </span>
                    <span className="font-mono text-slate-400 text-[11px]">{item.article.split(',')[1] || item.article}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-[#39A900] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="truncate pr-2">Ejemplo práctico disponible</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#39A900] group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Selected Item Modal Detail */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-6">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider mb-2">
                <span className={
                  selectedItem.type === 'derecho' ? 'text-emerald-700 dark:text-emerald-400' :
                  selectedItem.type === 'deber' ? 'text-blue-700 dark:text-blue-400' : 'text-rose-700 dark:text-rose-400'
                }>
                  {selectedItem.type} · {selectedItem.category}
                </span>
                <span className="font-mono text-slate-400">{selectedItem.article}</span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                {selectedItem.title}
              </h3>

              <div className="mt-4 space-y-4 text-xs text-slate-700 dark:text-slate-300">
                <div>
                  <span className="font-semibold text-slate-900 dark:text-white block mb-1">Fundamento del Reglamento:</span>
                  <p className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700 leading-relaxed">
                    {selectedItem.description}
                  </p>
                </div>

                <div>
                  <span className="font-semibold text-slate-900 dark:text-white block mb-1">Ejemplo en la Vida Real SENA:</span>
                  <p className="bg-emerald-50/50 dark:bg-emerald-950/30 p-3 rounded-xl border border-emerald-100 dark:border-emerald-800/50 text-slate-800 dark:text-slate-200 leading-relaxed">
                    {selectedItem.realWorldExample}
                  </p>
                </div>

                {selectedItem.consequenceIfBreached && (
                  <div>
                    <span className="font-semibold text-rose-800 dark:text-rose-400 block mb-1">Consecuencia del Incumplimiento:</span>
                    <p className="bg-rose-50 dark:bg-rose-950/30 p-3 rounded-xl border border-rose-200 dark:border-rose-900 text-rose-900 dark:text-rose-300 leading-relaxed">
                      {selectedItem.consequenceIfBreached}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="px-4 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-semibold rounded-lg hover:bg-slate-800 dark:hover:bg-white transition-colors"
                >
                  Entendido y Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
