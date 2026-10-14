import React from 'react';
import { FICHA_TECNICA } from '../data/sstData';
import { 
  FileSpreadsheet, 
  Clock, 
  Calendar, 
  GraduationCap, 
  BookOpen, 
  Users, 
  Scale, 
  CheckCircle2, 
  MapPin, 
  Sparkles, 
  HardHat, 
  ShieldAlert, 
  Eye, 
  Zap, 
  Flame 
} from 'lucide-react';

interface TechnicalSheetViewProps {
  onGoToModules: () => void;
  onGoToEvaluation: () => void;
  onOpenGamification: () => void;
}

export const TechnicalSheetView: React.FC<TechnicalSheetViewProps> = ({
  onGoToModules,
  onGoToEvaluation,
  onOpenGamification,
}) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Banner with SST Safety Imagery & Safety Colors */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#00273c] via-[#003d5c] to-[#0c4a34] text-white shadow-2xl border-2 border-emerald-500/30">
        {/* Subtle Industrial Overlay Graphic */}
        <div className="absolute inset-0 bg-sst-pattern opacity-10 pointer-events-none" />
        
        {/* Top Warning Accent */}
        <div className="h-1.5 w-full safety-stripe-banner" />

        <div className="relative p-6 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-500 text-slate-950 shadow-sm border border-amber-300">
                <HardHat className="w-3.5 h-3.5" />
                CULTURA DE AUTOPROTECCIÓN SST
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/30 text-emerald-300 border border-emerald-400/30">
                <Sparkles className="w-3 h-3 text-emerald-300" />
                SENA Regional Huila
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
              Herramienta Maestra de Inducción en SST
            </h2>
            
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              Estructura pedagógica, normativa y operacional de seguridad y salud en el trabajo para aprendices e instructores del{' '}
              <strong className="text-amber-300">Centro de Desarrollo Agroempresarial y Turístico del Huila (CDATH - La Plata)</strong>. 
              Alineada al <strong className="text-white">Decreto 1072 de 2015</strong> y la <strong className="text-white">Resolución 0312 de 2019</strong>.
            </p>

            {/* Quick Action Buttons with SST Colors and Tactile Feel */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={onGoToModules}
                className="btn-sst-green px-5 py-2.5 rounded-xl text-xs sm:text-sm flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>Explorar Módulos Vocacionales</span>
              </button>
              <button
                onClick={onGoToEvaluation}
                className="btn-sst-yellow px-5 py-2.5 rounded-xl text-xs sm:text-sm flex items-center gap-2"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Evaluación & Certificación</span>
              </button>
              <button
                onClick={onOpenGamification}
                className="btn-sst-orange px-5 py-2.5 rounded-xl text-xs sm:text-sm flex items-center gap-2"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>Desafío de Gamificación</span>
              </button>
            </div>
          </div>

          {/* Visual Showcase: Worker EPP Representation (Casco Amarillo, Gafas, Chaleco Naranja y Guantes) */}
          <div className="relative flex-shrink-0 w-full sm:w-80 p-5 rounded-2xl bg-slate-900/80 border-2 border-amber-500/40 backdrop-blur-md shadow-xl text-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-700 pb-2.5">
              <span className="font-extrabold text-amber-300 flex items-center gap-1.5">
                <HardHat className="w-4 h-4 text-amber-400" />
                EPP Obligatorio en Terreno
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono font-bold">
                100% Certificado
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-800/90 border border-amber-500/30 text-slate-200">
                <div className="w-7 h-7 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
                  <HardHat className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-white block">Casco de Seguridad Industrial</span>
                  <span className="text-[10px] text-slate-400">Tipo I / Dieléctrico Clase E</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-800/90 border border-orange-500/30 text-slate-200">
                <div className="w-7 h-7 rounded-lg bg-orange-500 text-white flex items-center justify-center font-bold">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-white block">Chaleco Reflectivo Alta Visibilidad</span>
                  <span className="text-[10px] text-slate-400">Norma ANSI/ISEA 107 Clase 2</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-800/90 border border-sky-500/30 text-slate-200">
                <div className="w-7 h-7 rounded-lg bg-sky-500 text-white flex items-center justify-center font-bold">
                  <Eye className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-white block">Gafas de Seguridad en Policarbonato</span>
                  <span className="text-[10px] text-slate-400">Antiempañantes ANSI Z87.1</span>
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-400/30 text-[11px] text-amber-200 font-medium">
              💡 <strong>Regla de Oro CDATH:</strong> "Si no portas tu equipo completo, ejerce tu autoridad de parada preventiva."
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Ficha Técnica Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: General Identification & Legal */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-5">
              <div className="p-3 rounded-2xl bg-emerald-50 text-[#39A900] shadow-2xs">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">Ficha Técnica Oficial del Instrumento</h3>
                <p className="text-xs text-slate-500">Código: {FICHA_TECNICA.codigoFormato} • Versión {FICHA_TECNICA.version}</p>
              </div>
            </div>

            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <dt className="text-xs font-bold text-slate-500 uppercase tracking-wider">Centro de Formación</dt>
                <dd className="font-extrabold text-slate-900 mt-1">{FICHA_TECNICA.centroFormacion}</dd>
                <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-2">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>{FICHA_TECNICA.sedes}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <dt className="text-xs font-bold text-slate-500 uppercase tracking-wider">Metodología Pedagógica</dt>
                <dd className="font-medium text-slate-800 mt-1">{FICHA_TECNICA.metodologia}</dd>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 sm:col-span-2">
                <dt className="text-xs font-bold text-slate-500 uppercase tracking-wider">Población Objetivo</dt>
                <dd className="text-slate-700 mt-1 font-medium">{FICHA_TECNICA.poblacionObjetivo}</dd>
              </div>
            </dl>
          </div>

          {/* Marco Normativo Colombiano */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-4">
              <div className="p-3 rounded-2xl bg-blue-50 text-blue-700">
                <Scale className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">Sustento Normativo y Legal Aplicable</h3>
                <p className="text-xs text-slate-500">Decretos, resoluciones y leyes del Ministerio del Trabajo y SENA</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {FICHA_TECNICA.marcoNormativoPrincipal.map((norma, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 transition text-xs text-slate-700 border border-slate-200/60 shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="font-medium">{norma}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Durations, Periodicidad & Governance */}
        <div className="space-y-6">
          {/* Duración Sugerida */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3 mb-4">
              <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-black text-slate-900 text-base">Duración Sugerida</h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-300 text-emerald-950 font-bold flex justify-between items-center shadow-2xs">
                <span>Total Inducción Inicial:</span>
                <span className="text-sm font-black text-emerald-700">{FICHA_TECNICA.duracionSugerida.totalInduccionInicial}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex justify-between">
                <span className="text-slate-600 font-medium">Módulo Transversal:</span>
                <span className="font-bold text-slate-900">{FICHA_TECNICA.duracionSugerida.moduloTransversal}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex justify-between">
                <span className="text-slate-600 font-medium">Módulo Específico:</span>
                <span className="font-bold text-slate-900">{FICHA_TECNICA.duracionSugerida.moduloEspecificoVocacional}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex justify-between">
                <span className="text-slate-600 font-medium">Simulacro y Ruta Crítica:</span>
                <span className="font-bold text-slate-900">{FICHA_TECNICA.duracionSugerida.simulacroEmergenciaRutaCritica}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex justify-between">
                <span className="text-slate-600 font-medium">Microcápsulas 5S:</span>
                <span className="font-bold text-emerald-700">{FICHA_TECNICA.duracionSugerida.microcapsulasRefuerzo}</span>
              </div>
            </div>
          </div>

          {/* Periodicidad Obligatoria */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3 mb-4">
              <div className="p-2.5 rounded-xl bg-purple-50 text-purple-700">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="font-black text-slate-900 text-base">Periodicidad Obligatoria</h3>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="font-extrabold text-slate-900 block mb-0.5">1. Inducción Inicial</span>
                <p className="text-slate-600">{FICHA_TECNICA.periodicidad.ingresoInicial}</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="font-extrabold text-slate-900 block mb-0.5">2. Reinducción Ordinaria</span>
                <p className="text-slate-600">{FICHA_TECNICA.periodicidad.reinduccionOrdinaria}</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950">
                <span className="font-extrabold block mb-0.5 text-rose-900">3. Reinducción Extraordinaria</span>
                <p className="text-xs text-rose-800">{FICHA_TECNICA.periodicidad.reinduccionExtraordinaria}</p>
              </div>
            </div>
          </div>

          {/* Liderazgo Institucional */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3 mb-4">
              <div className="p-2.5 rounded-xl bg-emerald-50 text-[#39A900]">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-black text-slate-900 text-base">Liderazgo Institucional</h3>
            </div>

            <ul className="space-y-2 text-xs text-slate-700">
              {FICHA_TECNICA.responsablesLiderazgo.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#39A900]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
