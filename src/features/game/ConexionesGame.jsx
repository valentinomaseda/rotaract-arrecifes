import { useState, useEffect, useMemo } from 'react';

// ── Color palette per difficulty ──────────────────────────────────────────
const COLOR = {
  yellow: {
    bg:   'bg-yellow-400',
    text: 'text-yellow-900',
    card: 'bg-yellow-400/20 border-yellow-300 hover:bg-yellow-400/30',
    sel:  'bg-yellow-400 text-white border-yellow-500',
    ring: 'ring-yellow-400',
    label:'text-yellow-700 bg-yellow-100',
  },
  green: {
    bg:   'bg-green-500',
    text: 'text-green-900',
    card: 'bg-green-500/10 border-green-300 hover:bg-green-500/20',
    sel:  'bg-green-500 text-white border-green-600',
    ring: 'ring-green-400',
    label:'text-green-700 bg-green-100',
  },
  blue: {
    bg:   'bg-blue-500',
    text: 'text-blue-900',
    card: 'bg-blue-500/10 border-blue-300 hover:bg-blue-500/20',
    sel:  'bg-blue-500 text-white border-blue-600',
    ring: 'ring-blue-400',
    label:'text-blue-700 bg-blue-100',
  },
  purple: {
    bg:   'bg-purple-500',
    text: 'text-purple-900',
    card: 'bg-purple-500/10 border-purple-300 hover:bg-purple-500/20',
    sel:  'bg-purple-500 text-white border-purple-600',
    ring: 'ring-purple-400',
    label:'text-purple-700 bg-purple-100',
  },
};

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function ConexionesSkeleton() {
  return (
    <div className="animate-pulse space-y-3">
      {Array.from({ length: 4 }).map((_, r) => (
        <div key={r} className="grid grid-cols-4 gap-2">
          {Array.from({ length: 4 }).map((_, c) => (
            <div key={c} className="h-14 bg-gray-200 rounded-xl" />
          ))}
        </div>
      ))}
    </div>
  );
}

