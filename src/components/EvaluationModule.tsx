import React, { useState, useEffect } from 'react';
import { SENA_EVALUATION_QUESTIONS } from '../data/senaData';
import { EvaluationQuestion, EvaluationDimension, Apprentice, ApprenticeEvaluationResult } from '../types/sena';
import { CheckCircle2, XCircle, Award, RotateCcw, Clock, AlertTriangle, ArrowRight, ShieldCheck, ChevronLeft, ChevronRight, FileCheck, FileSpreadsheet } from 'lucide-react';
import confetti from 'canvas-confetti';

interface EvaluationModuleProps {
  activeApprentice: Apprentice;
  onUpdateApprenticeEvaluation: (result: ApprenticeEvaluationResult) => void;
  onOpenCertificate: () => void;
}

export const EvaluationModule: React.FC<EvaluationModuleProps> = ({
  activeApprentice,
  onUpdateApprenticeEvaluation,
  onOpenCertificate,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [questionId: string]: number }>({});
  const [isExamSubmitted, setIsExamSubmitted] = useState<boolean>(false);
  const [evaluationResult, setEvaluationResult] = useState<ApprenticeEvaluationResult | null>(
    activeApprentice.evaluationResult || null
  );
  const [mode, setMode] = useState<'guiada' | 'examen'>('guiada');
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);

  const questions = SENA_EVALUATION_QUESTIONS;
  const currentQ = questions[currentIndex];
  const selectedOptionIndex = selectedAnswers[currentQ.id];
  const isCurrentAnswered = selectedOptionIndex !== undefined;

  // Timer effect for exam mode
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerActive && !isExamSubmitted) {
      interval = setInterval(() => {
        setSecondsElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerActive, isExamSubmitted]);

  const handleSelectOption = (index: number) => {
    if (isExamSubmitted) return;
    if (!isTimerActive) setIsTimerActive(true);

    setSelectedAnswers(prev => ({
      ...prev,
      [currentQ.id]: index
    }));
  };

  const handleFinishEvaluation = () => {
    setIsTimerActive(false);

    // Compute scores
    let correctCount = 0;
    const dimensionStats: Record<EvaluationDimension, { total: number; correct: number; percentage: number }> = {
      identidad: { total: 0, correct: 0, percentage: 0 },
      derechos_deberes: { total: 0, correct: 0, percentage: 0 },
      debido_proceso: { total: 0, correct: 0, percentage: 0 },
      etapa_productiva: { total: 0, correct: 0, percentage: 0 },
    };

    questions.forEach(q => {
      const dim = q.dimension;
      dimensionStats[dim].total += 1;
      const userAns = selectedAnswers[q.id];
      if (userAns === q.correctIndex) {
        correctCount += 1;
        dimensionStats[dim].correct += 1;
      }
    });

    Object.keys(dimensionStats).forEach(key => {
      const k = key as EvaluationDimension;
      const stat = dimensionStats[k];
      stat.percentage = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0;
    });

    const percentage = Math.round((correctCount / questions.length) * 100);
    const passed = percentage >= 70;

    const result: ApprenticeEvaluationResult = {
      score: percentage,
      percentage,
      passed,
      answers: selectedAnswers,
      dimensionScores: dimensionStats,
      completedAt: new Date().toISOString(),
      certificateId: passed ? `SENA-IND-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}` : 'POR-MEJORAR'
    };

    setEvaluationResult(result);
    setIsExamSubmitted(true);
    onUpdateApprenticeEvaluation(result);

    if (passed) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRestartEvaluation = () => {
    setSelectedAnswers({});
    setIsExamSubmitted(false);
    setCurrentIndex(0);
    setSecondsElapsed(0);
    setIsTimerActive(false);
    setEvaluationResult(null);
  };

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const isAllAnswered = answeredCount === questions.length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 transition-colors duration-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider mb-2">
              <span>Módulo 04</span>
              <span aria-hidden="true">·</span>
              <span>Evaluación de Conocimientos</span>
              <span aria-hidden="true">·</span>
              <span>Apropiación de Inducción</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Evaluación Interactiva de Inducción SENA
            </h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Esta evaluación diagnostica si el aprendiz ha apropiado los componentes esenciales de la inducción:
              identidad y símbolos, deberes y derechos, medidas formativas y trámites de etapa lectiva y productiva.
              Aprobación mínima requerida: <strong className="text-slate-900 dark:text-white">70%</strong>.
            </p>
          </div>

          {/* Mode Switcher */}
          {!isExamSubmitted && (
            <div className="p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center gap-1 self-start md:self-center shrink-0">
              <button
                onClick={() => setMode('guiada')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  mode === 'guiada'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Retroalimentación Inmediata
              </button>
              <button
                onClick={() => setMode('examen')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  mode === 'examen'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Modo Examen con Cronómetro
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Main Container */}
      {!isExamSubmitted ? (
        <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 transition-colors duration-200">
          {/* Progress and question meta */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-[#39A900]">
                PREGUNTA {currentIndex + 1} DE {questions.length}
              </span>
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {currentQ.dimension.replace('_', ' ')}
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5 font-mono text-slate-600 dark:text-slate-300">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{formatTimer(secondsElapsed)}</span>
              </div>
              <span className="text-slate-500 dark:text-slate-400 font-mono">
                {answeredCount}/{questions.length} respondidas
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#39A900] h-full transition-all duration-300 rounded-full"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Question text */}
          <div className="py-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
              {currentQ.question}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOptionIndex === idx;
              const isCorrect = idx === currentQ.correctIndex;
              const showFeedback = mode === 'guiada' && isCurrentAnswered;

              let optionStyle = 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:border-slate-300 dark:hover:border-slate-700 text-slate-800 dark:text-slate-200';

              if (showFeedback) {
                if (isCorrect) {
                  optionStyle = 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 font-medium';
                } else if (isSelected && !isCorrect) {
                  optionStyle = 'border-rose-500 bg-rose-50/70 dark:bg-rose-950/40 text-rose-950 dark:text-rose-200';
                } else {
                  optionStyle = 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 opacity-60';
                }
              } else if (isSelected) {
                optionStyle = 'border-[#39A900] bg-emerald-50/40 dark:bg-emerald-950/30 text-slate-950 dark:text-white shadow-xs';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3.5 ${optionStyle}`}
                >
                  <div className="mt-0.5 shrink-0">
                    {showFeedback ? (
                      isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
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
                  <span className="leading-relaxed">{option}</span>
                </button>
              );
            })}
          </div>

          {/* Immediate Feedback in Guided Mode */}
          {mode === 'guiada' && isCurrentAnswered && (
            <div className={`p-4 rounded-xl border text-xs leading-relaxed ${
              selectedOptionIndex === currentQ.correctIndex
                ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200'
                : 'bg-rose-50/80 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900 text-rose-950 dark:text-rose-200'
            }`}>
              <div className="font-bold flex items-center gap-1.5 mb-1">
                {selectedOptionIndex === currentQ.correctIndex ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>¡Respuesta Correcta!</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                    <span>Respuesta Incorrecta</span>
                  </>
                )}
              </div>
              <p>{currentQ.explanation}</p>
              <div className="mt-2 text-[11px] font-mono text-slate-600 dark:text-slate-400">
                Referencia: {currentQ.articleReference}
              </div>
            </div>
          )}

          {/* Question Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            {/* Quick question bullets */}
            <div className="hidden md:flex items-center gap-1">
              {questions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-6 h-6 rounded-md text-[11px] font-mono font-medium transition-colors ${
                    currentIndex === idx
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                      : selectedAnswers[q.id] !== undefined
                      ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            {currentIndex < questions.length - 1 ? (
              <button
                onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
                className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-semibold hover:bg-slate-800 dark:hover:bg-white transition-colors flex items-center gap-1.5"
              >
                <span>Siguiente</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleFinishEvaluation}
                disabled={!isAllAnswered}
                className="px-5 py-2 rounded-xl bg-[#39A900] text-white text-xs font-bold hover:bg-[#2d8500] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs flex items-center gap-2"
              >
                <FileCheck className="w-4 h-4" />
                <span>Finalizar y Calificar ({answeredCount}/{questions.length})</span>
              </button>
            )}
          </div>
        </section>
      ) : evaluationResult && (
        /* Evaluation Results View */
        <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 space-y-8 animate-in fade-in duration-200 transition-colors duration-200">
          {/* Result Banner */}
          <div className={`p-6 sm:p-8 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-6 ${
            evaluationResult.passed
              ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200'
              : 'bg-rose-50/70 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900 text-rose-950 dark:text-rose-200'
          }`}>
            <div className="space-y-2 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-bold uppercase tracking-wider">
                {evaluationResult.passed ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-emerald-800 dark:text-emerald-300">Resultado Oficial: APROBADO</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                    <span className="text-rose-800 dark:text-rose-300">Resultado Oficial: REQUIERE PLAN DE MEJORA</span>
                  </>
                )}
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                {evaluationResult.passed
                  ? '¡Felicitaciones! Has apropiado con éxito la inducción SENA'
                  : 'Aún no alcanzas el puntaje mínimo de aprobación (70%)'}
              </h2>

              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 max-w-xl">
                {evaluationResult.passed
                  ? 'Has demostrado el dominio de los valores institucionales, derechos, deberes y normas del Reglamento del Aprendiz. Tu constancia ha sido registrada en el sistema.'
                  : 'Revisa las dimensiones con bajo porcentaje y refuerza los artículos del reglamento antes de realizar un nuevo intento evaluativo.'}
              </p>

              <div className="pt-1 flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/80 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200">
                  <FileSpreadsheet className="w-3.5 h-3.5 text-[#39A900]" />
                  <span>Resultado sincronizado con la hoja oficial de Google Drive</span>
                </span>
              </div>
            </div>

            {/* Score Dial */}
            <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs shrink-0 w-44">
              <div className="text-4xl font-extrabold font-mono tracking-tight text-slate-900 dark:text-white">
                {evaluationResult.percentage}%
              </div>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">Calificación Final</span>
              <span className={`text-[11px] font-bold mt-1 ${
                evaluationResult.passed ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'
              }`}>
                {evaluationResult.passed ? 'Aprobado' : 'Por Mejorar'}
              </span>
            </div>
          </div>

          {/* Breakdown by Dimension */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Desglose de Apropiación por Dimensiones</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(evaluationResult.dimensionScores).map(([key, stat]) => {
                const titleMap: Record<string, string> = {
                  identidad: 'Identidad y Valores',
                  derechos_deberes: 'Derechos y Deberes',
                  debido_proceso: 'Debido Proceso y Faltas',
                  etapa_productiva: 'Etapa Productiva y Trámites',
                };

                const isDimPassed = stat.percentage >= 70;

                return (
                  <div key={key} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850">
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase block mb-1">
                      {titleMap[key] || key}
                    </span>
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="text-xl font-bold font-mono text-slate-900 dark:text-white">
                        {stat.percentage}%
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                        {stat.correct} de {stat.total}
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${isDimPassed ? 'bg-[#39A900]' : 'bg-rose-500'}`}
                        style={{ width: `${stat.percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={handleRestartEvaluation}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reintentar Evaluación</span>
            </button>

            {evaluationResult.passed && (
              <button
                onClick={onOpenCertificate}
                className="px-5 py-2.5 rounded-xl bg-[#39A900] text-white text-xs font-bold hover:bg-[#2d8500] transition-colors flex items-center gap-2 shadow-xs"
              >
                <Award className="w-4 h-4" />
                <span>Generar y Descargar Certificado de Inducción</span>
              </button>
            )}
          </div>
        </section>
      )}
    </div>
  );
};
