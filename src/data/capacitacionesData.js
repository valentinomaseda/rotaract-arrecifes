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
    status: 'upcoming',
    topic: 'Finanzas Personales',
    tagline: 'Tomá el control de tu plata',
    description:
      `En esta primera capacitación del ciclo vamos a abordar las finanzas personales desde una mirada práctica y cercana, buscando generar un espacio para aprender, reflexionar e incorporar nuevas herramientas.

La propuesta está pensada para que cada participante pueda comprender mejor su relación con el dinero, revisar sus hábitos y adquirir conocimientos que le permitan desenvolverse con mayor claridad y tomar decisiones más conscientes en su vida cotidiana.

No importa cuánto sepas previamente sobre el tema: la charla está abierta a toda la comunidad y busca acercar las finanzas personales de una manera simple y accesible.`,
    speaker: 'Luciano Gilabert',
    speakerPhoto: '/images/oradores/luciano.jpeg',
    speakerBio:
      `Contador Público y Licenciado en Administración de Empresas.

Luciano se desempeñó como Gobernador del Distrito 4895 de Rotary International y como Auditor Financiero Voluntario de la Fundación Rotaria (CADRE). Cuenta con una amplia trayectoria como orador y capacitador internacional, habiendo brindado conferencias en Uruguay, Brasil, Perú, Ecuador, Bolivia, Chile, República Dominicana y Estados Unidos.

Es múltiple socio Paul Harris y en mayo de 2022 recibió el premio “Dar de sí antes de pensar en sí”, máximo galardón que otorga Rotary International a los 150 rotarios más destacados del mundo.

Junto a él, vamos a incorporar herramientas prácticas para ordenar y potenciar nuestra economía del día a día.`,
    date: '2026-09-30',
    time: '19:30',
    platform: 'Google Meet',
    meetLink: null,         // se agrega cuando esté disponible
    registrationLink: 'https://docs.google.com/forms/d/e/1FAIpQLSf5EnWUZZfib9GEz4iast19zAoaZQKU8nb1cPQL6B5SXSUpxA/viewform?usp=header', // link del Google Forms de inscripción
    area: 'Economía Personal',
    votedFirst: true,
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
