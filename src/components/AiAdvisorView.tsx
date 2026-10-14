import React, { useState } from 'react';
import { useGamification } from '../context/GamificationContext';
import { 
  Sparkles, 
  Send, 
  User, 
  Bot, 
  ShieldCheck, 
  HelpCircle, 
  RotateCcw,
  BookOpen,
  AlertTriangle
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const AiAdvisorView: React.FC = () => {
  const { addXp, unlockBadge } = useGamification();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: '¡Cordial saludo! Soy el Asesor Especialista en Seguridad y Salud en el Trabajo (SST) del SENA - Centro de Desarrollo Agroempresarial y Turístico del Huila (CDATH).\n\nPuedo orientarle en la aplicación del Decreto 1072 de 2015, la Resolución 0312 de 2019, matrices de riesgo GTC 45, manejo seguro de fitosanitarios (SGA), protocolos de emergencia en parcelas de café, talleres de mecanización y salas de sistemas/oficinas, o en la ruta de reporte de accidentes de trabajo ante la ARL Positiva. ¿En qué situación técnica o legal puedo apoyarle hoy?',
      timestamp: 'Ahora',
    },
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedContext, setSelectedContext] = useState('Vocación Agropecuaria y Agroindustrial');
  const [selectedRole, setSelectedRole] = useState('Instructor Técnico');

  const sampleQuestions = [
    '¿Cuál es el protocolo exacto ante una mordedura de serpiente en el cafetal del CDATH?',
    '¿Cómo actuar ante un atrapamiento en la toma de fuerza (PTO) del tractor o trapiche?',
    '¿Qué EPP específicos exige el SGA para fumigar con plaguicidas de categoría II?',
    '¿Cómo conformar el equipo de investigación de un accidente según la Resolución 1401 de 2007?',
    '¿Cuáles son los límites de carga permitidos en el levantamiento manual de bultos de café?',
  ];

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setLoading(true);

    try {
      const response = await fetch('/api/gemini/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          context: selectedContext,
          userRole: selectedRole,
        }),
      });

      const data = await response.json();
      const replyText = data.reply || data.error || 'No se recibió respuesta del asesor.';

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
      addXp(40, 'Consulta Técnica Realizada al Asesor SST');
      unlockBadge('consultor_siga');
    } catch (error: any) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: 'Ocurrió un error al contactar al servidor SST. Por favor intente nuevamente.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([messages[0]]);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner with SST Industrial Styling */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-7 bg-[#39A900] rounded-full inline-block shadow-sm" />
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2.5 tracking-tight">
                Asesor Virtual Especialista en SST - SENA CDATH
                <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                  Gemini 3.8 Flash
                </span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5 font-medium">
              Consulte normatividad colombiana (Dec. 1072, Res. 0312, GTC 45), procedimientos operativos, análisis de causas de incidentes y protocolos institucionales.
            </p>
          </div>

          <button
            onClick={handleClearChat}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition flex items-center gap-2 self-start md:self-auto border border-slate-300 shadow-xs cursor-pointer active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reiniciar Consulta</span>
          </button>
        </div>

        {/* Filters Context */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-5 text-xs">
          <div>
            <label className="block text-slate-700 mb-1.5 font-bold">Área Temática / Vocación</label>
            <select
              value={selectedContext}
              onChange={(e) => setSelectedContext(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 font-medium focus:ring-2 focus:ring-[#39A900] outline-none"
            >
              <option value="Vocación Agropecuaria y Agroindustrial">Vocación Agropecuaria y Agroindustrial</option>
              <option value="Vocación Comercial, Administrativa y TIC">Vocación Comercial, Administrativa y TIC</option>
              <option value="Marco Transversal y Planes de Emergencia">Marco Transversal y Planes de Emergencia</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-700 mb-1.5 font-bold">Su Rol en el SENA</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 font-medium focus:ring-2 focus:ring-[#39A900] outline-none"
            >
              <option value="Instructor Técnico">Instructor Técnico / Misional</option>
              <option value="Aprendiz Etapa Lectiva">Aprendiz - Etapa Lectiva</option>
              <option value="Aprendiz Etapa Productiva">Aprendiz - Etapa Productiva</option>
              <option value="Miembro del COPASST / Brigada">Miembro del COPASST / Brigadista</option>
              <option value="Coordinador de Formación">Coordinador Académico / Misional</option>
            </select>
          </div>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="mt-5 pt-4 border-t border-slate-100">
          <span className="text-xs font-black uppercase tracking-wider text-slate-600 block mb-2.5">
            Preguntas Frecuentes y Casos Prácticos en el Huila (+40 XP):
          </span>
          <div className="flex flex-wrap gap-2">
            {sampleQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="text-xs font-medium px-3.5 py-1.5 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:border-emerald-400 border border-slate-200 text-slate-800 hover:text-emerald-950 transition text-left shadow-2xs cursor-pointer active:scale-95"
              >
                💡 {q}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="bg-white rounded-3xl shadow-xl border-2 border-slate-200 overflow-hidden flex flex-col h-[540px]">
        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 max-w-3xl ${
                msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0 text-xs font-black shadow-md ${
                  msg.sender === 'user'
                    ? 'bg-[#00324D] text-white'
                    : 'bg-[#39A900] text-white'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`p-4 sm:p-5 rounded-2xl text-xs sm:text-sm space-y-1.5 shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-[#00324D] to-[#002235] text-white rounded-tr-none'
                    : 'bg-white text-slate-800 border-2 border-slate-200/80 rounded-tl-none'
                }`}
              >
                <div className="flex items-center justify-between gap-4 text-[10px] opacity-75 mb-1 font-bold">
                  <span>{msg.sender === 'user' ? 'Usted' : 'Líder Especialista SST CDATH'}</span>
                  <span>{msg.timestamp}</span>
                </div>
                <div className="whitespace-pre-line leading-relaxed font-normal">{msg.text}</div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-start gap-3 max-w-xl">
              <div className="w-9 h-9 rounded-2xl bg-[#39A900] text-white flex items-center justify-center flex-shrink-0 shadow-md">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 text-xs text-slate-600 rounded-tl-none flex items-center gap-2.5 shadow-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping" />
                <span className="font-semibold">Consultando bases normativas del Dec. 1072 y formulando directriz...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar with SST Tactile Button */}
        <div className="p-4 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2.5"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Escriba su consulta o describa una situación de riesgo..."
              className="flex-1 px-4 py-3 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#39A900] text-xs sm:text-sm text-slate-900 bg-slate-50 font-medium"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || loading}
              className={`btn-sst-green px-6 py-3 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 shadow-md cursor-pointer ${
                !inputMessage.trim() || loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <Send className="w-4 h-4 text-white" />
              <span>Consultar</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
