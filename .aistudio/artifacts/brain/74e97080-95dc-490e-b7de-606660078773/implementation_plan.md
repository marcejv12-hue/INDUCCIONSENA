# Plan de Implementación: Sincronización Automática con Google Sheets y Google Drive (SENA)

## Resumen Ejecutivo
Este plan define la arquitectura e implementación para la conexión directa entre el prototipo inductivo SENA y **Google Workspace (Google Drive y Google Sheets)**. El sistema permitirá que cada vez que un aprendiz realice su registro institucional (con validación `@soysena.edu.co`) o complete la evaluación de inducción (Acuerdos 007/2012 y 009/2024), sus datos se almacenen localmente y se sincronicen en tiempo real en una hoja de cálculo estructurada y con diseño institucional creada automáticamente en Google Drive.

---

## Decisiones Críticas Acordadas con el Usuario
Basado en las respuestas de clarificación proporcionadas:
1. **Alcance de los datos a almacenar**: Registro completo de aprendices (nombre, documento, correo soysena, ficha, programa) y resultados evaluativos detallados (puntaje, estado de aprobación, número de intentos, marca temporal).
2. **Estrategia de aprovisionamiento de la hoja**: Creación automática e instantánea del libro de cálculo oficial en Google Drive cuando el instructor/administrador activa la vinculación, configurando dos pestañas estructuradas con cabeceras institucionales SENA.
3. **Frecuencia de sincronización**: Sincronización continua y en tiempo real al registrarse un aprendiz o enviar una evaluación, respaldada con cola de reintento offline y botón de sincronización manual para el instructor.

---

## Sección 1: Visión General y Concepto Central

### Objetivos
- **Cero pérdida de datos**: Cada registro o evaluación se guarda de forma resiliente tanto en el almacenamiento local como en Google Sheets.
- **Transparencia institucional**: Generación de una hoja de cálculo con estética SENA (verde institucional `#39A900`, azul oscuro `#00324D`) en el Google Drive de la coordinación o instructor.
- **Acceso rápido**: Enlaces directos desde el Panel de Instructor hacia la hoja en Google Drive para visualización, auditoría y descarga en Excel/PDF.

---

## Sección 2: Experiencia de Usuario y Diseño Visual

### 1. Panel de Conexión en el Dashboard del Instructor
- **Tarjeta de Integración con Google Drive & Sheets**:
  - Estado de la conexión: *Desconectado*, *Conectando*, o *Sincronizado*.
  - Indicador de sincronización en tiempo real (icono verde pulsante).
  - Botón principal de conexión: **"Vincular con Google Drive"** (con logo oficial de Google Workspace).
  - Enlace directo con badge interactivo: **"Abrir Hoja de Registro en Google Drive ↗"** que abre la hoja en una pestaña nueva.
  - Botón secundario: **"Forzar Sincronización de Registros Pendientes"** con contador de filas sincronizadas vs pendientes.

### 2. Feedback Visual para el Aprendiz
- Al completar el modal de registro: Notificación toast no intrusiva con badge: *"Registro guardado y sincronizado con la lista de ficha en Drive"*.
- Al finalizar la evaluación: Feedback inmediato en el resumen de resultados: *"Tu calificación ha sido registrada en el libro oficial de la ficha"*.

---

## Sección 3: Decisiones de Producto y Mitigación de Riesgos

| Desafío / Riesgo | Decisión de Arquitectura | Justificación |
|---|---|---|
| **Seguridad y Permisos de Google** | Uso de los scopes de mínimo privilegio: `https://www.googleapis.com/auth/spreadsheets` y `https://www.googleapis.com/auth/drive.file`. | `drive.file` solo permite a la aplicación acceder a las hojas que ella misma crea, sin exponer el resto de archivos privados de la cuenta de Drive del usuario. |
| **Pérdida de conectividad / Modo sin conexión** | Cola de sincronización local (*Sync Queue*) en `localStorage`. | Si la API de Google tarda o el usuario no ha iniciado sesión de Drive en ese momento, los registros no se pierden y se sincronizan en lote al restaurar la conexión. |
| **Duplicidad de Aprendices** | Verificación por número de documento antes de anexar nuevas filas. | Evita filas duplicadas en la pestaña de `Aprendices_Registrados`, permitiendo actualizar o añadir intentos adicionales en `Resultados_Evaluacion`. |
| **Identidad Visual del SENA** | Formato de hoja con estilos de celda (Fondo verde `#39A900`, texto blanco en negrita, bordes sutiles y filtros automáticos). | Presentación profesional lista para informes de comité de evaluación o auditorías del centro de formación. |

---

## Sección 4: Arquitectura Técnica y Estrategia de Datos

### Diagrama de Flujo de Datos
```
[ Aprendiz llena Formulario / Evaluación ]
                    │
                    ▼
       [ Validación de Datos ] (Regla @soysena.edu.co + documento)
                    │
                    ├──► [ Local Storage / State Cache ] (Inmediato)
                    │
                    ▼
     [ Google Sheets Sync Manager ]
                    │
       ┌────────────┴────────────┐
       ▼                         ▼
¿Existe Hoja en Drive?    ¿Token Válido?
  NO ──► Crear Hoja          NO ──► Almacenar en cola pendiente
  SÍ ──► Continuar           SÍ ──► Append Row API (v4)
                    │
                    ▼
      [ Google Sheets en Google Drive ]
        ├── Pestaña 1: "Aprendices_Registrados"
        └── Pestaña 2: "Resultados_Evaluacion"
```

### Estructura de las Pestañas en Google Sheets

#### Pestaña 1: `Aprendices_Registrados`
1. `Marca Temporal` (ISO/Local Date)
2. `Tipo Documento` (CC, TI, CE, PPT)
3. `Número Documento`
4. `Nombres y Apellidos`
5. `Correo Institucional` (`... @soysena.edu.co`)
6. `Programa de Formación`
7. `Número de Ficha`
8. `Estado de Registro`

#### Pestaña 2: `Resultados_Evaluacion`
1. `Marca Temporal`
2. `Número Documento`
3. `Nombres y Apellidos`
4. `Número de Ficha`
5. `Puntaje Obtenido (%)`
6. `Estado Final` (Aprobado / No Aprobado)
7. `Intento Número`
8. `Temas a Reforzar` (Faltas, Medidas Formativas, Comité)

---

## Fases de Ejecución Inmediata (Tras Aprobación)

1. **Aprovisionamiento OAuth (`set_up_oauth`)**:
   - Solicitar permisos oficiales para Google Sheets y Google Drive File mediante el diálogo interactivo de AI Studio.
2. **Servicio Cliente de Google Workspace (`src/services/googleSheetsService.ts`)**:
   - Autenticación mediante Google Identity Services / OAuth Token Client.
   - Creación programática de la hoja si no existe en Drive con encabezados estilizados.
   - Operaciones de inserción en tiempo real (`appendRow`).
3. **Integración en Componentes**:
   - Conectar `ApprenticeRegistrationModal.tsx` para sincronización directa.
   - Conectar `EvaluationModule.tsx` para envío de resultados.
   - Añadir panel de control de Drive en `InstructorDashboard.tsx`.
4. **Verificación y Pruebas**:
   - Validación de tipos con TypeScript y compilación de la applet.
