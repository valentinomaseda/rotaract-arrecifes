import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrollea al top en cada cambio de ruta (pathname).
 * Si la nueva ruta viene con state.scrollTo, hace scroll a ese ID después de montar.
 */
export const ScrollToTop = () => {
  const { pathname, state } = useLocation();

  useEffect(() => {
    if (state?.scrollTo) {
      // Navegar a home con destino a una sección específica
      const el = document.getElementById(state.scrollTo);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
      }
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname, state]);

  return null;
};
