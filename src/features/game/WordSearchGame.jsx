import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

// ── Color Theme Mapping for Highlighted Words ──────────────────────────────
const WORD_COLORS = {
  rose:    { bg: 'bg-rose-100 text-rose-900 border-rose-300',       cell: 'bg-rose-200/80 text-rose-950 font-black', pill: 'bg-rose-50 border-rose-200 text-rose-800' },
  amber:   { bg: 'bg-amber-100 text-amber-900 border-amber-300',     cell: 'bg-amber-200/80 text-amber-950 font-black', pill: 'bg-amber-50 border-amber-200 text-amber-800' },
  emerald: { bg: 'bg-emerald-100 text-emerald-900 border-emerald-300', cell: 'bg-emerald-200/80 text-emerald-950 font-black', pill: 'bg-emerald-50 border-emerald-200 text-emerald-800' },
  sky:     { bg: 'bg-sky-100 text-sky-900 border-sky-300',           cell: 'bg-sky-200/80 text-sky-950 font-black', pill: 'bg-sky-50 border-sky-200 text-sky-800' },
  indigo:  { bg: 'bg-indigo-100 text-indigo-900 border-indigo-300',   cell: 'bg-indigo-200/80 text-indigo-950 font-black', pill: 'bg-indigo-50 border-indigo-200 text-indigo-800' },
  fuchsia: { bg: 'bg-fuchsia-100 text-fuchsia-900 border-fuchsia-300', cell: 'bg-fuchsia-200/80 text-fuchsia-950 font-black', pill: 'bg-fuchsia-50 border-fuchsia-200 text-fuchsia-800' },
  teal:    { bg: 'bg-teal-100 text-teal-900 border-teal-300',       cell: 'bg-teal-200/80 text-teal-950 font-black', pill: 'bg-teal-50 border-teal-200 text-teal-800' },
  orange:  { bg: 'bg-orange-100 text-orange-900 border-orange-300', cell: 'bg-orange-200/80 text-orange-950 font-black', pill: 'bg-orange-50 border-orange-200 text-orange-800' },
  purple:  { bg: 'bg-purple-100 text-purple-900 border-purple-300', cell: 'bg-purple-200/80 text-purple-950 font-black', pill: 'bg-purple-50 border-purple-200 text-purple-800' },
  blue:    { bg: 'bg-blue-100 text-blue-900 border-blue-300',       cell: 'bg-blue-200/80 text-blue-950 font-black', pill: 'bg-blue-50 border-blue-200 text-blue-800' },
};

function getLineCells(start, end) {
  if (!start || !end) return [];
  const [r1, c1] = start;
  const [r2, c2] = end;

  const dr = r2 - r1;
  const dc = c2 - c1;

  const absDr = Math.abs(dr);
  const absDc = Math.abs(dc);

  // Must be horizontal, vertical, or 45-degree diagonal
  if (dr !== 0 && dc !== 0 && absDr !== absDc) {
    return [[r1, c1]];
  }

  const steps = Math.max(absDr, absDc);
  const stepR = dr === 0 ? 0 : dr / absDr;
  const stepC = dc === 0 ? 0 : dc / absDc;

  const cells = [];
  for (let i = 0; i <= steps; i++) {
    cells.push([r1 + i * stepR, c1 + i * stepC]);
  }
  return cells;
}

