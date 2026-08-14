import React, { useState, useCallback, useRef } from 'react';
import { WORDS, buildGrid } from './crosswordData';

const { grid: SOLUTION, numberMap, rows: ROWS, cols: COLS } = buildGrid();

// ── helpers ──────────────────────────────────────────────────
function getWordAt(row, col, direction) {
  return WORDS.find(w => {
    if (w.direction !== direction) return false;
    if (direction === 'across') return w.row === row && col >= w.col && col < w.col + w.answer.length;
    return w.col === col && row >= w.row && row < w.row + w.answer.length;
  });
}
function nextCell(row, col, dir) { return dir === 'across' ? [row, col + 1] : [row + 1, col]; }
function prevCell(row, col, dir) { return dir === 'across' ? [row, col - 1] : [row - 1, col]; }
function isOpen(r, c) { return r >= 0 && r < ROWS && c >= 0 && c < COLS && SOLUTION[r][c] !== null; }

// Returns true if every cell of this word is correctly filled
function isWordSolved(w, cells) {
  for (let i = 0; i < w.answer.length; i++) {
    const r = w.direction === 'across' ? w.row : w.row + i;
    const c = w.direction === 'across' ? w.col + i : w.col;
    if (cells[r][c] !== w.answer[i]) return false;
  }
  return true;
}

