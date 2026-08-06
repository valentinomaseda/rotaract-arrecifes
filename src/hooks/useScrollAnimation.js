import { useEffect, useRef, useState } from 'react';

/**
 * Hook para animar elementos al entrar al viewport.
 * Retorna un ref para adjuntar al elemento y un booleano `isVisible`.
 * @param {Object} options - Opciones del IntersectionObserver
 * @param {string} options.threshold - Umbral de visibilidad (0 a 1)
 * @param {string} options.rootMargin - Margen del root
 * @param {boolean} options.triggerOnce - Si es true, solo anima una vez
 */
export const useScrollAnimation = ({
  threshold = 0.15,
  rootMargin = '0px',
  triggerOnce = true,
} = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return [ref, isVisible];
};
