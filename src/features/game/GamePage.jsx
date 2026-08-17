import React from 'react';
import WeeklyGameView from './WeeklyGameView';
import { useWeeklyGameManager } from './useWeeklyGameManager';

export function GamePage() {
  // Single hook call — state flows down to WeeklyGameView as props.
  const { status, gameConfig, isoWeek } = useWeeklyGameManager();

  const weekLabel =
    status === 'found' && gameConfig?.label
      ? gameConfig.label
      : `Semana ${isoWeek}`;

  const gameTypeLabel =
    status === 'found' && gameConfig?.type === 'crossword'
      ? 'Crucigrama'
      : 'Juego';

  const showCrosswordInstructions =
    status === 'found' && gameConfig?.type === 'crossword';

  return (
    <div className="bg-gray-50 min-h-screen overflow-x-hidden">

      {/* ── Hero ── */}
      <section className="bg-cranberry text-white py-16 px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl -top-20 -left-20" aria-hidden="true" />
        <div className="absolute w-[300px] h-[300px] bg-white/10 rounded-full blur-2xl bottom-0 right-0" aria-hidden="true" />
        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-montserrat font-bold tracking-widest uppercase bg-white/20">
            {gameTypeLabel} · {weekLabel}
          </span>
          <h1 className="font-garet text-4xl md:text-5xl lg:text-6xl leading-tight">
            Juego de la Semana
          </h1>
          <p className="font-montserrat text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            Poné a prueba tus conocimientos sobre Rotaract y Rotary. ¡Completá el crucigrama!
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
