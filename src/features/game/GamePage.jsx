import React, { useState } from 'react';
import WeeklyGameView from './WeeklyGameView';
import { useWeeklyGameManager } from './useWeeklyGameManager';

const MODE_ICONS = {
  crossword: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  wordle: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 7V4h16v3M9 20h6M12 4v16" />
    </svg>
  ),
  conexiones: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  ),
  trivia: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  wordsearch: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  ),
};

const AVAILABLE_MODES = [
  {
    id: 'crossword',
    type: 'crossword',
    label: 'Crucigrama',
    dataPath: '/games/crossword-week-37.json',
  },
  {
    id: 'wordle',
    type: 'wordle',
    label: 'Wordle',
    dataPath: '/games/wordle-week-38.json',
  },
  {
    id: 'conexiones',
    type: 'conexiones',
    label: 'Conexiones',
    dataPath: '/games/conexiones-week-34.json',
  },
  {
    id: 'trivia',
    type: 'trivia',
    label: 'Trivia',
    dataPath: '/games/trivia-week-39.json',
  },
  {
    id: 'wordsearch',
    type: 'wordsearch',
    label: 'Sopa de Letras',
    dataPath: '/games/wordsearch-week-36.json',
  },
];

export function GamePage() {
  // Single hook call — state flows down to WeeklyGameView as props.
  const { status, gameConfig } = useWeeklyGameManager();
  const [selectedOverride, setSelectedOverride] = useState(null);

  const activeGameConfig = selectedOverride ?? gameConfig;

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

  const gameTypeLabel   = GAME_LABELS[activeGameConfig?.type]       ?? 'Juego';
  const gameDescription = GAME_DESCRIPTIONS[activeGameConfig?.type] ?? '¡El desafío de esta semana te espera!';

  const showCrosswordInstructions =
    status === 'found' && activeGameConfig?.type === 'crossword';

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

      {/* ── Selector de desafíos ── */}
      <section className="max-w-5xl mx-auto px-6 pt-8 pb-2" aria-label="Elegir modo de juego">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-gray-100 rounded-2xl shadow-sm p-3 sm:px-5 sm:py-3.5">
          <span className="font-montserrat text-xs font-bold uppercase tracking-wider text-gray-400 px-1">
            Elegí tu desafío:
          </span>
          <div className="flex flex-wrap gap-2">
            {AVAILABLE_MODES.map((mode) => {
              const isActive = activeGameConfig?.type === mode.type || (mode.type === 'wordsearch' && activeGameConfig?.type === 'sopa');
              return (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => setSelectedOverride({ type: mode.type, dataPath: mode.dataPath })}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-montserrat text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-cranberry text-white shadow-sm shadow-cranberry/25'
                      : 'bg-gray-50 text-gray-600 hover:bg-cranberry/8 hover:text-cranberry border border-gray-100'
                  }`}
                >
                  {MODE_ICONS[mode.id]}
                  {mode.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Instructions (crossword only) ── */}
      {showCrosswordInstructions && (
        <section className="max-w-5xl mx-auto px-6 pt-4 pb-2">
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
            <h2 className="font-garet text-lg text-gray-800 mb-3">¿Cómo jugar?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
                    </svg>
                  ),
                  title: 'Clic para seleccionar',
                  desc: 'Hacé clic en una celda y empezá a tipear. Clic nuevamente para cambiar de dirección.',
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <rect x="2" y="5" width="20" height="14" rx="2" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 9h.01M10 9h.01M14 9h.01M18 9h.01M6 13h.01M18 13h.01M9 15h6" />
                    </svg>
                  ),
                  title: 'Navegación',
                  desc: 'Usá las flechas del teclado para moverte. Tab para ir a la siguiente palabra.',
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  title: 'Verificar',
                  desc: 'Usá el botón "Verificar" para ver en verde las letras correctas y en rojo las incorrectas.',
                },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="flex gap-3">
                  <span className="w-9 h-9 rounded-xl bg-cranberry/10 text-cranberry flex items-center justify-center flex-shrink-0 mt-0.5">
                    {icon}
                  </span>
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
      <section className="max-w-5xl mx-auto px-6 py-6">
        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-6 md:p-8">
          <WeeklyGameView
            key={`${activeGameConfig?.type}-${activeGameConfig?.dataPath}`}
            status={status}
            gameConfig={activeGameConfig}
          />
        </div>
      </section>

      {/* ── Footer note ── */}
      <p className="flex items-center justify-center gap-1.5 text-center text-xs text-gray-400 font-montserrat pb-10">
        <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        El juego se actualiza cada semana. ¡Volvé pronto!
      </p>

    </div>
  );
}
