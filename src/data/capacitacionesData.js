/**
 * Datos del Ciclo de Capacitaciones de Rotaract Arrecifes.
 * Cada edición tiene:
 *   - id, edition, status: 'upcoming' | 'past'
 *   - topic, speaker, speakerBio, date (ISO), time, platform, meetLink
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
    speaker: 'A confirmar',
    speakerBio: null,
    date: '2026-09-30',
    time: '20:00',
    platform: 'Google Meet',
    meetLink: null, // se agrega cuando esté disponible
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
