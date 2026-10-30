import React, { useState, useRef, useEffect } from 'react';
import { NavigationTab, Acuerdo009SubSection } from '../types/sena';
import { 
  Users, 
  HelpCircle, 
  Sun, 
  Moon, 
  ChevronDown, 
  GraduationCap, 
  AlertTriangle, 
  ShieldAlert, 
  Scale,
  Sparkles,
  Layers,
  ChevronRight,
  X
} from 'lucide-react';
import { SenaLogo } from './SenaLogo';

interface NavbarProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  acuerdo009SubSection?: Acuerdo009SubSection;
  onSelectAcuerdo009SubSection?: (subSection: Acuerdo009SubSection) => void;
  isInstructorMode: boolean;
  onToggleInstructorMode: () => void;
  onOpenTutor: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

const RUTA_COMITE_ITEMS = [
  {
    id: 'ciclo' as Acuerdo009SubSection,
    number: '1',
    title: 'Ciclo Formativo Integral de la Ruta del Aprendiz',
    subtitle: 'Ingreso, Permanencia, Novedades, Reingreso y Certificación',
    icon: GraduationCap,
    badge: '5 Etapas',
    color: 'emerald'
  },
  {
    id: 'faltas' as Acuerdo009SubSection,
    number: '2',
    title: 'Régimen de Faltas y Criterios de Calificación',
    subtitle: 'Académicas y Disciplinarias · Leves, Graves y Gravísimas',
    icon: AlertTriangle,
    badge: 'Tipificación',
    color: 'amber'
  },
  {
    id: 'medidas' as Acuerdo009SubSection,
    number: '3',
    title: 'Medidas Formativas vs Medidas Sancionatorias',
    subtitle: 'Llamados, Planes de Mejora, Condicionamiento y Cancelación',
    icon: ShieldAlert,
    badge: 'Pedagógico vs Sanción',
    color: 'blue'
  },
  {
    id: 'comite' as Acuerdo009SubSection,
    number: '4',
    title: 'Funcionamiento del Comité de Evaluación y Seguimiento (Debido Proceso)',
    subtitle: 'Órgano asesor colegiado, 6 etapas del debido proceso y descargos',
    icon: Scale,
    badge: 'Debido Proceso',
    color: 'purple'
  }
];

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  acuerdo009SubSection = 'ciclo',
  onSelectAcuerdo009SubSection,
  isInstructorMode,
  onToggleInstructorMode,
  onOpenTutor,
  isDarkMode,
  onToggleDarkMode,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click or Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleDropdownItemClick = (sectionId: Acuerdo009SubSection) => {
    onSelectTab('tramites_comite');
    onSelectAcuerdo009SubSection?.(sectionId);
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => onSelectTab('portal')}
            className="flex items-center gap-2.5 text-left focus:outline-none group shrink-0"
            title="Ir al Portal de Bienvenida y Selección de Rol"
          >
            <div className="w-9 h-9 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 p-1 flex items-center justify-center shadow-xs group-hover:border-[#39A900] transition-colors shrink-0">
              <SenaLogo className="w-full h-full" fill="#39A900" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
                SENA <span className="text-[#39A900]">·</span> Inducción
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-none whitespace-nowrap">
                Apropiación Institucional
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links with Ruta y Comité Dropdown */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
            <button
              onClick={() => onSelectTab('portal')}
              className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 flex items-center gap-1.5 ${
                currentTab === 'portal' ? 'border-[#39A900] text-slate-900 dark:text-white font-semibold' : 'border-transparent'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-[#39A900]" />
              <span>Portal Roles</span>
            </button>

            <button
              onClick={() => onSelectTab('inicio')}
              className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                currentTab === 'inicio' ? 'border-[#39A900] text-slate-900 dark:text-white font-semibold' : 'border-transparent'
              }`}
            >
              Ruta Aprendiz
            </button>

            <button
              onClick={() => onSelectTab('identidad')}
              className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                currentTab === 'identidad' ? 'border-[#39A900] text-slate-900 dark:text-white font-semibold' : 'border-transparent'
              }`}
            >
              Identidad SENA
            </button>

            <button
              onClick={() => onSelectTab('reglamento')}
              className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                currentTab === 'reglamento' ? 'border-[#39A900] text-slate-900 dark:text-white font-semibold' : 'border-transparent'
              }`}
            >
              Reglamento y Deberes
            </button>

            {/* RUTA Y COMITÉ WITH DROPDOWN MENU */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(prev => !prev)}
                className={`flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 group ${
                  currentTab === 'tramites_comite'
                    ? 'border-[#39A900] text-slate-900 dark:text-white font-semibold'
                    : 'border-transparent'
                }`}
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
                title="Menú desplegable del Acuerdo 009 de 2024"
              >
                <span>Ruta y Comité (Ac. 009)</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isDropdownOpen
                      ? 'rotate-180 text-[#39A900]'
                      : 'text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200'
                  }`}
                />
              </button>

              {/* DROPDOWN MENU POPOVER */}
              {isDropdownOpen && (
                <div 
                  className="absolute left-0 mt-2 w-96 rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200/90 dark:border-slate-800 p-2.5 z-50 animate-in fade-in zoom-in-95 duration-150"
                  role="menu"
                >
                  <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 mb-1.5 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#39A900] block">
                        Acuerdo 009 de 2024 · Menú Normativo
                      </span>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Selecciona el componente a consultar:
                      </p>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      4 Secciones
                    </span>
                  </div>

                  <div className="space-y-1">
                    {RUTA_COMITE_ITEMS.map((item) => {
                      const Icon = item.icon;
                      const isSelected = currentTab === 'tramites_comite' && acuerdo009SubSection === item.id;
                      return (
                        <button
                          key={item.id}
                          role="menuitem"
                          onClick={() => handleDropdownItemClick(item.id)}
                          className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-3 group ${
                            isSelected
                              ? 'bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 shadow-2xs'
                              : 'hover:bg-slate-50 dark:hover:bg-slate-800/70 border border-transparent'
                          }`}
                        >
                          <div className={`p-2 rounded-lg shrink-0 mt-0.5 transition-colors ${
                            isSelected
                              ? 'bg-[#39A900] text-white shadow-2xs'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 group-hover:bg-[#39A900] group-hover:text-white'
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1 mb-0.5">
                              <span className={`text-xs font-bold leading-tight ${
                                isSelected ? 'text-[#39A900] dark:text-emerald-400' : 'text-slate-900 dark:text-white group-hover:text-[#39A900] transition-colors'
                              }`}>
                                {item.number}. {item.title}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                              {item.subtitle}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 px-3 py-1 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Reglamento Integral del Aprendiz</span>
                    <button
                      onClick={() => {
                        onSelectTab('tramites_comite');
                        setIsDropdownOpen(false);
                      }}
                      className="text-[#39A900] font-semibold hover:underline flex items-center gap-1"
                    >
                      <span>Ver todo</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => onSelectTab('dilemas')}
              className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                currentTab === 'dilemas' ? 'border-[#39A900] text-slate-900 dark:text-white font-semibold' : 'border-transparent'
              }`}
            >
              Dilemas Éticos
            </button>

            <button
              onClick={() => onSelectTab('evaluacion')}
              className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                currentTab === 'evaluacion' ? 'border-[#39A900] text-slate-900 dark:text-white font-semibold' : 'border-transparent'
              }`}
            >
              Evaluación de Apropiación
            </button>
          </nav>

          {/* Zone 3: Actions + Dark mode toggle */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Dark / Light mode toggle button */}
            <button
              onClick={onToggleDarkMode}
              title={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              aria-label="Alternar modo claro y oscuro"
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors flex items-center justify-center shrink-0 border border-slate-200/60 dark:border-slate-700/60"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            <button
              onClick={onOpenTutor}
              title="Preguntas frecuentes y orientador virtual"
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-medium"
            >
              <HelpCircle className="w-4 h-4 text-[#39A900]" />
              <span className="hidden sm:inline">Tutor Virtual</span>
            </button>

            <button
              onClick={() => onSelectTab('portal')}
              title="Ir al Portal de Selección de Rol"
              className={`p-2 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1.5 shrink-0 ${
                currentTab === 'portal'
                  ? 'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-300 dark:border-emerald-700 text-[#39A900]'
                  : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-[#39A900]" />
              <span className="hidden xl:inline">Roles</span>
            </button>

            <button
              onClick={onToggleInstructorMode}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-2 ${
                isInstructorMode
                  ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800'
                  : 'bg-[#00324D] text-white hover:bg-[#002235]'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-[#39A900]" />
              <span>{isInstructorMode ? 'Ver Vista Aprendiz' : 'Panel Instructor'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="flex md:hidden overflow-x-auto py-2.5 gap-3 border-t border-slate-100 dark:border-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300 no-scrollbar items-center">
          <button
            onClick={() => onSelectTab('portal')}
            className={`whitespace-nowrap px-2.5 py-1 rounded-md flex items-center gap-1 ${
              currentTab === 'portal' ? 'bg-[#39A900]/15 text-[#39A900] font-semibold' : ''
            }`}
          >
            <Layers className="w-3 h-3 text-[#39A900]" />
            <span>Portal Roles</span>
          </button>
          <button
            onClick={() => onSelectTab('inicio')}
            className={`whitespace-nowrap px-2.5 py-1 rounded-md ${currentTab === 'inicio' ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold' : ''}`}
          >
            Ruta Aprendiz
          </button>
          <button
            onClick={() => onSelectTab('identidad')}
            className={`whitespace-nowrap px-2.5 py-1 rounded-md ${currentTab === 'identidad' ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold' : ''}`}
          >
            Identidad
          </button>
          <button
            onClick={() => onSelectTab('reglamento')}
            className={`whitespace-nowrap px-2.5 py-1 rounded-md ${currentTab === 'reglamento' ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold' : ''}`}
          >
            Reglamento
          </button>

          {/* Mobile Ruta y Comité Button toggles modal menu */}
          <button
            onClick={() => setIsMobileMenuOpen(prev => !prev)}
            className={`whitespace-nowrap px-2.5 py-1 rounded-md flex items-center gap-1 ${
              currentTab === 'tramites_comite' ? 'bg-emerald-100 dark:bg-emerald-950/70 text-[#39A900] font-semibold' : 'bg-slate-50 dark:bg-slate-850'
            }`}
          >
            <span>Ruta y Comité (Ac. 009)</span>
            <ChevronDown className="w-3 h-3" />
          </button>

          <button
            onClick={() => onSelectTab('dilemas')}
            className={`whitespace-nowrap px-2.5 py-1 rounded-md ${currentTab === 'dilemas' ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold' : ''}`}
          >
            Dilemas
          </button>
          <button
            onClick={() => onSelectTab('evaluacion')}
            className={`whitespace-nowrap px-2.5 py-1 rounded-md ${currentTab === 'evaluacion' ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold' : ''}`}
          >
            Evaluación
          </button>
        </div>
      </div>

      {/* Mobile Drawer/Modal for Ruta y Comité Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-slate-900/50 backdrop-blur-xs flex flex-col justify-end">
          <div className="bg-white dark:bg-slate-900 rounded-t-2xl p-5 border-t border-slate-200 dark:border-slate-800 shadow-2xl max-h-[80vh] overflow-y-auto animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Acuerdo 009 de 2024 · Ruta y Comité
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Selecciona la sección a explorar:
                </p>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              {RUTA_COMITE_ITEMS.map((item) => {
                const Icon = item.icon;
                const isSelected = currentTab === 'tramites_comite' && acuerdo009SubSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleDropdownItemClick(item.id)}
                    className={`w-full text-left p-3 rounded-xl border flex items-start gap-3 transition-colors ${
                      isSelected
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-[#39A900]'
                        : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <div className="p-2 rounded-lg bg-[#39A900] text-white shrink-0 mt-0.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-900 dark:text-white block leading-snug">
                        {item.number}. {item.title}
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                        {item.subtitle}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
