import React, { useState, useEffect } from 'react';
import { NavigationTab, Apprentice, ApprenticeEvaluationResult, Acuerdo009SubSection } from './types/sena';
import { MOCK_APPRENTICES } from './data/senaData';
import { Navbar } from './components/Navbar';
import { RoleLandingPage } from './components/RoleLandingPage';
import { HeroSection } from './components/HeroSection';
import { IdentityModule } from './components/IdentityModule';
import { RegulationsModule } from './components/RegulationsModule';
import { DilemmasModule } from './components/DilemmasModule';
import { EvaluationModule } from './components/EvaluationModule';
import { Acuerdo009Module } from './components/Acuerdo009Module';
import { InstructorDashboard } from './components/InstructorDashboard';
import { CertificateModal } from './components/CertificateModal';
import { AiTutorModal } from './components/AiTutorModal';
import { SenaLogo } from './components/SenaLogo';
import { CheckCircle2, X, FileSpreadsheet } from 'lucide-react';
import { initGoogleAuth, syncApprenticeRecord, syncEvaluationRecord } from './services/googleSheetsService';

const LOCAL_STORAGE_KEY = 'sena_induction_apprentices_v1';
const THEME_STORAGE_KEY = 'sena_theme_mode';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('portal');
  const [acuerdo009SubSection, setAcuerdo009SubSection] = useState<Acuerdo009SubSection>('ciclo');
  const [isInstructorMode, setIsInstructorMode] = useState<boolean>(false);
  const [showTutorModal, setShowTutorModal] = useState<boolean>(false);
  const [showCertificateModal, setShowCertificateModal] = useState<boolean>(false);
  const [certificateApprentice, setCertificateApprentice] = useState<Apprentice | null>(null);
  const [registeredWelcomeName, setRegisteredWelcomeName] = useState<string | null>(null);

  // Dark Mode State
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme) return savedTheme === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  // State to trigger blur transition effect when toggling theme
  const [isTransitioningTheme, setIsTransitioningTheme] = useState<boolean>(false);

  // Sync dark class with document element
  useEffect(() => {
    try {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem(THEME_STORAGE_KEY, 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem(THEME_STORAGE_KEY, 'light');
      }
    } catch {
      // ignore
    }
  }, [isDarkMode]);

  // Handle dark mode toggle with blur transition
  const handleToggleDarkMode = () => {
    setIsTransitioningTheme(true);
    setIsDarkMode(prev => !prev);
    setTimeout(() => {
      setIsTransitioningTheme(false);
    }, 380);
  };

  // Apprentices State initialized from localStorage or mock data
  const [apprentices, setApprentices] = useState<Apprentice[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return MOCK_APPRENTICES;
  });

  const [activeApprenticeId, setActiveApprenticeId] = useState<string>('app_1');

  // Save to localStorage whenever apprentices list changes
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(apprentices));
    } catch {
      // ignore
    }
  }, [apprentices]);

  const activeApprentice = apprentices.find(a => a.id === activeApprenticeId) || apprentices[0];

  const handleToggleInstructorMode = () => {
    if (!isInstructorMode) {
      setIsInstructorMode(true);
      setCurrentTab('instructor');
    } else {
      setIsInstructorMode(false);
      setCurrentTab('inicio');
    }
  };

  const handleSelectTab = (tab: NavigationTab) => {
    if (tab === 'instructor') {
      setIsInstructorMode(true);
    } else if (tab === 'portal') {
      setIsInstructorMode(false);
    } else {
      setIsInstructorMode(false);
    }
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Initialize Google Auth state listener
  useEffect(() => {
    const unsubscribe = initGoogleAuth();
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  // Update evaluation result for apprentice and sync with Google Sheets
  const handleUpdateApprenticeEvaluation = (result: ApprenticeEvaluationResult) => {
    setApprentices(prev =>
      prev.map(app => {
        if (app.id === activeApprentice.id) {
          const updatedApp = {
            ...app,
            evaluationResult: result,
            progressPercent: 100,
            inductionCompleted: result.passed,
            status: (result.passed ? 'aprobado' : 'por_mejorar') as 'aprobado' | 'por_mejorar'
          };
          // Real-time sync to Google Sheets
          syncEvaluationRecord(updatedApp, result).catch(console.error);
          return updatedApp;
        }
        return app;
      })
    );
  };

  // Add new apprentice from instructor dashboard
  const handleAddNewApprentice = (newApp: Apprentice) => {
    setApprentices(prev => [newApp, ...prev]);
  };

  // Select apprentice for preview in apprentice mode
  const handleSelectApprenticeForPreview = (app: Apprentice) => {
    setActiveApprenticeId(app.id);
    setIsInstructorMode(false);
    setCurrentTab('inicio');
  };

  // Open certificate modal
  const handleOpenCertificate = (app?: Apprentice) => {
    const target = app || activeApprentice;
    setCertificateApprentice(target);
    setShowCertificateModal(true);
  };

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col selection:bg-[#39A900]/20 selection:text-slate-900 transition-colors duration-300 relative ${
      isTransitioningTheme ? 'theme-blur-active' : ''
    }`}>
      {/* Ambient Blur Flash Overlay during Theme Transition */}
      {isTransitioningTheme && (
        <div
          className="fixed inset-0 z-50 pointer-events-none backdrop-blur-md bg-white/20 dark:bg-black/30 transition-all duration-300"
          aria-hidden="true"
        />
      )}

      {/* Top Bar Navigation */}
      <Navbar
        currentTab={isInstructorMode ? 'instructor' : currentTab}
        onSelectTab={handleSelectTab}
        acuerdo009SubSection={acuerdo009SubSection}
        onSelectAcuerdo009SubSection={setAcuerdo009SubSection}
        isInstructorMode={isInstructorMode}
        onToggleInstructorMode={handleToggleInstructorMode}
        onOpenTutor={() => setShowTutorModal(true)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentTab === 'portal' ? (
          <RoleLandingPage
            onSelectRole={(role, apprenticeId) => {
              if (role === 'instructor') {
                setIsInstructorMode(true);
                setCurrentTab('instructor');
              } else {
                setIsInstructorMode(false);
                if (apprenticeId) setActiveApprenticeId(apprenticeId);
                setCurrentTab('inicio');
              }
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onRegisterApprentice={(newApprentice) => {
              setApprentices(prev => [newApprentice, ...prev]);
              setActiveApprenticeId(newApprentice.id);
              setRegisteredWelcomeName(newApprentice.fullName);
              // Real-time sync to Google Sheets / Drive
              syncApprenticeRecord(newApprentice).catch(console.error);
              setIsInstructorMode(false);
              setCurrentTab('inicio');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            apprentices={apprentices}
            activeApprentice={activeApprentice}
            onSelectApprentice={setActiveApprenticeId}
            onOpenTutor={() => setShowTutorModal(true)}
            onSelectTab={handleSelectTab}
          />
        ) : isInstructorMode ? (
          <InstructorDashboard
            apprentices={apprentices}
            onAddNewApprentice={handleAddNewApprentice}
            onSelectApprenticeForPreview={handleSelectApprenticeForPreview}
            onOpenCertificateForApprentice={handleOpenCertificate}
          />
        ) : (
          <>
            {/* Banner de Bienvenida tras Registro de Aprendiz */}
            {registeredWelcomeName && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-700/80 flex items-center justify-between text-emerald-950 dark:text-emerald-100 shadow-sm animate-in fade-in slide-in-from-top-3 duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#39A900] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                        ¡Registro Exitoso de Aprendiz SENA!
                      </h3>
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 dark:text-emerald-400 bg-white dark:bg-emerald-900/60 px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-700">
                        <FileSpreadsheet className="w-3 h-3 text-[#39A900]" />
                        Sincronizado con Google Sheets & Drive
                      </span>
                    </div>
                    <p className="text-xs text-emerald-800 dark:text-emerald-300 mt-0.5">
                      Bienvenido(a), <strong>{registeredWelcomeName}</strong>. Tu cuenta institucional con dominio <strong>@soysena.edu.co</strong> ha sido registrada en el expediente oficial y en la hoja de cálculo de tu ficha. Has iniciado tu recorrido de inducción integral vigente 2026.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setRegisteredWelcomeName(null)}
                  className="p-1.5 rounded-lg text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors shrink-0 ml-4 cursor-pointer"
                  aria-label="Cerrar notificación"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {currentTab === 'inicio' && (
              <HeroSection
                onSelectTab={handleSelectTab}
                activeApprentice={activeApprentice}
                onOpenCertificate={() => handleOpenCertificate(activeApprentice)}
              />
            )}

            {currentTab === 'identidad' && <IdentityModule />}

            {currentTab === 'reglamento' && <RegulationsModule />}

            {currentTab === 'tramites_comite' && (
              <Acuerdo009Module
                currentSubSection={acuerdo009SubSection}
                onSubSectionChange={setAcuerdo009SubSection}
              />
            )}

            {currentTab === 'dilemas' && <DilemmasModule />}

            {currentTab === 'evaluacion' && (
              <EvaluationModule
                activeApprentice={activeApprentice}
                onUpdateApprenticeEvaluation={handleUpdateApprenticeEvaluation}
                onOpenCertificate={() => handleOpenCertificate(activeApprentice)}
              />
            )}
          </>
        )}
      </main>

      {/* Clean Institutional Footer */}
      <footer className="mt-16 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8 text-xs text-slate-500 dark:text-slate-400 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-1 flex items-center justify-center shrink-0 shadow-2xs">
              <SenaLogo className="w-full h-full" fill="#39A900" />
            </div>
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">
                SENA · Servicio Nacional de Aprendizaje
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Dirección de Formación Profesional Integral · Reglamento del Aprendiz (Actualización Vigente 2026)
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-600 dark:text-slate-300">
            <button
              onClick={() => handleSelectTab('portal')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors text-[#39A900] font-semibold"
            >
              Portal de Roles
            </button>
            <button
              onClick={() => handleSelectTab('inicio')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Ruta Aprendiz
            </button>
            <button
              onClick={() => handleSelectTab('identidad')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Identidad
            </button>
            <button
              onClick={() => handleSelectTab('reglamento')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Reglamento
            </button>
            <button
              onClick={() => handleSelectTab('tramites_comite')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors text-emerald-800 dark:text-emerald-400 font-medium"
            >
              Ruta y Comité (Ac. 009)
            </button>
            <button
              onClick={() => handleSelectTab('evaluacion')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Evaluación
            </button>
            <button
              onClick={() => setShowTutorModal(true)}
              className="text-[#39A900] font-semibold hover:underline"
            >
              Tutor Virtual
            </button>
          </div>
        </div>
      </footer>

      {/* Certificate Modal */}
      {showCertificateModal && certificateApprentice && (
        <CertificateModal
          apprentice={certificateApprentice}
          onClose={() => setShowCertificateModal(false)}
        />
      )}

      {/* AI / Rules Tutor Modal */}
      {showTutorModal && (
        <AiTutorModal onClose={() => setShowTutorModal(false)} />
      )}
    </div>
  );
}
