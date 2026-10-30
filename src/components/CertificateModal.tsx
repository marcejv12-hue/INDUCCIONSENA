import React, { useState } from 'react';
import { Apprentice } from '../types/sena';
import { Award, Printer, Copy, Check, X, ShieldCheck, Download } from 'lucide-react';
import { SenaLogo } from './SenaLogo';

interface CertificateModalProps {
  apprentice: Apprentice;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  apprentice,
  onClose,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  const certId = apprentice.evaluationResult?.certificateId || 'SENA-IND-2026-001';
  const score = apprentice.evaluationResult?.score || 90;
  const issueDate = apprentice.evaluationResult?.completedAt 
    ? new Date(apprentice.evaluationResult.completedAt).toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : new Date().toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

  const handlePrint = () => {
    window.print();
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(certId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-150">
        {/* Top action toolbar (hidden on print) */}
        <div className="p-4 bg-slate-100 border-b border-slate-200 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
            <Award className="w-4 h-4 text-[#39A900]" />
            <span>Certificado Oficial de Inducción SENA</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyCode}
              className="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiado' : 'Copiar Código'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-800 flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Certificate Printable Canvas */}
        <div className="p-8 sm:p-12 bg-white text-center relative border-8 border-slate-50 m-4 rounded-xl shadow-xs">
          {/* Subtle Institutional Border Ring */}
          <div className="border border-[#39A900]/40 rounded-lg p-6 sm:p-8 relative">
            {/* Corner Decorative Accents */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#39A900]" />
            <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#39A900]" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#39A900]" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#39A900]" />

            {/* Emblem and Header */}
            <div className="flex flex-col items-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 p-2 shadow-xs flex items-center justify-center mb-2">
                <SenaLogo className="w-full h-full" fill="#39A900" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#00324D]">
                Servicio Nacional de Aprendizaje
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                Ministerio del Trabajo · República de Colombia
              </span>
            </div>

            <div className="text-xs uppercase tracking-widest text-emerald-800 font-semibold mb-2">
              Constancia de Formación y Apropiación Institucional
            </div>

            <p className="text-xs text-slate-600 mb-6">
              El Centro de Formación certifica que el aprendiz:
            </p>

            {/* Apprentice Name and Document */}
            <div className="my-4">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
                {apprentice.fullName}
              </h1>
              <p className="text-xs text-slate-500 font-mono mt-1">
                Identificación: {apprentice.documentType} {apprentice.documentNumber}
              </p>
            </div>

            {/* Description Paragraph */}
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-lg mx-auto my-6">
              Ha culminado y aprobado satisfactoriamente los módulos de <strong>Inducción Integral de Aprendices</strong>,
              evidenciando apropiación del <em>Reglamento del Aprendiz SENA (Actualización 2026)</em>,
              conocimiento de la identidad institucional, principios éticos y derechos y deberes formativos,
              con una calificación de <strong className="text-[#39A900] font-mono">{score}%</strong>.
            </p>

            {/* Meta Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-left bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs mb-8">
              <div>
                <span className="text-[10px] text-slate-500 uppercase block font-semibold">Ficha de Caracterización</span>
                <span className="font-mono font-bold text-slate-900">{apprentice.fichaId === 'ficha_1' ? '2824102' : '2715890'}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase block font-semibold">Programa</span>
                <span className="font-semibold text-slate-900 truncate block">{apprentice.programName}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase block font-semibold">Fecha de Expedición</span>
                <span className="font-medium text-slate-900">{issueDate}</span>
              </div>
            </div>

            {/* Signatures */}
            <div className="grid grid-cols-2 gap-8 pt-6 border-t border-slate-200 text-center">
              <div>
                <div className="h-10 flex items-center justify-center font-serif italic text-slate-500 text-sm">
                  C. A. Morales S.
                </div>
                <div className="w-36 h-px bg-slate-300 mx-auto mb-1" />
                <span className="text-xs font-bold text-slate-900 block">Carlos Alberto Morales</span>
                <span className="text-[10px] text-slate-500">Instructor Líder de Inducción</span>
              </div>

              <div>
                <div className="h-10 flex items-center justify-center font-serif italic text-slate-500 text-sm">
                  Marcela Jaramillo V.
                </div>
                <div className="w-36 h-px bg-slate-300 mx-auto mb-1" />
                <span className="text-xs font-bold text-slate-900 block">Dra. Marcela Jaramillo</span>
                <span className="text-[10px] text-slate-500">Coordinación Académica</span>
              </div>
            </div>

            {/* QR Verification Code Simulator */}
            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-mono">
              <div className="flex items-center gap-1.5 text-emerald-800 font-sans font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Documento Verificado en Sistema SofiaPlus</span>
              </div>
              <span>Folio: {certId}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
