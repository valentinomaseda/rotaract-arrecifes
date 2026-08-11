import React from 'react';

export const JobCard = ({ job }) => {
  const isEmail = job.applyVia.startsWith('mailto:');
  const buttonText = isEmail ? 'Enviar CV por Email' : 'Postularse / Contactar';

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      {/* Cabecera: Etiquetas */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-montserrat font-semibold bg-gray-100 text-gray-700">
          {job.category}
        </span>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-montserrat font-semibold bg-cranberry/10 text-cranberry border border-cranberry/20">
          {job.type}
        </span>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-montserrat font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          {job.modality}
        </span>
      </div>

      {/* Título y Empresa */}
      <div className="mb-4">
        <h3 className="font-garet text-2xl text-gray-900 mb-1 leading-tight">
          {job.title}
        </h3>
        <p className="font-montserrat text-sm font-medium text-gray-500">
          {job.company}
        </p>
      </div>

      {/* Descripción y Detalles */}
      <div className="flex-grow space-y-4">
        <p className="font-montserrat text-gray-600 text-sm leading-relaxed">
          {job.description}
        </p>

        {job.requirements && job.requirements.length > 0 && (
          <div>
            <h4 className="font-montserrat text-xs font-semibold text-gray-900 uppercase tracking-wider mb-2">
              Requisitos principales:
            </h4>
            <ul className="list-disc list-inside font-montserrat text-sm text-gray-600 space-y-1">
              {job.requirements.map((req, index) => (
                <li key={index} className="pl-1 leading-snug">{req}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Info adicional rápida */}
        <div className="pt-4 mt-4 border-t border-gray-100 grid grid-cols-1 gap-2">
          <div className="flex items-start gap-2">
            <svg className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-montserrat text-xs text-gray-500 leading-tight">
              {job.schedule}
            </span>
          </div>
          <div className="flex items-start gap-2">
            <svg className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="font-montserrat text-xs text-gray-500 leading-tight">
              Exp: {job.experience}
            </span>
          </div>
        </div>
      </div>

      {/* Footer / CTA */}
      <div className="mt-6 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100">
        <span className="font-montserrat text-xs text-gray-400">
          Cierra: {new Date(job.deadline).toLocaleDateString('es-AR')}
        </span>
        <a
          href={job.applyVia}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-5 py-2.5 rounded-full bg-cranberry text-white font-montserrat font-semibold text-sm hover:bg-cranberry-dark shadow-md shadow-cranberry/20 hover:shadow-lg hover:shadow-cranberry/30 transition-all duration-300"
        >
          {buttonText}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </div>
  );
};
