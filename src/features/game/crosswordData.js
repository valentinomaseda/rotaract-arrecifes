// ─────────────────────────────────────────────────────────────
//  crosswordData.js  —  actualizar semanalmente
// ─────────────────────────────────────────────────────────────

export const WEEK_LABEL = 'Semana del 11 al 17 de agosto de 2025';

// Palabras del puzzle (verificadas intersección por intersección):
//
//  Horizontal:
//    1H  SERVICIO   fila 0, col 5
//    3H  LIDERAZGO  fila 3, col 4
//    4H  ROTARACT   fila 6, col 1
//    5H  ARRECIFES  fila 7, col 0
//    6H  AMISTAD    fila 9, col 5
//
//  Vertical:
//    1V  SOLIDARIDAD  col 5, fila 0-10
//    2V  VOLUNTARIO   col 0, fila 1-10
//
//  Intersecciones verificadas:
//    (0,5)  S  ← SERVICIO[0]  = SOLIDARIDAD[0]  ✓
//    (3,5)  I  ← LIDERAZGO[1] = SOLIDARIDAD[3]  ✓
//    (6,5)  R  ← ROTARACT[4]  = SOLIDARIDAD[6]  ✓
//    (7,0)  A  ← ARRECIFES[0] = VOLUNTARIO[6]   ✓
//    (7,5)  I  ← ARRECIFES[5] = SOLIDARIDAD[7]  ✓
//    (9,5)  A  ← AMISTAD[0]   = SOLIDARIDAD[9]  ✓

export const WORDS = [
  // ── Horizontal ──
  {
    number: 1, direction: 'across', row: 0, col: 5, answer: 'SERVICIO',
    clue: 'Principio central de Rotary: "Por encima del ___"'
  },
  {
    number: 3, direction: 'across', row: 3, col: 4, answer: 'LIDERAZGO',
    clue: 'Capacidad de guiar e inspirar a otros'
  },
  {
    number: 4, direction: 'across', row: 6, col: 1, answer: 'ROTARACT',
    clue: 'Organización juvenil hermana de Rotary International'
  },
  {
    number: 5, direction: 'across', row: 7, col: 0, answer: 'ARRECIFES',
    clue: 'Ciudad de la provincia de Buenos Aires donde operamos'
  },
  {
    number: 6, direction: 'across', row: 9, col: 5, answer: 'AMISTAD',
    clue: 'Vínculo que se forja entre los socios del club'
  },

  // ── Vertical ──
  {
    number: 1, direction: 'down', row: 0, col: 5, answer: 'SOLIDARIDAD',
    clue: 'Apoyo mutuo entre personas y comunidades (11)'
  },
  {
    number: 2, direction: 'down', row: 1, col: 0, answer: 'VOLUNTARIO',
    clue: 'Persona que da su tiempo desinteresadamente (10)'
  },
];

// ─────────────────────────────────────────────────────────────
//  buildGrid  —  construye la grilla 2D a partir de WORDS
//  Retorna: { grid, numberMap, rows, cols }
//    grid[r][c] = letra (string) | null (celda negra)
//    numberMap["r-c"] = número de clue
// ─────────────────────────────────────────────────────────────
export function buildGrid() {
  const ROWS = 11;
  const COLS = 13;

  const grid = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
  const numberMap = {};

  for (const w of WORDS) {
    const { direction, row, col, answer, number } = w;
    const key = `${row}-${col}`;
    if (!numberMap[key]) numberMap[key] = number + (direction === 'across' ? 'H' : 'V');

    for (let i = 0; i < answer.length; i++) {
      const r = direction === 'across' ? row : row + i;
      const c = direction === 'across' ? col + i : col;
      grid[r][c] = answer[i];
    }
  }

  return { grid, numberMap, rows: ROWS, cols: COLS };
}
