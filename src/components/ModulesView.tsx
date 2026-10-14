import React, { useState } from 'react';
import { MODULOS_SST } from '../data/sstData';
import { AreaVocacion, SSTModuleContent } from '../types/sst';
import { useGamification } from '../context/GamificationContext';
import { 
  ShieldCheck, 
  Sprout, 
  Laptop, 
  AlertTriangle, 
  CheckCircle, 
  HardHat, 
  Wrench, 
  FileText, 
  LifeBuoy, 
  XCircle, 
  HelpCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const ModulesView: React.FC = () => {
  const { addXp, unlockBadge } = useGamification();
  const [selectedVocacion, setSelectedVocacion] = useState<AreaVocacion>('transversal');

  const handleSelectModule = (voc: AreaVocacion) => {
    setSelectedVocacion(voc);
    addXp(30, `Exploración del Módulo ${voc.toUpperCase()}`);
    unlockBadge('detector_peligros');
  };

  const currentModule: SSTModuleContent = 
    MODULOS_SST.find((m) => m.vocacion === selectedVocacion) || MODULOS_SST[0];

  const getModuleIcon = (vocacion: AreaVocacion) => {
    switch (vocacion) {
      case 'transversal':
        return ShieldCheck;
      case 'agro':
        return Sprout;
      case 'administracion':
        return Laptop;
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Selector */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-7 bg-[#39A900] rounded-full inline-block shadow-sm" />
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Matriz de Segmentación de Contenidos Vocacionales
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5 font-medium">
              Currículo estructurado en Tronco Transversal común y Módulos Específicos por vocación regional (Agropecuaria y Comercial/Administrativa).
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-[#39A900] bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 self-start md:self-auto">
            +30 XP por Módulo
          </span>
        </div>

        {/* Vocación Tabs with Tactile SST Styling */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-5">
          {MODULOS_SST.map((mod) => {
            const Icon = getModuleIcon(mod.vocacion);
            const isSelected = selectedVocacion === mod.vocacion;
            return (
              <button
                key={mod.id}
                onClick={() => handleSelectModule(mod.vocacion)}
                className={`p-4 sm:p-5 rounded-2xl text-left border-2 transition-all flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'border-[#39A900] bg-emerald-50/70 shadow-lg ring-2 ring-[#39A900]/30 translate-y-[-2px]'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/90 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <div
                    className={`p-2.5 rounded-xl shadow-xs ${
                      isSelected ? 'bg-[#39A900] text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                      isSelected
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {mod.vocacion === 'transversal' ? 'Tronco Común' : 'Específico'}
                  </span>
                </div>
                <div>
                  <h3
                    className={`text-sm sm:text-base font-black ${
                      isSelected ? 'text-slate-900' : 'text-slate-700'
                    }`}
                  >
                    {mod.title.replace('Módulo Específico: ', '').replace('Módulo Transversal ', '')}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-1 line-clamp-1">{mod.badge}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Module Detail Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-[#00273c] to-[#003d5c] rounded-3xl p-6 sm:p-8 text-white shadow-2xl border-2 border-emerald-500/40 relative overflow-hidden">
        {/* Subtle Watermark Chevron */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-sst-pattern opacity-10 pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-[#39A900] text-white shadow-xs">
                {currentModule.badge}
              </span>
              <span className="text-xs text-amber-300 font-mono font-bold">CDATH Regional Huila</span>
            </div>
            <h3 className="text-xl sm:text-3xl font-black text-white tracking-tight">{currentModule.title}</h3>
            <p className="text-xs sm:text-sm text-slate-200 max-w-3xl leading-relaxed font-normal">
              {currentModule.summary}
            </p>
          </div>
        </div>

        {/* Context Badges: Normativa & Sedes */}
        <div className="mt-6 pt-5 border-t border-slate-700/80 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs relative z-10">
          <div>
            <span className="font-bold text-slate-300 block mb-2 uppercase tracking-wider text-[11px]">Normativa Específica:</span>
            <div className="flex flex-wrap gap-2">
              {currentModule.normativa.map((n, i) => (
                <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-900/90 text-emerald-300 border border-slate-700 text-xs font-mono font-semibold">
                  {n}
                </span>
              ))}
            </div>
          </div>
          <div>
            <span className="font-bold text-slate-300 block mb-2 uppercase tracking-wider text-[11px]">Ambientes y Sedes de Aplicación:</span>
            <div className="flex flex-wrap gap-2">
              {currentModule.sedesAmbientes.map((s, i) => (
                <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-900/90 text-sky-300 border border-slate-700 text-xs font-semibold">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section 1: Peligros GTC 45 y Controles */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-slate-200 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500 text-slate-950 font-black shadow-md">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900">Matriz de Peligros Críticos (GTC 45) y Controles</h3>
              <p className="text-xs text-slate-500 font-medium">Jerarquía de controles: Ingeniería, Administrativo y Elementos de Protección Personal (EPP)</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {currentModule.peligrosGTC45.map((peligro, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl border-2 border-slate-200 bg-slate-50/70 hover:bg-white hover:border-emerald-300 transition-all space-y-3.5 shadow-xs"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-black px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                  {peligro.tipo}
                </span>
                <span className="text-[11px] text-slate-400 font-mono font-bold">GTC-45 / SENA</span>
              </div>

              <div>
                <p className="text-xs sm:text-sm text-slate-900 font-bold leading-snug">{peligro.descripcion}</p>
                <p className="text-xs text-rose-700 font-semibold mt-1.5 bg-rose-50 p-2 rounded-xl border border-rose-200">
                  <strong>Consecuencia potencial:</strong> {peligro.consecuencia}
                </p>
              </div>

              <div className="space-y-2 text-xs border-t border-slate-200 pt-3">
                <div className="flex items-start gap-2">
                  <Wrench className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">
                    <strong className="text-slate-900">Control Ingeniería:</strong> {peligro.controlIngenieria}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <FileText className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">
                    <strong className="text-slate-900">Control Administrativo:</strong> {peligro.controlAdministrativo}
                  </span>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-3">
                <div className="flex items-center gap-1.5 mb-2 text-xs font-black text-slate-900">
                  <HardHat className="w-4 h-4 text-[#39A900]" />
                  <span>EPP Obligatorio Certificado:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {peligro.eppObligatorio.map((epp, eIdx) => (
                    <span
                      key={eIdx}
                      className="px-2.5 py-1 rounded-xl bg-white text-slate-800 text-xs border border-slate-300 font-semibold shadow-2xs"
                    >
                      ✓ {epp}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Protocolo Operativo y Ficha de Emergencia */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Protocolo Operativo Paso a Paso */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-slate-200 space-y-5">
          <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
            <div className="p-2.5 rounded-2xl bg-emerald-100 text-emerald-800 font-black shadow-xs">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900">Protocolo Operativo de Seguridad en Ambiente</h3>
              <p className="text-xs text-slate-500 font-medium">Pasos obligatorios para aprendices e instructores antes y durante la formación</p>
            </div>
          </div>

          <div className="space-y-3.5">
            {currentModule.protocoloOperativo.map((item) => (
              <div key={item.paso} className="p-4 rounded-2xl border-2 border-slate-200 bg-slate-50/70 space-y-2">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#00324D] text-white text-xs font-black flex items-center justify-center flex-shrink-0 shadow-sm">
                    {item.paso}
                  </span>
                  <h4 className="text-xs sm:text-sm font-black text-slate-900">{item.titulo}</h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 pl-10 leading-relaxed font-normal">{item.instruccion}</p>
                <div className="ml-10 p-2.5 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-950 flex items-start gap-2 font-medium">
                  <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>{item.alerta}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Ficha de Acción Inmediata ante Emergencias */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-slate-200 space-y-5">
          <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
            <div className="p-2.5 rounded-2xl bg-rose-100 text-rose-800 font-black shadow-xs">
              <LifeBuoy className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900">Acción Inmediata</h3>
              <p className="text-xs text-slate-500 font-medium">Conducta PAS y equipo requerido</p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <h4 className="font-black text-emerald-900 flex items-center gap-1.5 mb-2.5 text-xs sm:text-sm">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Qué SÍ hacer de inmediato:
              </h4>
              <ul className="space-y-2 text-slate-700">
                {currentModule.fichaEmergencia.queHacer.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-200 text-slate-900 font-medium">
                    <span className="text-emerald-700 font-black">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-black text-rose-900 flex items-center gap-1.5 mb-2.5 text-xs sm:text-sm">
                <XCircle className="w-4 h-4 text-rose-600" />
                Qué NUNCA hacer (Prohibiciones):
              </h4>
              <ul className="space-y-2 text-slate-700">
                {currentModule.fichaEmergencia.queEvitar.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-rose-50/70 p-2.5 rounded-xl border border-rose-200 text-rose-950 font-medium">
                    <span className="text-rose-600 font-black">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-slate-800">
              <span className="font-black block mb-1.5 text-xs text-slate-700 uppercase tracking-wide">
                Equipamiento de Respuesta en el Área:
              </span>
              <p className="text-xs font-semibold text-slate-900">{currentModule.fichaEmergencia.equipoRequerido}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
