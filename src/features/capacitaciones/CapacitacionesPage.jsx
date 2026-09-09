import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import {
  getUpcomingCapacitacion,
  getPastCapacitaciones,
} from '../../data/capacitacionesData';

/* ─────────────────────────────────────────────────────────────
   Helpers
───────────────────────────────────────────────────────────── */
function formatDate(isoDate) {
  const date = new Date(isoDate + 'T12:00:00'); // fuerza mediodía local para evitar off-by-one de timezone
  return date.toLocaleDateString('es-AR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function formatDateShort(isoDate) {
  const date = new Date(isoDate + 'T12:00:00');
  return date.toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/* ─────────────────────────────────────────────────────────────
   Íconos inline
───────────────────────────────────────────────────────────── */
const CalendarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const VideoIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
      d="M15 10l4.553-2.276A1 1 0 0121 8.723v6.554a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const MicIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 016 0v6a3 3 0 01-3 3z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-4 h-4 flex-shrink-0 text-cranberry" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
  </svg>
);

const UsersIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

/* ─────────────────────────────────────────────────────────────/* ────────────────────────────────────────────────────────────
   Modal Card del orador
──────────────────────────────────────────────────────────── */
const SpeakerModalCard = ({ cap }) => {
  const [open, setOpen] = useState(false);
  const cardRef = useRef(null);
  const modalRef = useRef(null);

  // Bloquear scroll al abrir el modal
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Cerrar con Escape
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    if (open) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open]);

  return (
    <>
      {/* ――― CARD COMPACTA (clickeable) ――― */}
      <div
        ref={cardRef}
        id="speaker-modal-card"
        role="button"
        tabIndex={0}
        aria-label={`Ver información sobre ${cap.speaker}`}
        onClick={() => setOpen(true)}
        onKeyDown={(e) => e.key === 'Enter' && setOpen(true)}
        className="group relative cursor-pointer select-none"
      >
        {/* Glow de fondo */}
        <div className="absolute inset-0 bg-gradient-to-br from-cranberry/10 to-transparent rounded-[2rem] blur-xl" aria-hidden="true" />

        <div className="relative overflow-hidden rounded-[2rem] border border-white/80 shadow-[0_20px_60px_-10px_rgba(212,19,103,0.12)] bg-white/60 backdrop-blur-xl">
          {/* Foto del orador — ocupa todo el ancho */}
          {cap.speakerPhoto && (
            <div className="relative h-64 md:h-72 overflow-hidden">
              <img
                src={cap.speakerPhoto}
                alt={`Foto de ${cap.speaker}`}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradiente inferior */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              {/* Nombre sobre la foto */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="font-montserrat text-white/70 text-xs uppercase tracking-widest mb-1">Orador/a • Ed. #{cap.edition}</p>
                <p className="font-garet text-white text-xl md:text-2xl leading-tight">{cap.speaker}</p>
              </div>
              {/* Badge hover: "Ver más" */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-montserrat font-semibold px-3 py-1.5 rounded-full border border-white/30">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  Ver perfil
                </span>
              </div>
            </div>
          )}

          {/* Info rápida debajo de la foto */}
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-cranberry/10 flex items-center justify-center text-cranberry flex-shrink-0">
                <CalendarIcon />
              </div>
              <div>
                <p className="font-montserrat text-xs text-gray-400 uppercase tracking-wider">Fecha</p>
                <p className="font-montserrat text-gray-800 font-medium text-sm capitalize">{formatDate(cap.date)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-cranberry/10 flex items-center justify-center text-cranberry flex-shrink-0">
                <ClockIcon />
              </div>
              <div>
                <p className="font-montserrat text-xs text-gray-400 uppercase tracking-wider">Horario</p>
                <p className="font-montserrat text-gray-800 font-medium text-sm">{cap.time} hs</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-cranberry/10 flex items-center justify-center text-cranberry flex-shrink-0">
                <VideoIcon />
              </div>
              <div>
                <p className="font-montserrat text-xs text-gray-400 uppercase tracking-wider">Plataforma</p>
                <p className="font-montserrat text-gray-800 font-medium text-sm">{cap.platform}</p>
              </div>
            </div>

            {/* Indicador de click */}
            <div className="pt-2 border-t border-gray-100 flex items-center justify-center gap-2 text-xs font-montserrat text-cranberry font-semibold group-hover:gap-3 transition-all duration-300">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              Ver perfil del orador
            </div>
          </div>
        </div>
      </div>

      {/* ――― MODAL via Portal (escapa stacking context del padre) ――― */}
      {createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Perfil de ${cap.speaker}`}
          className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 transition-all duration-500 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
        >
          {/* Backdrop */}
          <div
            className={`absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity duration-500 ${open ? 'opacity-100' : 'opacity-0'
              }`}
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* Contenido del modal */}
          <div
            ref={modalRef}
            className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2rem] bg-white shadow-2xl transform transition-all duration-500 ${open ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-8 opacity-0'
              }`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
          >
            {/* Botón cerrar */}
            <button
              onClick={() => setOpen(false)}
              aria-label="Cerrar perfil"
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center text-gray-600 hover:text-cranberry hover:bg-white transition-all duration-200 border border-gray-100"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Foto grande */}
            {cap.speakerPhoto && (
              <div className="relative h-72 md:h-96 overflow-hidden rounded-t-[2rem]">
                <img
                  src={cap.speakerPhoto}
                  alt={`Foto de ${cap.speaker}`}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            )}

            {/* Nombre y badge — fuera de la foto para no tapar el rostro */}
            <div className="px-8 pt-6 pb-0 flex items-center gap-3 flex-wrap">
              <span className="inline-flex items-center gap-1.5 bg-cranberry/10 text-cranberry text-xs font-montserrat font-bold tracking-widest uppercase px-3 py-1.5 rounded-full">
                <MicIcon />
                Orador invitado
              </span>
              <h3 className="font-garet text-gray-900 text-2xl md:text-3xl leading-tight">{cap.speaker}</h3>
            </div>

            {/* Cuerpo del modal */}
            <div className="p-8 space-y-6">
              {/* Bio */}
              {cap.speakerBio && (
                <div>
                  <p className="font-montserrat text-xs text-cranberry uppercase tracking-widest font-bold mb-3">Sobre el orador</p>
                  <p className="font-montserrat text-gray-600 text-base leading-relaxed">{cap.speakerBio}</p>
                </div>
              )}

              {/* Detalles de la charla */}
              <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                <p className="font-montserrat text-xs text-gray-400 uppercase tracking-widest font-bold">Detalles de la charla</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-cranberry/10 flex items-center justify-center text-cranberry flex-shrink-0">
                      <CalendarIcon />
                    </div>
                    <div>
                      <p className="font-montserrat text-xs text-gray-400 uppercase tracking-wider">Fecha</p>
                      <p className="font-montserrat text-gray-800 font-semibold text-sm capitalize">{formatDate(cap.date)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-cranberry/10 flex items-center justify-center text-cranberry flex-shrink-0">
                      <ClockIcon />
                    </div>
                    <div>
                      <p className="font-montserrat text-xs text-gray-400 uppercase tracking-wider">Horario</p>
                      <p className="font-montserrat text-gray-800 font-semibold text-sm">{cap.time} hs</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-cranberry/10 flex items-center justify-center text-cranberry flex-shrink-0">
                      <VideoIcon />
                    </div>
                    <div>
                      <p className="font-montserrat text-xs text-gray-400 uppercase tracking-wider">Plataforma</p>
                      <p className="font-montserrat text-gray-800 font-semibold text-sm">{cap.platform}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTAs dentro del modal */}
              <div className="flex flex-col sm:flex-row gap-3">
                {cap.registrationLink ? (
                  <a
                    href={cap.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl btn-cranberry text-white font-montserrat font-semibold text-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    Inscribirme
                  </a>
                ) : (
                  <div className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gray-100 text-gray-400 font-montserrat font-semibold text-sm cursor-default">
                    Inscripciones próximamente
                  </div>
                )}
                <button
                  onClick={() => setOpen(false)}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-gray-200 text-gray-600 font-montserrat font-semibold text-sm hover:border-cranberry hover:text-cranberry transition-all duration-200"
                >
                  Cerrar
                </button>
              </div>

              {/* Footer */}
              <div className="flex items-center gap-2 text-xs font-montserrat text-gray-400 justify-center pt-2">
                <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Entrada libre y gratuita · Abierto a toda la comunidad
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

/* ─────────────────────────────────────────────────────────────
   Sección: Próxima charla
───────────────────────────────────────────────────────────── */
const UpcomingTalk = ({ cap }) => {
  const [ref, visible] = useScrollAnimation({ threshold: 0.15 });

  return (
    <section
      id="proxima-capacitacion"
      className="relative py-20 md:py-28 overflow-hidden bg-white"
      aria-labelledby="upcoming-talk-title"
    >
      {/* Blobs decorativos */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-cranberry/5 rounded-full mix-blend-multiply filter blur-[100px] opacity-80 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-cranberry/4 rounded-full mix-blend-multiply filter blur-[80px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Badge de sección */}
        <div
          ref={ref}
          className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cranberry opacity-40" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cranberry" />
            </span>
            <span className="text-cranberry font-montserrat font-bold tracking-widest uppercase text-xs md:text-sm">
              Próxima Charla
            </span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Columna izquierda: info principal */}
            <div>
              {cap.votedFirst && (
                <span className="inline-flex items-center gap-1.5 bg-cranberry/8 text-cranberry text-xs font-montserrat font-semibold tracking-wide uppercase px-3 py-1.5 rounded-full mb-6">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  #1 más votada por la comunidad
                </span>
              )}

              <h2
                id="upcoming-talk-title"
                className="font-garet text-4xl md:text-5xl lg:text-6xl text-gray-900 tracking-tight leading-[1.1] mb-6"
              >
                {cap.topic}
              </h2>

              <p className="font-montserrat text-gray-500 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
                {cap.description}
              </p>

              {/* Edición */}
              <div className="inline-flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 mb-8">
                <span className="font-montserrat text-xs text-gray-400 uppercase tracking-wider">Edición</span>
                <span className="font-garet text-gray-900 font-bold text-lg">#{cap.edition}</span>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4">
                {cap.registrationLink ? (
                  <a
                    href={cap.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    id="btn-inscribirse-capacitacion"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl btn-cranberry text-white font-montserrat font-semibold text-base group"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Inscribirme
                    <svg className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                ) : (
                  <div className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gray-100 text-gray-500 font-montserrat font-semibold text-base cursor-default select-none">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Inscripciones próximamente
                  </div>
                )}
              </div>
            </div>

            {/* Columna derecha: Modal Card del orador */}
            <div className="relative">
              <SpeakerModalCard cap={cap} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────
   Card: Charla pasada
───────────────────────────────────────────────────────────── */
const PastTalkCard = ({ cap, index }) => {
  const [ref, visible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <article
      ref={ref}
      className={`group bg-white rounded-[1.5rem] border border-gray-100 shadow-sm hover:shadow-[0_20px_40px_-10px_rgba(212,19,103,0.1)] hover:-translate-y-1.5 transition-all duration-500 overflow-hidden ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      style={{
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
        transitionDelay: `${index * 80}ms`,
      }}
      aria-label={`Capacitación pasada: ${cap.topic}`}
    >
      {/* Barra superior de color */}
      <div className="h-1 bg-gradient-to-r from-cranberry to-cranberry-light" />

      <div className="p-6 md:p-8">
        {/* Edición + área */}
        <div className="flex items-center justify-between mb-4">
          <span className="font-montserrat text-xs text-gray-400 uppercase tracking-wider">
            Edición #{cap.edition}
          </span>
          <span className="inline-flex items-center bg-gray-50 border border-gray-100 text-gray-500 text-xs font-montserrat px-2.5 py-1 rounded-full">
            {cap.area}
          </span>
        </div>

        {/* Título */}
        <h3 className="font-garet text-xl md:text-2xl text-gray-900 mb-2 leading-tight group-hover:text-cranberry transition-colors duration-300">
          {cap.topic}
        </h3>

        {/* Fecha */}
        <div className="flex items-center gap-1.5 text-gray-400 text-sm font-montserrat mb-5">
          <CalendarIcon />
          <span className="capitalize">{formatDateShort(cap.date)}</span>
        </div>

        {/* Resumen */}
        {cap.summary && (
          <p className="font-montserrat text-gray-500 text-sm leading-relaxed mb-5">
            {cap.summary}
          </p>
        )}

        {/* Key takeaways */}
        {cap.keyTakeaways?.length > 0 && (
          <div className="mb-5">
            <p className="font-montserrat text-xs text-gray-400 uppercase tracking-wider mb-3">
              Lo que aprendimos
            </p>
            <ul className="space-y-2">
              {cap.keyTakeaways.map((point, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckIcon />
                  <span className="font-montserrat text-sm text-gray-600 leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Footer: orador + asistentes */}
        <div className="flex items-center justify-between pt-5 border-t border-gray-100 mt-auto">
          <div>
            <p className="font-montserrat text-xs text-gray-400 uppercase tracking-wider">Orador/a</p>
            <p className="font-montserrat text-sm text-gray-700 font-medium mt-0.5">{cap.speaker}</p>
          </div>
          {cap.attendees && (
            <div className="flex items-center gap-1.5 text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full">
              <UsersIcon />
              <span className="font-montserrat text-xs font-medium">{cap.attendees} asistentes</span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

/* ─────────────────────────────────────────────────────────────
   Sección: Charlas pasadas
───────────────────────────────────────────────────────────── */
const PastTalks = ({ pastCaps }) => {
  const [ref, visible] = useScrollAnimation({ threshold: 0.1 });

  if (pastCaps.length === 0) return null;

  return (
    <section
      id="capacitaciones-pasadas"
      className="relative bg-gray-50 py-20 md:py-28 overflow-hidden"
      aria-labelledby="past-talks-title"
    >
      <div className="blob-decoration w-[350px] h-[350px] bg-cranberry/4 -top-20 -right-20" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div
          ref={ref}
          className={`mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
        >
          <span className="text-cranberry font-montserrat font-bold tracking-widest uppercase text-xs md:text-sm mb-3 block">
            Ediciones anteriores
          </span>
          <h2 id="past-talks-title" className="font-garet text-3xl md:text-5xl text-gray-900 mb-4">
            Charlas pasadas
          </h2>
          <p className="font-montserrat text-gray-500 text-base md:text-lg max-w-2xl leading-relaxed">
            Repasá lo que compartimos en cada encuentro.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {pastCaps.map((cap, idx) => (
            <PastTalkCard key={cap.id} cap={cap} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────
   Estado vacío: sin charlas pasadas
───────────────────────────────────────────────────────────── */
const EmptyPastTalks = () => (
  <section className="bg-gray-50 py-20 md:py-28" aria-label="Sin charlas anteriores aún">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="text-center max-w-md mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-cranberry/8 flex items-center justify-center mx-auto mb-6 text-cranberry">
          <MicIcon />
        </div>
        <h2 className="font-garet text-2xl text-gray-900 mb-3">La primera viene en camino</h2>
        <p className="font-montserrat text-gray-500 text-base leading-relaxed">
          Acá van a ir apareciendo los resúmenes de cada charla después de que sucedan. ¡Arranquemos juntos!
        </p>
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────
   Hero de la página
───────────────────────────────────────────────────────────── */
const PageHero = () => {
  const [ref, visible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <section
      className="relative bg-gradient-to-b from-gray-50 to-white pt-8 pb-6 md:pt-12 md:pb-8 overflow-hidden"
      aria-labelledby="capacitaciones-hero-title"
    >
      {/* Blob decorativo */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-cranberry/5 rounded-full mix-blend-multiply filter blur-[80px] pointer-events-none"
        aria-hidden="true"
      />

      <div
        ref={ref}
        className={`relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center transition-all duration-800 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
      >
        <h1
          id="capacitaciones-hero-title"
          className="font-garet text-4xl md:text-6xl lg:text-7xl text-gray-900 tracking-tight leading-[1.1] mb-6"
        >
          Ciclo de{' '}
          <span className="text-gradient-animated">Capacitaciones</span>
        </h1>
        <p className="font-montserrat text-gray-500 text-base md:text-xl max-w-2xl mx-auto leading-relaxed">
          Una vez por mes, una charla virtual gratuita sobre temáticas de interés para la comunidad.
          Oradores invitados, conocimiento real y acceso libre para todos.
        </p>

        {/* Pills de info rápida */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
          {[
            { icon: <CalendarIcon />, text: 'Último miércoles del mes' },
            { icon: <ClockIcon />, text: 'Tarde / noche' },
            { icon: <VideoIcon />, text: 'Google Meet' },
          ].map(({ icon, text }) => (
            <div
              key={text}
              className="inline-flex items-center gap-2 bg-white border border-gray-100 shadow-sm px-4 py-2.5 rounded-full font-montserrat text-sm text-gray-600"
            >
              <span className="text-cranberry">{icon}</span>
              {text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────
   Page principal (exportada)
───────────────────────────────────────────────────────────── */
export const CapacitacionesPage = () => {
  const upcoming = getUpcomingCapacitacion();
  const past = getPastCapacitaciones();

  return (
    <main className="flex-grow">
      <PageHero />

      {upcoming ? (
        <UpcomingTalk cap={upcoming} />
      ) : (
        <section className="py-20 text-center text-gray-400 font-montserrat">
          Próximamente anunciaremos la siguiente charla. ¡Seguinos para enterarte!
        </section>
      )}

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="section-divider" aria-hidden="true" />
      </div>

      {past.length > 0 ? (
        <PastTalks pastCaps={past} />
      ) : (
        <EmptyPastTalks />
      )}
    </main>
  );
};
