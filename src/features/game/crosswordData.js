// ─────────────────────────────────────────────────────────────
//  crosswordData.js  —  Actualización Temática: Lore Rotario
// ─────────────────────────────────────────────────────────────

export const WEEK_LABEL = 'Semana del 10 al 16 de agosto de 2026';

// Palabras del puzzle (Diseño estructural verificado para 0 colisiones inválidas):
//
//  Grilla resultante (12 filas x 11 columnas):
//  (0,4) 1V POLIO      (0,6) 2V MACACO
//  (1,3) 3H ROTARACT   [Interseca con 1V en O, y 2V en A]
//  (2,0) 4V PAULHARRIS 
//  (3,0) 5H AVENIDAS   [Interseca con 4V en A, 1V en I, y 2V en A]
//  (7,0) 6H AMISTAD    [Interseca con 4V en A]
//  (9,0) 7H RUEDA      [Interseca con 4V en R]
//
//  Intersecciones Verificadas:
//    (1,4) O ← ROTARACT[1]   = POLIO[1]       ✓
//    (1,6) A ← ROTARACT[3]   = MACACO[1]      ✓
//    (3,0) A ← AVENIDAS[0]   = PAULHARRIS[1]  ✓
//    (3,4) I ← AVENIDAS[4]   = POLIO[3]       ✓
//    (3,6) A ← AVENIDAS[6]   = MACACO[3]      ✓
//    (7,0) A ← AMISTAD[0]    = PAULHARRIS[5]  ✓
//    (9,0) R ← RUEDA[0]      = PAULHARRIS[7]  ✓

export const WORDS = [
  // ── Horizontal ──
  {
    number: 3, direction: 'across', row: 1, col: 3, answer: 'ROTARACT',
    clue: 'Nuestra organización: Programa de Rotary para jóvenes líderes.'
  },
  {
    number: 5, direction: 'across', row: 3, col: 0, answer: 'AVENIDAS',
    clue: 'Las cinco vías de acción en las que se basa el servicio del club.'
  },
  {
    number: 6, direction: 'across', row: 7, col: 0, answer: 'AMISTAD',
    clue: 'Pilar clave. Como decía nuestro fundador: "La ___ como ocasión de servir".'
  },
  {
    number: 7, direction: 'across', row: 9, col: 0, answer: 'RUEDA',
    clue: 'Símbolo icónico que conforma el emblema de la organización (___ dentada).'
  },

  // ── Vertical ──
  {
    number: 1, direction: 'down', row: 0, col: 4, answer: 'POLIO',
    clue: 'Enfermedad que Rotary International está a punto de erradicar del mundo.'
  },
  {
    number: 2,
    direction: 'down',
    row: 1,
    col: 6,
    answer: 'ASADO',
    clue: 'La verdadera reunión de compañerismo: parrilla, charlas y proyectos.'
  },
  {
    number: 4, direction: 'down', row: 2, col: 0, answer: 'PAULHARRIS',
    clue: 'Abogado de Chicago que fundó nuestro movimiento en 1905 (Nombre y apellido).'
  },
];

// ─────────────────────────────────────────────────────────────
//  buildGrid  —  construye la grilla 2D a partir de WORDS
//  Retorna: { grid, numberMap, rows, cols }
// ─────────────────────────────────────────────────────────────
export function buildGrid() {
  const ROWS = 12; // Ajustado dinámicamente para la nueva grilla
  const COLS = 11; // Ajustado dinámicamente para la nueva grilla

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