function SopaSkeleton() {
  return (
    <div className="animate-pulse space-y-4 max-w-4xl mx-auto w-full">
      <div className="h-6 bg-gray-200 rounded-md w-1/3 mx-auto" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 aspect-square max-w-[480px] mx-auto w-full bg-gray-200 rounded-2xl" />
        <div className="space-y-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-10 bg-gray-100 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function WordSearchGame({ dataPath = '/games/sopa-week-35.json' }) {
  const [gameData, setGameData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [foundWords, setFoundWords] = useState([]); // array of matched word strings
  const [foundPlacements, setFoundPlacements] = useState([]); // array of { word, cells: [[r,c]], color }
  const [selection, setSelection] = useState(null); // { start: [r,c], end: [r,c] }
  const [isSelecting, setIsSelecting] = useState(false);
  const [solved, setSolved] = useState(false);
  const [lastFound, setLastFound] = useState(null);

  const gridRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    fetch(dataPath)
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled) {
          setGameData(d);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [dataPath]);

  const words = useMemo(() => gameData?.words ?? [], [gameData]);
  const grid = useMemo(() => gameData?.grid ?? [], [gameData]);
  const totalWords = words.length;

  // Compute selected cells from current drag line
  const activeCells = useMemo(() => {
    if (!selection) return [];
    return getLineCells(selection.start, selection.end);
  }, [selection]);

  const activeKeys = useMemo(() => {
    return new Set(activeCells.map(([r, c]) => `${r}-${c}`));
  }, [activeCells]);

  // Map of cells already found with their respective colors
  const foundCellMap = useMemo(() => {
    const map = new Map();
    for (const item of foundPlacements) {
      const colorKey = item.color || 'rose';
      const colorObj = WORD_COLORS[colorKey] || WORD_COLORS.rose;
      for (const [r, c] of item.cells) {
        const key = `${r}-${c}`;
        map.set(key, colorObj.cell);
      }
    }
    return map;
  }, [foundPlacements]);

  // Check if active selection matches a word
  const checkSelection = useCallback(
    (cells) => {
      if (!cells || cells.length < 2 || !grid.length) return false;

      const lettersForward = cells.map(([r, c]) => grid[r]?.[c] || '').join('');
      const lettersReverse = [...lettersForward].reverse().join('');

      const matched = words.find(
        (w) =>
          !foundWords.includes(w.word) &&
          (w.word === lettersForward || w.word === lettersReverse)
      );

      if (matched) {
        const newFound = [...foundWords, matched.word];
        const newPlacements = [
          ...foundPlacements,
          {
            word: matched.word,
            cells,
            color: matched.color || 'rose',
          },
        ];
        setFoundWords(newFound);
        setFoundPlacements(newPlacements);
        setLastFound(matched.word);
        setTimeout(() => setLastFound(null), 2000);

        if (newFound.length === totalWords) {
          setSolved(true);
        }
        return true;
      }
      return false;
    },
    [foundWords, foundPlacements, grid, words, totalWords]
  );

  // ── Mouse Selection Handlers ─────────────────────────────────────────────
  const handleCellMouseDown = (r, c) => {
    setIsSelecting(true);
    setSelection({ start: [r, c], end: [r, c] });
  };

  const handleCellMouseEnter = (r, c) => {
    if (!isSelecting) return;
    setSelection((prev) => (prev ? { ...prev, end: [r, c] } : null));
  };

  const handleMouseUp = useCallback(() => {
    if (!isSelecting) return;
    setIsSelecting(false);
    if (selection) {
      const cells = getLineCells(selection.start, selection.end);
      checkSelection(cells);
    }
    setSelection(null);
  }, [isSelecting, selection, checkSelection]);

  // Global mouseup listener to catch releases outside grid
  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    return () => window.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseUp]);

  // ── Touch Selection Handlers ─────────────────────────────────────────────
  const getCellCoordsFromTouch = (touch) => {
    const el = document.elementFromPoint(touch.clientX, touch.clientY);
    const cellEl = el?.closest('[data-cell-coords]');
    if (!cellEl) return null;
    const [r, c] = cellEl.getAttribute('data-cell-coords').split('-').map(Number);
    return [r, c];
  };

  const handleTouchStart = (e) => {
    if (!e.touches.length) return;
    const coords = getCellCoordsFromTouch(e.touches[0]);
    if (coords) {
      setIsSelecting(true);
      setSelection({ start: coords, end: coords });
    }
  };

  const handleTouchMove = (e) => {
    if (!isSelecting || !e.touches.length) return;
    const coords = getCellCoordsFromTouch(e.touches[0]);
    if (coords) {
      setSelection((prev) => (prev ? { ...prev, end: coords } : null));
    }
  };

  const handleTouchEnd = () => {
    if (!isSelecting) return;
    setIsSelecting(false);
    if (selection) {
      const cells = getLineCells(selection.start, selection.end);
      checkSelection(cells);
    }
    setSelection(null);
  };

  const handleReset = () => {
    setFoundWords([]);
    setFoundPlacements([]);
    setSelection(null);
    setSolved(false);
    setLastFound(null);
  };

  if (loading) return <SopaSkeleton />;

  const progressPct = Math.round((foundWords.length / totalWords) * 100);

  return (
    <div className="w-full flex flex-col items-center select-none">
      {/* ── SUCCESS MODAL ── */}
      {solved && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
          onClick={() => setSolved(false)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-8 text-center relative"
            style={{ animation: 'scaleIn 0.35s cubic-bezier(0.22,1,0.36,1) both' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSolved(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Cerrar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="text-5xl mb-3 select-none">🎉</div>

            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-montserrat font-bold tracking-widest uppercase bg-cranberry/10 text-cranberry mb-3">
              ¡Sopa de Letras Completada!
            </span>

            <h2 className="font-garet text-2xl text-gray-900 mb-2 leading-tight">
              ¡Felicitaciones!
            </h2>
            <p className="font-montserrat text-gray-500 text-sm leading-relaxed mb-6">
              Encontraste las <strong>{totalWords} palabras</strong> rotarias ocultas en la grilla. ¡Excelente trabajo en equipo!
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => setSolved(false)}
                className="btn-cranberry text-white py-3 rounded-2xl font-montserrat font-semibold text-sm shadow-md"
              >
                Ver la sopa resuelta 🔍
              </button>
              <button
                onClick={handleReset}
                className="bg-gray-100 hover:bg-gray-200 text-gray-600 py-3 rounded-2xl font-montserrat font-semibold text-sm transition-colors"
              >
                Jugar de nuevo 🔄
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── HEADER STATUS & PROGRESS ── */}
      <div className="w-full max-w-4xl mb-6 text-center space-y-2">
        <h2 className="font-garet text-2xl sm:text-3xl text-gray-800 tracking-tight">
          {gameData?.title || 'Sopa de Letras Rotaract'}
        </h2>
        <p className="font-montserrat text-sm font-semibold text-cranberry">
          {foundWords.length} / {totalWords} palabras encontradas
        </p>

        {/* Progress Bar */}
        <div className="max-w-xs mx-auto w-full bg-gray-100 h-2 rounded-full overflow-hidden">
          <div
            className="bg-cranberry h-full transition-all duration-500 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        <p className="font-montserrat text-xs text-gray-400 pt-1">
          Arrastrá sobre las letras para encontrar las palabras ↕ ↔ ↗ ↘
        </p>
      </div>

      {/* ── TOAST NOTIFICATION ── */}
      {lastFound && (
        <div className="mb-4 bg-gray-900 text-white font-montserrat font-semibold text-xs px-4 py-2 rounded-full shadow-lg animate-bounce flex items-center gap-1.5">
          <span>✨</span> ¡Encontraste <strong>{lastFound}</strong>!
        </div>
      )}

      {/* ── MAIN LAYOUT: Grid Left + Words List Right ── */}
      <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-8 items-center lg:items-start justify-center">
        {/* ── GRID CONTAINER ── */}
        <div className="flex-shrink-0 flex flex-col items-center">
          <div
            ref={gridRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="touch-none select-none inline-grid gap-1 p-2 sm:p-3 bg-gray-50 border-2 border-gray-200 rounded-3xl shadow-inner"
            style={{
              gridTemplateColumns: `repeat(${grid.length || 13}, minmax(1.55rem, 2.3rem))`,
            }}
          >
            {grid.map((row, r) =>
              row.map((letter, c) => {
                const cellKey = `${r}-${c}`;
                const isActive = activeKeys.has(cellKey);
                const foundClass = foundCellMap.get(cellKey);

                let cellBg = 'bg-white text-gray-700 hover:bg-gray-100';

                if (foundClass) {
                  cellBg = foundClass;
                }

                if (isActive) {
                  cellBg = 'bg-cranberry text-white font-black shadow-md scale-105 z-10';
                }

                return (
                  <div
                    key={cellKey}
                    data-cell-coords={cellKey}
                    onMouseDown={() => handleCellMouseDown(r, c)}
                    onMouseEnter={() => handleCellMouseEnter(r, c)}
                    className={`aspect-square flex items-center justify-center rounded-lg sm:rounded-xl text-xs sm:text-base font-montserrat font-bold transition-all duration-150 cursor-pointer ${cellBg}`}
                  >
                    {letter}
                  </div>
                );
              })
            )}
          </div>

          {/* Reset / Actions */}
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleReset}
              className="bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 px-5 py-2 rounded-full text-xs font-semibold font-montserrat inline-flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reiniciar sopa
            </button>
          </div>
        </div>

        {/* ── WORDS LIST (RIGHT COLUMN) ── */}
        <div className="w-full max-w-sm flex-1">
          <div className="bg-gray-50/70 border border-gray-100 rounded-3xl p-5 space-y-3">
            <div className="flex items-center justify-between pb-1 border-b border-gray-200/60">
              <h3 className="font-garet text-sm uppercase tracking-wider text-gray-600">
                Palabras a encontrar
              </h3>
              <span className="font-montserrat text-xs text-gray-400 font-semibold">
                {totalWords - foundWords.length} restantes
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
              {words.map((item) => {
                const isFound = foundWords.includes(item.word);
                const colorObj = WORD_COLORS[item.color || 'rose'] || WORD_COLORS.rose;

                return (
                  <div
                    key={item.word}
                    className={`flex items-center justify-between p-3 rounded-2xl border transition-all duration-300 ${
                      isFound
                        ? `${colorObj.pill} opacity-75 shadow-none`
                        : 'bg-white border-gray-100 text-gray-800 shadow-sm hover:border-cranberry/30'
                    }`}
                  >
                    <div className="space-y-0.5 min-w-0 pr-2">
                      <p
                        className={`font-montserrat font-bold text-sm uppercase tracking-wide leading-none ${
                          isFound ? 'line-through opacity-80' : 'text-gray-800'
                        }`}
                      >
                        {item.word}
                      </p>
                      <p className="font-montserrat text-xs text-gray-400 truncate">
                        {item.clue}
                      </p>
                    </div>

                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isFound
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-100 text-gray-300'
                      }`}
                    >
                      {isFound ? '✓' : '•'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
