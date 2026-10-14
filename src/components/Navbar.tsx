import React from 'react';
import { 
  FileText, 
  Layers, 
  Award, 
  ClipboardCheck, 
  AlertTriangle, 
  Sparkles, 
  ShieldCheck,
  FileCode,
  HardHat
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenDocument: () => void;
  onOpenGamification: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activeTab, 
  setActiveTab, 
  onOpenDocument,
  onOpenGamification 
}) => {
  const navItems = [
    { id: 'ficha', label: 'Ficha Técnica', icon: FileText },
    { id: 'modulos', label: 'Módulos Vocacionales', icon: Layers },
    { id: 'evaluacion', label: 'Evaluación & Certificado', icon: Award },
    { id: 'checklist', label: 'Comportamientos Seguros', icon: ClipboardCheck },
    { id: 'ruta_critica', label: 'Ruta Crítica AT / FURAT', icon: AlertTriangle },
    { id: 'asesor_ia', label: 'Asesor IA SST', icon: Sparkles },
  ];

  return (
    <header className="sticky top-0 z-50 shadow-xl">
      {/* Top Warning Chevron Strip (SST Industrial Safety Tape) */}
      <div className="h-1.5 w-full safety-stripe-banner opacity-90" />

      {/* Main Header Container */}
      <div className="bg-[#00273c] text-white border-b-2 border-[#39A900]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-3.5">
            {/* SENA Logo with safety shield glow */}
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#2d8200] to-[#39A900] flex items-center justify-center font-black text-white text-xl tracking-tighter shadow-md ring-2 ring-white/20 border border-emerald-300/40 flex-shrink-0">
              SENA
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 flex items-center gap-1">
                  <HardHat className="w-3 h-3 text-amber-400" />
                  Regional Huila
                </span>
                <span className="text-[11px] text-amber-300/90 font-mono font-semibold">
                  Dec. 1072/15 • Res. 0312/19
                </span>
              </div>
              <h1 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-2">
                SST-SENA Emprende Seguro Huila
              </h1>
              <p className="text-[11px] sm:text-xs text-slate-300 font-medium">
                Centro de Desarrollo Agroempresarial y Turístico del Huila (CDATH - La Plata)
              </p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenGamification}
              className="btn-sst-yellow flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs shadow-md"
            >
              <span>⚡ Desafío SST</span>
            </button>
            <button
              onClick={onOpenDocument}
              className="btn-sst-green flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs shadow-md"
              title="Ver Documento Maestro Completo en Markdown"
            >
              <FileCode className="w-3.5 h-3.5 text-white" />
              <span>Documento Maestro</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-[#001f30] border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2 scrollbar-none" aria-label="Tabs">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-[#39A900] to-[#2d8200] text-white shadow-md ring-1 ring-emerald-300/40 translate-y-[-1px]'
                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-amber-400'}`} />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
