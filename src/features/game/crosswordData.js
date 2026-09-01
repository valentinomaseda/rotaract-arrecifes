// ─────────────────────────────────────────────────────────────
//  crosswordData.js  —  Semana 37: Conceptos Clave del Club
// ─────────────────────────────────────────────────────────────

export const WEEK_LABEL = 'Semana 37';

// Palabras del puzzle — diseño de grilla 13 filas x 11 columnas
//
//  Intersecciones verificadas:
//    (0,3)  R  ← SERVICIO[2]  = ROTARY[0]       ✓
//    (0,6)  C  ← SERVICIO[5]  = COMPAÑERISMO[0] ✓
//    (3,3)  A  ← PASE[1]      = ROTARY[3]       ✓
//    (3,5)  E  ← PASE[3]      = LEMA[1]         ✓
//    (7,6)  R  ← LIDERAZGO[4] = COMPAÑERISMO[7] ✓
//    (7,10) O  ← LIDERAZGO[8] = PROYECTO[2]     ✓
//    (8,6)  I  ← DISTRITO[5]  = COMPAÑERISMO[8] ✓

export const WORDS = [
  // ── Horizontales ──
  {
    number: 1, direction: 'across', row: 0, col: 1, answer: 'SERVICIO',
    clue: 'Conjunto de acciones o labores realizadas con el fin de beneficiar a la comunidad y responder a sus necesidades sin buscar rédito económico.'
  },
  {
    number: 3, direction: 'across', row: 8, col: 1, answer: 'DISTRITO',
    clue: 'División territorial y administrativa que agrupa a múltiples clubes de una misma región para coordinar proyectos e intercambios.'
  },
  {
    number: 7, direction: 'across', row: 7, col: 2, answer: 'LIDERAZGO',
    clue: 'Capacidad de guiar, motivar e influir positivamente en un grupo de personas para alcanzar objetivos comunes de alto impacto.'
  },
  {
    number: 8, direction: 'across', row: 3, col: 2, answer: 'PASE',
    clue: 'Transición o cambio formal de la junta directiva y entrega de roles que se realiza anualmente dentro de la estructura institucional.'
  },

  // ── Verticales ──
  {
    number: 2, direction: 'down', row: 0, col: 3, answer: 'ROTARY',
    clue: 'Organización internacional de servicio cuyo propósito es reunir a líderes empresariales y profesionales para prestar servicios humanitarios y promover la paz.'
  },
  {
    number: 4, direction: 'down', row: 5, col: 10, answer: 'PROYECTO',
    clue: 'Planificación y ejecución organizada de un conjunto de actividades diseñadas para resolver un problema específico o generar valor social.'
  },
  {
    number: 5, direction: 'down', row: 0, col: 6, answer: 'COMPAÑERISMO',
    clue: 'Vínculo de camaradería, apoyo mutuo y trabajo en equipo que fortalece las relaciones interpersonales entre los miembros.'
  },
  {
    number: 6, direction: 'down', row: 2, col: 5, answer: 'LEMA',
    clue: 'Frase u oración breve que expresa la motivación, los valores o el enfoque de gestión que guía las acciones de un período determinado.'
  },
];

// ─────────────────────────────────────────────────────────────
//  buildGrid  —  construye la grilla 2D a partir de WORDS
//  Retorna: { grid, numberMap, rows, cols }
// ─────────────────────────────────────────────────────────────
export function buildGrid() {
  const ROWS = 13;
  const COLS = 11;

  const grid = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
  const numberMap = {};

  for (const w of WORDS) {
    const { direction, row, col, answer, number } = w;
    const key = `${row}-${col}`;

    // Si la celda ya tiene un número (por intersección de inicios), lo combina.
    if (!numberMap[key]) {
      numberMap[key] = number;
    }

    for (let i = 0; i < answer.length; i++) {
      const r = direction === 'across' ? row : row + i;
      const c = direction === 'across' ? col + i : col;
      grid[r][c] = answer[i];
    }
  }

  return { grid, numberMap, rows: ROWS, cols: COLS };
}