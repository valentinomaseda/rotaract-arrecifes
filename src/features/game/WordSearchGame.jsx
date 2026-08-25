import React, { useState, useCallback, useRef, useEffect } from 'react';

// ── Directions (8 orientations) ─────────────────────────────────────────────
const DIRS = [
  [0, 1], [1, 0], [0, -1], [-1, 0],   // H / V
  [1, 1], [1, -1], [-1, 1], [-1, -1], // Diagonals
];

// One distinct color per found word
const PALETTE = [
  '#c0004e', '#1d4ed8', '#15803d', '#c2410c',
  '#7e22ce', '#0e7490', '#b91c1c', '#a16207',
  '#86198f', '#065f46',
];

// ── Grid builder ─────────────────────────────────────────────────────────────
function buildGrid(wordObjs, size) {
  const grid = Array.from({ length: size }, () => Array(size).fill(''));
  const placed = [];

  // Longest words first to maximise placement success
  const sorted = [...wordObjs].sort((a, b) => b.word.length - a.word.length);

  for (const { word: raw, hint } of sorted) {
    const word = raw
      .toUpperCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // remove diacritics: é→e
      .replace(/\u00D1/g, 'N');        // Ñ → N

    let placed_ = false;
    for (let attempt = 0; attempt < 300 && !placed_; attempt++) {
      const [dr, dc] = DIRS[Math.floor(Math.random() * DIRS.length)];
      const r0 = Math.floor(Math.random() * size);
      const c0 = Math.floor(Math.random() * size);
      const rE = r0 + dr * (word.length - 1);
      const cE = c0 + dc * (word.length - 1);

      if (rE < 0 || rE >= size || cE < 0 || cE >= size) continue;

      let ok = true;
      const cells = [];
      for (let i = 0; i < word.length; i++) {
        const r = r0 + dr * i;
        const c = c0 + dc * i;
        if (grid[r][c] !== '' && grid[r][c] !== word[i]) { ok = false; break; }
        cells.push([r, c]);
      }

      if (ok) {
        cells.forEach(([r, c], i) => { grid[r][c] = word[i]; });
        placed.push({ word, hint: hint ?? '', cells });
        placed_ = true;
      }
    }
  }

  // Fill blanks with random letters
  const ABC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let r = 0; r < size; r++)
    for (let c = 0; c < size; c++)
      if (!grid[r][c]) grid[r][c] = ABC[Math.floor(Math.random() * 26)];

  return { grid, placed };
}

// ── Helpers ──────────────────────────────────────────────────────────────────
const rc = (r, c) => `${r},${c}`;

/** Given a start/end cell, return all cells in the snapped straight line. */
function snapLine(start, end) {
  if (!start) return [];
  if (!end) return [start];
  const dr = end[0] - start[0];
  const dc = end[1] - start[1];
  const ar = Math.abs(dr), ac = Math.abs(dc);
  if (!ar && !ac) return [start];

  let sr = 0, sc = 0, len;
  if (!ar)       { sc = dc > 0 ? 1 : -1; len = ac + 1; }
  else if (!ac)  { sr = dr > 0 ? 1 : -1; len = ar + 1; }
  else if (ar === ac) { sr = dr > 0 ? 1 : -1; sc = dc > 0 ? 1 : -1; len = ar + 1; }
  else if (ar > ac)   { sr = dr > 0 ? 1 : -1; len = ar + 1; }
  else                { sc = dc > 0 ? 1 : -1; len = ac + 1; }

  return Array.from({ length: len }, (_, i) => [start[0] + sr * i, start[1] + sc * i]);
}

