import React from 'react';
import WeeklyGameView from './WeeklyGameView';
import { useWeeklyGameManager } from './useWeeklyGameManager';

export function GamePage() {
  // Single hook call — state flows down to WeeklyGameView as props.
  const { status, gameConfig, isoWeek } = useWeeklyGameManager();

  const GAME_LABELS = {
    crossword:  'Crucigrama',
    wordle:     'Wordle',
    conexiones: 'Conexiones',
    trivia:     'Trivia',
    wordsearch: 'Sopa de Letras',
    sopa:       'Sopa de Letras',
  };

  const GAME_DESCRIPTIONS = {
    crossword:  'Completá el crucigrama con palabras del mundo Rotaract y Rotary.',
    wordle:     'Adiviná la palabra rotaria de 5 letras en 6 intentos.',
    conexiones: 'Agrupá las palabras en 4 categorías. ¡Encontrá las conexiones!',
    trivia:     'Poné a prueba tus conocimientos sobre Rotaract y Rotary.',
    wordsearch: 'Buscá las palabras rotarias escondidas en la grilla. ¡Encontrá todas!',
    sopa:       'Buscá las palabras rotarias escondidas en la grilla. ¡Encontrá todas!',
  };

  const gameTypeLabel   = GAME_LABELS[gameConfig?.type]       ?? 'Juego';
  const gameDescription = GAME_DESCRIPTIONS[gameConfig?.type] ?? '¡El desafío de esta semana te espera!';

  const showCrosswordInstructions =
    status === 'found' && gameConfig?.type === 'crossword';

  return (
    <div className="bg-gray-50 min-h-screen overflow-x-hidden">

      {/* ── Hero ── */}
      <section
        className="relative text-white py-20 px-6 lg:px-8 text-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0a0a0f 0%, #12071a 40%, #0f0a1a 70%, #080810 100%)' }}
      >
        {/* Blobs de luz */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-30"
            style={{ background: 'radial-gradient(ellipse, #d41367 0%, transparent 65%)', filter: 'blur(80px)' }} />
          <div className="absolute bottom-0 -left-20 w-[350px] h-[350px] rounded-full opacity-15"
            style={{ background: 'radial-gradient(circle, #e91e8c 0%, transparent 70%)', filter: 'blur(80px)' }} />
          <div className="absolute bottom-0 -right-20 w-[300px] h-[300px] rounded-full opacity-15"
            style={{ background: 'radial-gradient(circle, #6d28d9 0%, transparent 70%)', filter: 'blur(80px)' }} />
          {/* Grid sutil */}
          <div className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }} />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto space-y-5">
          {/* Badge glassmorphism */}
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-montserrat font-bold tracking-widest uppercase"
            style={{
              background: 'rgba(212,19,103,0.18)',
              border: '1px solid rgba(212,19,103,0.35)',
              backdropFilter: 'blur(12px)',
            }}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cranberry opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cranberry" />
            </span>
            {gameTypeLabel}
          </span>

          <h1 className="font-garet text-4xl md:text-5xl lg:text-6xl leading-tight">
            Juego de{' '}
            <span style={{
              background: 'linear-gradient(90deg, #d41367, #ff6eb0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>la Semana</span>
          </h1>
          <p className="font-montserrat text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
            {gameDescription}
          </p>
        </div>
      </section>

      {/* ── Instructions (crossword only) ── */}
      {showCrosswordInstructions && (
        <section className="max-w-5xl mx-auto px-6 pt-8 pb-2">
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
            <h2 className="font-garet text-lg text-gray-800 mb-3">¿Cómo jugar?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: '🖱️', title: 'Clic para seleccionar', desc: 'Hacé clic en una celda y empezá a tipear. Clic nuevamente para cambiar de dirección.' },
                { icon: '⌨️', title: 'Navegación', desc: 'Usá las flechas del teclado para moverte. Tab para ir a la siguiente palabra.' },
                { icon: '✅', title: 'Verificar', desc: 'Usá el botón "Verificar" para ver en verde las letras correctas y en rojo las incorrectas.' },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="flex gap-3">
                  <span className="text-2xl mt-0.5">{icon}</span>
                  <div>
                    <p className="font-montserrat font-semibold text-gray-800 text-sm">{title}</p>
                    <p className="font-montserrat text-gray-500 text-xs leading-relaxed mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Game ── */}
      <section className="max-w-5xl mx-auto px-6 py-8">
        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-6 md:p-8">
          <WeeklyGameView status={status} gameConfig={gameConfig} />
        </div>
      </section>

      {/* ── Footer note ── */}
      <p className="text-center text-xs text-gray-400 font-montserrat pb-10">
        El juego se actualiza cada semana. ¡Volvé pronto! 🔄
      </p>

    </div>
  );
}
