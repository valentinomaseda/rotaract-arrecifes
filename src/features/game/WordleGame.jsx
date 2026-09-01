import { useState, useEffect, useCallback } from 'react';
import GameResultModal from './GameResultModal';

// ── Keyboard layout (Spanish QWERTY) ──────────────────────────────────────
const KEYBOARD_ROWS = [
  ['Q','W','E','R','T','Y','U','I','O','P'],
  ['A','S','D','F','G','H','J','K','L','Ñ'],
  ['ENTER','Z','X','C','V','B','N','M','⌫'],
];

// ── Guess evaluation ──────────────────────────────────────────────────────
function evaluateGuess(guess, answer) {
  const len = answer.length;
  const result = Array(len).fill('absent');
  const pool = {};
  for (let i = 0; i < len; i++) {
    if (guess[i] === answer[i]) result[i] = 'correct';
    else pool[answer[i]] = (pool[answer[i]] || 0) + 1;
  }
  for (let i = 0; i < len; i++) {
    if (result[i] !== 'correct' && pool[guess[i]] > 0) {
      result[i] = 'present';
      pool[guess[i]]--;
    }
  }
  return result;
}

// ── Tile styling ──────────────────────────────────────────────────────────
const TILE_COLORS = {
  correct: 'bg-green-500 border-green-500 text-white',
  present: 'bg-yellow-400 border-yellow-400 text-white',
  absent:  'bg-gray-500  border-gray-500  text-white',
};

const KEY_COLORS = {
  correct: 'bg-green-500 text-white',
  present: 'bg-yellow-400 text-white',
  absent:  'bg-gray-400  text-white',
};

