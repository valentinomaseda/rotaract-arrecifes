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
      'Aprenderemos conceptos clave de finanzas personales: presupuesto, ahorro, inversión y cómo construir un fondo de emergencia. Pensado para quienes quieren empezar desde cero o mejorar sus hábitos financieros.',
    speaker: 'Luciano Gilabert',
    speakerPhoto: '/images/oradores/luciano.jpeg',
    speakerBio:
      'Contador Público, Licenciado en Administración y director de su propio estudio contable. Además de haber sido socio fundador de Rotaract y Gobernador del Distrito 4895, cuenta con una sólida trayectoria como orador y capacitador internacional. Junto a él, nos llevaremos herramientas prácticas para ordenar y potenciar la economía del día a día.',
    date: '2026-09-30',
    time: '19:30',
    platform: 'Google Meet',
    meetLink: null,         // se agrega cuando esté disponible
    registrationLink: null, // link del Google Forms de inscripción
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
