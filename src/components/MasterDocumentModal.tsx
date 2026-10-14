import React, { useState } from 'react';
import { MASTER_DOCUMENT_MARKDOWN } from '../data/masterDocumentMarkdown';
import { X, Copy, Check, Download, FileText } from 'lucide-react';

interface MasterDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MasterDocumentModal: React.FC<MasterDocumentModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(MASTER_DOCUMENT_MARKDOWN);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const blob = new Blob([MASTER_DOCUMENT_MARKDOWN], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ESTRUCTURA_MAESTRA_INDUCION_SST_CDATH_HUILA.md';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#39A900] text-white">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Documento Maestro de Inducción en SST (Markdown Oficial)
              </h3>
              <p className="text-xs text-slate-500">
                PRO-GTH-SST-HM-001 • Aprobado para radicación en SIGA SENA Regional Huila
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 transition flex items-center gap-1.5 shadow-2xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? '¡Copiado!' : 'Copiar Markdown'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#00324D] hover:bg-[#002538] text-white transition flex items-center gap-1.5 shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Descargar .md</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-500 hover:text-slate-700 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-900 text-slate-100 font-mono text-xs leading-relaxed select-all">
          <pre className="whitespace-pre-wrap font-mono">{MASTER_DOCUMENT_MARKDOWN}</pre>
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <span>Formato homologado según Decreto 1072 de 2015 y Resolución 0312 de 2019.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold transition"
          >
            Cerrar Visor
          </button>
        </div>
      </div>
    </div>
  );
};
