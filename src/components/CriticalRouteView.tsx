import React, { useState } from 'react';
import { CONTACTOS_EMERGENCIA_HUILA } from '../data/sstData';
import { UserRole, IncidentReportForm } from '../types/sst';
import { useGamification } from '../context/GamificationContext';
import { 
  AlertTriangle, 
  Clock, 
  PhoneCall, 
  FileCheck, 
  Send, 
  Printer, 
  CheckCircle, 
  Building2, 
  ShieldAlert, 
  UserCheck, 
  Ambulance, 
  Calendar,
  AlertCircle,
  Sparkles,
  Award
} from 'lucide-react';

export const CriticalRouteView: React.FC = () => {
  const { addXp, unlockBadge } = useGamification();
  const [selectedRole, setSelectedRole] = useState<UserRole>('aprendiz_lectiva');
  
  // Incident Form state
  const [reportForm, setReportForm] = useState<IncidentReportForm>({
    tipoEvento: 'accidente_leve',
    nombreAfectado: 'Julián Camilo Trujillo',
    identificacion: '1075283910',
    rol: 'aprendiz_lectiva',
    fichaPrograma: '2987102 - Producción Agrícola y Beneficio de Café',
    areaAmbiente: 'Planta de Agroindustria y Beneficio de Café',
    sede: 'Sede Principal La Plata, Huila',
    fechaHora: new Date().toISOString().slice(0, 16),
    lugarExacto: 'Área de despulpado ecológico, tolva número 1',
    descripcionHechos: 'Durante las labores de ajuste y calibración de pecheras en la despulpadora de café, al retirar una piedra atascada sin haber bloqueado previamente el interruptor eléctrico (LOTO), el tambor giró levemente produciendo una herida incisa en el dedo índice de la mano izquierda del aprendiz.',
    parteCuerpoAfectada: 'Dedo índice de la mano izquierda (herida incisa superficial)',
    agenteAccidente: 'Cilindro con camisa de cobre de despulpadora de café',
    primerosAuxiliosBrindados: 'Lavado profuso con suero fisiológico al 0.9%, compresión directa con gasa estéril para hemostasia y vendaje compresivo protector en la enfermería del Centro.',
    testigos: 'Carlos Medina (Compañero de ficha) e Instructor técnico',
    atendidoPor: 'Brigadista de primeros auxilios y Enfermería CDATH',
  });

  const [generatedReport, setGeneratedReport] = useState<string | null>(null);

  const handleGenerateReport = (e: React.FormEvent) => {
    e.preventDefault();
    const radicado = `FURAT-CDATH-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    setGeneratedReport(radicado);
    addXp(75, 'Simulación de Radicación FURAT (Ruta Crítica)');
    unlockBadge('primer_respondiente');
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner with SST Industrial Styling */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-7 bg-rose-600 rounded-full inline-block shadow-sm" />
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Ruta Crítica de Notificación y Reporte de Incidentes y Accidentes de Trabajo (AT)
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5 font-medium">
              Flujo cronológico de respuesta estricta conforme al <strong>Decreto 1072 de 2015</strong> (Art. 2.2.4.6.32), 
              la <strong>Resolución 0312 de 2019</strong> y la <strong>Resolución 1401 de 2007</strong>.
            </p>
          </div>

          <div className="px-4 py-2 rounded-2xl bg-rose-50 border-2 border-rose-300 text-rose-900 text-xs font-black flex items-center gap-2 shadow-sm">
            <Clock className="w-4 h-4 text-rose-600 animate-spin" />
            <span>Término Máximo Legal: 48 Horas Hábiles (FURAT)</span>
          </div>
        </div>

        {/* Role Selector Tabs */}
        <div className="mt-5">
          <span className="text-xs font-black uppercase tracking-wider text-slate-600 block mb-2.5">
            Seleccione la Población Afectada para Visualizar su Ruta Específica:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => setSelectedRole('aprendiz_lectiva')}
              className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                selectedRole === 'aprendiz_lectiva'
                  ? 'border-[#39A900] bg-emerald-50/80 shadow-md ring-2 ring-[#39A900]/30'
                  : 'border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <span className="text-xs sm:text-sm font-black text-slate-900 block">Aprendiz - Etapa Lectiva</span>
              <span className="text-[11px] text-slate-500 font-medium">Póliza Estudiantil SENA / ARL SENA (Dec. 055/15)</span>
            </button>

            <button
              onClick={() => setSelectedRole('aprendiz_productiva')}
              className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                selectedRole === 'aprendiz_productiva'
                  ? 'border-[#39A900] bg-emerald-50/80 shadow-md ring-2 ring-[#39A900]/30'
                  : 'border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <span className="text-xs sm:text-sm font-black text-slate-900 block">Aprendiz - Etapa Productiva</span>
              <span className="text-[11px] text-slate-500 font-medium">ARL Empresa Patrocinadora (Ley 789/02)</span>
            </button>

            <button
              onClick={() => setSelectedRole('instructor')}
              className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                selectedRole === 'instructor'
                  ? 'border-[#39A900] bg-emerald-50/80 shadow-md ring-2 ring-[#39A900]/30'
                  : 'border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <span className="text-xs sm:text-sm font-black text-slate-900 block">Instructor / Servidor / Contratista</span>
              <span className="text-[11px] text-slate-500 font-medium">ARL Positiva SENA Regional Huila</span>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Step-by-Step Timeline */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-slate-200 space-y-6">
        <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2.5 border-b border-slate-200 pb-4">
          <Clock className="w-5 h-5 text-blue-600" />
          Secuencia Cronológica y Obligaciones Operacionales
        </h3>

        <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-1 before:bg-slate-200">
          {/* Step 1: Minuto 0 a 15 */}
          <div className="relative">
            <span className="absolute -left-6 sm:-left-8 top-0 w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-rose-600 text-white text-xs font-black flex items-center justify-center ring-4 ring-white shadow-md">
              1
            </span>
            <div className="bg-rose-50/70 border-2 border-rose-300 rounded-2xl p-4 sm:p-5 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h4 className="text-sm sm:text-base font-black text-rose-950">
                  Minuto 0 a 15: Atención Inmediata en Primeros Auxilios (PAS)
                </h4>
                <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-rose-200 text-rose-900 border border-rose-300">
                  Urgencia Vital
                </span>
              </div>
              <p className="text-xs sm:text-sm text-rose-900 leading-relaxed font-medium">
                Aplicar la conducta <strong>PAS (Proteger, Avisar, Socorrer)</strong>. El instructor técnico o brigadista más cercano estabiliza al lesionado en el botiquín del ambiente o enfermería del CDATH.
              </p>
              <p className="text-xs text-rose-800 font-semibold bg-white/70 p-2.5 rounded-xl border border-rose-200">
                ⚠️ En intoxicación o derrame químico: retirar prendas y duchar 15 min. En cortes mecánicos: compresión con apósito estéril. En mordedura ofídica: reposo estricto e inmovilización.
              </p>
            </div>
          </div>

          {/* Step 2: Minuto 15 a 60 */}
          <div className="relative">
            <span className="absolute -left-6 sm:-left-8 top-0 w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-amber-500 text-white text-xs font-black flex items-center justify-center ring-4 ring-white shadow-md">
              2
            </span>
            <div className="bg-amber-50/70 border-2 border-amber-300 rounded-2xl p-4 sm:p-5 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h4 className="text-sm sm:text-base font-black text-amber-950">
                  Minuto 15 a 60: Direccionamiento y Traslado Asistencial
                </h4>
                <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900 border border-amber-300">
                  Traslado IPS
                </span>
              </div>
              <p className="text-xs sm:text-sm text-amber-900 leading-relaxed font-medium">
                Traslado inmediato a la sala de urgencias del <strong>Hospital Departamental San Vicente de Paúl de La Plata, Huila</strong> (o centro asistencial adscrito más próximo en Garzón/Neiva).
              </p>
              <div className="text-xs text-amber-900 bg-white/80 p-2.5 rounded-xl border border-amber-200 font-medium">
                <strong>Enlace Asistencial:</strong> Llamar a la línea de urgencias de ARL Positiva (<code className="text-xs font-black text-amber-800">#533</code> o <code className="text-xs font-black text-amber-800">01 8000 111 170</code>) o reportar a la aseguradora de la Póliza Estudiantil.
              </div>
            </div>
          </div>

          {/* Step 3: Hora 0 a 48 */}
          <div className="relative">
            <span className="absolute -left-6 sm:-left-8 top-0 w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-blue-600 text-white text-xs font-black flex items-center justify-center ring-4 ring-white shadow-md">
              3
            </span>
            <div className="bg-blue-50/70 border-2 border-blue-300 rounded-2xl p-4 sm:p-5 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h4 className="text-sm sm:text-base font-black text-blue-950">
                  Hora 0 a 48 (Límite Máximo Legal): Radicación Oficial del FURAT
                </h4>
                <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-blue-200 text-blue-900 border border-blue-300">
                  Dec. 1072/15 Art. 2.2.4.6.32
                </span>
              </div>
              
              {/* Conditional route text based on role */}
              {selectedRole === 'aprendiz_lectiva' && (
                <p className="text-xs sm:text-sm text-blue-950 leading-relaxed font-medium">
                  <strong>Aprendiz Etapa Lectiva:</strong> El instructor informa a la Coordinación Académica y Líder SST. Se diligencia el reporte interno R-SST-01 y se activa la cobertura de la <strong>Póliza Estudiantil Colectiva SENA</strong>. Si el aprendiz cuenta con ARL SENA por riesgo IV o V (Dec. 055/2015), el Líder SST radica el FURAT formal ante ARL Positiva.
                </p>
              )}

              {selectedRole === 'aprendiz_productiva' && (
                <p className="text-xs sm:text-sm text-blue-950 leading-relaxed font-medium">
                  <strong>Aprendiz Etapa Productiva (Contrato de Aprendizaje):</strong> La <strong>Empresa Patrocinadora</strong> tiene la obligación legal exclusiva de radicar el FURAT ante su respectiva ARL dentro de las 48 horas (Ley 789/2002 y Dec. 055/2015). La empresa debe remitir copia del FURAT al instructor de seguimiento del SENA CDATH para control de bienestar.
                </p>
              )}

              {selectedRole === 'instructor' && (
                <p className="text-xs sm:text-sm text-blue-950 leading-relaxed font-medium">
                  <strong>Instructor / Personal SENA:</strong> El Líder SST del CDATH y Talento Humano Regional Huila radican el FURAT directamente en el portal transaccional de <strong>ARL Positiva</strong> dentro del término legal improrrogable de 48 horas hábiles.
                </p>
              )}
            </div>
          </div>

          {/* Step 4: Día 1 a 15 */}
          <div className="relative">
            <span className="absolute -left-6 sm:-left-8 top-0 w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-purple-600 text-white text-xs font-black flex items-center justify-center ring-4 ring-white shadow-md">
              4
            </span>
            <div className="bg-purple-50/70 border-2 border-purple-300 rounded-2xl p-4 sm:p-5 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h4 className="text-sm sm:text-base font-black text-purple-950">
                  Día 1 a 15: Convocatoria del Equipo Investigador (Res. 1401 de 2007)
                </h4>
                <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-purple-200 text-purple-900 border border-purple-300">
                  Causa Raíz
                </span>
              </div>
              <p className="text-xs sm:text-sm text-purple-950 leading-relaxed font-medium">
                Convocatoria obligatoria del equipo investigador integrado por: <strong>1) Líder SST del Centro, 2) Jefe Inmediato / Instructor Técnico de la ficha, y 3) Representante del COPASST</strong>.
              </p>
              <p className="text-xs text-purple-800 font-medium">
                Aplicación de metodología analítica (Árbol de Causas, Diagrama de Ishikawa o 5 Porqués) para identificar causas básicas e inmediatas (actos y condiciones subestándar). Remisión del informe a la ARL.
              </p>
            </div>
          </div>

          {/* Step 5: Día 15 a 30 */}
          <div className="relative">
            <span className="absolute -left-6 sm:-left-8 top-0 w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-emerald-600 text-white text-xs font-black flex items-center justify-center ring-4 ring-white shadow-md">
              5
            </span>
            <div className="bg-emerald-50/70 border-2 border-emerald-300 rounded-2xl p-4 sm:p-5 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h4 className="text-sm sm:text-base font-black text-emerald-950">
                  Día 15 a 30: Plan de Acción Preventivo y Lección Aprendida
                </h4>
                <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-emerald-200 text-emerald-900 border border-emerald-300">
                  Mejora Continua
                </span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed font-medium">
                Implementación de medidas correctivas (adecuación de guardas, cambio de químicos, refuerzo de EPP). Divulgación de la <strong>"Lección de Seguridad"</strong> en las fichas del CDATH y registro en la matriz de mejora del SIGA SENA.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive FURAT Simulator */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-slate-200 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-xs font-black">
                SIMULADOR
              </span>
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                Formato Único de Reporte de Accidentes de Trabajo (FURAT / R-SST-01)
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Simule el diligenciamiento institucional con validación legal previa antes del envío oficial a ARL Positiva.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-[#39A900] bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
            +75 XP al Simular
          </span>
        </div>

        <form onSubmit={handleGenerateReport} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block text-slate-700 font-bold mb-1.5">Tipo de Evento a Reportar</label>
            <select
              value={reportForm.tipoEvento}
              onChange={(e) => setReportForm({ ...reportForm, tipoEvento: e.target.value as any })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-slate-50 font-medium focus:ring-2 focus:ring-[#39A900] text-slate-900"
            >
              <option value="incidente">Incidente (Casi-accidente sin lesión)</option>
              <option value="accidente_leve">Accidente de Trabajo Leve (Atención ambulatoria)</option>
              <option value="accidente_grave">Accidente de Trabajo Grave (Res. 1401/07)</option>
              <option value="accidente_mortal">Accidente Mortal (Alerta Inmediata MinTrabajo)</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1.5">Nombre Completo del Afectado</label>
            <input
              type="text"
              value={reportForm.nombreAfectado}
              onChange={(e) => setReportForm({ ...reportForm, nombreAfectado: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-slate-50 font-medium focus:ring-2 focus:ring-[#39A900] text-slate-900"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1.5">Documento de Identidad (CC/TI)</label>
            <input
              type="text"
              value={reportForm.identificacion}
              onChange={(e) => setReportForm({ ...reportForm, identificacion: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-slate-50 font-medium focus:ring-2 focus:ring-[#39A900] text-slate-900"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1.5">Ficha de Formación o Cargo</label>
            <input
              type="text"
              value={reportForm.fichaPrograma}
              onChange={(e) => setReportForm({ ...reportForm, fichaPrograma: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-slate-50 font-medium focus:ring-2 focus:ring-[#39A900] text-slate-900"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1.5">Fecha y Hora de Ocurrencia</label>
            <input
              type="datetime-local"
              value={reportForm.fechaHora}
              onChange={(e) => setReportForm({ ...reportForm, fechaHora: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-slate-50 font-medium focus:ring-2 focus:ring-[#39A900] text-slate-900"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1.5">Sede y Lugar Exacto</label>
            <input
              type="text"
              value={reportForm.lugarExacto}
              onChange={(e) => setReportForm({ ...reportForm, lugarExacto: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-slate-50 font-medium focus:ring-2 focus:ring-[#39A900] text-slate-900"
            />
          </div>

          <div className="md:col-span-2 lg:col-span-3">
            <label className="block text-slate-700 font-bold mb-1.5">Descripción Detallada de los Hechos</label>
            <textarea
              rows={3}
              value={reportForm.descripcionHechos}
              onChange={(e) => setReportForm({ ...reportForm, descripcionHechos: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-slate-50 font-medium focus:ring-2 focus:ring-[#39A900] text-slate-900"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1.5">Parte del Cuerpo Afectada</label>
            <input
              type="text"
              value={reportForm.parteCuerpoAfectada}
              onChange={(e) => setReportForm({ ...reportForm, parteCuerpoAfectada: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-slate-50 font-medium focus:ring-2 focus:ring-[#39A900] text-slate-900"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1.5">Agente o Mecanismo del Accidente</label>
            <input
              type="text"
              value={reportForm.agenteAccidente}
              onChange={(e) => setReportForm({ ...reportForm, agenteAccidente: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-slate-50 font-medium focus:ring-2 focus:ring-[#39A900] text-slate-900"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1.5">Primeros Auxilios Brindados</label>
            <input
              type="text"
              value={reportForm.primerosAuxiliosBrindados}
              onChange={(e) => setReportForm({ ...reportForm, primerosAuxiliosBrindados: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-slate-50 font-medium focus:ring-2 focus:ring-[#39A900] text-slate-900"
            />
          </div>

          <div className="md:col-span-2 lg:col-span-3 flex justify-end gap-3 pt-2">
            <button
              type="submit"
              className="btn-sst-green px-6 py-3 rounded-2xl text-xs sm:text-sm font-black flex items-center gap-2 shadow-lg cursor-pointer"
            >
              <Send className="w-4 h-4 text-white" />
              <span>Generar Radicado Oficial y Ficha Preliminar</span>
            </button>
          </div>
        </form>

        {/* Generated Report Output Box */}
        {generatedReport && (
          <div className="mt-6 p-6 sm:p-8 rounded-3xl bg-slate-950 text-white space-y-4 border-2 border-emerald-500 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#39A900] flex items-center justify-center font-black text-white text-lg shadow-md">
                  SENA
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-black text-white">REPORTE PRELIMINAR DE ACCIDENTE / INCIDENTE (FURAT)</h4>
                  <p className="text-xs text-emerald-400 font-mono font-bold">Radicado Oficial: {generatedReport}</p>
                </div>
              </div>
              <button
                onClick={() => window.print()}
                className="btn-sst-blue px-3.5 py-1.5 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Imprimir</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs text-slate-300">
              <div>
                <span className="text-slate-400 block text-[11px] font-bold">Afectado:</span>
                <span className="font-bold text-white text-sm">{reportForm.nombreAfectado}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px] font-bold">Documento:</span>
                <span className="font-bold text-white font-mono">{reportForm.identificacion}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px] font-bold">Tipo de Evento:</span>
                <span className="font-bold text-amber-300 uppercase">{reportForm.tipoEvento.replace('_', ' ')}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px] font-bold">Fecha y Hora:</span>
                <span className="font-bold text-white font-mono">{reportForm.fechaHora.replace('T', ' ')}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs space-y-1.5">
              <span className="text-amber-400 block text-[11px] font-mono uppercase font-black">Relato de los Hechos:</span>
              <p className="text-slate-200 leading-relaxed font-medium">{reportForm.descripcionHechos}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 block text-[11px] font-bold">Primeros Auxilios:</span>
                <span className="font-medium text-slate-200">{reportForm.primerosAuxiliosBrindados}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 block text-[11px] font-bold">Lesión / Parte Afectada:</span>
                <span className="text-rose-400 font-bold">{reportForm.parteCuerpoAfectada}</span>
              </div>
            </div>

            <div className="pt-3 text-[11px] text-slate-400 border-t border-slate-800 flex items-center justify-between">
              <span>Notificación transmitida al Líder SG-SST y COPASST CDATH.</span>
              <span className="text-emerald-400 font-mono font-bold">Enviado a ARL Positiva vía API</span>
            </div>
          </div>
        )}
      </div>

      {/* Directory of Emergency Contacts */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-slate-200 space-y-5">
        <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2.5 border-b border-slate-200 pb-3">
          <PhoneCall className="w-5 h-5 text-emerald-600" />
          Directorio de Enlace Rápido de Emergencias y Urgencias Médicas (CDATH Huila)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CONTACTOS_EMERGENCIA_HUILA.map((contacto, idx) => (
            <div key={idx} className="p-4 rounded-2xl border-2 border-slate-200 bg-slate-50/70 hover:bg-white hover:border-emerald-300 transition-all space-y-2 shadow-xs">
              <h4 className="text-xs sm:text-sm font-black text-slate-900 leading-snug">{contacto.entidad}</h4>
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-950 bg-emerald-100/80 px-2.5 py-1.5 rounded-xl border border-emerald-300">
                <PhoneCall className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0" />
                <span className="font-mono">{contacto.telefono}</span>
              </div>
              <p className="text-[11px] text-slate-600">
                <strong className="text-slate-800">Ubicación:</strong> {contacto.direccion}
              </p>
              <p className="text-[11px] text-slate-500 pt-1.5 border-t border-slate-200 font-medium">
                {contacto.cobertura}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
