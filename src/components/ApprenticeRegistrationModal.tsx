import React, { useState } from 'react';
import { Apprentice } from '../types/sena';
import { 
  X, 
  User, 
  Mail, 
  CreditCard, 
  GraduationCap, 
  CheckCircle2, 
  AlertCircle, 
  Building2, 
  ShieldCheck, 
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { SenaLogo } from './SenaLogo';

interface ApprenticeRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: (newApprentice: Apprentice) => void;
  onQuickDemoLogin?: (apprenticeId: string) => void;
  existingApprentices?: Apprentice[];
}

const AVAILABLE_PROGRAMS = [
  {
    fichaId: 'ficha_1',
    code: '2824102',
    name: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
    center: 'Centro de Electricidad, Electrónica y Telecomunicaciones',
    regional: 'Distrito Capital'
  },
  {
    fichaId: 'ficha_2',
    code: '2715890',
    name: 'Tecnólogo en Gestión del Talento Humano',
    center: 'Centro de Gestión de Mercados, Logística y Tecnologías de la Información',
    regional: 'Distrito Capital'
  },
  {
    fichaId: 'ficha_3',
    code: '2914022',
    name: 'Técnico en Programación de Aplicaciones para Dispositivos Móviles',
    center: 'Centro de Servicios Financieros',
    regional: 'Distrito Capital'
  },
  {
    fichaId: 'ficha_4',
    code: '2893110',
    name: 'Tecnólogo en Animación Digital y Modelado 3D',
    center: 'Centro de Diseño y Metrología',
    regional: 'Distrito Capital'
  }
];

