import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projectsData } from '../../data/projectsData';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useSwipe } from '../../hooks/useSwipe';

/* ── Lightbox fullscreen con Zoom y Pan ── */
const Lightbox = ({ images, startIndex, onClose }) => {
  const [current, setCurrent] = useState(startIndex);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const positionRef = useRef({ x: 0, y: 0 });
  const touchDistanceRef = useRef(null);
  const lastTapRef = useRef(0);
  const containerRef = useRef(null);

  // Mantener positionRef sincronizado
  positionRef.current = position;

  const resetZoom = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  const prev = useCallback(() => {
    resetZoom();
    setCurrent((i) => (i - 1 + images.length) % images.length);
  }, [images.length, resetZoom]);

  const next = useCallback(() => {
    resetZoom();
    setCurrent((i) => (i + 1) % images.length);
  }, [images.length, resetZoom]);

  const handleZoomIn = useCallback(() => {
    setScale((prevScale) => Math.min(4, Math.round((prevScale + 0.5) * 10) / 10));
  }, []);

  const handleZoomOut = useCallback(() => {
    setScale((prevScale) => {
      const nextScale = Math.max(1, Math.round((prevScale - 0.5) * 10) / 10);
      if (nextScale === 1) setPosition({ x: 0, y: 0 });
      return nextScale;
    });
  }, []);

  // Swipe solo activo si no hay zoom (scale === 1)
  const { handlers: swipeHandlers } = useSwipe({
    onSwipeLeft: scale === 1 ? next : undefined,
    onSwipeRight: scale === 1 ? prev : undefined,
  });

  // Doble click o doble tap para alternar zoom rápido
  const handleToggleZoom = useCallback((clientX, clientY) => {
    if (scale > 1) {
      resetZoom();
    } else {
      setScale(2.5);
      if (containerRef.current && clientX !== undefined && clientY !== undefined) {
        const rect = containerRef.current.getBoundingClientRect();
        const offsetX = clientX - (rect.left + rect.width / 2);
        const offsetY = clientY - (rect.top + rect.height / 2);
        setPosition({ x: -offsetX * 1.2, y: -offsetY * 1.2 });
      }
    }
  }, [scale, resetZoom]);

  // Manejo de rueda del mouse (Wheel Zoom)
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 0.25 : -0.25;
    setScale((prevScale) => {
      const nextScale = Math.min(4, Math.max(1, Math.round((prevScale + zoomFactor) * 100) / 100));
      if (nextScale === 1) {
        setPosition({ x: 0, y: 0 });
      }
      return nextScale;
    });
  }, []);

  // Mouse Drag (Pan)
  const handleMouseDown = useCallback((e) => {
    if (scale <= 1) return;
    e.preventDefault();
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX - positionRef.current.x,
      y: e.clientY - positionRef.current.y,
    };
  }, [scale]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging || scale <= 1) return;
    e.preventDefault();
    setPosition({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y,
    });
  }, [isDragging, scale]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Touch handlers para Zoom y Pan
  const handleTouchStart = useCallback((e) => {
    if (e.touches.length === 2) {
      // Pinch to zoom
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      touchDistanceRef.current = dist;
    } else if (e.touches.length === 1) {
      // Doble tap detection
      const now = Date.now();
      if (now - lastTapRef.current < 300) {
        handleToggleZoom(e.touches[0].clientX, e.touches[0].clientY);
      }
      lastTapRef.current = now;

      if (scale > 1) {
        setIsDragging(true);
        dragStartRef.current = {
          x: e.touches[0].clientX - positionRef.current.x,
          y: e.touches[0].clientY - positionRef.current.y,
        };
      }
    }
  }, [scale, handleToggleZoom]);

  const handleTouchMove = useCallback((e) => {
    if (e.touches.length === 2 && touchDistanceRef.current) {
      // Pinch to zoom
      e.preventDefault();
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const diff = (dist - touchDistanceRef.current) / 150;
      setScale((prevScale) => {
        const nextScale = Math.min(4, Math.max(1, prevScale + diff));
        if (nextScale === 1) setPosition({ x: 0, y: 0 });
        return nextScale;
      });
      touchDistanceRef.current = dist;
    } else if (e.touches.length === 1 && isDragging && scale > 1) {
      // Drag pan
      e.preventDefault();
      setPosition({
        x: e.touches[0].clientX - dragStartRef.current.x,
        y: e.touches[0].clientY - dragStartRef.current.y,
      });
    }
  }, [isDragging, scale]);

  const handleTouchEnd = useCallback((e) => {
    if (e.touches.length < 2) {
      touchDistanceRef.current = null;
    }
    if (e.touches.length === 0) {
      setIsDragging(false);
    }
  }, []);

  // Teclado: Escape cierra, flechas navegan, + y - hacen zoom
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && scale === 1) prev();
      if (e.key === 'ArrowRight' && scale === 1) next();
      if (e.key === '+' || e.key === '=') handleZoomIn();
      if (e.key === '-' || e.key === '_') handleZoomOut();
      if (e.key === '0') resetZoom();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, prev, next, scale, handleZoomIn, handleZoomOut, resetZoom]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center select-none overflow-hidden"
      style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(8px)', touchAction: scale > 1 ? 'none' : 'pan-y' }}
      onClick={(e) => {
        if (e.target === e.currentTarget && !isDragging) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Visor de imagen"
      {...(scale === 1 ? swipeHandlers : {})}
    >
      {/* Barra superior: Contador y Botones de Zoom */}
      <div className="absolute top-4 inset-x-4 flex items-center justify-between z-20 pointer-events-none">
        {/* Contador */}
        <div className="bg-black/50 backdrop-blur-md text-white font-montserrat text-xs md:text-sm px-3 md:px-4 py-1.5 rounded-full border border-white/10 pointer-events-auto">
          {current + 1} / {images.length}
        </div>

        {/* Controles de Zoom */}
        <div className="flex items-center gap-1.5 md:gap-2 bg-black/50 backdrop-blur-md px-2 md:px-3 py-1 rounded-full border border-white/10 pointer-events-auto shadow-lg">
          <button
            onClick={handleZoomOut}
            disabled={scale <= 1}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-white transition-all ${
              scale <= 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/20 active:scale-95'
            }`}
            aria-label="Alejar"
            title="Alejar (-)"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" />
            </svg>
          </button>

          <span className="text-white font-montserrat text-xs font-semibold min-w-[42px] text-center">
            {Math.round(scale * 100)}%
          </span>

          <button
            onClick={handleZoomIn}
            disabled={scale >= 4}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-white transition-all ${
              scale >= 4 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/20 active:scale-95'
            }`}
            aria-label="Acercar"
            title="Acercar (+)"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
          </button>

          {scale > 1 && (
            <button
              onClick={resetZoom}
              className="ml-1 text-[11px] font-montserrat text-cranberry bg-white/90 hover:bg-white px-2 py-0.5 rounded-full font-medium transition-all active:scale-95 cursor-pointer"
              aria-label="Restablecer tamaño"
              title="Restablecer (0)"
            >
              Restablecer
            </button>
          )}
        </div>

        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 active:scale-95 flex items-center justify-center text-white transition-all duration-200 border border-white/20 pointer-events-auto cursor-pointer"
          aria-label="Cerrar visor"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Contenedor Interactivo de la Imagen con Zoom y Pan */}
      <div
        ref={containerRef}
        className="relative w-full h-full flex items-center justify-center overflow-hidden"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onDoubleClick={(e) => handleToggleZoom(e.clientX, e.clientY)}
        style={{
          cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in',
          touchAction: 'none',
        }}
      >
        <div
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transition: isDragging ? 'none' : 'transform 0.2s cubic-bezier(0.2, 0, 0, 1)',
            transformOrigin: 'center center',
          }}
          className="flex items-center justify-center max-w-[90vw] max-h-[85vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            key={current}
            src={images[current]}
            alt={`Foto ${current + 1}`}
            className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl animate-fade-in pointer-events-none select-none"
            draggable={false}
          />
        </div>
      </div>

      {/* Guía / Tip en la parte inferior */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-sm text-white/80 text-xs font-montserrat px-3.5 py-1.5 rounded-full pointer-events-none flex items-center justify-center gap-2 text-center whitespace-nowrap max-w-[90vw]">
        {/* Desktop */}
        <span className="hidden md:inline">
          {scale > 1 ? 'Arrastrá para mover • Doble clic para reiniciar' : 'Rueda del mouse o doble clic para hacer zoom'}
        </span>
        {/* Pantallas táctiles / Mobile */}
        <span className="inline md:hidden">
          {scale > 1 ? 'Arrastrá para mover • Doble toque para reiniciar' : 'Pellizcá o tocá dos veces para hacer zoom'}
        </span>
      </div>

      {/* Flechas de navegación (visibles cuando no hay zoom activo) */}
      {images.length > 1 && scale === 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white border border-white/20 transition-all duration-200 z-20 cursor-pointer"
            aria-label="Foto anterior"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white border border-white/20 transition-all duration-200 z-20 cursor-pointer"
            aria-label="Foto siguiente"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
          </button>

          {/* Puntos indicadores */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                className={`rounded-full transition-all duration-300 cursor-pointer ${i === current ? 'bg-white w-5 h-2' : 'bg-white/40 w-2 h-2'}`}
                aria-label={`Ir a foto ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

/* ── Galería con lightbox ── */
const GalleryView = ({ images, title }) => {
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const prev = useCallback(() => setActive((p) => (p - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setActive((p) => (p + 1) % images.length), [images.length]);

  const { handlers, isSwipingRef } = useSwipe({
    onSwipeLeft: next,
    onSwipeRight: prev,
  });

  return (
    <>
      <div className="space-y-4">
        {/* Imagen principal — clickeable para abrir lightbox, deslizable para cambiar foto */}
        <div
          className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl bg-gray-100 group select-none"
          style={{ cursor: 'zoom-in', touchAction: 'pan-y' }}
          {...handlers}
          onClick={(e) => {
            if (isSwipingRef.current) {
              e.stopPropagation();
              return;
            }
            setLightboxOpen(true);
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && setLightboxOpen(true)}
          aria-label="Ampliar imagen"
        >
          <img
            key={active}
            src={images[active]}
            alt={`${title} - foto ${active + 1}`}
            className="w-full h-full object-cover animate-fade-in transition-transform duration-500 group-hover:scale-[1.02] pointer-events-none"
          />

          {/* Badge indicador de deslizamiento en mobile */}
          {images.length > 1 && (
            <div className="md:hidden absolute top-3 left-3 z-10 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-montserrat flex items-center gap-1.5 pointer-events-none">
              <svg className="w-3.5 h-3.5 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h8M8 12h8M8 17h8" />
              </svg>
              Deslizá para cambiar
            </div>
          )}

          {/* Ícono de lupa al hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 pointer-events-none">
            <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0zm0 0v.01M11 8v6M8 11h6" />
              </svg>
            </div>
          </div>

          {/* Flechas internas */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center text-gray-700 hover:text-cranberry border border-transparent hover:border-cranberry transition-all duration-200 z-10"
                aria-label="Foto anterior"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center text-gray-700 hover:text-cranberry border border-transparent hover:border-cranberry transition-all duration-200 z-10"
                aria-label="Foto siguiente"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
              </button>

              {/* Indicador */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setActive(i); }}
                    className={`h-2 rounded-full transition-all duration-300 ${i === active ? 'bg-white w-5' : 'bg-white/50 w-2'}`}
                    aria-label={`Ir a foto ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Thumbnails */}
        <div className="flex gap-3 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`flex-none w-20 h-14 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                i === active ? 'border-cranberry shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
              aria-label={`Ver foto ${i + 1}`}
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          images={images}
          startIndex={active}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
};

export const ProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projectsData.find((p) => p.id === id);
  const [headerRef, headerVisible] = useScrollAnimation({ threshold: 0.1 });

  // Proyecto no encontrado
  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6">
        <span className="font-garet text-7xl text-cranberry font-bold">404</span>
        <p className="font-montserrat text-gray-500 text-xl text-center">No encontramos ese proyecto.</p>
        <button
          onClick={() => navigate('/proyectos')}
          className="btn-cranberry text-white px-6 py-3 rounded-full font-montserrat font-semibold"
        >
          Ver todos los proyectos
        </button>
      </div>
    );
  }

  const paragraphs = project.longDescription.split('\n\n');

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <div className="relative bg-white overflow-hidden">
        <div className="blob-decoration w-[400px] h-[400px] bg-cranberry/5 -top-32 -right-32" aria-hidden="true" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm font-montserrat text-gray-400 mb-8 flex-wrap" aria-label="Breadcrumb">
            <button onClick={() => navigate('/')} className="hover:text-cranberry transition-colors duration-200 bg-transparent border-0 p-0 cursor-pointer">
              Inicio
            </button>
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            <button onClick={() => navigate('/proyectos')} className="hover:text-cranberry transition-colors duration-200 bg-transparent border-0 p-0 cursor-pointer">
              Proyectos
            </button>
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            <span className="text-gray-700 font-semibold truncate max-w-[200px]">{project.title}</span>
          </nav>

          <div
            ref={headerRef}
            className={`transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
          >
            {/* Category + date */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-cranberry/10 px-3 py-1 text-xs font-montserrat font-semibold text-cranberry">
                {project.category}
              </span>
              <span className="text-sm font-montserrat text-gray-400">{project.date}</span>
            </div>

            <h1 className="font-garet text-4xl md:text-5xl lg:text-6xl text-gray-900 leading-tight mb-4 max-w-3xl">
              {project.title}
            </h1>
            <p className="font-montserrat text-xl text-gray-500 max-w-2xl leading-relaxed">
              {project.description}
            </p>
          </div>
        </div>
        <div className="section-divider" aria-hidden="true" />
      </div>

      {/* ── Contenido principal ── */}
      <div className="bg-gray-50 py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

            {/* Galería */}
            <div className="lg:col-span-7">
              {(() => {
                const allImages = project.imageUrl
                  ? [project.imageUrl, ...(project.images ?? []).filter(img => img !== project.imageUrl)]
                  : (project.images ?? []);
                return allImages.length > 0
                  ? <GalleryView images={allImages} title={project.title} />
                  : null;
              })()}
            </div>

            {/* Info lateral */}
            <div className="lg:col-span-5 space-y-8">
              {/* Descripción completa */}
              <div className="space-y-4">
                <h2 className="font-garet text-2xl text-gray-900">Sobre el proyecto</h2>
                {paragraphs.map((para, i) => (
                  <p key={i} className="font-montserrat text-gray-500 leading-relaxed text-base">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* ── Volver ── */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-16 pt-10 border-t border-gray-200">
            <button
              onClick={() => navigate('/proyectos')}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white border border-gray-200 text-gray-700 font-montserrat font-semibold text-base shadow-sm hover:border-cranberry hover:text-cranberry hover:shadow-md transition-all duration-300"
            >
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 text-gray-600 group-hover:bg-cranberry/10 group-hover:text-cranberry transition-all duration-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 16l-4-4m0 0l4-4m-4 4h18" /></svg>
              </span>
              Ver todos los proyectos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
