import { useEffect } from 'react';

/**
 * GameResultModal
 *
 * Shared win/lose modal used across all game types.
 *
 * Props:
 *  - open         {boolean}   — whether the modal is visible
 *  - type         {'won'|'lost'|'done'|'finished'} — outcome type
 *  - title        {string}    — headline text
 *  - subtitle     {string}    — secondary message
 *  - onClose      {function}  — called when the user closes the modal
 *  - onReplay     {function?} — if provided, shows a "play again" button
 */
export default function GameResultModal({ open, type, title, subtitle, onClose, onReplay }) {
  // Lock body scroll while open
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else       document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;

  const isWin = type === 'won' || type === 'done' || type === 'finished';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-8 text-center relative"
        style={{ animation: 'scaleIn 0.35s cubic-bezier(0.22,1,0.36,1) both' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Cerrar"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Emoji */}
        <div className="text-6xl mb-4 select-none" role="img" aria-label={isWin ? 'victoria' : 'derrota'}>
          {isWin ? '🎉' : '😔'}
        </div>

        {/* Badge */}
        <span
          className={`inline-block px-4 py-1.5 rounded-full text-xs font-montserrat font-bold tracking-widest uppercase mb-4 ${
            isWin
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-600'
          }`}
        >
          {isWin ? '¡Victoria!' : 'Fin del juego'}
        </span>

        {/* Title */}
        <h2 className="font-garet text-2xl text-gray-900 mb-2 leading-tight">{title}</h2>

        {/* Subtitle */}
        {subtitle && (
          <p className="font-montserrat text-gray-500 text-sm leading-relaxed mb-6">{subtitle}</p>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-3 mt-6">
          <button
            onClick={onClose}
            className={`py-3 rounded-2xl font-montserrat font-semibold text-sm transition-all active:scale-95 ${
              isWin
                ? 'btn-cranberry text-white'
                : 'bg-gray-800 hover:bg-gray-700 text-white'
            }`}
          >
            {isWin ? 'Ver el tablero 🔍' : 'Cerrar'}
          </button>

          {onReplay && (
            <button
              onClick={() => { onClose(); onReplay(); }}
              className="bg-gray-100 hover:bg-gray-200 text-gray-600 py-3 rounded-2xl font-montserrat font-semibold text-sm transition-colors"
            >
              Jugar de nuevo 🔄
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
