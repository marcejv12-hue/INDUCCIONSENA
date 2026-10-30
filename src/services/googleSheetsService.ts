import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  User, 
  signOut 
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';
import { Apprentice, ApprenticeEvaluationResult } from '../types/sena';

// Initialize Firebase App
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Configure Google Auth Provider with Scopes
const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/spreadsheets');
provider.addScope('https://www.googleapis.com/auth/drive.file');
provider.setCustomParameters({
  prompt: 'consent'
});

// In-Memory Token Cache (per security guidelines)
let cachedAccessToken: string | null = null;
let isSigningIn = false;

// Storage keys for spreadsheet reference and offline queue
const SPREADSHEET_ID_KEY = 'sena_google_sheets_id';
const QUEUE_STORAGE_KEY = 'sena_sync_queue_v1';
const SPREADSHEET_TITLE = 'SENA - Registro de Aprendices e Inducción 2026';

export interface PendingSyncItem {
  id: string;
  type: 'apprentice' | 'evaluation';
  apprentice: Apprentice;
  evaluationResult?: ApprenticeEvaluationResult;
  timestamp: string;
}

export interface SyncStatus {
  isConnected: boolean;
  user: User | null;
  spreadsheetId: string | null;
  spreadsheetUrl: string | null;
  pendingCount: number;
  lastSyncedAt: string | null;
  isSyncing: boolean;
  error?: string | null;
}

/**
 * Listeners for sync state changes
 */
type SyncListener = (status: SyncStatus) => void;
const listeners: Set<SyncListener> = new Set();

let currentStatus: SyncStatus = {
  isConnected: false,
  user: null,
  spreadsheetId: localStorage.getItem(SPREADSHEET_ID_KEY),
  spreadsheetUrl: localStorage.getItem(SPREADSHEET_ID_KEY) 
    ? `https://docs.google.com/spreadsheets/d/${localStorage.getItem(SPREADSHEET_ID_KEY)}/edit`
    : null,
  pendingCount: getPendingQueue().length,
  lastSyncedAt: null,
  isSyncing: false,
  error: null,
};

function notifyListeners() {
  currentStatus = {
    ...currentStatus,
    pendingCount: getPendingQueue().length,
  };
  listeners.forEach(fn => fn(currentStatus));
}

export function subscribeToSyncStatus(listener: SyncListener): () => void {
  listeners.add(listener);
  listener(currentStatus);
  return () => {
    listeners.delete(listener);
  };
}

/**
 * Initialize Auth listener
 */
export function initGoogleAuth(
  onSuccess?: (user: User, token: string) => void,
  onFailure?: () => void
) {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      currentStatus.user = user;
      currentStatus.isConnected = !!cachedAccessToken;
      notifyListeners();
      if (cachedAccessToken && onSuccess) {
        onSuccess(user, cachedAccessToken);
      }
    } else {
      cachedAccessToken = null;
      currentStatus.user = null;
      currentStatus.isConnected = false;
      notifyListeners();
      if (onFailure) onFailure();
    }
  });
}

/**
 * Trigger Google Sign In Popup
 */
