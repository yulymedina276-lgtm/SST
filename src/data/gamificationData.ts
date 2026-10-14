import { Badge, QuickChallenge } from '../types/gamification';

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'detector_peligros',
    name: 'Ojo Avizor GTC 45',
    description: 'Exploró los peligros y controles en los módulos técnicos de la inducción.',
    icon: 'Search',
    unlocked: false,
    xpReward: 50,
  },
  {
    id: 'guardian_campo',
    name: 'Guardián del Campo 5S',
    description: 'Completó la lista de chequeo de comportamientos seguros en terreno (LCS-SST-01).',
    icon: 'ShieldCheck',
    unlocked: false,
    xpReward: 100,
  },
  {
    id: 'maestro_normativo',
    name: 'Maestría Dec. 1072',
    description: 'Aprobó el examen oficial de certificación en SST con 80% o más.',
    icon: 'Award',
    unlocked: false,
    xpReward: 150,
  },
  {
    id: 'primer_respondiente',
    name: 'Primer Respondiente Activo',
    description: 'Simuló un reporte de incidente/accidente de trabajo (FURAT) en la Ruta Crítica.',
    icon: 'Zap',
    unlocked: false,
    xpReward: 75,
  },
  {
    id: 'racha_segura',
    name: 'Racha Imbatible de Seguridad',
    description: 'Acertó 5 desafíos rápidos de autoprotección consecutivos sin errores.',
    icon: 'Flame',
    unlocked: false,
    xpReward: 120,
  },
  {
    id: 'consultor_siga',
    name: 'Investigador SST SENA',
    description: 'Realizó una consulta técnica al Asesor Especialista IA.',
    icon: 'Sparkles',
    unlocked: false,
    xpReward: 40,
  },
];