export const ApprenticeRegistrationModal: React.FC<ApprenticeRegistrationModalProps> = ({
  isOpen,
  onClose,
  onRegister,
  onQuickDemoLogin,
  existingApprentices = []
}) => {
  const [fullName, setFullName] = useState('');
  const [documentType, setDocumentType] = useState<'CC' | 'TI' | 'PPT' | 'CE'>('CC');
  const [documentNumber, setDocumentNumber] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [selectedFichaId, setSelectedFichaId] = useState(AVAILABLE_PROGRAMS[0].fichaId);
  const [termsAccepted, setTermsAccepted] = useState(true);
  
  // Validation errors
  const [errors, setErrors] = useState<{
    fullName?: string;
    documentNumber?: string;
    email?: string;
    terms?: string;
  }>({});

  if (!isOpen) return null;

  // Normalize and validate @soysena domain
  const cleanEmail = emailInput.trim().toLowerCase();
  
  // Helper to test if domain is valid @soysena
  const isSoySenaEmail = (email: string): boolean => {
    if (!email) return false;
    // Allow either full email ending with @soysena.edu.co or just username (which gets @soysena.edu.co appended)
    if (!email.includes('@')) {
      return email.length >= 3;
    }
    return email.endsWith('@soysena.edu.co') || email.endsWith('@soysena.co') || email.includes('soysena');
  };

  const getComputedEmail = (): string => {
    if (!cleanEmail) return '';
    if (cleanEmail.includes('@')) {
      return cleanEmail;
    }
    return `${cleanEmail}@soysena.edu.co`;
  };

  const computedEmail = getComputedEmail();
  const hasSoySenaDomain = isSoySenaEmail(cleanEmail);
  const hasInvalidDomain = cleanEmail.includes('@') && !cleanEmail.includes('soysena');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    // Validate Nombres y Apellidos
    if (!fullName.trim()) {
      newErrors.fullName = 'Por favor ingresa tus nombres y apellidos completos.';
    } else if (fullName.trim().split(/\s+/).length < 2) {
      newErrors.fullName = 'Ingresa al menos un nombre y un apellido.';
    }

    // Validate Document Number
    if (!documentNumber.trim()) {
      newErrors.documentNumber = 'El número de documento es obligatorio.';
    } else if (!/^[0-9A-Za-z-]{5,15}$/.test(documentNumber.trim())) {
      newErrors.documentNumber = 'Ingresa un número de documento válido (mínimo 5 caracteres).';
    }

    // Validate Email with @soysena domain
    if (!cleanEmail) {
      newErrors.email = 'El correo institucional con dominio @soysena es obligatorio.';
    } else if (hasInvalidDomain) {
      newErrors.email = 'El correo debe tener dominio institucional @soysena (ej: usuario@soysena.edu.co).';
    } else if (!hasSoySenaDomain) {
      newErrors.email = 'Ingresa un usuario o correo válido con dominio @soysena.edu.co.';
    }

    // Validate Terms
    if (!termsAccepted) {
      newErrors.terms = 'Debes aceptar las condiciones y vigencia normativa de inducción.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Select chosen program
    const chosenProgram = AVAILABLE_PROGRAMS.find(p => p.fichaId === selectedFichaId) || AVAILABLE_PROGRAMS[0];

    const finalEmail = cleanEmail.includes('@') ? cleanEmail : `${cleanEmail}@soysena.edu.co`;

    const newApprentice: Apprentice = {
      id: `app_${Date.now()}`,
      documentType,
      documentNumber: documentNumber.trim(),
      fullName: fullName.trim(),
      email: finalEmail,
      fichaId: chosenProgram.fichaId,
      programName: chosenProgram.name,
      center: chosenProgram.center,
      regional: chosenProgram.regional,
      progressPercent: 0,
      inductionCompleted: false,
      lastActive: 'Recién registrado',
      status: 'pendiente'
    };

    onRegister(newApprentice);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-xl w-full max-h-[92vh] flex flex-col overflow-hidden text-slate-800 dark:text-slate-100"
        role="dialog"
        aria-labelledby="modal-register-title"
        aria-modal="true"
      >
        {/* Header */}
        <div className="relative px-6 py-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 flex items-center justify-center shrink-0">
              <SenaLogo className="w-6 h-6" fill="#39A900" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-[11px] font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider">
                <span>Servicio Nacional de Aprendizaje</span>
                <span aria-hidden="true">·</span>
                <span>Vigencia 2026</span>
              </div>
              <h2 id="modal-register-title" className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                Registro de Ingreso del Aprendiz
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            aria-label="Cerrar modal de registro"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          <div className="bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl p-3.5 text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#39A900] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Inducción a la Formación Profesional Integral:</span> Completa tus datos personales para habilitar tu expediente formativo, sincronización automática con la hoja de tu ficha en <strong>Google Drive & Sheets</strong> y seguimiento normativo bajo el <strong>Acuerdo 009 de 2024</strong>.
            </div>
          </div>

          <form id="apprentice-register-form" onSubmit={handleSubmit} className="space-y-4">
            {/* Field: Nombres y Apellidos */}
            <div>
              <label htmlFor="reg-fullname" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Nombres y Apellidos Completos <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="reg-fullname"
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.fullName) setErrors(prev => ({ ...prev, fullName: undefined }));
                  }}
                  placeholder="Ej. Valentina Morales Rodríguez"
                  className={`w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#39A900] transition-colors ${
                    errors.fullName 
                      ? 'border-red-400 dark:border-red-500 ring-1 ring-red-400' 
                      : 'border-slate-300 dark:border-slate-700'
                  }`}
                />
              </div>
              {errors.fullName && (
                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.fullName}</span>
                </p>
              )}
            </div>

            {/* Field: Tipo de Documento y Número */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="sm:col-span-5">
                <label htmlFor="reg-doctype" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Tipo de Documento <span className="text-red-500">*</span>
                </label>
                <select
                  id="reg-doctype"
                  value={documentType}
                  onChange={(e) => setDocumentType(e.target.value as 'CC' | 'TI' | 'PPT' | 'CE')}
                  className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                >
                  <option value="CC">Cédula de Ciudadanía (CC)</option>
                  <option value="TI">Tarjeta de Identidad (TI)</option>
                  <option value="CE">Cédula de Extranjería (CE)</option>
                  <option value="PPT">Permiso Protección Temp. (PPT)</option>
                </select>
              </div>

              <div className="sm:col-span-7">
                <label htmlFor="reg-docnumber" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Número de Documento <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <input
                    id="reg-docnumber"
                    type="text"
                    value={documentNumber}
                    onChange={(e) => {
                      setDocumentNumber(e.target.value);
                      if (errors.documentNumber) setErrors(prev => ({ ...prev, documentNumber: undefined }));
                    }}
                    placeholder="Ej. 1024589301"
                    className={`w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#39A900] transition-colors ${
                      errors.documentNumber 
                        ? 'border-red-400 dark:border-red-500 ring-1 ring-red-400' 
                        : 'border-slate-300 dark:border-slate-700'
                    }`}
                  />
                </div>
                {errors.documentNumber && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.documentNumber}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Field: Correo con dominio @soysena */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="reg-email" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Correo Institucional (Dominio @soysena) <span className="text-red-500">*</span>
                </label>
                <span className="text-[11px] font-medium text-emerald-800 dark:text-emerald-400">
                  @soysena.edu.co
                </span>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="reg-email"
                  type="text"
                  value={emailInput}
                  onChange={(e) => {
                    setEmailInput(e.target.value);
                    if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
                  }}
                  placeholder="Ej. vmorales@soysena.edu.co o tu usuario"
                  className={`w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#39A900] transition-colors ${
                    errors.email || hasInvalidDomain
                      ? 'border-red-400 dark:border-red-500 ring-1 ring-red-400' 
                      : hasSoySenaDomain
                        ? 'border-[#39A900] ring-1 ring-[#39A900]'
                        : 'border-slate-300 dark:border-slate-700'
                  }`}
                />
              </div>

              {/* Real-time Domain Feedback Helper */}
              {hasInvalidDomain && (
                <div className="mt-1.5 p-2 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-xs text-red-600 dark:text-red-300 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>Dominio inválido. Debes utilizar tu correo institucional con dominio <strong>@soysena.edu.co</strong></span>
                </div>
              )}

              {!hasInvalidDomain && cleanEmail.length > 0 && (
                <div className="mt-1.5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
                  <span className="flex items-center gap-1 text-[#39A900] dark:text-emerald-400 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Correo registrado: <strong>{computedEmail}</strong></span>
                  </span>
                  {!cleanEmail.includes('@') && (
                    <button
                      type="button"
                      onClick={() => setEmailInput(`${cleanEmail}@soysena.edu.co`)}
                      className="text-[11px] text-emerald-800 dark:text-emerald-400 hover:underline font-semibold"
                    >
                      Autocompletar @soysena.edu.co
                    </button>
                  )}
                </div>
              )}

              {errors.email && (
                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            {/* Field: Programa y Ficha de Formación */}
            <div>
              <label htmlFor="reg-program" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Programa de Formación y Ficha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <select
                  id="reg-program"
                  value={selectedFichaId}
                  onChange={(e) => setSelectedFichaId(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                >
                  {AVAILABLE_PROGRAMS.map((prog) => (
                    <option key={prog.fichaId} value={prog.fichaId}>
                      Ficha {prog.code} · {prog.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Selected Center Info */}
              <div className="mt-2 flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                <Building2 className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                <span>
                  {AVAILABLE_PROGRAMS.find(p => p.fichaId === selectedFichaId)?.center} · Regional Distrito Capital
                </span>
              </div>
            </div>

            {/* Acceptance terms */}
            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-600 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => {
                    setTermsAccepted(e.target.checked);
                    if (errors.terms) setErrors(prev => ({ ...prev, terms: undefined }));
                  }}
                  className="mt-0.5 rounded border-slate-300 dark:border-slate-700 text-[#39A900] focus:ring-[#39A900]"
                />
                <span>
                  Acepto realizar la Inducción Oficial SENA y me comprometo al cumplimiento del <strong>Reglamento del Aprendiz (Actualizaciones 2026)</strong> y las garantías del <strong>Acuerdo 009 de 2024</strong>.
                </span>
              </label>
              {errors.terms && (
                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.terms}</span>
                </p>
              )}
            </div>
          </form>

          {/* Quick Demo Login Alternative */}
          {onQuickDemoLogin && existingApprentices.length > 0 && (
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-center">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-2">
                ¿Deseas probar rápidamente sin registrar un nuevo aprendiz?
              </span>
              <div className="flex flex-wrap justify-center gap-2">
                {existingApprentices.slice(0, 2).map((app) => (
                  <button
                    key={app.id}
                    type="button"
                    onClick={() => {
                      onQuickDemoLogin(app.id);
                      onClose();
                    }}
                    className="text-xs px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-[#39A900] bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-[#39A900] transition-colors"
                  >
                    Ingresar como demo: <strong>{app.fullName.split(' ')[0]}</strong>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            form="apprentice-register-form"
            className="px-5 py-2.5 rounded-xl bg-[#39A900] hover:bg-[#2e8800] text-white text-xs font-semibold shadow-xs flex items-center gap-2 transition-all duration-200 hover:shadow-md cursor-pointer"
          >
            <span>Completar Registro e Ingresar</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
