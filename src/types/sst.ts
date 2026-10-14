export type AreaVocacion = 'transversal' | 'agro' | 'administracion';

export type UserRole = 'aprendiz_lectiva' | 'aprendiz_productiva' | 'instructor' | 'administrativo_contratista';

export interface SSTModuleContent {
  id: string;
  vocacion: AreaVocacion;
  title: string;
  badge: string;
  iconName: string;
  summary: string;
  normativa: string[];
  sedesAmbientes: string[];
  peligrosGTC45: {
    tipo: string;
    descripcion: string;
    consecuencia: string;
    controlIngenieria: string;
    controlAdministrativo: string;
    eppObligatorio: string[];
  }[];
  protocoloOperativo: {
    paso: number;
    titulo: string;
    instruccion: string;
    alerta: string;
  }[];
  fichaEmergencia: {
    queHacer: string[];
    queEvitar: string[];
    equipoRequerido: string;
  };
}

export interface QuizQuestion {
  id: number;
  vocacion: AreaVocacion | 'todos';
  pregunta: string;
  opciones: string[];
  correcta: number; // 0-indexed
  explicacion: string;
  referenciaNormativa: string;
}

export interface ChecklistItem {
  id: string;
  area: AreaVocacion;
  item: string;
  criterio: string;
  normativa: string;
}

export interface IncidentReportForm {
  tipoEvento: 'incidente' | 'accidente_leve' | 'accidente_grave' | 'accidente_mortal';
  nombreAfectado: string;
  identificacion: string;
  rol: UserRole;
  fichaPrograma: string;
  areaAmbiente: string;
  sede: string;
  fechaHora: string;
  lugarExacto: string;
  descripcionHechos: string;
  parteCuerpoAfectada: string;
  agenteAccidente: string;
  primerosAuxiliosBrindados: string;
  testigos: string;
  atendidoPor: string;
}

export interface SSTCertificate {
  codigoValidacion: string;
  nombre: string;
  documento: string;
  rol: string;
  programaFormacion: string;
  vocacion: string;
  puntaje: number;
  fechaEmision: string;
  vigenciaHasta: string;
}
