/**
 * Datos del Ciclo de Capacitaciones de Rotaract Arrecifes.
 * Cada edición tiene:
 *   - id, edition, status: 'upcoming' | 'past'
 *   - topic, speaker, speakerBio, speakerPhoto, date (ISO), time, platform, meetLink, registrationLink
 *   - summary (para charlas pasadas): breve descripción de lo que se vio
 *   - keyTakeaways (para charlas pasadas): array de puntos aprendidos
 *   - attendees (para charlas pasadas): cantidad de asistentes
 */



export const CAPACITACIONES = [
  {
    id: 'cap-001',
    edition: 1,
    status: 'past',
    topic: 'Finanzas Personales',
    tagline: 'Tu Plata, Tus Reglas',
    description:
      `En esta primera capacitación del ciclo abordamos las finanzas personales desde una mirada práctica y cercana, generando un espacio para aprender, reflexionar e incorporar nuevas herramientas.

La propuesta estuvo pensada para que cada participante pueda comprender mejor su relación con el dinero, revisar sus hábitos y adquirir conocimientos que permitan tomar decisiones más conscientes en la vida cotidiana.

No importa cuánto sepas previamente sobre el tema: la charla estuvo abierta a toda la comunidad y buscó acercar las finanzas personales de una manera simple y accesible.`,
    speaker: 'Luciano Gilabert',
    speakerPhoto: '/images/oradores/luciano.jpeg',
    speakerBio:
      `Contador Público y Licenciado en Administración de Empresas.

Luciano se desempeñó como Gobernador del Distrito 4895 de Rotary International (periodo 2024-2025) y como Auditor Financiero Voluntario de la Fundación Rotaria (CADRE). Cuenta con una amplia trayectoria como orador y capacitador internacional, habiendo brindado conferencias en Uruguay, Brasil, Perú, Ecuador, Bolivia, Chile, República Dominicana y Estados Unidos.

Es múltiple socio Paul Harris y en mayo de 2022 recibió el premio "Dar de sí antes de pensar en sí", máximo galardón que otorga Rotary International a los 150 rotarios más destacados del mundo.`,
    date: '2026-09-30',
    time: '19:30',
    platform: 'Google Meet',
    area: 'Economía Personal',
    votedFirst: true,
    summary:
      `La charla inaugural del Ciclo de Capacitaciones reunió a la comunidad para hablar de finanzas personales con Luciano Gilabert, contador público y ex gobernador del Distrito 4895 de Rotary. Bajo el lema "Tu Plata, Tus Reglas", el encuentro recorrió desde conceptos básicos de organización financiera hasta estrategias de ahorro e inversión, con ejemplos concretos y herramientas para aplicar desde el día siguiente.`,
    keyTakeaways: [
      'El dinero no es un fin: es un medio para cumplir sueños y objetivos concretos.',
      'No importa cuánto ganás, sino qué hacés con lo que ganás.',
      'Los gastos hormiga (kiosco, compras impulsivas) se acumulan sin que los registremos.',
      'El presupuesto mensual debe basarse en gastos reales y actualizarse mes a mes, incluyendo una partida de imprevistos.',
      'La "bolucompra" es la compra impulsiva generada por marketing: la regla de las 24 hs ayuda a evitarla.',
      'Ahorro no es lo que sobra: es una partida fija y consciente dentro del presupuesto.',
      'La diferencia clave entre ahorro e inversión: el ahorro guarda dinero, la inversión lo hace crecer por encima de la inflación.',
      'El plazo fijo y las billeteras virtuales (~19-21% anual) no superan la inflación actual (~27-28%): protegen pero no generan ganancia real.',
      'El dólar no es una buena inversión hoy: quien compró hace 4 años perdió en términos reales.',
      'Alternativas con más potencial: fondos comunes de inversión, bonos y acciones, idealmente con asesoramiento de un broker.',
      'Diversificar ingresos más allá del empleo principal es clave para la estabilidad financiera.',
      'Contratar un retiro programado de joven reduce la prima y maximiza la capitalización.',
    ],
    attendees: null,
  },
  {
    id: 'cap-002',
    edition: 2,
    status: 'past',
    topic: 'El poder de la palabra: comunicar para inspirar, convencer y conectar',
    tagline: 'Comunicar para inspirar, convencer y conectar',
    description:
      `¿Alguna vez te pusiste a pensar cómo nuestras palabras pueden transformar realidades, motivar a un equipo o tender puentes con quienes piensan diferente?

En el marco de nuestro Ciclo de Capacitaciones, tuvimos el enorme honor de recibir a una referente indiscutida de nuestra familia rotaria. Reflexionamos juntos sobre cómo expresar nuestras ideas con claridad, transmitir entusiasmo y convencer sin imponer.

¡Una oportunidad única para potenciar nuestro liderazgo y nuestra comunicación cotidiana!`,
    speaker: 'Celia Cruz de Giay',
    speakerPhoto: '/images/oradores/celia.jpeg',
    speakerBio:
      `Educadora, periodista, escritora y líder social argentina, reconocida internacionalmente como una de las figuras pioneras en el liderazgo femenino dentro de Rotary International. Estuvo casada con Luis Vicente Giay, primer argentino en presidir Rotary International a nivel mundial (1996-1997).

• Primera mujer latinoamericana en la Junta Directiva: Directora de Rotary International (2013-2015).

• Segunda mujer vicepresidenta mundial: Vicepresidente de Rotary International (2014-2015), la segunda mujer en la historia de la organización en ocupar ese cargo y la primera latinoamericana.

• Gobernadora del Distrito 4820 de Rotary International en Argentina, impulsando proyectos comunitarios de impacto regional.

• Coordinadora Regional de La Fundación Rotaria (2009-2012), promoviendo subvenciones educativas, sanitarias y programas de desarrollo comunitario.

• Dirigió y editó la revista oficial Vida Rotaria, contribuyendo a la comunicación institucional, la formación de líderes y la divulgación de programas de servicio en los países de habla hispana.`,
    date: '2026-10-28',
    time: '19:30',
    platform: 'Google Meet',
    area: 'Comunicación',
    votedFirst: false,
    summary:
      `En el segundo encuentro del Ciclo de Capacitaciones, Celia Cruz de Giay —ex vicepresidenta de Rotary International y referente histórica del distrito— nos invitó a reflexionar sobre cómo las palabras construyen realidades. A través de dinámicas participativas y experiencias personales como la histórica Convención Virtual de Honolulu 2020 (que reunió a 60.700 personas en plena pandemia), abordamos herramientas concretas para inspirar desde el ejemplo, convencer sin imponer y escuchar activamente para conectar con los demás.`,
    keyTakeaways: [
      'Las palabras construyen o destruyen realidades: pueden abrir una conversación, despertar capacidades ocultas o cerrar una puerta.',
      'Inspirar no requiere ocupar un gran cargo: cualquiera puede hacerlo si transmite convicción y disposición a acompañar.',
      'Decirle a alguien qué debe hacer genera obediencia; ayudarlo a descubrir de qué es capaz despierta verdadero compromiso.',
      'Las tres claves para inspirar: autenticidad (hablar desde lo que uno cree y siente), entusiasmo (fuerza interior contagiosa) y ejemplo (coherencia entre palabra y acción).',
      'Cuando las circunstancias cambian drásticamente, debemos encontrar nuevas formas de comunicar con claridad y transmitir confianza.',
      'Convencer no es ganar una discusión ni hablar más fuerte, sino presentar una idea para que el otro comprenda su valor y decida acompañar.',
      'Los cuatro pilares de un mensaje convincente: claridad, argumentos sólidos, ejemplos reales y respeto por las diferencias.',
      'Antes de presentar un proyecto, responder cuatro preguntas: ¿Qué propongo? ¿Por qué es importante? ¿Qué beneficio genera? ¿Qué necesito concretamente del otro?',
      'Escuchar también es comunicar: implica dejar nuestras respuestas en segundo plano para comprender qué vive, piensa o siente el otro.',
      'Tres hábitos para conectar: escuchar sin interrumpir, preguntar antes de sacar conclusiones y reconocer el punto de vista ajeno.',
      'En momentos de tensión, cambiar el reproche por una pregunta sincera y la acusación por una propuesta transforma el conflicto en colaboración.',
      'En el mundo digital las palabras también dejan huella: pensar en el efecto del mensaje antes de responder.',
    ],
    attendees: null,
  },
];

/**
 * Devuelve la próxima capacitación (status === 'upcoming'), o null si no hay.
 */
export function getUpcomingCapacitacion() {
  return CAPACITACIONES.find((c) => c.status === 'upcoming') ?? null;
}

/**
 * Devuelve todas las capacitaciones pasadas, ordenadas de más reciente a más antigua.
 */
export function getPastCapacitaciones() {
  return CAPACITACIONES.filter((c) => c.status === 'past').sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
}
