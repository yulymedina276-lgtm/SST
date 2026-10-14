import React, { useState } from 'react';
import { GamificationProvider, useGamification } from './context/GamificationContext';
import { Navbar } from './components/Navbar';
import { GamificationBar } from './components/GamificationBar';
import { GamificationModal } from './components/GamificationModal';
import { TechnicalSheetView } from './components/TechnicalSheetView';
import { ModulesView } from './components/ModulesView';
import { EvaluationView } from './components/EvaluationView';
import { ChecklistView } from './components/ChecklistView';
import { CriticalRouteView } from './components/CriticalRouteView';
import { AiAdvisorView } from './components/AiAdvisorView';
import { MasterDocumentModal } from './components/MasterDocumentModal';
import { 
  ShieldCheck, 
  MapPin, 
  PhoneCall, 
  HardHat, 
  Sparkles, 
  AlertTriangle, 
  Award,
  Zap
} from 'lucide-react';

function AppContent() {
  const [activeTab, setActiveTab] = useState<string>('ficha');
  const [isDocumentOpen, setIsDocumentOpen] = useState<boolean>(false);
  const [isGamificationOpen, setIsGamificationOpen] = useState<boolean>(false);
  const [gamificationTab, setGamificationTab] = useState<'desafio' | 'medallas'>('desafio');

  const { toastMessage } = useGamification();

  const handleOpenGamification = (tab: 'desafio' | 'medallas' = 'desafio') => {
    setGamificationTab(tab);
    setIsGamificationOpen(true);
  };

  return (
    <div className="min-h-screen bg-sst-pattern text-slate-900 flex flex-col font-sans selection:bg-[#39A900] selection:text-white relative overflow-x-hidden">
      {/* SST Industrial Background Watermarks */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-[0.035]">
        {/* Subtle Watermark Safety Cross & Shields */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full border-[32px] border-emerald-600 flex items-center justify-center">
          <div className="w-48 h-12 bg-emerald-600 absolute" />
          <div className="w-12 h-48 bg-emerald-600 absolute" />
        </div>
        <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] rounded-full border-[24px] border-amber-500 rotate-45" />
        <div className="absolute -bottom-32 left-1/4 w-[600px] h-[600px] rounded-full border-[28px] border-sky-600" />
      </div>

      {/* Floating Gamification Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 animate-bounce shadow-2xl">
          <div className="bg-gradient-to-r from-slate-950 via-[#00273c] to-emerald-950 text-white px-5 py-3.5 rounded-2xl border-2 border-amber-400 shadow-xl flex items-center gap-3 text-xs sm:text-sm font-black">
            <span className="p-1.5 rounded-xl bg-amber-500 text-slate-950 flex-shrink-0 animate-pulse">
              <Sparkles className="w-4 h-4 fill-current" />
            </span>
            <span className="text-amber-200 tracking-wide">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenDocument={() => setIsDocumentOpen(true)}
        onOpenGamification={() => handleOpenGamification('desafio')}
      />

      {/* Interactive SST Gamification Progress Bar */}
      <GamificationBar onOpenModal={handleOpenGamification} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {activeTab === 'ficha' && (
          <TechnicalSheetView
            onGoToModules={() => setActiveTab('modulos')}
            onGoToEvaluation={() => setActiveTab('evaluacion')}
            onOpenGamification={() => handleOpenGamification('desafio')}
          />
        )}

        {activeTab === 'modulos' && <ModulesView />}

        {activeTab === 'evaluacion' && <EvaluationView />}

        {activeTab === 'checklist' && <ChecklistView />}

        {activeTab === 'ruta_critica' && <CriticalRouteView />}

        {activeTab === 'asesor_ia' && <AiAdvisorView />}
      </main>

      {/* Gamification Center Modal */}
      <GamificationModal
        isOpen={isGamificationOpen}
        onClose={() => setIsGamificationOpen(false)}
        initialTab={gamificationTab}
      />

      {/* Master Document Markdown Modal */}
      <MasterDocumentModal
        isOpen={isDocumentOpen}
        onClose={() => setIsDocumentOpen(false)}
      />

      {/* Footer with Industrial Safety Branding */}
      <footer className="bg-[#001f30] text-slate-300 border-t-4 border-[#39A900] py-10 mt-12 text-xs relative z-10 shadow-2xl">
        {/* Safety Stripe Accent Line */}
        <div className="h-1.5 w-full safety-stripe-banner mb-6" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#2d8200] to-[#39A900] text-white flex items-center justify-center font-black text-base shadow-lg border border-emerald-300/40">
              SENA
            </div>
            <div>
              <p className="font-extrabold text-white text-sm tracking-tight flex items-center gap-2">
                Centro de Desarrollo Agroempresarial y Turístico del Huila (CDATH)
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono border border-emerald-400/30">
                  SG-SST 2026
                </span>
              </p>
              <p className="text-slate-400 mt-0.5">
                SENA Regional Huila • Sede Principal La Plata, Subsedes Paicol, Tesalia, Nátaga, La Argentina, Íquira y Garzón
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-300 text-center font-medium">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700">
              <ShieldCheck className="w-4 h-4 text-[#39A900]" />
              <span>Dec. 1072/15 • Res. 0312/19</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>La Plata, Huila</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700">
              <PhoneCall className="w-4 h-4 text-amber-400" />
              <span>ARL Positiva #533</span>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <GamificationProvider>
      <AppContent />
    </GamificationProvider>
  );
}
