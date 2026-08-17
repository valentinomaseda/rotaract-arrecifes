import { useState, useEffect, useRef, useCallback } from 'react';

// ── Star rating thresholds ────────────────────────────────────────────────
function getStars(score, total) {
  const pct = score / total;
  if (pct === 1)   return 5;
  if (pct >= 0.8)  return 4;
  if (pct >= 0.6)  return 3;
  if (pct >= 0.4)  return 2;
  if (pct >= 0.2)  return 1;
  return 0;
}

const MESSAGES = [
  'Seguí estudiando, ¡la próxima la rompés! 💪',
  '¡Buen comienzo! Hay mucho por aprender 📚',
  'No está mal, ¡pero podés mejorar! 🔍',
  '¡Muy bien! Sabés bastante de Rotary 👏',
  '¡Excelente! Sos casi un experto rotario 🌟',
  '¡Perfecto! ¡Rotario del año! 🏆',
];

function TriviaSkeleton() {
  return (
    <div className="animate-pulse space-y-6 max-w-lg mx-auto w-full">
      <div className="h-6 bg-gray-200 rounded-md w-3/4 mx-auto" />
      <div className="h-4 bg-gray-200 rounded-full w-full" />
      <div className="h-16 bg-gray-200 rounded-2xl" />
      <div className="grid grid-cols-1 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-14 bg-gray-100 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

export default function TriviaGame({ dataPath }) {
  const [gameData,   setGameData]   = useState(null);
  const [loading,    setLoading]    = useState(true);
  const [qIndex,     setQIndex]     = useState(0);
  const [timeLeft,   setTimeLeft]   = useState(15);
  const [answered,   setAnswered]   = useState(null); // selected option index or null
  const [timedOut,   setTimedOut]   = useState(false);
  const [score,      setScore]      = useState(0);
  const [status,     setStatus]     = useState('playing'); // playing | finished
  const timerRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    fetch(dataPath)
      .then(r => r.json())
      .then(d => { if (!cancelled) { setGameData(d); setLoading(false); } })
      .catch(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [dataPath]);

  const questions    = gameData?.questions    ?? [];
  const timePerQ     = gameData?.timePerQuestion ?? 15;
  const currentQ     = questions[qIndex];
  const totalQ       = questions.length;

  // Advance to next question
  const advance = useCallback(() => {
    clearInterval(timerRef.current);
    if (qIndex + 1 >= totalQ) {
      setStatus('finished');
    } else {
      setQIndex(i => i + 1);
      setAnswered(null);
      setTimedOut(false);
      setTimeLeft(timePerQ);
    }
  }, [qIndex, totalQ, timePerQ]);

  // Countdown timer
  useEffect(() => {
    if (loading || status !== 'playing' || answered !== null || timedOut) return;
    setTimeLeft(timePerQ);
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          setTimedOut(true);
          // Auto-advance after showing correct answer
          setTimeout(advance, 2000);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qIndex, loading, status]);

  const handleAnswer = (optIdx) => {
    if (answered !== null || timedOut || status !== 'playing') return;
    clearInterval(timerRef.current);
    setAnswered(optIdx);
    if (optIdx === currentQ.correct) setScore(s => s + 1);
    setTimeout(advance, 1800);
  };

  // Option button color
  const optionStyle = (optIdx) => {
    if (answered === null && !timedOut) {
      return 'bg-white border-gray-200 text-gray-800 hover:border-cranberry hover:bg-cranberry/5 cursor-pointer';
    }
    const isCorrect = optIdx === currentQ.correct;
    const isChosen  = optIdx === answered;
    if (isCorrect)            return 'bg-green-500 border-green-500 text-white';
    if (isChosen && !isCorrect) return 'bg-red-400 border-red-400 text-white';
    return 'bg-white border-gray-100 text-gray-400';
  };

  if (loading) return <TriviaSkeleton />;

  // ── Finished screen ──────────────────────────────────────────────────────
  if (status === 'finished') {
    const stars   = getStars(score, totalQ);
    const message = MESSAGES[stars];
    return (
      <div className="flex flex-col items-center gap-6 py-6 max-w-sm mx-auto text-center">
        <div className="text-5xl select-none">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={i < stars ? 'text-yellow-400' : 'text-gray-200'}>★</span>
          ))}
        </div>
        <div>
          <p className="font-garet text-4xl text-gray-800">{score}<span className="text-gray-400 text-2xl">/{totalQ}</span></p>
          <p className="font-montserrat text-sm text-gray-500 mt-1">respuestas correctas</p>
        </div>
        <p className="font-montserrat text-base text-gray-600 leading-relaxed">{message}</p>
        <button
          onClick={() => {
            setQIndex(0); setScore(0); setAnswered(null);
            setTimedOut(false); setTimeLeft(timePerQ); setStatus('playing');
          }}
          className="btn-cranberry text-white px-8 py-3 rounded-full font-montserrat font-semibold text-sm"
        >
          Jugar de nuevo 🔄
        </button>
      </div>
    );
  }

  // ── Question screen ──────────────────────────────────────────────────────
  const progress = (timeLeft / timePerQ) * 100;

  return (
    <div className="flex flex-col gap-6 max-w-lg mx-auto w-full">

      {/* Progress header */}
      <div className="flex items-center justify-between">
        <span className="font-montserrat text-xs text-gray-400">
          Pregunta {qIndex + 1} de {totalQ}
        </span>
        <span
          className={`font-garet text-xl font-bold tabular-nums
            ${timeLeft <= 5 ? 'text-red-500' : 'text-gray-700'}`}
        >
          {timeLeft}s
        </span>
      </div>

      {/* Timer bar */}
      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
        <div
          className={`h-2 rounded-full transition-all duration-1000 linear
            ${timeLeft <= 5 ? 'bg-red-400' : 'bg-cranberry'}`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question */}
      <div className="bg-gray-50 rounded-2xl p-5 min-h-[4rem] flex items-center justify-center">
        <p className="font-garet text-lg text-gray-800 text-center leading-snug">
          {currentQ.question}
        </p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 gap-3">
        {currentQ.options.map((opt, optIdx) => (
          <button
            key={optIdx}
            onClick={() => handleAnswer(optIdx)}
            className={`w-full px-5 py-4 rounded-xl border-2 font-montserrat text-sm text-left
              transition-all duration-200 ${optionStyle(optIdx)}`}
          >
            <span className="font-bold text-xs mr-3 opacity-60">
              {String.fromCharCode(65 + optIdx)}.
            </span>
            {opt}
          </button>
        ))}
      </div>

      {/* Timeout message */}
      {timedOut && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3 text-center">
          <p className="font-montserrat text-sm text-yellow-700">
            ⏰ ¡Se acabó el tiempo! La correcta era <strong>{currentQ.options[currentQ.correct]}</strong>
          </p>
        </div>
      )}

    </div>
  );
}
