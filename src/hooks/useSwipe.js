import { useRef, useCallback } from 'react';

/**
 * Hook para detectar gestos de deslizamiento (swipe) táctil y arrastre de mouse.
 *
 * @param {Object} options
 * @param {Function} [options.onSwipeLeft] - Función a ejecutar al deslizar hacia la izquierda (siguiente)
 * @param {Function} [options.onSwipeRight] - Función a ejecutar al deslizar hacia la derecha (anterior)
 * @param {number} [options.threshold=35] - Distancia mínima en píxeles para considerar swipe
 * @returns {Object} { handlers, isSwipingRef }
 */
export function useSwipe({ onSwipeLeft, onSwipeRight, threshold = 35 }) {
  const touchStartRef = useRef(null);
  const touchEndRef = useRef(null);
  const isSwipingRef = useRef(false);

  const handleStart = useCallback((clientX, clientY) => {
    isSwipingRef.current = false;
    touchStartRef.current = { x: clientX, y: clientY };
    touchEndRef.current = { x: clientX, y: clientY };
  }, []);

  const handleMove = useCallback((clientX, clientY) => {
    if (!touchStartRef.current) return;
    touchEndRef.current = { x: clientX, y: clientY };

    const deltaX = touchEndRef.current.x - touchStartRef.current.x;
    const deltaY = touchEndRef.current.y - touchStartRef.current.y;

    if (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10) {
      isSwipingRef.current = true;
    }
  }, []);

  const handleEnd = useCallback(() => {
    if (!touchStartRef.current || !touchEndRef.current) return;

    const deltaX = touchEndRef.current.x - touchStartRef.current.x;
    const deltaY = touchEndRef.current.y - touchStartRef.current.y;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) >= threshold) {
      if (deltaX < 0) {
        onSwipeLeft?.();
      } else {
        onSwipeRight?.();
      }
    }

    touchStartRef.current = null;
    touchEndRef.current = null;

    setTimeout(() => {
      isSwipingRef.current = false;
    }, 100);
  }, [onSwipeLeft, onSwipeRight, threshold]);

  const onTouchStart = useCallback((e) => {
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  }, [handleStart]);

  const onTouchMove = useCallback((e) => {
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  }, [handleMove]);

  const onTouchEnd = useCallback(() => {
    handleEnd();
  }, [handleEnd]);

  const onMouseDown = useCallback((e) => {
    handleStart(e.clientX, e.clientY);
  }, [handleStart]);

  const onMouseMove = useCallback((e) => {
    if (touchStartRef.current) {
      handleMove(e.clientX, e.clientY);
    }
  }, [handleMove]);

  const onMouseUp = useCallback(() => {
    handleEnd();
  }, [handleEnd]);

  return {
    handlers: {
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      onMouseDown,
      onMouseMove,
      onMouseUp,
    },
    isSwipingRef,
  };
}
