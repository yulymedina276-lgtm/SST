import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { BANCO_PREGUNTAS_EVALUACION } from '../data/sstData';
import { QuizQuestion, SSTCertificate, UserRole } from '../types/sst';
import { useGamification } from '../context/GamificationContext';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Printer, 
  QrCode, 
  ShieldCheck, 
  FileCheck,
  GraduationCap,
  Sparkles,
  Info
} from 'lucide-react';

export const EvaluationView: React.FC = () => {
  const { addXp, unlockBadge } = useGamification();
  const [evalMode, setEvalMode] = useState<'pre_test' | 'post_test'>('post_test');
  
  // User profile state
  const [nombre, setNombre] = useState('Carlos Eduardo Medina');
  const [documento, setDocumento] = useState('1083921844');
  const [rol, setRol] = useState<UserRole>('aprendiz_lectiva');
  const [programa, setPrograma] = useState('Tecnólogo en Producción Agrícola');
  const [vocacion, setVocacion] = useState('Vocación Agropecuaria y Agroindustrial');

  // Answers state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [certificate, setCertificate] = useState<SSTCertificate | null>(null);

  // Filter questions depending on mode
  const currentQuestions: QuizQuestion[] = evalMode === 'pre_test'
    ? BANCO_PREGUNTAS_EVALUACION.slice(0, 5)
    : BANCO_PREGUNTAS_EVALUACION;

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleSubmitEvaluation = () => {
    let correctCount = 0;
    currentQuestions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correcta) {
        correctCount++;
      }
    });

    const calculatedPercentage = Math.round((correctCount / currentQuestions.length) * 100);
    setScore(calculatedPercentage);
    setSubmitted(true);

    if (evalMode === 'pre_test') {
      addXp(40, 'Pre-Test Diagnóstico Completado');
    }

    if (calculatedPercentage >= 80 && evalMode === 'post_test') {
      confetti({
        particleCount: 130,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#39A900', '#00324D', '#f59e0b', '#22c55e'],
      });

      addXp(150, '¡Inducción Oficial en SST Aprobada!');
      unlockBadge('maestro_normativo');

      const today = new Date();
      const nextYear = new Date();
      nextYear.setFullYear(today.getFullYear() + 1);

      const verificationCode = `CDATH-SST-${today.getFullYear()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

      setCertificate({
        codigoValidacion: verificationCode,
        nombre,
        documento,
        rol: rol === 'instructor' ? 'Instructor Técnico' : rol === 'aprendiz_lectiva' ? 'Aprendiz (Etapa Lectiva)' : 'Aprendiz (Etapa Productiva)',
        programaFormacion: programa,
        vocacion,
        puntaje: calculatedPercentage,
        fechaEmision: today.toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' }),
        vigenciaHasta: nextYear.toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' }),
      });
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setScore(0);
    setCertificate(null);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header and Mode Selector */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <span className="w-2.5 h-6 bg-[#39A900] rounded-full inline-block" />
              Mecanismo de Verificación y Evaluación de Competencias SST
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Instrumento medible para validar la asimilación del conocimiento (mínimo 80% para certificar inducción).
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => {
                setEvalMode('pre_test');
                handleReset();
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                evalMode === 'pre_test'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Pre-Test Diagnóstico (5 Q)
            </button>
            <button
              onClick={() => {
                setEvalMode('post_test');
                handleReset();
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                evalMode === 'post_test'
                  ? 'bg-[#39A900] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Post-Test Certificable (10 Q)
            </button>
          </div>
        </div>

        {/* User Identity Form */}
        <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
          <span className="text-xs font-bold text-slate-700 block mb-3 uppercase tracking-wider">
            Datos del Evaluado para Registro y Pasaporte Digital:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
            <div>
              <label className="block text-slate-500 mb-1 font-medium">Nombre Completo</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#39A900] text-slate-800"
                placeholder="Nombres y Apellidos"
              />
            </div>
            <div>
              <label className="block text-slate-500 mb-1 font-medium">Documento de Identidad</label>
              <input
                type="text"
                value={documento}
                onChange={(e) => setDocumento(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#39A900] text-slate-800"
                placeholder="C.C. o T.I."
              />
            </div>
            <div>
              <label className="block text-slate-500 mb-1 font-medium">Rol Institucional</label>
              <select
                value={rol}
                onChange={(e) => setRol(e.target.value as UserRole)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#39A900] text-slate-800"
              >
                <option value="aprendiz_lectiva">Aprendiz - Etapa Lectiva</option>
                <option value="aprendiz_productiva">Aprendiz - Etapa Productiva</option>
                <option value="instructor">Instructor Técnico / Misional</option>
                <option value="administrativo_contratista">Administrativo / Apoyo</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-500 mb-1 font-medium">Programa de Formación / Ficha</label>
              <input
                type="text"
                value={programa}
                onChange={(e) => setPrograma(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#39A900] text-slate-800"
                placeholder="Programa de Formación"
              />
            </div>
            <div>
              <label className="block text-slate-500 mb-1 font-medium">Vocación Regional</label>
              <select
                value={vocacion}
                onChange={(e) => setVocacion(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#39A900] text-slate-800"
              >
                <option value="Vocación Agropecuaria y Agroindustrial">Agropecuaria / Agroindustrial</option>
                <option value="Vocación Comercial, Administrativa y TIC">Comercial / TIC / Administración</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {currentQuestions.map((q, qIndex) => {
          const selected = selectedAnswers[q.id];
          const isAnswered = selected !== undefined;
          const isCorrect = submitted && selected === q.correcta;
          const isWrong = submitted && isAnswered && selected !== q.correcta;

          return (
            <div
              key={q.id}
              className={`p-5 rounded-2xl border transition-all ${
                submitted
                  ? isCorrect
                    ? 'bg-emerald-50/50 border-emerald-300'
                    : 'bg-rose-50/40 border-rose-300'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-slate-800 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {qIndex + 1}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                    {q.pregunta}
                  </h3>
                </div>
                {submitted && (
                  <div>
                    {isCorrect ? (
                      <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Correcto
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-md">
                        <XCircle className="w-3.5 h-3.5" /> Incorrecto
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Options */}
              <div className="space-y-2 pl-0 sm:pl-8">
                {q.opciones.map((op, opIdx) => {
                  const isThisOptionSelected = selected === opIdx;
                  let optionStyles = 'border-slate-200 hover:bg-slate-50 text-slate-700';

                  if (isThisOptionSelected && !submitted) {
                    optionStyles = 'border-[#39A900] bg-emerald-50 text-emerald-950 font-medium ring-1 ring-[#39A900]';
                  }

                  if (submitted) {
                    if (opIdx === q.correcta) {
                      optionStyles = 'border-emerald-500 bg-emerald-100/70 text-emerald-900 font-bold';
                    } else if (isThisOptionSelected && opIdx !== q.correcta) {
                      optionStyles = 'border-rose-400 bg-rose-100 text-rose-900 line-through';
                    } else {
                      optionStyles = 'border-slate-200 text-slate-400 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={opIdx}
                      disabled={submitted}
                      onClick={() => handleSelectOption(q.id, opIdx)}
                      className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all flex items-center gap-3 ${optionStyles}`}
                    >
                      <span
                        className={`w-5 h-5 rounded-full border text-[11px] font-bold flex items-center justify-center flex-shrink-0 ${
                          isThisOptionSelected
                            ? 'border-[#39A900] bg-[#39A900] text-white'
                            : 'border-slate-300 text-slate-500'
                        }`}
                      >
                        {String.fromCharCode(65 + opIdx)}
                      </span>
                      <span>{op}</span>
                    </button>
                  );
                })}
              </div>

              {/* Submitted Feedback Explanation */}
              {submitted && (
                <div className="mt-3.5 ml-0 sm:ml-8 p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900">
                    <Info className="w-3.5 h-3.5 text-blue-600" />
                    <span>Justificación Técnico-Legal:</span>
                  </div>
                  <p className="leading-relaxed">{q.explicacion}</p>
                  <p className="text-[11px] text-emerald-800 font-mono font-medium pt-1 border-t border-slate-100">
                    Base: {q.referenciaNormativa}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Actions and Submit */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          {!submitted ? (
            <p className="text-xs text-slate-600">
              Respondidas: <strong className="text-slate-900">{Object.keys(selectedAnswers).length}</strong> de{' '}
              <strong className="text-slate-900">{currentQuestions.length}</strong> preguntas.
            </p>
          ) : (
            <div className="flex items-center gap-3">
              <div
                className={`text-2xl font-black px-3 py-1 rounded-xl ${
                  score >= 80 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                }`}
              >
                {score}%
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  {score >= 80 ? '¡Felicitaciones! Inducción Aprobada' : 'No se alcanzó el puntaje mínimo (80%)'}
                </h4>
                <p className="text-xs text-slate-500">
                  {score >= 80
                    ? 'Ha demostrado dominio de los protocolos de autoprotección y normatividad SST.'
                    : 'Repase los módulos temáticos y vuelva a presentar la prueba.'}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          {submitted ? (
            <button
              onClick={handleReset}
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 transition flex items-center gap-2 border border-slate-300 shadow-2xs"
            >
              <RotateCcw className="w-4 h-4 text-slate-600" />
              Reiniciar Evaluación
            </button>
          ) : (
            <button
              disabled={Object.keys(selectedAnswers).length < currentQuestions.length}
              onClick={handleSubmitEvaluation}
              className={`px-7 py-3 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-2 ${
                Object.keys(selectedAnswers).length === currentQuestions.length
                  ? 'btn-sst-green shadow-lg'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              Calificar y Validar Respuestas (+150 XP)
            </button>
          )}
        </div>
      </div>

      {/* Official Certificate Section (Rendered when passed >= 80% on post_test) */}
      {certificate && (
        <div id="certificado-oficial-print" className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border-4 border-[#00324D] relative overflow-hidden space-y-6">
          {/* Top Decorative Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b-2 border-slate-200 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-[#39A900] text-white flex items-center justify-center font-black text-2xl shadow-md">
                SENA
              </div>
              <div>
                <h3 className="text-lg font-black tracking-tight text-[#00324D]">
                  SERVICIO NACIONAL DE APRENDIZAJE - SENA
                </h3>
                <p className="text-xs text-slate-600 font-medium">
                  Regional Huila • Centro de Desarrollo Agroempresarial y Turístico del Huila (CDATH)
                </p>
                <p className="text-[11px] text-emerald-800 font-mono">
                  Sistema de Gestión de la Seguridad y Salud en el Trabajo (SG-SST)
                </p>
              </div>
            </div>

            <div className="text-right flex flex-col items-center sm:items-end">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                CERTIFICACIÓN OFICIAL APROBADA
              </span>
              <span className="text-[10px] text-slate-500 font-mono mt-1">
                Ref: {certificate.codigoValidacion}
              </span>
            </div>
          </div>

          {/* Certificate Body */}
          <div className="text-center space-y-4 max-w-2xl mx-auto py-2">
            <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">
              Hace constar que:
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 border-b border-slate-200 pb-2">
              {certificate.nombre}
            </h2>
            <p className="text-xs text-slate-600 font-medium">
              Identificado(a) con C.C./T.I. <strong className="text-slate-800">{certificate.documento}</strong>, en calidad de{' '}
              <strong className="text-slate-800">{certificate.rol}</strong> del programa{' '}
              <strong className="text-slate-800">{certificate.programaFormacion}</strong>.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Cumplió satisfactoriamente con la totalidad de los requisitos pedagógicos, normativos y operacionales de la:
            </p>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <h4 className="text-base sm:text-lg font-black text-[#00324D]">
                INDUCCIÓN INTEGRAL EN SEGURIDAD Y SALUD EN EL TRABAJO (SST)
              </h4>
              <p className="text-xs text-emerald-800 font-semibold mt-1">
                {certificate.vocacion} • Decreto 1072 de 2015 & Resolución 0312 de 2019
              </p>
            </div>
            <p className="text-xs text-slate-500">
              Con una calificación aprobatoria de <strong className="text-emerald-700 font-bold">{certificate.puntaje}%</strong>{' '}
              en el examen de verificación de competencias y protocolo de autoprotección.
            </p>
          </div>

          {/* Signatures & QR Footer */}
          <div className="border-t-2 border-slate-200 pt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center text-xs">
            {/* Signature 1 */}
            <div className="text-center border-t border-slate-400/80 pt-2 mx-4">
              <p className="font-bold text-slate-900">Esp. Líder SG-SST</p>
              <p className="text-[11px] text-slate-500">CDATH - SENA La Plata</p>
              <p className="text-[10px] text-slate-400 font-mono">Licencia SST Res. MinSalud</p>
            </div>

            {/* QR Code and Validation */}
            <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-50 border border-slate-200">
              <QrCode className="w-12 h-12 text-[#00324D] mb-1" />
              <span className="text-[10px] text-slate-600 font-mono text-center">
                Validar en: siga.sena.edu.co/sst/{certificate.codigoValidacion}
              </span>
            </div>

            {/* Signature 2 */}
            <div className="text-center border-t border-slate-400/80 pt-2 mx-4">
              <p className="font-bold text-slate-900">Subdirección de Centro</p>
              <p className="text-[11px] text-slate-500">CDATH Regional Huila</p>
              <p className="text-[10px] text-slate-400">Emisión: {certificate.fechaEmision}</p>
            </div>
          </div>

          {/* Print Button */}
          <div className="flex justify-end pt-2">
            <button
              onClick={handlePrint}
              className="btn-sst-navy px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md"
            >
              <Printer className="w-4 h-4 text-emerald-400" />
              Imprimir / Guardar en PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