// ── Loading skeleton ──────────────────────────────────────────────────────
function WordleSkeleton() {
  return (
    <div className="flex flex-col items-center gap-1.5 animate-pulse pt-4">
      {Array.from({ length: 6 }).map((_, r) => (
        <div key={r} className="flex gap-1.5">
          {Array.from({ length: 5 }).map((_, c) => (
            <div key={c} className="w-14 h-14 bg-gray-200 rounded-md" />
          ))}
        </div>
      ))}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────
export default function WordleGame({ dataPath }) {
  const [gameData, setGameData] = useState(null);
  const [loading,  setLoading]  = useState(true);
  const [guesses,  setGuesses]  = useState([]); // [{word, result}]
  const [current,  setCurrent]  = useState('');
  const [status,   setStatus]   = useState('playing'); // playing | won | lost
  const [warning,  setWarning]  = useState('');
  const [showModal, setShowModal] = useState(false);

  // Fetch game data
  useEffect(() => {
    let cancelled = false;
    fetch(dataPath)
      .then(r => r.json())
      .then(d => { if (!cancelled) { setGameData(d); setLoading(false); } })
      .catch(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [dataPath]);

  const answer    = gameData?.answer   ?? '';
  const wordLen   = answer.length || 5;
  const maxTries  = gameData?.maxTries ?? 6;

  // Flash a warning message briefly
  const flash = useCallback((msg) => {
    setWarning(msg);
    setTimeout(() => setWarning(''), 1500);
  }, []);

  const submitGuess = useCallback(() => {
    if (status !== 'playing') return;
    if (current.length !== wordLen) { flash(`La palabra debe tener ${wordLen} letras`); return; }
    const result    = evaluateGuess(current, answer);
    const newGuesses = [...guesses, { word: current, result }];
    setGuesses(newGuesses);
    setCurrent('');
    if (current === answer) { setStatus('won');  setTimeout(() => setShowModal(true), 400); }
    else if (newGuesses.length >= maxTries) { setStatus('lost'); setTimeout(() => setShowModal(true), 400); }
  }, [status, current, answer, wordLen, guesses, maxTries, flash]);

  const pressKey = useCallback((key) => {
    if (status !== 'playing') return;
    if (key === '⌫' || key === 'BACKSPACE') {
      setCurrent(g => g.slice(0, -1));
    } else if (key === 'ENTER') {
      submitGuess();
    } else if (/^[A-ZÑ]$/.test(key) && current.length < wordLen) {
      setCurrent(g => g + key);
    }
  }, [status, current, submitGuess]);

  // Physical keyboard
  useEffect(() => {
    const handler = (e) => {
      const k = e.key.toUpperCase();
      if (k === 'ENTER') pressKey('ENTER');
      else if (k === 'BACKSPACE') pressKey('⌫');
      else if (/^[A-ZÑ]$/.test(k)) pressKey(k);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [pressKey]);

  // Build per-letter keyboard color state
  const letterStates = {};
  for (const { word, result } of guesses) {
    for (let i = 0; i < word.length; i++) {
      const prev = letterStates[word[i]];
      const curr = result[i];
      if (prev === 'correct') continue;
      if (curr === 'correct' || !prev) letterStates[word[i]] = curr;
      else if (curr === 'present' && prev !== 'correct') letterStates[word[i]] = curr;
    }
  }

  if (loading) return <WordleSkeleton />;

  return (
    <div className="flex flex-col items-center gap-5 w-full">

      {/* Hint */}
      {gameData?.hint && (
        <p className="font-montserrat text-sm text-gray-400 italic text-center max-w-sm px-4">
          💡 {gameData.hint}
        </p>
      )}

      {/* Warning toast */}
      {warning && (
        <div className="bg-gray-800 text-white text-sm font-montserrat px-4 py-2 rounded-full shadow-lg">
          {warning}
        </div>
      )}

      {/* Grid */}
      <div className="flex flex-col gap-1.5">
        {Array.from({ length: maxTries }).map((_, rowIdx) => {
          const guess       = guesses[rowIdx] ?? null;
          const isCurrentRow = !guess && rowIdx === guesses.length;
          const rowWord     = guess?.word ?? (isCurrentRow ? current : '');

          return (
            <div key={rowIdx} className="flex gap-1.5">
              {Array.from({ length: wordLen }).map((_, colIdx) => {
                const letter   = rowWord[colIdx] ?? '';
                const evalState = guess?.result[colIdx];
                const isFilled  = isCurrentRow && letter;

                return (
                  <div
                    key={colIdx}
                    className={`w-14 h-14 border-2 rounded-lg flex items-center justify-center
                      font-garet text-2xl font-bold uppercase select-none transition-all duration-150
                      ${evalState
                        ? `${TILE_COLORS[evalState]}`
                        : isFilled
                          ? 'border-gray-500 bg-white text-gray-900 scale-105'
                          : 'border-gray-300 bg-white text-gray-400'
                      }`}
                  >
                    {letter}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Result modal */}
      <GameResultModal
        open={showModal}
        type={status}
        title={
          status === 'won'
            ? '¡Adivinaste la palabra!'
            : `La palabra era ${answer}`
        }
        subtitle={
          status === 'won'
            ? `La encontraste en ${guesses.length} ${guesses.length === 1 ? 'intento' : 'intentos'}. ¡Muy bien jugado!`
            : 'Se acabaron los intentos. ¡La próxima la rompés!'
        }
        onClose={() => setShowModal(false)}
      />

      {/* On-screen keyboard */}
      <div className="flex flex-col items-center gap-1.5 w-full max-w-md pt-1">
        {KEYBOARD_ROWS.map((row, rowIdx) => (
          <div key={rowIdx} className="flex gap-1 justify-center w-full">
            {row.map(key => {
              const state = letterStates[key];
              const isWide = key === 'ENTER' || key === '⌫';
              return (
                <button
                  key={key}
                  onClick={() => pressKey(key)}
                  className={`font-montserrat font-semibold text-xs rounded-md py-4 transition-colors cursor-pointer select-none
                    ${isWide ? 'px-2 flex-[1.5]' : 'flex-1 max-w-[2.5rem]'}
                    ${state ? KEY_COLORS[state] : 'bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400'}`}
                >
                  {key}
                </button>
              );
            })}
          </div>
        ))}
      </div>

    </div>
  );
}
