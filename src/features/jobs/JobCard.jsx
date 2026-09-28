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
      <div className="mb-4 text-center">
        <h3 className="font-garet text-2xl text-gray-900 mb-1 leading-tight">
          {job.title}
        </h3>
        <p className="font-montserrat text-lg font-bold text-cranberry">
          {job.company}
        </p>
      </div>

      {/* Descripción y Detalles */}
      <div className="flex-grow space-y-4">
        <p className="font-montserrat text-gray-600 text-sm leading-relaxed">
          {job.description}
        </p>

        {job.responsibilities && job.responsibilities.length > 0 && (
          <div>
            <h4 className="font-montserrat text-xs font-semibold text-gray-900 uppercase tracking-wider mb-2">
              Principales tareas y responsabilidades:
            </h4>
            <ul className="list-disc list-inside font-montserrat text-sm text-gray-600 space-y-1">
              {job.responsibilities.map((resp, index) => (
                <li key={index} className="pl-1 leading-snug">{resp}</li>
              ))}
            </ul>
          </div>
        )}

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

      </div>

      {/* Footer / CTA */}
      <div className="mt-6 pt-4 flex flex-col sm:flex-row items-center justify-end gap-4 border-t border-gray-100">
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