export default function ConexionesGame({ dataPath }) {
  const [gameData, setGameData]   = useState(null);
  const [loading,  setLoading]    = useState(true);
  const [selected, setSelected]   = useState(new Set()); // word strings
  const [solved,   setSolved]     = useState([]);         // category ids
  const [lives,    setLives]      = useState(4);
  const [status,   setStatus]     = useState('playing');  // playing | won | lost
  const [message,  setMessage]    = useState('');
  const [wrong,    setWrong]      = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(dataPath)
      .then(r => r.json())
      .then(d => { if (!cancelled) { setGameData(d); setLoading(false); } })
      .catch(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [dataPath]);

  // Build shuffled word list (only on first load)
  const allWords = useMemo(() => {
    if (!gameData) return [];
    return shuffle(gameData.categories.flatMap(cat =>
      cat.words.map(w => ({ word: w, categoryId: cat.id }))
    ));
  }, [gameData]);

  const categoryById = useMemo(() => {
    if (!gameData) return {};
    return Object.fromEntries(gameData.categories.map(c => [c.id, c]));
  }, [gameData]);

  const flash = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 1800);
  };

  const toggleWord = (word) => {
    if (status !== 'playing') return;
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(word)) { next.delete(word); }
      else if (next.size < 4) { next.add(word); }
      return next;
    });
  };

  const handleSubmit = () => {
    if (selected.size !== 4) { flash('Seleccioná exactamente 4 palabras'); return; }

    // Check which category all 4 belong to
    const matched = gameData.categories.find(cat =>
      [...selected].every(w => cat.words.includes(w))
    );

    if (matched) {
      const newSolved = [...solved, matched.id];
      setSolved(newSolved);
      setSelected(new Set());
      if (newSolved.length === gameData.categories.length) {
        setStatus('won');
      }
    } else {
      // Wrong guess
      const newLives = lives - 1;
      setLives(newLives);
      setWrong(true);
      setTimeout(() => setWrong(false), 600);
      if (newLives === 0) {
        setStatus('lost');
        flash('¡Se acabaron los intentos! Revelando categorías...');
      } else {
        flash(newLives === 1 ? '¡Un intento más!' : 'Incorrecto, seguí intentando');
      }
    }
  };

  if (loading) return <ConexionesSkeleton />;

  const unsolvedWords = allWords.filter(
    ({ categoryId }) => !solved.includes(categoryId)
  );

  return (
    <div className="flex flex-col items-center gap-5 w-full">

      {/* Instructions pill */}
      <p className="font-montserrat text-xs text-gray-400 text-center max-w-sm">
        Agrupá las 16 palabras en 4 categorías de 4. Seleccioná 4 y presioná <strong>Enviar</strong>.
      </p>

      {/* Lives */}
      <div className="flex items-center gap-2">
        <span className="font-montserrat text-xs text-gray-500">Intentos:</span>
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className={`text-lg transition-all ${i < lives ? 'opacity-100' : 'opacity-20 grayscale'}`}>
            ❤️
          </span>
        ))}
      </div>

      {/* Toast */}
      {message && (
        <div className="bg-gray-800 text-white text-sm font-montserrat px-4 py-2 rounded-full shadow-lg animate-bounce">
          {message}
        </div>
      )}

      {/* Solved categories */}
      {solved.map(catId => {
        const cat = categoryById[catId];
        const c = COLOR[cat.color];
        return (
          <div
            key={catId}
            className={`w-full rounded-2xl p-4 ${c.bg} text-white text-center`}
          >
            <p className="font-garet text-base font-bold uppercase tracking-wide">{cat.label}</p>
            <p className="font-montserrat text-sm mt-1 opacity-90">{cat.words.join(' · ')}</p>
          </div>
        );
      })}

      {/* Unsolved word grid */}
      {status !== 'won' && (
        <div className={`grid grid-cols-4 gap-2 w-full transition-all ${wrong ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}>
          {(status === 'lost' ? allWords.filter(({ categoryId }) => !solved.includes(categoryId)) : unsolvedWords)
            .map(({ word, categoryId }) => {
              const isSelected = selected.has(word);
              const cat = categoryById[categoryId];
              const c = COLOR[cat.color];

              if (status === 'lost') {
                // Reveal all with their colors
                return (
                  <div
                    key={word}
                    className={`h-14 flex items-center justify-center rounded-xl border text-xs font-montserrat font-bold uppercase text-center px-1
                      ${c.bg} text-white border-transparent`}
                  >
                    {word}
                  </div>
                );
              }

              return (
                <button
                  key={word}
                  onClick={() => toggleWord(word)}
                  className={`h-14 flex items-center justify-center rounded-xl border-2 text-xs font-montserrat font-bold uppercase text-center px-1
                    cursor-pointer transition-all duration-150
                    ${isSelected ? `bg-gray-800 text-white border-gray-700 scale-95 shadow-md ring-2 ring-gray-600` : `bg-white border-gray-200 text-gray-800 hover:border-gray-400 hover:shadow-sm`}`}
                >
                  {word}
                </button>
              );
            })}
        </div>
      )}

      {/* Submit button */}
      {status === 'playing' && (
        <button
          onClick={handleSubmit}
          disabled={selected.size !== 4}
          className={`px-8 py-3 rounded-full font-montserrat font-semibold text-sm transition-all
            ${selected.size === 4
              ? 'bg-cranberry text-white shadow-md hover:shadow-lg active:scale-95'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
        >
          Enviar ({selected.size}/4)
        </button>
      )}

      {/* Win state */}
      {status === 'won' && (
        <div className="bg-green-50 border border-green-200 rounded-2xl px-6 py-5 text-center w-full max-w-sm">
          <p className="text-3xl mb-2">🎉</p>
          <p className="font-garet text-xl text-green-700">¡Perfecto! Encontraste todas las conexiones</p>
          <p className="font-montserrat text-sm text-green-500 mt-1">
            con {lives} {lives === 1 ? 'vida' : 'vidas'} restante{lives !== 1 ? 's' : ''}
          </p>
        </div>
      )}

    </div>
  );
}
