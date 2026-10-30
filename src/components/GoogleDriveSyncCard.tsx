import React, { useState, useEffect } from 'react';
import { 
  subscribeToSyncStatus, 
  signInWithGoogle, 
  signOutGoogle, 
  flushPendingQueue, 
  syncEntireCohort, 
  SyncStatus 
} from '../services/googleSheetsService';
import { Apprentice } from '../types/sena';
import { 
  FileSpreadsheet, 
  ExternalLink, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  LogOut,
  UploadCloud,
  ShieldCheck
} from 'lucide-react';

interface GoogleDriveSyncCardProps {
  currentFichaCode: string;
  apprentices: Apprentice[];
}

export const GoogleDriveSyncCard: React.FC<GoogleDriveSyncCardProps> = ({
  currentFichaCode,
  apprentices,
}) => {
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    isConnected: false,
    user: null,
    spreadsheetId: null,
    spreadsheetUrl: null,
    pendingCount: 0,
    lastSyncedAt: null,
    isSyncing: false,
  });

  const [feedbackMessage, setFeedbackMessage] = useState<{
    type: 'success' | 'error' | 'info';
    text: string;
  } | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToSyncStatus((status) => {
      setSyncStatus(status);
    });
    return () => unsubscribe();
  }, []);

  const handleConnectGoogle = async () => {
    try {
      setFeedbackMessage({ type: 'info', text: 'Conectando con Google Drive...' });
      await signInWithGoogle();
      setFeedbackMessage({ 
        type: 'success', 
        text: '¡Conexión exitosa! Hoja oficial creada y sincronizada en Google Drive.' 
      });
      setTimeout(() => setFeedbackMessage(null), 5000);
    } catch (err: any) {
      setFeedbackMessage({ 
        type: 'error', 
        text: err?.message || 'Error al iniciar sesión con Google.' 
      });
    }
  };

  const handleDisconnect = async () => {
    await signOutGoogle();
    setFeedbackMessage({ type: 'info', text: 'Sesión de Google desconectada.' });
    setTimeout(() => setFeedbackMessage(null), 3500);
  };

  const handleSyncPending = async () => {
    try {
      setFeedbackMessage({ type: 'info', text: 'Sincronizando registros pendientes...' });
      const count = await flushPendingQueue();
      setFeedbackMessage({ 
        type: 'success', 
        text: `Se sincronizaron ${count} registros pendientes con Google Sheets.` 
      });
      setTimeout(() => setFeedbackMessage(null), 4000);
    } catch (err: any) {
      setFeedbackMessage({ 
        type: 'error', 
        text: err?.message || 'Error al sincronizar registros.' 
      });
    }
  };

  const handleSyncAllCohort = async () => {
    try {
      setFeedbackMessage({ type: 'info', text: 'Sincronizando toda la cohorte a Google Drive...' });
      const result = await syncEntireCohort(apprentices);
      setFeedbackMessage({ 
        type: 'success', 
        text: `¡Completado! Se sincronizaron ${result.synced} aprendices a la hoja de cálculo.` 
      });
      setTimeout(() => setFeedbackMessage(null), 5000);
    } catch (err: any) {
      setFeedbackMessage({ 
        type: 'error', 
        text: err?.message || 'Error al sincronizar la cohorte.' 
      });
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs transition-all duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-[#39A900] shrink-0">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Sincronización en Tiempo Real con Google Sheets & Drive
              </h3>
              {syncStatus.isConnected ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 dark:bg-emerald-950/80 text-[#39A900] dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#39A900] animate-pulse" />
                  Sincronizado
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  Sin Vincular
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Los registros de aprendices con dominio <strong>@soysena.edu.co</strong> y los resultados evaluativos se guardan automáticamente en tu Google Drive.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          {syncStatus.isConnected ? (
            <div className="flex items-center gap-2">
              {syncStatus.spreadsheetUrl && (
                <a
                  href={syncStatus.spreadsheetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-[#00324D] hover:bg-[#002235] text-white shadow-xs transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Abrir Hoja en Drive</span>
                </a>
              )}
              <button
                type="button"
                onClick={handleDisconnect}
                title="Desconectar cuenta de Google"
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Cerrar sesión de Google"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            /* Official Google Sign In button as specified in Skill */
            <button
              onClick={handleConnectGoogle}
              disabled={syncStatus.isSyncing}
              className="inline-flex items-center gap-2.5 px-4 py-2 text-xs font-semibold rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 shadow-xs transition-all hover:shadow-md cursor-pointer disabled:opacity-50"
            >
              <svg className="w-4 h-4" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
              </svg>
              <span>{syncStatus.isSyncing ? 'Conectando...' : 'Vincular Google Drive & Sheets'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Dynamic Status / Actions Details */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
        {/* Status Box 1 */}
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <Clock className="w-4 h-4 text-slate-400" />
            <span>Última sincronización:</span>
          </div>
          <span className="font-semibold text-slate-900 dark:text-white">
            {syncStatus.lastSyncedAt || 'Pendiente de inicio'}
          </span>
        </div>

        {/* Status Box 2: Pending buffer */}
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <UploadCloud className="w-4 h-4 text-slate-400" />
            <span>En cola sin sincronizar:</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`font-semibold ${syncStatus.pendingCount > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
              {syncStatus.pendingCount} registro(s)
            </span>
            {syncStatus.isConnected && syncStatus.pendingCount > 0 && (
              <button
                onClick={handleSyncPending}
                disabled={syncStatus.isSyncing}
                className="text-[11px] underline text-[#39A900] font-bold hover:text-[#2e8800]"
              >
                Subir ahora
              </button>
            )}
          </div>
        </div>

        {/* Status Box 3: Sync Cohort Action */}
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
          <span className="text-slate-600 dark:text-slate-300">
            Sincronizar cohorte actual ({apprentices.length}):
          </span>
          <button
            onClick={handleSyncAllCohort}
            disabled={!syncStatus.isConnected || syncStatus.isSyncing}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#39A900] hover:bg-[#2e8800] text-white font-semibold text-[11px] disabled:opacity-50 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3 h-3 ${syncStatus.isSyncing ? 'animate-spin' : ''}`} />
            <span>Sincronizar Ficha</span>
          </button>
        </div>
      </div>

      {/* Feedback banner */}
      {feedbackMessage && (
        <div className={`mt-3 p-3 rounded-xl text-xs flex items-center gap-2 transition-all ${
          feedbackMessage.type === 'success' 
            ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800'
            : feedbackMessage.type === 'error'
              ? 'bg-red-50 dark:bg-red-950/50 text-red-900 dark:text-red-200 border border-red-200 dark:border-red-800'
              : 'bg-blue-50 dark:bg-blue-950/50 text-blue-900 dark:text-blue-200 border border-blue-200 dark:border-blue-800'
        }`}>
          {feedbackMessage.type === 'success' && <CheckCircle2 className="w-4 h-4 text-[#39A900] shrink-0" />}
          {feedbackMessage.type === 'error' && <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />}
          {feedbackMessage.type === 'info' && <RefreshCw className="w-4 h-4 text-blue-500 animate-spin shrink-0" />}
          <span>{feedbackMessage.text}</span>
        </div>
      )}

      {/* Account info if connected */}
      {syncStatus.isConnected && syncStatus.user && (
        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#39A900]" />
            <span>Cuenta vinculada: <strong className="text-slate-700 dark:text-slate-300">{syncStatus.user.email}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <span>Libro: <em>SENA - Registro de Aprendices e Inducción 2026</em></span>
          </div>
        </div>
      )}
    </div>
  );
};
