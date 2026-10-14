import React, { useState } from 'react';
import { CHECKLIST_CAMPOS_SEGUROS } from '../data/sstData';
import { AreaVocacion, ChecklistItem } from '../types/sst';
import { useGamification } from '../context/GamificationContext';
import { 
  ClipboardCheck, 
  CheckCircle2, 
  XCircle, 
  AlertOctagon, 
  RotateCcw, 
  Printer, 
  ShieldCheck, 
  UserCheck,
  FileCheck2,
  Sparkles,
  Award
} from 'lucide-react';

export const ChecklistView: React.FC = () => {
  const { addXp, unlockBadge } = useGamification();
  const [filterArea, setFilterArea] = useState<AreaVocacion | 'todos'>('todos');
  const [checkedItems, setCheckedItems] = useState<Record<string, 'cumple' | 'no_cumple'>>({});
  const [ambienteNombre, setAmbienteNombre] = useState('Finca Agroecológica CDATH - Lote Café');
  const [instructorNombre, setInstructorNombre] = useState('Ing. Wilson Claros');
  const [fichaNumero, setFichaNumero] = useState('2948210 - Producción Agrícola');
  const [checklistFinished, setChecklistFinished] = useState(false);

  const filteredItems = filterArea === 'todos'
    ? CHECKLIST_CAMPOS_SEGUROS
    : CHECKLIST_CAMPOS_SEGUROS.filter((item) => item.area === filterArea || item.area === 'transversal');

  const handleToggle = (id: string, state: 'cumple' | 'no_cumple') => {
    setCheckedItems((prev) => {
      const next = {
        ...prev,
        [id]: prev[id] === state ? undefined! : state,
      };

      // Check if all filtered items are evaluated
      const evaluatedCount = Object.values(next).filter(Boolean).length;
      if (evaluatedCount === filteredItems.length && !checklistFinished) {
        setChecklistFinished(true);
        addXp(100, 'Lista de Chequeo 5S Terreno Completada');
        unlockBadge('guardian_campo');
      }
      return next;
    });
  };

  const handleMarkAllCumple = () => {
    const all: Record<string, 'cumple' | 'no_cumple'> = {};
    filteredItems.forEach((item) => {
      all[item.id] = 'cumple';
    });
    setCheckedItems(all);
    if (!checklistFinished) {
      setChecklistFinished(true);
      addXp(100, 'Validación Completa de Seguridad 5S');
      unlockBadge('guardian_campo');
    }
  };

  const handleReset = () => {
    setCheckedItems({});
    setChecklistFinished(false);
  };

  // Critical items check
  const criticalIds = ['chk-3', 'chk-4', 'chk-6', 'chk-7'];
  const hasCriticalFailure = criticalIds.some((id) => checkedItems[id] === 'no_cumple');

  const totalEvaluated = Object.values(checkedItems).filter(Boolean).length;
  const totalCumple = Object.values(checkedItems).filter((v) => v === 'cumple').length;
  const safetyPercentage = totalEvaluated > 0 ? Math.round((totalCumple / totalEvaluated) * 100) : 0;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header and Context Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-7 bg-[#39A900] rounded-full inline-block shadow-sm" />
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Lista de Chequeo de Comportamientos Seguros en Terreno
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5 font-medium">
              Formato Oficial <strong className="text-slate-900 font-mono">LCS-SST-01</strong> para validación in-situ previa al encendido de maquinaria, labores en parcelas o salas técnicas.
            </p>
          </div>

          {/* Quick Actions with Tactile SST Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleMarkAllCumple}
              className="btn-sst-green px-4 py-2 rounded-xl text-xs flex items-center gap-2 shadow-md cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-white" />
              <span>Marcar Todo Seguro</span>
            </button>
            <button
              onClick={handleReset}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition flex items-center gap-1.5 border border-slate-300 shadow-xs cursor-pointer active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Limpiar</span>
            </button>
          </div>
        </div>

        {/* Ambient & Instructor Details */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-5 text-xs">
          <div>
            <label className="block text-slate-700 mb-1.5 font-bold">Ambiente / Taller / Parcela</label>
            <input
              type="text"
              value={ambienteNombre}
              onChange={(e) => setAmbienteNombre(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 font-medium focus:ring-2 focus:ring-[#39A900] focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-slate-700 mb-1.5 font-bold">Instructor Responsable / Vigía</label>
            <input
              type="text"
              value={instructorNombre}
              onChange={(e) => setInstructorNombre(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 font-medium focus:ring-2 focus:ring-[#39A900] focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-slate-700 mb-1.5 font-bold">Ficha / Grupo de Aprendices</label>
            <input
              type="text"
              value={fichaNumero}
              onChange={(e) => setFichaNumero(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 font-medium focus:ring-2 focus:ring-[#39A900] focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-slate-100 text-xs">
          <span className="text-slate-600 font-bold mr-1">Filtrar Criterios por Área:</span>
          {(['todos', 'transversal', 'agro', 'administracion'] as const).map((area) => (
            <button
              key={area}
              onClick={() => setFilterArea(area)}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                filterArea === area
                  ? 'bg-gradient-to-r from-[#00324D] to-[#001f30] text-white shadow-md ring-2 ring-emerald-500/30'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {area === 'todos' ? 'Todos los Criterios' : area === 'agro' ? 'Agropecuaria' : area === 'administracion' ? 'Comercial & TIC' : 'Transversal'}
            </button>
          ))}
        </div>
      </div>

      {/* Critical Stop-Work Alert (If any critical failure) */}
      {hasCriticalFailure && (
        <div className="p-5 rounded-3xl bg-rose-50 border-2 border-rose-500 text-rose-950 flex items-start gap-4 shadow-xl animate-pulse">
          <div className="p-2.5 rounded-2xl bg-rose-600 text-white flex-shrink-0 mt-0.5 shadow-md">
            <AlertOctagon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-black text-rose-900 uppercase tracking-wide flex items-center gap-2">
              ¡CONDICIÓN DE PARADA OPERATIVA PREVENTIVA (STOP WORK AUTHORITY)!
            </h3>
            <p className="text-xs sm:text-sm text-rose-800 mt-1.5 leading-relaxed font-medium">
              Se ha detectado un incumplimiento en un criterio crítico de seguridad (EPP obligatorio, guardas de maquinaria o protección de incendios).
              <strong> No se autoriza el inicio de actividades formativas</strong> hasta que el instructor verifique la subsanación del hallazgo.
            </p>
          </div>
        </div>
      )}

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Criterios Evaluados</p>
            <p className="text-2xl font-black text-slate-900 mt-1">
              {totalEvaluated} <span className="text-xs text-slate-400 font-normal">/ {filteredItems.length}</span>
            </p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-700">
            <ClipboardCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Índice de Conformidad</p>
            <p className={`text-2xl font-black mt-1 ${safetyPercentage >= 80 ? 'text-[#39A900]' : 'text-amber-600'}`}>
              {safetyPercentage}%
            </p>
          </div>
          <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${safetyPercentage >= 80 ? 'bg-emerald-100 text-[#39A900]' : 'bg-amber-100 text-amber-600'}`}>
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Estado del Ambiente</p>
            <p className="text-sm font-black mt-1">
              {hasCriticalFailure ? (
                <span className="text-rose-600 font-extrabold flex items-center gap-1">
                  ✕ PARADA OBLIGATORIA
                </span>
              ) : safetyPercentage === 100 ? (
                <span className="text-emerald-600 font-extrabold flex items-center gap-1">
                  ✓ AMBIENTE 100% SEGURO
                </span>
              ) : (
                <span className="text-amber-600 font-bold">EN INSPECCIÓN</span>
              )}
            </p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <UserCheck className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Table of Checklist Items */}
      <div className="bg-white rounded-3xl shadow-xl border-2 border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/80 text-slate-700 font-black uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-4 w-12 text-center">#</th>
                <th className="p-4">Criterio de Seguridad / Comportamiento Esperado</th>
                <th className="p-4 hidden md:table-cell">Estándar de Verificación</th>
                <th className="p-4 hidden lg:table-cell">Base Normativa</th>
                <th className="p-4 text-center w-48">Valoración</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredItems.map((item, idx) => {
                const status = checkedItems[item.id];
                const isCritical = criticalIds.includes(item.id);

                return (
                  <tr
                    key={item.id}
                    className={`hover:bg-slate-50/80 transition ${
                      status === 'cumple'
                        ? 'bg-emerald-50/40'
                        : status === 'no_cumple'
                        ? 'bg-rose-50/50'
                        : ''
                    }`}
                  >
                    <td className="p-4 text-center font-bold text-slate-400">
                      {idx + 1}
                    </td>
                    <td className="p-4">
                      <div className="flex items-start gap-2">
                        {isCritical && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-900 border border-amber-300 flex-shrink-0">
                            Crítico
                          </span>
                        )}
                        <span className="font-bold text-slate-900 leading-snug">{item.item}</span>
                      </div>
                    </td>
                    <td className="p-4 text-slate-600 hidden md:table-cell font-medium">
                      {item.criterio}
                    </td>
                    <td className="p-4 text-slate-500 font-mono text-[11px] hidden lg:table-cell">
                      {item.normativa}
                    </td>
                    <td className="p-4 text-center">
                      <div className="inline-flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
                        <button
                          onClick={() => handleToggle(item.id, 'cumple')}
                          className={`px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1 transition cursor-pointer ${
                            status === 'cumple'
                              ? 'bg-emerald-600 text-white shadow-md'
                              : 'text-slate-600 hover:text-emerald-700 hover:bg-white'
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Sí
                        </button>
                        <button
                          onClick={() => handleToggle(item.id, 'no_cumple')}
                          className={`px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1 transition cursor-pointer ${
                            status === 'no_cumple'
                              ? 'bg-rose-600 text-white shadow-md'
                              : 'text-slate-600 hover:text-rose-700 hover:bg-white'
                          }`}
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          No
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer info and Signature note */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <FileCheck2 className="w-4 h-4 text-emerald-600" />
            <span className="font-medium">Registro archivado digitalmente en el repositorio SIGA del CDATH.</span>
          </div>
          <button
            onClick={() => window.print()}
            className="btn-sst-blue px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-md cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-white" />
            <span>Imprimir Reporte de Inspección</span>
          </button>
        </div>
      </div>
    </div>
  );
};
