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