// ── component ────────────────────────────────────────────────
export default function Crossword() {
  const [cells, setCells] = useState(() =>
    Array.from({ length: ROWS }, () => Array(COLS).fill(''))
  );
  const [selected, setSelected] = useState(null);
  const [direction, setDirection] = useState('across');
  const [checked, setChecked] = useState(false);
  // 'idle' | 'allCorrect' | 'hasErrors' | 'incomplete'
  const [checkResult, setCheckResult] = useState('idle');
  const [solved, setSolved] = useState(false);
  const inputRefs = useRef({});

  const focusCell = useCallback((r, c) => {
    inputRefs.current[`${r}-${c}`]?.focus();
  }, []);

  const handleCellClick = (row, col) => {
    if (!isOpen(row, col)) return;
    if (selected?.row === row && selected?.col === col) {
      setDirection(d => (d === 'across' ? 'down' : 'across'));
    } else {
      setSelected({ row, col });
      const hasAcross = !!getWordAt(row, col, 'across');
      const hasDown = !!getWordAt(row, col, 'down');
      if (!hasAcross && hasDown) setDirection('down');
      else if (hasAcross && !hasDown) setDirection('across');
    }
    focusCell(row, col);
  };

  const advance = (row, col, dir, delta) => {
    const [nr, nc] = delta > 0 ? nextCell(row, col, dir) : prevCell(row, col, dir);
    if (isOpen(nr, nc)) { setSelected({ row: nr, col: nc }); setDirection(dir); focusCell(nr, nc); }
  };

  const handleKeyDown = (e, row, col) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); advance(row, col, 'across', 1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); advance(row, col, 'across', -1); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); advance(row, col, 'down', 1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); advance(row, col, 'down', -1); }
    else if (e.key === 'Backspace') {
      e.preventDefault();
      if (cells[row][col] !== '') {
        setCells(prev => { const n = prev.map(r => [...r]); n[row][col] = ''; return n; });
        setChecked(false); setCheckResult('idle');
      } else {
        const [pr, pc] = prevCell(row, col, direction);
        if (isOpen(pr, pc)) { setSelected({ row: pr, col: pc }); focusCell(pr, pc); }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const wordIdx = WORDS.findIndex(w => w.direction === direction && getWordAt(row, col, direction) === w);
      const next = WORDS[(wordIdx + 1) % WORDS.length];
      setSelected({ row: next.row, col: next.col }); setDirection(next.direction); focusCell(next.row, next.col);
    }
  };

  const handleInput = (e, row, col) => {
    const val = e.target.value.toUpperCase().replace(/[^A-ZÑ]/, '').slice(-1);
    setCells(prev => { const n = prev.map(r => [...r]); n[row][col] = val; return n; });
    setChecked(false); setCheckResult('idle'); setSolved(false);
    if (val) {
      const [nr, nc] = nextCell(row, col, direction);
      if (isOpen(nr, nc) && getWordAt(nr, nc, direction)) { setSelected({ row: nr, col: nc }); focusCell(nr, nc); }
    }
  };

  const handleCheck = () => {
    setChecked(true);
    let allFilled = true, allCorrect = true;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (SOLUTION[r][c] !== null) {
          if (cells[r][c] === '') allFilled = false;
          if (cells[r][c] !== SOLUTION[r][c]) allCorrect = false;
        }
      }
    }
    if (allCorrect) { setCheckResult('allCorrect'); setSolved(true); }
    else if (!allFilled) setCheckResult('incomplete');
    else setCheckResult('hasErrors');
  };

  const handleReveal = () => {
    setCells(SOLUTION.map(row => row.map(c => (c === null ? '' : c))));
    setChecked(true); setCheckResult('allCorrect'); setSolved(true);
  };

  const handleReset = () => {
    setCells(Array.from({ length: ROWS }, () => Array(COLS).fill('')));
    setChecked(false); setCheckResult('idle'); setSolved(false);
  };

  // active word highlight
  const activeWord = selected ? getWordAt(selected.row, selected.col, direction) : null;
  const isInActiveWord = (r, c) => {
    if (!activeWord) return false;
    if (activeWord.direction === 'across') return r === activeWord.row && c >= activeWord.col && c < activeWord.col + activeWord.answer.length;
    return c === activeWord.col && r >= activeWord.row && r < activeWord.row + activeWord.answer.length;
  };

  const cellStatus = (r, c) => {
    if (!checked || cells[r][c] === '') return 'neutral';
    return cells[r][c] === SOLUTION[r][c] ? 'correct' : 'wrong';
  };

  // clue groups
  const acrossClues = WORDS.filter(w => w.direction === 'across');
  const downClues = WORDS.filter(w => w.direction === 'down');

  // feedback banner config (only for non-success states)
  const feedbackMap = {
    hasErrors:  { bg: 'bg-red-50 border-red-200',        icon: '❌', text: 'text-red-700',    msg: 'Hay algunas respuestas incorrectas.',  sub: 'Las celdas en rojo tienen un error. ¡Seguí intentando!' },
    incomplete: { bg: 'bg-yellow-50 border-yellow-200',  icon: '⚠️', text: 'text-yellow-700', msg: 'Faltan algunas respuestas.',             sub: 'Completá todas las celdas antes de verificar.' },
  };
  const feedback = feedbackMap[checkResult];

  // clue item renderer
  const ClueItem = ({ w, dir }) => {
    const isActive = activeWord === w;
    const wordSolved = isWordSolved(w, cells);
    return (
      <li
        key={`${w.number}${dir}`}
        onClick={() => { setSelected({ row: w.row, col: w.col }); setDirection(dir); focusCell(w.row, w.col); }}
        className={`flex gap-3 p-2 rounded-xl cursor-pointer transition-colors text-sm
          ${wordSolved ? 'opacity-50' : ''}
          ${isActive && !wordSolved ? 'bg-cranberry/10' : 'hover:bg-gray-50'}`}
      >
        <span className={`font-bold font-montserrat min-w-[1.1rem] ${isActive ? 'text-cranberry' : 'text-gray-400'}`}>
          {w.number}
        </span>
        <span className={`font-montserrat leading-snug ${wordSolved ? 'line-through text-gray-400' : 'text-gray-700'}`}>
          {w.clue}
        </span>
      </li>
    );
  };

  return (
    <div className="w-full">

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
            onClick={e => e.stopPropagation()}
          >
            {/* close */}
            <button
              onClick={() => setSolved(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Cerrar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* confetti emoji ring */}
            <div className="text-5xl mb-4 select-none">🎉</div>

            {/* badge */}
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-montserrat font-bold tracking-widest uppercase bg-cranberry/10 text-cranberry mb-4">
              ¡Crucigrama completado!
            </span>

            <h2 className="font-garet text-2xl text-gray-900 mb-2 leading-tight">
              ¡Excelente!
            </h2>
            <p className="font-montserrat text-gray-500 text-sm leading-relaxed mb-6">
              Completaste el crucigrama de la semana. ¡Hasta el próximo juego!
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => setSolved(false)}
                className="btn-cranberry text-white py-3 rounded-2xl font-montserrat font-semibold text-sm"
              >
                ¡Ver el crucigrama! 🔍
              </button>
              <button
                onClick={() => { handleReset(); setSolved(false); }}
                className="bg-gray-100 hover:bg-gray-200 text-gray-600 py-3 rounded-2xl font-montserrat font-semibold text-sm transition-colors"
              >
                Jugar de nuevo
              </button>
            </div>
          </div>
        </div>
      )}
      {/* ── TOP LAYOUT: grid left, clues right ── */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">

        {/* ── GRID ── */}
        <div className="flex-shrink-0 min-w-0 max-w-full">
          <div className="overflow-x-auto pb-1 max-w-full">
            <div
              className="inline-grid gap-px bg-gray-300 border-2 border-gray-700 rounded-xl overflow-hidden shadow-md"
              style={{
                gridTemplateColumns: `repeat(${COLS}, min(2.2rem, calc((100vw - 80px) / ${COLS})))`,
                gridTemplateRows:    `repeat(${ROWS}, min(2.2rem, calc((100vw - 80px) / ${COLS})))`,
              }}
            >
              {Array.from({ length: ROWS }, (_, r) =>
                Array.from({ length: COLS }, (_, c) => {
                  const solution = SOLUTION[r][c];
                  if (solution === null) return <div key={`${r}-${c}`} className="bg-gray-700 w-full h-full" />;

                  const isSelected = selected?.row === r && selected?.col === c;
                  const inWord = isInActiveWord(r, c);
                  const status = cellStatus(r, c);
                  const displayNum = numberMap[`${r}-${c}`] ? parseInt(numberMap[`${r}-${c}`]) : null;

                  // Colors: pink (cranberry-light) instead of blue
                  let bg = 'bg-white hover:bg-cranberry-light/40';
                  if (isSelected) bg = 'bg-cranberry/25';
                  else if (inWord) bg = 'bg-cranberry/10';
                  if (status === 'correct') bg = isSelected ? 'bg-green-300' : inWord ? 'bg-green-100' : 'bg-green-50';
                  if (status === 'wrong')   bg = isSelected ? 'bg-red-300'   : inWord ? 'bg-red-100'   : 'bg-red-50';

                  return (
                    <div
                      key={`${r}-${c}`}
                      className={`relative w-full h-full cursor-pointer transition-colors duration-100 ${bg}`}
                      onClick={() => handleCellClick(r, c)}
                    >
                      {displayNum && (
                        <span className="absolute top-px left-px text-[8px] font-bold text-gray-500 leading-none z-10 select-none">
                          {displayNum}
                        </span>
                      )}
                      <input
                        ref={el => { inputRefs.current[`${r}-${c}`] = el; }}
                        type="text"
                        maxLength={2}
                        value={cells[r][c]}
                        onChange={e => handleInput(e, r, c)}
                        onKeyDown={e => handleKeyDown(e, r, c)}
                        onFocus={() => setSelected({ row: r, col: c })}
                        className="absolute inset-0 w-full h-full bg-transparent text-center font-bold text-gray-900 font-montserrat uppercase outline-none caret-transparent cursor-pointer select-none"
                        style={{ fontSize: '0.85rem', paddingTop: displayNum ? '10px' : '0' }}
                        aria-label={`Celda fila ${r + 1}, columna ${c + 1}`}
                      />
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Buttons below grid */}
          <div className="flex flex-wrap gap-2 mt-4">
            <button onClick={handleCheck} className="btn-cranberry text-white px-5 py-2 rounded-full text-sm font-semibold font-montserrat inline-flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Verificar
            </button>
            <button onClick={handleReveal} className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-5 py-2 rounded-full text-sm font-semibold font-montserrat inline-flex items-center gap-1.5 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Revelar
            </button>
            <button onClick={handleReset} className="bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 px-5 py-2 rounded-full text-sm font-semibold font-montserrat inline-flex items-center gap-1.5 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reiniciar
            </button>
          </div>

          {/* Feedback banner — only errors / incomplete */}
          {feedback && !solved && (
            <div className={`mt-4 border rounded-2xl p-4 ${feedback.bg}`}>
              <p className={`font-garet text-base ${feedback.text} flex items-center gap-2`}>
                <span>{feedback.icon}</span>{feedback.msg}
              </p>
              <p className={`font-montserrat text-xs mt-0.5 ${feedback.text} opacity-80`}>{feedback.sub}</p>
            </div>
          )}
        </div>

        {/* ── CLUES ── */}
        <div className="flex-1 min-w-0">
          {/* Horizontal */}
          <div className="mb-5">
            <h3 className="font-garet text-base text-gray-900 mb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-cranberry text-white text-xs flex items-center justify-center font-montserrat font-bold">→</span>
              Horizontal
            </h3>
            <ol className="space-y-1">
              {acrossClues.map(w => <ClueItem key={`${w.number}H`} w={w} dir="across" />)}
            </ol>
          </div>

          {/* Vertical */}
          <div>
            <h3 className="font-garet text-base text-gray-900 mb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-cranberry text-white text-xs flex items-center justify-center font-montserrat font-bold">↓</span>
              Vertical
            </h3>
            <ol className="space-y-1">
              {downClues.map(w => <ClueItem key={`${w.number}V`} w={w} dir="down" />)}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
