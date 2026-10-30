import React, { useState, useMemo } from 'react';
import { Apprentice, CohortFicha, ApprenticeEvaluationResult } from '../types/sena';
import { MOCK_COHORTS, SENA_EVALUATION_QUESTIONS } from '../data/senaData';
import { Users, Search, Download, CheckCircle2, Clock, AlertTriangle, ArrowUpDown, Plus, Eye, Award, Filter, ShieldAlert } from 'lucide-react';
import { SenaLogo } from './SenaLogo';
import { GoogleDriveSyncCard } from './GoogleDriveSyncCard';
import { syncApprenticeRecord } from '../services/googleSheetsService';

interface InstructorDashboardProps {
  apprentices: Apprentice[];
  onAddNewApprentice: (newApprentice: Apprentice) => void;
  onSelectApprenticeForPreview: (apprentice: Apprentice) => void;
  onOpenCertificateForApprentice: (apprentice: Apprentice) => void;
}

export const InstructorDashboard: React.FC<InstructorDashboardProps> = ({
  apprentices,
  onAddNewApprentice,
  onSelectApprenticeForPreview,
  onOpenCertificateForApprentice,
}) => {
  const [selectedFichaId, setSelectedFichaId] = useState<string>('ficha_1');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'aprobado' | 'en_progreso' | 'por_mejorar' | 'pendiente'>('all');
  const [selectedApprenticeDetail, setSelectedApprenticeDetail] = useState<Apprentice | null>(null);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // New Apprentice Form state
  const [newFullName, setNewFullName] = useState<string>('');
  const [newDocument, setNewDocument] = useState<string>('');
  const [newEmail, setNewEmail] = useState<string>('');

  const currentFicha = MOCK_COHORTS.find(f => f.id === selectedFichaId) || MOCK_COHORTS[0];

  const fichaApprentices = useMemo(() => {
    return apprentices.filter(a => a.fichaId === selectedFichaId);
  }, [apprentices, selectedFichaId]);

  const filteredApprentices = useMemo(() => {
    return fichaApprentices.filter(a => {
      const matchesSearch = searchQuery === '' ||
        a.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.documentNumber.includes(searchQuery) ||
        a.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || a.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [fichaApprentices, searchQuery, statusFilter]);

  // Aggregate metrics
  const totalApprentices = fichaApprentices.length;
  const approvedCount = fichaApprentices.filter(a => a.status === 'aprobado').length;
  const inProgressCount = fichaApprentices.filter(a => a.status === 'en_progreso').length;
  const needsImprovementCount = fichaApprentices.filter(a => a.status === 'por_mejorar').length;
  const pendingCount = fichaApprentices.filter(a => a.status === 'pendiente').length;

  const passRate = totalApprentices > 0 ? Math.round((approvedCount / totalApprentices) * 100) : 0;
  const avgScore = useMemo(() => {
    const withScores = fichaApprentices.filter(a => a.evaluationResult?.score !== undefined);
    if (withScores.length === 0) return 0;
    const sum = withScores.reduce((acc, curr) => acc + (curr.evaluationResult?.score || 0), 0);
    return Math.round(sum / withScores.length);
  }, [fichaApprentices]);

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ['Documento', 'Tipo', 'Nombre Completo', 'Correo', 'Estado', 'Progreso', 'Puntaje', 'Certificado'];
    const rows = fichaApprentices.map(a => [
      a.documentNumber,
      a.documentType,
      `"${a.fullName}"`,
      a.email,
      a.status,
      `${a.progressPercent}%`,
      a.evaluationResult ? `${a.evaluationResult.score}%` : 'N/A',
      a.evaluationResult?.certificateId || 'N/A'
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Sabana_Induccion_SENA_Ficha_${currentFicha.code}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Add apprentice handler
  const handleCreateApprentice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFullName || !newDocument) return;

    const newApp: Apprentice = {
      id: `app_${Date.now()}`,
      documentType: 'CC',
      documentNumber: newDocument,
      fullName: newFullName,
      email: newEmail || `${newFullName.toLowerCase().replace(/\s+/g, '')}@misena.edu.co`,
      fichaId: selectedFichaId,
      programName: currentFicha.programName,
      center: currentFicha.centerName,
      regional: currentFicha.regionalName,
      progressPercent: 0,
      inductionCompleted: false,
      lastActive: 'Recién registrado',
      status: 'pendiente'
    };

    onAddNewApprentice(newApp);
    // Sincronizar en tiempo real a Google Sheets
    syncApprenticeRecord(newApp).catch(console.error);
    setNewFullName('');
    setNewDocument('');
    setNewEmail('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-8">
      {/* Header and Cohort Selector */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 transition-colors duration-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-900 dark:text-blue-400 uppercase tracking-wider mb-2">
              <SenaLogo className="w-4 h-4 shrink-0" fill="#39A900" />
              <span>Gestión Docente</span>
              <span aria-hidden="true">·</span>
              <span>Monitoreo de Fichas</span>
              <span aria-hidden="true">·</span>
              <span>Registro de SofiaPlus</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Panel del Instructor y Gestor de Inducción
            </h1>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Instructor Líder: <strong className="text-slate-800 dark:text-slate-200">{currentFicha.instructorLeader}</strong> · {currentFicha.centerName}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Cohort Selector */}
            <select
              value={selectedFichaId}
              onChange={(e) => setSelectedFichaId(e.target.value)}
              className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#39A900]"
            >
              {MOCK_COHORTS.map((c) => (
                <option key={c.id} value={c.id} className="dark:bg-slate-800">
                  Ficha {c.code} · {c.programName.slice(0, 30)}...
                </option>
              ))}
            </select>

            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              <span>Exportar Sábana (CSV)</span>
            </button>

            <button
              onClick={() => setShowAddModal(true)}
              className="px-3.5 py-2 rounded-xl bg-[#39A900] hover:bg-[#2d8500] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Nuevo Aprendiz</span>
            </button>
          </div>
        </div>
      </section>

      {/* Sincronización en Tiempo Real con Google Sheets y Google Drive */}
      <GoogleDriveSyncCard
        currentFichaCode={currentFicha.code}
        apprentices={fichaApprentices}
      />

      {/* KPI Metrics Strip */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 transition-colors duration-200">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase block mb-1">Total Matriculados</span>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">{totalApprentices}</div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">Ficha activa en inducción</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 transition-colors duration-200">
          <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase block mb-1">Aprobados Certificados</span>
          <div className="text-2xl font-bold font-mono text-emerald-800 dark:text-emerald-400 tabular-nums">{approvedCount} ({passRate}%)</div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">Superaron el 70% reglamentario</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 transition-colors duration-200">
          <span className="text-xs font-semibold text-blue-700 dark:text-blue-400 uppercase block mb-1">Promedio de Ficha</span>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">{avgScore}%</div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">Puntaje medio de apropiación</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 transition-colors duration-200">
          <span className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase block mb-1">En Riesgo / Por Mejorar</span>
          <div className="text-2xl font-bold font-mono text-amber-800 dark:text-amber-400 tabular-nums">{needsImprovementCount + pendingCount}</div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">Requieren plan de refuerzo</span>
        </div>
      </section>

      {/* Roster Table Section */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs transition-colors duration-200">
        {/* Table Filter and Search Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                statusFilter === 'all'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Todos ({fichaApprentices.length})
            </button>
            <button
              onClick={() => setStatusFilter('aprobado')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                statusFilter === 'aprobado'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Aprobados ({approvedCount})
            </button>
            <button
              onClick={() => setStatusFilter('en_progreso')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                statusFilter === 'en_progreso'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              En Progreso ({inProgressCount})
            </button>
            <button
              onClick={() => setStatusFilter('por_mejorar')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                statusFilter === 'por_mejorar'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Por Mejorar ({needsImprovementCount})
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por nombre o documento..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#39A900]"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">Aprendiz</th>
                <th className="py-3 px-4">Documento</th>
                <th className="py-3 px-4">Progreso</th>
                <th className="py-3 px-4 text-center">Calificación</th>
                <th className="py-3 px-4">Estado</th>
                <th className="py-3 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {filteredApprentices.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                    <div>{app.fullName}</div>
                    <div className="text-[11px] text-slate-400 dark:text-slate-500 font-normal">{app.email}</div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-600 dark:text-slate-300">
                    {app.documentType} {app.documentNumber}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-[#39A900] h-full rounded-full"
                          style={{ width: `${app.progressPercent}%` }}
                        />
                      </div>
                      <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">{app.progressPercent}%</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {app.evaluationResult ? (
                      <span className="font-mono font-bold text-slate-900 dark:text-white text-xs">
                        {app.evaluationResult.score}%
                      </span>
                    ) : (
                      <span className="text-slate-400 dark:text-slate-500 font-mono text-[11px]">Sin test</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center gap-1 font-semibold text-[11px] ${
                      app.status === 'aprobado' ? 'text-emerald-700 dark:text-emerald-400' :
                      app.status === 'en_progreso' ? 'text-blue-700 dark:text-blue-400' :
                      app.status === 'por_mejorar' ? 'text-rose-700 dark:text-rose-400' : 'text-slate-500 dark:text-slate-400'
                    }`}>
                      {app.status === 'aprobado' && <CheckCircle2 className="w-3.5 h-3.5" />}
                      {app.status === 'en_progreso' && <Clock className="w-3.5 h-3.5" />}
                      {app.status === 'por_mejorar' && <AlertTriangle className="w-3.5 h-3.5" />}
                      <span>
                        {app.status === 'aprobado' ? 'Aprobado' :
                         app.status === 'en_progreso' ? 'En Progreso' :
                         app.status === 'por_mejorar' ? 'Por Mejorar' : 'Pendiente'}
                      </span>
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setSelectedApprenticeDetail(app)}
                        title="Ver detalle del aprendiz"
                        className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {app.evaluationResult?.passed && (
                        <button
                          onClick={() => onOpenCertificateForApprentice(app)}
                          title="Ver certificado"
                          className="p-1.5 text-[#39A900] hover:bg-emerald-50 dark:hover:bg-emerald-950/40 rounded-lg transition-colors"
                        >
                          <Award className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => onSelectApprenticeForPreview(app)}
                        className="px-2 py-1 text-[11px] font-medium rounded-md border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
                      >
                        Activar Vista
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Topic Weaknesses / Pedagogical Radar */}
      <section className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 transition-colors duration-200">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span>Radar de Alertas Pedagógicas de la Ficha</span>
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
          Temas del reglamento donde los aprendices presentaron más dudas para programar talleres de refuerzo
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="bg-white dark:bg-slate-800/80 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-slate-900 dark:text-white block mb-1">Plazo de Incapacidades Médicas</span>
            <p className="text-slate-600 dark:text-slate-300 text-[11px]">
              El 40% de los evaluados dudó sobre el término de 3 días hábiles. Se recomienda reforzar el Art. 8.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800/80 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-slate-900 dark:text-white block mb-1">Causales de Deserción</span>
            <p className="text-slate-600 dark:text-slate-300 text-[11px]">
              Clarificar la consecuencia legal de ausentarse 3 días continuos sin justificar y la inhabilidad de 6 meses.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800/80 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-slate-900 dark:text-white block mb-1">Solicitud de Segundo Evaluador</span>
            <p className="text-slate-600 dark:text-slate-300 text-[11px]">
              Recordar el derecho al debido proceso y cómo radicar solicitud formal ante coordinación académica.
            </p>
          </div>
        </div>
      </section>

      {/* Apprentice Detail Modal Drawer */}
      {selectedApprenticeDetail && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{selectedApprenticeDetail.fullName}</h3>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  {selectedApprenticeDetail.documentType} {selectedApprenticeDetail.documentNumber}
                </span>
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${
                selectedApprenticeDetail.status === 'aprobado'
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}>
                {selectedApprenticeDetail.status.toUpperCase()}
              </span>
            </div>

            <div className="text-xs space-y-2 text-slate-700 dark:text-slate-300">
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400">Programa:</span>
                <span className="font-medium text-right text-slate-900 dark:text-white">{selectedApprenticeDetail.programName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400">Correo MiSENA:</span>
                <span className="font-mono text-slate-900 dark:text-white">{selectedApprenticeDetail.email}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400">Progreso general de módulos:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">{selectedApprenticeDetail.progressPercent}%</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400">Última actividad:</span>
                <span className="text-slate-900 dark:text-white">{selectedApprenticeDetail.lastActive}</span>
              </div>
            </div>

            {selectedApprenticeDetail.evaluationResult && (
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-2">
                <div className="font-semibold text-slate-900 dark:text-white">Resultado de la Evaluación Oficial:</div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>Puntaje: <strong className="font-mono text-slate-900 dark:text-white">{selectedApprenticeDetail.evaluationResult.score}%</strong></div>
                  <div>Folio: <strong className="font-mono text-slate-900 dark:text-white">{selectedApprenticeDetail.evaluationResult.certificateId}</strong></div>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedApprenticeDetail(null)}
                className="px-4 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-semibold rounded-lg hover:bg-slate-800 dark:hover:bg-white transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Apprentice Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-xl p-6">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">Registrar Nuevo Aprendiz a la Ficha</h3>
            <form onSubmit={handleCreateApprentice} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Nombre Completo del Aprendiz</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: David Alejandro Gómez"
                  value={newFullName}
                  onChange={(e) => setNewFullName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#39A900]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Número de Documento (Cédula / Tarjeta)</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: 1098234567"
                  value={newDocument}
                  onChange={(e) => setNewDocument(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#39A900]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Correo Electrónico MiSENA (opcional)</label>
                <input
                  type="email"
                  placeholder="Ej: dgomez@misena.edu.co"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#39A900]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#39A900] text-white font-semibold rounded-lg hover:bg-[#2d8500] transition-colors"
                >
                  Registrar Aprendiz
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