export async function signInWithGoogle(): Promise<{ user: User; accessToken: string } | null> {
  try {
    isSigningIn = true;
    currentStatus.isSyncing = true;
    notifyListeners();

    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    
    if (!credential?.accessToken) {
      throw new Error('No se pudo obtener el token de acceso de Google.');
    }

    cachedAccessToken = credential.accessToken;
    currentStatus.user = result.user;
    currentStatus.isConnected = true;
    currentStatus.error = null;

    // Ensure spreadsheet exists in Google Drive
    await ensureSpreadsheetExists();

    // Sync any queued items
    await flushPendingQueue();

    notifyListeners();
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (err: any) {
    console.error('Error al iniciar sesión con Google:', err);
    currentStatus.error = err.message || 'Error en autenticación con Google';
    notifyListeners();
    throw err;
  } finally {
    isSigningIn = false;
    currentStatus.isSyncing = false;
    notifyListeners();
  }
}

/**
 * Sign out of Google
 */
export async function signOutGoogle(): Promise<void> {
  await signOut(auth);
  cachedAccessToken = null;
  currentStatus.isConnected = false;
  currentStatus.user = null;
  notifyListeners();
}

/**
 * Get current access token
 */
export async function getAccessToken(): Promise<string | null> {
  return cachedAccessToken;
}

/**
 * Local Offline Queue Management
 */
export function getPendingQueue(): PendingSyncItem[] {
  try {
    const raw = localStorage.getItem(QUEUE_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function addToQueue(item: Omit<PendingSyncItem, 'id' | 'timestamp'>) {
  const queue = getPendingQueue();
  const newItem: PendingSyncItem = {
    ...item,
    id: `sync_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    timestamp: new Date().toISOString(),
  };
  queue.push(newItem);
  try {
    localStorage.setItem(QUEUE_STORAGE_KEY, JSON.stringify(queue));
  } catch {
    // Ignore storage quota
  }
  notifyListeners();
}

function removeFromQueue(ids: string[]) {
  const idSet = new Set(ids);
  const queue = getPendingQueue().filter(i => !idSet.has(i.id));
  try {
    localStorage.setItem(QUEUE_STORAGE_KEY, JSON.stringify(queue));
  } catch {
    // Ignore
  }
  notifyListeners();
}

/**
 * Ensure Spreadsheet exists or create a new one with institutional SENA format
 */
export async function ensureSpreadsheetExists(): Promise<string | null> {
  const token = cachedAccessToken;
  if (!token) return null;

  let sheetId = localStorage.getItem(SPREADSHEET_ID_KEY);

  // If we already have an ID, verify it exists and is accessible
  if (sheetId) {
    try {
      const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        currentStatus.spreadsheetId = sheetId;
        currentStatus.spreadsheetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/edit`;
        notifyListeners();
        return sheetId;
      }
    } catch {
      // Failed to access existing, we'll recreate or search
    }
  }

  // Search if a file with SPREADSHEET_TITLE exists in Drive
  try {
    const searchRes = await fetch(
      `https://www.googleapis.com/drive/v3/files?q=name='${encodeURIComponent(SPREADSHEET_TITLE)}' and trashed=false and mimeType='application/vnd.google-apps.spreadsheet'&fields=files(id,name)&pageSize=1`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (searchRes.ok) {
      const data = await searchRes.json();
      if (data.files && data.files.length > 0) {
        sheetId = data.files[0].id;
        localStorage.setItem(SPREADSHEET_ID_KEY, sheetId!);
        currentStatus.spreadsheetId = sheetId;
        currentStatus.spreadsheetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/edit`;
        notifyListeners();
        return sheetId;
      }
    }
  } catch (e) {
    console.warn('Drive search error, proceeding to create new sheet:', e);
  }

  // Create new spreadsheet with SENA structure
  try {
    currentStatus.isSyncing = true;
    notifyListeners();

    const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        properties: {
          title: SPREADSHEET_TITLE,
        },
        sheets: [
          {
            properties: {
              title: 'Aprendices_Registrados',
              gridProperties: {
                frozenRowCount: 1,
              },
            },
          },
          {
            properties: {
              title: 'Resultados_Evaluacion',
              gridProperties: {
                frozenRowCount: 1,
              },
            },
          },
        ],
      }),
    });

    if (!createRes.ok) {
      throw new Error(`Error al crear hoja de cálculo: ${createRes.statusText}`);
    }

    const createdData = await createRes.json();
    sheetId = createdData.spreadsheetId;
    localStorage.setItem(SPREADSHEET_ID_KEY, sheetId!);
    currentStatus.spreadsheetId = sheetId;
    currentStatus.spreadsheetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/edit`;

    // Populate Headers for both sheets
    const headersApprentices = [
      'Marca Temporal',
      'Tipo Doc',
      'Número Documento',
      'Nombres y Apellidos Completos',
      'Correo Institucional (@soysena.edu.co)',
      'Programa de Formación',
      'Ficha',
      'Centro de Formación',
      'Regional',
      'Estado Registro',
    ];

    const headersEvaluations = [
      'Marca Temporal',
      'Número Documento',
      'Nombres y Apellidos',
      'Ficha',
      'Programa',
      'Puntaje (%)',
      'Estado Aprobación',
      'Código Certificado',
      'Fecha Finalización',
    ];

    await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values:batchUpdate`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          valueInputOption: 'USER_ENTERED',
          data: [
            {
              range: "'Aprendices_Registrados'!A1:J1",
              values: [headersApprentices],
            },
            {
              range: "'Resultados_Evaluacion'!A1:I1",
              values: [headersEvaluations],
            },
          ],
        }),
      }
    );

    notifyListeners();
    return sheetId;
  } catch (err: any) {
    console.error('Error creating spreadsheet:', err);
    currentStatus.error = err.message;
    notifyListeners();
    return null;
  } finally {
    currentStatus.isSyncing = false;
    notifyListeners();
  }
}

/**
 * Append Apprentice record to Google Sheet
 */
export async function syncApprenticeRecord(apprentice: Apprentice): Promise<boolean> {
  const token = cachedAccessToken;
  const sheetId = currentStatus.spreadsheetId;

  // If not logged in or no sheet yet, add to pending queue
  if (!token || !sheetId) {
    addToQueue({
      type: 'apprentice',
      apprentice,
    });
    return false;
  }

  try {
    currentStatus.isSyncing = true;
    notifyListeners();

    const timestamp = new Date().toLocaleString('es-CO', {
      timeZone: 'America/Bogota',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    const rowValues = [
      timestamp,
      apprentice.documentType,
      apprentice.documentNumber,
      apprentice.fullName,
      apprentice.email,
      apprentice.programName,
      apprentice.fichaId,
      apprentice.center,
      apprentice.regional,
      apprentice.status || 'registrado',
    ];

    const res = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/'Aprendices_Registrados'!A:J:append?valueInputOption=USER_ENTERED`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values: [rowValues],
        }),
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to append row: ${res.statusText}`);
    }

    currentStatus.lastSyncedAt = new Date().toLocaleTimeString('es-CO');
    notifyListeners();
    return true;
  } catch (err: any) {
    console.error('Error syncing apprentice to sheet:', err);
    // Add to offline queue for later flush
    addToQueue({
      type: 'apprentice',
      apprentice,
    });
    return false;
  } finally {
    currentStatus.isSyncing = false;
    notifyListeners();
  }
}

/**
 * Append Evaluation Result to Google Sheet
 */
export async function syncEvaluationRecord(
  apprentice: Apprentice,
  result: ApprenticeEvaluationResult
): Promise<boolean> {
  const token = cachedAccessToken;
  const sheetId = currentStatus.spreadsheetId;

  if (!token || !sheetId) {
    addToQueue({
      type: 'evaluation',
      apprentice,
      evaluationResult: result,
    });
    return false;
  }

  try {
    currentStatus.isSyncing = true;
    notifyListeners();

    const timestamp = new Date().toLocaleString('es-CO', {
      timeZone: 'America/Bogota',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    const rowValues = [
      timestamp,
      apprentice.documentNumber,
      apprentice.fullName,
      apprentice.fichaId,
      apprentice.programName,
      `${result.percentage}%`,
      result.passed ? 'Aprobado' : 'Por Mejorar',
      result.certificateId,
      result.completedAt,
    ];

    const res = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/'Resultados_Evaluacion'!A:I:append?valueInputOption=USER_ENTERED`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values: [rowValues],
        }),
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to append evaluation: ${res.statusText}`);
    }

    currentStatus.lastSyncedAt = new Date().toLocaleTimeString('es-CO');
    notifyListeners();
    return true;
  } catch (err: any) {
    console.error('Error syncing evaluation to sheet:', err);
    addToQueue({
      type: 'evaluation',
      apprentice,
      evaluationResult: result,
    });
    return false;
  } finally {
    currentStatus.isSyncing = false;
    notifyListeners();
  }
}

/**
 * Flush all pending offline items to the spreadsheet
 */
export async function flushPendingQueue(): Promise<number> {
  const token = cachedAccessToken;
  const sheetId = currentStatus.spreadsheetId || (await ensureSpreadsheetExists());
  if (!token || !sheetId) return 0;

  const queue = getPendingQueue();
  if (queue.length === 0) return 0;

  const successfullySyncedIds: string[] = [];

  for (const item of queue) {
    try {
      if (item.type === 'apprentice') {
        const ok = await syncApprenticeRecord(item.apprentice);
        if (ok) successfullySyncedIds.push(item.id);
      } else if (item.type === 'evaluation' && item.evaluationResult) {
        const ok = await syncEvaluationRecord(item.apprentice, item.evaluationResult);
        if (ok) successfullySyncedIds.push(item.id);
      }
    } catch {
      // Continue with remaining
    }
  }

  if (successfullySyncedIds.length > 0) {
    removeFromQueue(successfullySyncedIds);
  }

  return successfullySyncedIds.length;
}

/**
 * Sync entire current cohort list to Google Sheets (bulk export / resync)
 */
export async function syncEntireCohort(apprentices: Apprentice[]): Promise<{ synced: number; total: number }> {
  const token = cachedAccessToken;
  let sheetId = currentStatus.spreadsheetId;

  if (!token) {
    throw new Error('Debes iniciar sesión con Google para sincronizar con Drive.');
  }

  if (!sheetId) {
    sheetId = await ensureSpreadsheetExists();
    if (!sheetId) throw new Error('No se pudo crear o acceder a la hoja en Google Drive.');
  }

  currentStatus.isSyncing = true;
  notifyListeners();

  try {
    const timestamp = new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' });
    const rows = apprentices.map(a => [
      timestamp,
      a.documentType,
      a.documentNumber,
      a.fullName,
      a.email,
      a.programName,
      a.fichaId,
      a.center,
      a.regional,
      a.status,
    ]);

    const res = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/'Aprendices_Registrados'!A:J:append?valueInputOption=USER_ENTERED`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values: rows,
        }),
      }
    );

    if (!res.ok) {
      throw new Error(`Error en sincronización por lote: ${res.statusText}`);
    }

    currentStatus.lastSyncedAt = new Date().toLocaleTimeString('es-CO');
    notifyListeners();
    return { synced: apprentices.length, total: apprentices.length };
  } finally {
    currentStatus.isSyncing = false;
    notifyListeners();
  }
}
