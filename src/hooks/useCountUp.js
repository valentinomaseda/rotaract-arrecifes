import { useEffect, useRef, useState } from 'react';

/**
 * Hook que anima un número desde 0 hasta `end` cuando el elemento entra al viewport.
 * @param {number} end - Número final
 * @param {number} duration - Duración en ms (default 1800)
 * @param {number} threshold - Threshold del IntersectionObserver (default 0.4)
 */
export const useCountUp = (end, duration = 1800, threshold = 0.4) => {
  const ref = useRef(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.unobserve(element);
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [started, threshold]);

  useEffect(() => {
    if (!started) return;

    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutExpo para que el conteo desacelere al final
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(eased * end));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [started, end, duration]);

  return [ref, count];
};
