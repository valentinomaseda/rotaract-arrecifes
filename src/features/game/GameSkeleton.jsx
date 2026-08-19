/**
 * GameSkeleton
 *
 * Animated placeholder that mirrors the crossword layout:
 *   Left  — grid of cells
 *   Right — two clue-list columns (Horizontal + Vertical)
 *
 * Used as <Suspense fallback> and during manifest loading.
 */
export default function GameSkeleton() {
  return (
    <div className="w-full animate-pulse" aria-hidden="true" aria-label="Cargando juego…">

      {/* ── Grid block ── */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">

        {/* Grid shimmer */}
        <div className="flex-shrink-0 space-y-1">
          {Array.from({ length: 10 }).map((_, row) => (
            <div key={row} className="flex gap-1">
              {Array.from({ length: 11 }).map((_, col) => {
                // Leave some cells "dark" to suggest the crossword black squares
                const isDark = (row + col) % 7 === 0 || (row === 0 && col < 3);
                return (
                  <div
                    key={col}
                    className={`w-9 h-9 rounded-md ${isDark ? 'bg-gray-700/20' : 'bg-gray-200'}`}
                  />
                );
              })}
            </div>
          ))}

          {/* Action buttons shimmer */}
          <div className="flex gap-2 mt-4">
            <div className="h-9 w-28 rounded-full bg-gray-200" />
            <div className="h-9 w-24 rounded-full bg-gray-200" />
            <div className="h-9 w-24 rounded-full bg-gray-200" />
          </div>
        </div>

        {/* Clues shimmer */}
        <div className="flex-1 min-w-0 space-y-6">

          {/* Horizontal clues */}
          <div>
            <div className="h-5 w-28 bg-gray-200 rounded-md mb-3" />
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex gap-3 p-2">
                  <div className="h-4 w-4 bg-gray-200 rounded-md flex-shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-3 bg-gray-200 rounded-md" style={{ width: `${75 + i * 5}%` }} />
                    {i % 2 === 0 && <div className="h-3 bg-gray-100 rounded-md w-1/2" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vertical clues */}
          <div>
            <div className="h-5 w-20 bg-gray-200 rounded-md mb-3" />
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex gap-3 p-2">
                  <div className="h-4 w-4 bg-gray-200 rounded-md flex-shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-3 bg-gray-200 rounded-md" style={{ width: `${65 + i * 8}%` }} />
                    {i === 1 && <div className="h-3 bg-gray-100 rounded-md w-2/3" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
