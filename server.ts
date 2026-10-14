import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize GoogleGenAI client if GEMINI_API_KEY is present
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Endpoint: AI SST Advisor for SENA CDATH Huila
app.post('/api/gemini/advisor', async (req, res) => {
  try {
    const { message, context, userRole } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'El mensaje es requerido.' });
    }

    if (!ai) {
      // Fallback expert guidance if key is not configured
      return res.json({
        reply: `[Modo Normativo Local SST-SENA]\n\nComo Especialista SST del SENA CDATH Huila, referente a su consulta: "${message}":\n\n1. Marco Normativo Aplicable: Decreto 1072 de 2015 (Libro 2, Parte 2, Título 4, Capítulo 6) y Resolución 0312 de 2019 (Estándares Mínimos SG-SST).\n2. Medidas de Control Operativo: Verifique siempre la Matriz de Peligros GTC 45, aplique la jerarquía de controles (Eliminación, Sustitución, Controles de Ingeniería, Señalización/Advertencia, EPP específicos).\n3. En caso de incidente o accidente, active de inmediato la Ruta Crítica y notifique al Líder SST del Centro en un plazo máximo de 48 horas para radicación FURAT ante ARL Positiva.`,
      });
    }

    const systemInstruction = `Eres el Líder Especialista en Seguridad y Salud en el Trabajo (SST) del SENA - Centro de Desarrollo Agroempresarial y Turístico del Huila (CDATH, sede principal en La Plata, subsedes y áreas de influencia en el occidente y sur del Huila).
Tu labor es brindar orientación pedagógica, técnica y legal rigurosa a instructores y aprendices de áreas agropecuarias (café, cacao, ganadería, piscicultura, frutales), agroindustriales (panela, transformación de alimentos), comerciales (gestión contable, finanzas) y administrativas/TIC (sistemas, desarrollo de software).

Marco Normativo Mandatorio:
- Decreto Único Reglamentario del Sector Trabajo 1072 de 2015.
- Resolución 0312 de 2019 (Estándares Mínimos del SG-SST).
- Ley 1562 de 2012 (Sistema General de Riesgos Laborales).
- Resolución 2400 de 1979 (Estatuto de Seguridad Industrial).
- Decreto 055 de 2015 (Afiliación a ARL de estudiantes/aprendices en práctica).
- Guía Técnica Colombiana GTC 45 (Identificación de peligros y valoración de riesgos).
- Sistema Globalmente Armonizado (SGA / Decreto 1496 de 2018) para sustancias químicas y fitosanitarios.
- Políticas Institucionales del SENA y funciones del COPASST / Comité de Convivencia Laboral.

Tono:
- Institucional, empático, claro, pedagógico y resolutivo.
- Cita siempre la norma o protocolo SENA correspondiente.
- Si plantean un caso de accidente de trabajo (AT), detalla de inmediato los primeros auxilios de contención y la ruta de reporte en menos de 48 horas ante ARL y Líder SST.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Contexto del usuario: Rol = ${userRole || 'Comunidad SENA'}, Área = ${context || 'General'}\n\nConsulta o Caso: ${message}`,
      config: {
        systemInstruction,
        temperature: 0.4,
      },
    });

    const reply = response.text || 'No se pudo generar una respuesta en este momento.';
    return res.json({ reply });
  } catch (error: any) {
    console.error('Error in /api/gemini/advisor:', error);
    return res.status(500).json({
      error: 'Error procesando la consulta con el Asesor SST.',
      details: error.message,
    });
  }
});

// Production vs Development Setup
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SST SENA CDATH server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