// ── Main component ────────────────────────────────────────────────────────────
export default function WordSearchGame({ dataPath }) {
  const [status, setStatus]     = useState('loading'); // loading|error|playing|done
  const [gameData, setGameData] = useState(null);
  const [grid, setGrid]         = useState([]);
  const [placed, setPlaced]     = useState([]);
  const [found, setFound]       = useState([]);  // [{word, colorIdx, cells}]
  const [sel, setSel]           = useState([]);  // [[r,c]]
  const [shake, setShake]       = useState(false);

  // Refs to avoid stale closures in pointer handlers
  const gridEl    = useRef(null);
  const startRef  = useRef(null);
  const dragging  = useRef(false);
  const selRef    = useRef([]);
  const foundRef  = useRef([]);
  const placedRef = useRef([]);

  useEffect(() => { selRef.current = sel; },    [sel]);
  useEffect(() => { foundRef.current = found; },  [found]);
  useEffect(() => { placedRef.current = placed; }, [placed]);

  // Fetch data + build grid
  useEffect(() => {
    let dead = false;
    fetch(dataPath)
      .then(r => { if (!r.ok) throw 0; return r.json(); })
      .then(data => {
        if (dead) return;
        const wordsList = data.words ?? [];
        const { grid, placed } = buildGrid(wordsList, data.size ?? 13);
        setGameData(data);
        setGrid(grid);
        setPlaced(placed);
        setStatus('playing');
      })
      .catch(() => { if (!dead) setStatus('error'); });
    return () => { dead = true; };
  }, [dataPath]);

  // Hit-test: which cell is under (x,y)?
  const cellAt = useCallback((x, y) => {
    const els = gridEl.current?.querySelectorAll('[data-rc]');
    if (!els) return null;
    for (const el of els) {
      const b = el.getBoundingClientRect();
      if (x >= b.left && x <= b.right && y >= b.top && y <= b.bottom)
        return el.dataset.rc.split(',').map(Number);
    }
    return null;
  }, []);

  // Check if current selection matches any unmatched word
  const commit = useCallback(() => {
    const curSel    = selRef.current;
    const curFound  = foundRef.current;
    const curPlaced = placedRef.current;

    if (curSel.length < 2) { setSel([]); return; }

    const fwd = curSel.map(([r, c]) => rc(r, c)).join('|');
    const rev = [...curSel].reverse().map(([r, c]) => rc(r, c)).join('|');
    const doneWords = curFound.map(f => f.word);

    for (const pw of curPlaced) {
      if (doneWords.includes(pw.word)) continue;
      const pwStr = pw.cells.map(([r, c]) => rc(r, c)).join('|');
      const pwRev = [...pw.cells].reverse().map(([r, c]) => rc(r, c)).join('|');
      if (fwd === pwStr || fwd === pwRev) {
        const colorIdx = curFound.length % PALETTE.length;
        const next = [...curFound, { word: pw.word, colorIdx, cells: pw.cells }];
        setFound(next);
        setSel([]);
        if (next.length === curPlaced.length) setStatus('done');
        return;
      }
    }

    // Wrong selection
    setShake(true);
    setTimeout(() => { setShake(false); setSel([]); }, 400);
  }, []);

  // Pointer events (work on both desktop and mobile)
  const onDown = useCallback((e) => {
    e.preventDefault();
    const pt = e.changedTouches ? e.changedTouches[0] : e;
    const cell = cellAt(pt.clientX, pt.clientY);
    if (!cell) return;
    dragging.current = true;
    startRef.current = cell;
    setSel([cell]);
  }, [cellAt]);

  const onMove = useCallback((e) => {
    if (!dragging.current) return;
    e.preventDefault();
    const pt = e.changedTouches ? e.changedTouches[0] : e;
    const cell = cellAt(pt.clientX, pt.clientY);
    if (cell) setSel(snapLine(startRef.current, cell));
  }, [cellAt]);

  const onUp = useCallback((e) => {
    if (!dragging.current) return;
    e.preventDefault();
    dragging.current = false;
    commit();
  }, [commit]);

  // ── Derived maps for rendering ────────────────────────────────────────────
  const foundMap = {};
  for (const f of found)
    for (const [r, c] of f.cells) foundMap[rc(r, c)] = PALETTE[f.colorIdx];

  const selSet = new Set(sel.map(([r, c]) => rc(r, c)));

  // ── Render guards ─────────────────────────────────────────────────────────
  if (status === 'loading') return (
    <div className="flex justify-center items-center py-24">
      <div className="w-9 h-9 border-[3px] border-cranberry border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (status === 'error') return (
    <div className="py-16 text-center font-montserrat text-gray-500">
      No se pudo cargar el juego. Verificá tu conexión.
    </div>
  );

  return (
    <div className="font-montserrat select-none">

      {/* ── Header ── */}
      <div className="text-center mb-6 space-y-1">
        <h2 className="font-garet text-2xl text-gray-800">
          {gameData?.title ?? 'Sopa de Letras'}
        </h2>
        <p className="text-sm text-gray-500">
          <span
            className="font-bold tabular-nums"
            style={{ color: found.length === placed.length && placed.length > 0 ? '#15803d' : '#c0004e' }}
          >
            {found.length}
          </span>
          {' / '}{placed.length} palabras encontradas
        </p>
      </div>

      {/* ── Hint ── */}
      <p className="text-center text-xs text-gray-400 mb-5">
        Arrastrá sobre las letras para encontrar las palabras ↕ ↔ ↗ ↘
      </p>

      {/* ── Body: grid + word list ── */}
      <div className="flex flex-col lg:flex-row gap-6 items-start justify-center">

        {/* Grid */}
        <div
          ref={gridEl}
          className="mx-auto flex-shrink-0"
          style={{ touchAction: 'none', WebkitUserSelect: 'none', userSelect: 'none', cursor: 'crosshair' }}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerLeave={onUp}
        >
          {grid.map((row, r) => (
            <div key={r} className="flex">
              {row.map((letter, c) => {
                const k = rc(r, c);
                const foundColor = foundMap[k];
                const isSel   = selSet.has(k);
                const isFound = !!foundColor;

                return (
                  <div
                    key={c}
                    data-rc={`${r},${c}`}
                    className={[
                      'flex items-center justify-center m-[1.5px] rounded font-bold',
                      // Responsive size
                      'w-[22px] h-[22px] text-[9px]',
                      'sm:w-[27px] sm:h-[27px] sm:text-[11px]',
                      'md:w-[31px] md:h-[31px] md:text-xs',
                      // States
                      isFound
                        ? 'text-white shadow-sm'
                        : isSel
                        ? shake
                          ? 'bg-red-100 text-red-500 ring-1 ring-red-400 rounded scale-110 z-10 relative'
                          : 'bg-cranberry/20 text-cranberry ring-1 ring-cranberry/50 scale-110 z-10 relative'
                        : 'text-gray-600 hover:bg-gray-100',
                      'transition-all duration-100',
                    ].join(' ')}
                    style={isFound ? { backgroundColor: foundColor } : undefined}
                  >
                    {letter}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Word list */}
        <div className="w-full lg:w-52 flex-shrink-0">
          <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-3 text-center lg:text-left">
            Palabras a encontrar
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-1.5">
            {placed.map(pw => {
              const fw = found.find(f => f.word === pw.word);
              const color = fw ? PALETTE[fw.colorIdx] : undefined;
              return (
                <div
                  key={pw.word}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all duration-300 ${
                    fw ? 'border-transparent' : 'border-gray-100'
                  }`}
                  style={fw ? { backgroundColor: color + '18', borderColor: color + '44' } : undefined}
                >
                  {/* Color dot */}
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0 transition-colors"
                    style={{ backgroundColor: color ?? '#d1d5db' }}
                  />
                  <div className="min-w-0">
                    <p
                      className={`text-[11px] font-bold uppercase tracking-wide leading-tight truncate transition-all ${
                        fw ? 'line-through text-gray-400' : 'text-gray-700'
                      }`}
                    >
                      {pw.word}
                    </p>
                    {pw.hint && (
                      <p className="text-[10px] text-gray-400 leading-tight truncate">{pw.hint}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Completed banner ── */}
      {status === 'done' && (
        <div className="mt-10 flex justify-center">
          <div
            className="rounded-2xl px-10 py-8 text-center max-w-sm border"
            style={{ background: '#c0004e0d', borderColor: '#c0004e33' }}
          >
            <div className="text-5xl mb-3">🎉</div>
            <h3 className="font-garet text-2xl mb-1" style={{ color: '#c0004e' }}>
              ¡Completaste la sopa!
            </h3>
            <p className="text-gray-500 text-sm">
              Encontraste todas las palabras. ¡Muy bien jugado!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