export const QUICK_CHALLENGES: QuickChallenge[] = [
  {
    id: 1,
    scenario: 'En la planta de agroindustria, una piedra traba el tambor de la despulpadora de café mientras el motor está energizado. ¿Cuál es la acción segura?',
    category: 'agro',
    options: [
      {
        text: 'Meter la mano con guante de tela para destrabar rápidamente el cilindro.',
        isCorrect: false,
        feedback: '¡Peligro crítico! Nunca introduzca las manos en maquinaria energizada: genera amputaciones instantáneas.',
      },
      {
        text: 'Desconectar la fuente de energía, aplicar bloqueo LOTO y usar herramienta auxiliar.',
        isCorrect: true,
        feedback: '¡Excelente! El bloqueo y etiquetado (LOTO) con desenergización previa previene arranques inesperados.',
      },
      {
        text: 'Acelerar el motor para forzar a que la piedra se quiebre.',
        isCorrect: false,
        feedback: 'Incorrecto: puede fracturar la camisa de cobre y proyectar esquirlas a alta velocidad.',
      },
    ],
    normativa: 'Res. 2400 de 1979 (Maquinaria) / Estándar LOTO SENA',
  },
  {
    id: 2,
    scenario: 'Encuentras un derrame de aceite lubricante en el pasillo central del taller de maquinaria agrícola. ¿Qué haces?',
    category: 'agro',
    options: [
      {
        text: 'Saltar el charco y avisar al final de la jornada cuando termine la práctica.',
        isCorrect: false,
        feedback: 'No postergar: el piso con aceite es la primera causa de fracturas por caídas a nivel.',
      },
      {
        text: 'Señalizar de inmediato con cono amarillo y aplicar material absorbente del kit antiderrame.',
        isCorrect: true,
        feedback: '¡Correcto! La señalización inmediata y absorción controlada elimina la condición insegura al instante.',
      },
      {
        text: 'Echar agua a presión para empujar el aceite hacia la cuneta exterior.',
        isCorrect: false,
        feedback: 'Contamina fuentes hídricas y expande la película resbalosa en todo el piso.',
      },
    ],
    normativa: 'Programa 5S / Dec. 1072 de 2015 Art. 2.2.4.6.24',
  },
  {
    id: 3,
    scenario: 'Un aprendiz va a iniciar la guadañada en el cerco de la finca del CDATH. Observas que solo lleva tenis de tela y gorra. ¿Cómo actúas?',
    category: 'epp',
    options: [
      {
        text: 'Permitirle guadañar si promete mantenerse alejado de las piedras.',
        isCorrect: false,
        feedback: 'El disco o nylon proyecta piedras a más de 120 km/h que perforan el calzado de lona.',
      },
      {
        text: 'Ejercer Stop Work Authority: exigir careta de policarbonato, canilleras y botas de seguridad con puntera.',
        isCorrect: true,
        feedback: '¡Decisión de líder! La Autoridad de Parada Preventiva protege la integridad del aprendiz.',
      },
      {
        text: 'Decirle que solo use gafas de sol para protegerse los ojos.',
        isCorrect: false,
        feedback: 'Las gafas de sol no resisten impactos balísticos ni protegen las piernas.',
      },
    ],
    normativa: 'Res. 2400 de 1979 / Guía de EPP en Maquinaria Agrícola',
  },
  {
    id: 4,
    scenario: 'Encuentras en el suelo de la bodega de la finca una botella plástica de gaseosa con un líquido azul sin ninguna etiqueta. ¿Cuál es el procedimiento SGA?',
    category: 'agro',
    options: [
      {
        text: 'Destaparla y oler suavemente para identificar si es fungicida o desinfectante.',
        isCorrect: false,
        feedback: '¡Jamás huela químicos desconocidos! Puede sufrir intoxicación aguda o quemadura respiratoria.',
      },
      {
        text: 'Aislarla, reportar al encargado de almacén y proceder a su reenvase o rotulado con pictogramas SGA.',
        isCorrect: true,
        feedback: '¡Exacto! Todo producto químico debe estar identificado con su etiqueta oficial y FDS correspondiente.',
      },
      {
        text: 'Botarla a la caneca de basura ordinaria para que no estorbe.',
        isCorrect: false,
        feedback: 'Es un residuo peligroso (RESPEL) que requiere disposición ambiental certificada.',
      },
    ],
    normativa: 'Decreto 1496 de 2018 (SGA) / Dec. 1076 de 2015',
  },
  {
    id: 5,
    scenario: 'Un compañero sufre una mordedura de serpiente en el tobillo mientras recogía café en la parcela. ¿Cuál es la primera regla salva-vidas?',
    category: 'emergencia',
    options: [
      {
        text: 'Amarrar un torniquete con el cinturón, hacer cortes con navaja y chupar la herida.',
        isCorrect: false,
        feedback: '¡Falso y letal! El torniquete concentra el veneno provocando gangrena y necrosis acelerada.',
      },
      {
        text: 'Mantener al afectado en calma absoluta y reposo, inmovilizar la pierna y trasladarlo al Hospital de La Plata.',
        isCorrect: true,
        feedback: '¡Perfecto! El reposo disminuye la circulación sistémica del veneno y el suero antiofídico salva su vida.',
      },
      {
        text: 'Hacerlo correr hasta la portería para que el veneno salga con el sudor.',
        isCorrect: false,
        feedback: 'El ejercicio acelera el ritmo cardíaco y dispersa el veneno en segundos.',
      },
    ],
    normativa: 'Protocolo Nacional de Vigilancia Epidemiológica de Accidente Ofídico - INS',
  },
  {
    id: 6,
    scenario: 'En el aula de digitación contable llevas 3 horas continuas digitando y sientes ardor en el cuello y muñecas. ¿Cuál es la conducta ergonómica?',
    category: 'admin',
    options: [
      {
        text: 'Tomar café o energizante para aguantar y terminar más rápido.',
        isCorrect: false,
        feedback: 'La cafeína no reduce la compresión mecánica de los tendones ni la fatiga postural.',
      },
      {
        text: 'Realizar una pausa activa dinámica de 5 minutos con estiramientos osteomusculares y descanso visual 20-20-20.',
        isCorrect: true,
        feedback: '¡Muy bien! Las micropausas activas restauran la oxigenación de tendones y previenen el túnel carpiano.',
      },
      {
        text: 'Bajar la cabeza hacia el teclado para no mirar la pantalla.',
        isCorrect: false,
        feedback: 'Aumenta la tensión cervical (peso aparente de la cabeza sube de 5 kg a más de 20 kg).',
      },
    ],
    normativa: 'Guía Técnica de Ergonomía MinTrabajo / ISO 9241',
  },
  {
    id: 7,
    scenario: 'Llega un cargamento de bultos de fertilizante orgánico de 45 kg cada uno. ¿Cómo deben descargarse?',
    category: 'agro',
    options: [
      {
        text: 'Cada aprendiz debe cargar un bulto en el hombro de forma individual para probar resistencia.',
        isCorrect: false,
        feedback: 'El límite legal máximo para varones es 25 kg y para mujeres 12.5 kg. Levantar 45 kg causa hernias discales.',
      },
      {
        text: 'Usar carretilla de carga (ayuda mecánica) o realizar levantamiento en equipo coordinado entre dos personas.',
        isCorrect: true,
        feedback: '¡Correcto! El uso de ayudas mecánicas y trabajo en binomio protege la columna dorsolumbar.',
      },
      {
        text: 'Arrastrarlos halando con la espalda encorvada.',
        isCorrect: false,
        feedback: 'Rompe los sacos y genera sobreesfuerzo lumbar peligroso.',
      },
    ],
    normativa: 'Resolución 2400 de 1979, Artículo 392',
  },
  {
    id: 8,
    scenario: 'En la sala de sistemas se percibe olor a plástico quemado y chispas en una multitoma conectada a 8 computadores. ¿Qué haces?',
    category: 'admin',
    options: [
      {
        text: 'Echarle un vaso de agua mineral para enfriar la regleta.',
        isCorrect: false,
        feedback: '¡Peligro de electrocución! El agua conduce la electricidad y causará un arco eléctrico.',
      },
      {
        text: 'Desconectar la clavija principal de la pared tomándola por el cuerpo aislante y avisar a mantenimiento.',
        isCorrect: true,
        feedback: '¡Excelente! Cortar la alimentación eléctrica en el origen sin tocar cables expuestos extingue el conato.',
      },
      {
        text: 'Tapar la regleta con una chaqueta para que el humo no moleste.',
        isCorrect: false,
        feedback: 'La tela alimentará el conato de incendio estructural.',
      },
    ],
    normativa: 'Reglamento Técnico de Instalaciones Eléctricas (RETIE) / NFPA 70E',
  },
];
