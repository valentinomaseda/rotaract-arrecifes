import { Suspense, lazy, useMemo } from 'react';
import GameSkeleton from './GameSkeleton';

// ── Registry of lazy-loaded game components ────────────────────────────────
// Add new game types here. Each value is a React.lazy() result so the
// corresponding chunk is only fetched when that type is resolved.
const GAME_REGISTRY = {
  crossword:  lazy(() => import('./CrosswordGame')),
  wordle:     lazy(() => import('./WordleGame')),
  conexiones: lazy(() => import('./ConexionesGame')),
  trivia:     lazy(() => import('./TriviaGame')),
};

// ── Empty state ────────────────────────────────────────────────────────────
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-5 py-16 px-6 text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-16 h-16 text-gray-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.2}
        aria-hidden="true"
      >
        {/* Calendar with question mark */}
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M12 13.5v.01M12 10.5a1.5 1.5 0 010 3" />
      </svg>

      <div className="space-y-2 max-w-xs">
        <p className="font-garet text-lg text-gray-700 leading-snug">
          Estamos preparando el juego de esta semana
        </p>
        <p className="font-montserrat text-sm text-gray-400 leading-relaxed">
          Volvé pronto. Publicamos un nuevo desafío cada semana 🗓️
        </p>
      </div>
    </div>
  );
}

// ── Error state ────────────────────────────────────────────────────────────
function ErrorState() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 px-6 text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-14 h-14 text-gray-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.2}
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
      <div className="space-y-1 max-w-xs">
        <p className="font-garet text-base text-gray-700">No se pudo cargar el juego</p>
        <p className="font-montserrat text-sm text-gray-400">
          Verificá tu conexión y recargá la página.
        </p>
      </div>
    </div>
  );
}

// ── WeeklyGameView (orchestrator) ──────────────────────────────────────────
/**
 * @param {{ status: string, gameConfig: object|null }} props
 *   Props are provided by the parent (GamePage) which owns the single
 *   useWeeklyGameManager() call, avoiding duplicate fetches.
 */
export default function WeeklyGameView({ status, gameConfig }) {
  // Resolve the lazy component from the registry.
  const GameComponent = useMemo(() => {
    if (!gameConfig) return null;
    return GAME_REGISTRY[gameConfig.type] ?? null;
  }, [gameConfig]);

  if (status === 'loading') return <GameSkeleton />;
  if (status === 'error')   return <ErrorState />;
  if (status === 'not-found' || !GameComponent) return <EmptyState />;

  return (
    <Suspense fallback={<GameSkeleton />}>
      <GameComponent dataPath={gameConfig.dataPath} />
    </Suspense>
  );
}
