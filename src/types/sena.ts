/**
 * Tipos de datos para el Sistema de Inducción y Apropiación de Aprendices SENA
 */

export type NavigationTab = 'portal' | 'inicio' | 'identidad' | 'reglamento' | 'tramites_comite' | 'dilemas' | 'evaluacion' | 'instructor';

export type Acuerdo009SubSection = 'ciclo' | 'faltas' | 'medidas' | 'comite';

export interface LifecycleStage {
  id: 'ingreso' | 'permanencia' | 'novedades' | 'reingreso' | 'certificacion';
  title: string;
  badge: string;
  subtitle: string;
  description: string;
  keyPhases: {
    name: string;
    description: string;
    deliverableOrAction: string;
  }[];
  regulatoryRequirements: string[];
  tipsForApprentices: string[];
  articleAcuerdo009: string;
}

export interface NovedadMatricula {
  id: string;
  title: string;
  shortDesc: string;
  type: 'aplazamiento' | 'traslado' | 'reingreso' | 'retiro_voluntario' | 'desercion' | 'cambio_jornada';
  validCauses: string[];
  maxPeriodAndConditions: string;
  procedureSteps: string[];
  consequencesAndImpact: string;
  articleAcuerdo009: string;
  requiresCommittee: boolean;
}

export interface FaltaDisciplinariaAcademica {
  id: string;
  type: 'academica' | 'disciplinaria';
  severity: 'leve' | 'grave' | 'gravisima';
  title: string;
  description: string;
  qualificationCriteria: string[];
  typicalCases: string[];
  associatedMeasure: string;
  articleAcuerdo009: string;
}

export interface MedidaFormativaDisciplinaria {
  id: string;
  category: 'formativa' | 'sancionatoria';
  name: string;
  authority: string;
  definition: string;
  executionTerm: string;
  legalEffects: string[];
  restorativeApproach: string;
  articleAcuerdo009: string;
}

export interface ComiteEtapa {
  step: number;
  phaseName: string;
  responsibleActor: string;
  legalTimeLimit: string;
  summary: string;
  detailedProcess: string[];
  guaranteesForApprentice: string[];
}

export interface ComiteMiembro {
  id: string;
  title: string;
  roleDescription: string;
  voteRight: 'Voz y Voto' | 'Solo Voz (Consultivo)' | 'Secretaría Técnica';
  importance: string;
}

export interface InstitutionalSymbol {
  id: string;
  name: string;
  tagline: string;
  description: string;
  elements: { title: string; meaning: string }[];
  funFact: string;
}

export interface ValueItem {
  id: string;
  title: string;
  description: string;
  applicationInSena: string;
}

export type RightDutyCategory = 
  | 'academico' 
  | 'convivencia' 
  | 'institucional' 
  | 'seguridad' 
  | 'representacion';

export interface RightDutyItem {
  id: string;
  type: 'derecho' | 'deber' | 'prohibicion';
  title: string;
  article: string;
  description: string;
  category: RightDutyCategory;
  realWorldExample: string;
  consequenceIfBreached?: string;
}

export interface ScenarioDilemma {
  id: string;
  title: string;
  context: string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    feedback: string;
    regulationArticle: string;
  }[];
}

export type EvaluationDimension = 
  | 'identidad' 
  | 'derechos_deberes' 
  | 'debido_proceso' 
  | 'etapa_productiva';

export interface EvaluationQuestion {
  id: string;
  dimension: EvaluationDimension;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  articleReference: string;
}

export interface ApprenticeEvaluationResult {
  score: number; // 0 to 100
  percentage: number;
  passed: boolean;
  answers: { [questionId: string]: number };
  dimensionScores: Record<EvaluationDimension, { total: number; correct: number; percentage: number }>;
  completedAt: string;
  certificateId: string;
}

export interface Apprentice {
  id: string;
  documentType: 'CC' | 'TI' | 'PPT' | 'CE';
  documentNumber: string;
  fullName: string;
  email: string;
  fichaId: string;
  programName: string;
  center: string;
  regional: string;
  progressPercent: number;
  inductionCompleted: boolean;
  evaluationResult?: ApprenticeEvaluationResult;
  lastActive: string;
  status: 'aprobado' | 'en_progreso' | 'pendiente' | 'por_mejorar';
}

export interface CohortFicha {
  id: string;
  code: string;
  programName: string;
  journey: 'Diurna' | 'Nocturna' | 'Mixta' | 'Virtual';
  totalApprentices: number;
  instructorLeader: string;
  startDate: string;
  centerName: string;
  regionalName: string;
}
