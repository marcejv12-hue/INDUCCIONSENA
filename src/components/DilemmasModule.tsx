import React, { useState } from 'react';
import { SENA_SCENARIO_DILEMMAS } from '../data/senaData';
import { Sparkles, CheckCircle, XCircle, AlertCircle, ArrowRight, RotateCcw, ShieldCheck } from 'lucide-react';

export const DilemmasModule: React.FC = () => {
  const [currentDilemmaIndex, setCurrentDilemmaIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [dilemmaScores, setDilemmaScores] = useState<{ [dilemmaId: string]: boolean }>({});

  const dilemma = SENA_SCENARIO_DILEMMAS[currentDilemmaIndex];
  const selectedOption = dilemma.options.find(o => o.id === selectedOptionId);

  const handleSelectOption = (optionId: string) => {
    if (hasSubmitted) return;
    setSelectedOptionId(optionId);
  };

  const handleConfirmDecision = () => {
    if (!selectedOptionId) return;
    setHasSubmitted(true);
    const chosen = dilemma.options.find(o => o.id === selectedOptionId);
    if (chosen) {
      setDilemmaScores(prev => ({
        ...prev,
        [dilemma.id]: chosen.isCorrect
      }));
    }
  };

  const handleNextDilemma = () => {
    if (currentDilemmaIndex < SENA_SCENARIO_DILEMMAS.length - 1) {
      setCurrentDilemmaIndex(prev => prev + 1);
      setSelectedOptionId(null);
      setHasSubmitted(false);
    }
  };

  const handleResetDilemma = () => {
    setSelectedOptionId(null);
    setHasSubmitted(false);
  };

  const totalCompleted = Object.keys(dilemmaScores).length;
  const totalCorrect = Object.values(dilemmaScores).filter(Boolean).length;

  return (
    <div className="space-y-8">
      {/* Banner */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 transition-colors duration-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 dark:text-amber-400 uppercase tracking-wider mb-2">
              <span>Módulo 03</span>
              <span aria-hidden="true">·</span>
              <span>Laboratorio de Dilemas</span>
              <span aria-hidden="true">·</span>
              <span>Apropiación Práctica</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Simulador de Casos y Decisiones Éticas
            </h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              La apropiación de la inducción no es solo memorizar artículos, sino saber aplicarlos en situaciones
              reales de los talleres, aulas y centros de formación. Resuelve los casos y descubre cómo actúa el
              reglamento en cada escenario.
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs shrink-0 w-full md:w-56">
            <span className="text-slate-500 dark:text-slate-400 block mb-1">Tu desempeño en casos:</span>
            <div className="text-xl font-bold font-mono text-slate-900 dark:text-white mb-1">
              {totalCorrect} / {SENA_SCENARIO_DILEMMAS.length} acertados
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              {totalCompleted} de {SENA_SCENARIO_DILEMMAS.length} analizados
            </span>
          </div>
        </div>
      </section>

      {/* Main Dilemma Sandbox */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 transition-colors duration-200">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#39A900]">CASO {currentDilemmaIndex + 1} DE {SENA_SCENARIO_DILEMMAS.length}</span>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">|</span>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">{dilemma.title}</h2>
          </div>

          <div className="flex items-center gap-1.5">
            {SENA_SCENARIO_DILEMMAS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentDilemmaIndex(idx);
                  setSelectedOptionId(null);
                  setHasSubmitted(false);
                }}
                className={`w-7 h-7 rounded-lg text-xs font-medium transition-colors ${
                  currentDilemmaIndex === idx
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                    : dilemmaScores[SENA_SCENARIO_DILEMMAS[idx].id] !== undefined
                    ? dilemmaScores[SENA_SCENARIO_DILEMMAS[idx].id]
                      ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                      : 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Narrative Context */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 relative aspect-4/3 bg-slate-900">
              <img
                src="/src/assets/images/sena_learning_workshop_1793115155754.jpg"
                alt="Ambiente de taller técnico SENA"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-3">
                <span className="text-[11px] text-white/90 font-medium">Ambiente de Laboratorio y Taller SENA</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs">
              <span className="font-semibold text-slate-900 dark:text-white block mb-1">Contexto del Caso:</span>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{dilemma.context}</p>
            </div>
          </div>

          {/* Options and Interactive Choice */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">Pregunta de Decisión</span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                {dilemma.question}
              </h3>
            </div>

            <div className="space-y-3">
              {dilemma.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                let optionStyle = 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:border-slate-300 dark:hover:border-slate-700 text-slate-800 dark:text-slate-200';

                if (hasSubmitted) {
                  if (opt.isCorrect) {
                    optionStyle = 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 font-medium';
                  } else if (isSelected && !opt.isCorrect) {
                    optionStyle = 'border-rose-500 bg-rose-50/60 dark:bg-rose-950/40 text-rose-950 dark:text-rose-200';
                  } else {
                    optionStyle = 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 opacity-60';
                  }
                } else if (isSelected) {
                  optionStyle = 'border-[#39A900] bg-emerald-50/40 dark:bg-emerald-950/30 shadow-xs text-slate-900 dark:text-white';
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    disabled={hasSubmitted}
                    className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3 ${optionStyle}`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {hasSubmitted ? (
                        opt.isCorrect ? (
                          <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        ) : isSelected ? (
                          <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-600" />
                        )
                      ) : (
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-[#39A900] bg-[#39A900]' : 'border-slate-300 dark:border-slate-600'
                        }`}>
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                      )}
                    </div>
                    <span className="leading-relaxed">{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {/* Submit / Feedback actions */}
            {!hasSubmitted ? (
              <div className="pt-2">
                <button
                  onClick={handleConfirmDecision}
                  disabled={!selectedOptionId}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-semibold hover:bg-slate-800 dark:hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  Confirmar mi Decisión
                </button>
              </div>
            ) : (
              <div className="space-y-4 pt-2">
                {selectedOption && (
                  <div className={`p-4 rounded-xl border text-xs leading-relaxed ${
                    selectedOption.isCorrect
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200'
                      : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900 text-rose-950 dark:text-rose-200'
                  }`}>
                    <div className="font-bold flex items-center gap-1.5 mb-1.5">
                      {selectedOption.isCorrect ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          <span>¡Decisión Correcta y Reglamentaria!</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                          <span>Decisión no alineada con el reglamento</span>
                        </>
                      )}
                    </div>
                    <p>{selectedOption.feedback}</p>
                    <div className="mt-2 text-[11px] font-mono font-medium text-slate-600 dark:text-slate-400">
                      Fundamento Normativo: {selectedOption.regulationArticle}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  {currentDilemmaIndex < SENA_SCENARIO_DILEMMAS.length - 1 ? (
                    <button
                      onClick={handleNextDilemma}
                      className="px-5 py-2.5 rounded-xl bg-[#39A900] text-white text-xs font-semibold hover:bg-[#2d8500] transition-colors flex items-center gap-2"
                    >
                      <span>Siguiente Caso</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs font-semibold flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#39A900]" />
                      <span>Has completado todos los dilemas prácticos. ¡Listo para la evaluación!</span>
                    </div>
                  )}

                  <button
                    onClick={handleResetDilemma}
                    className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reintentar caso</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
