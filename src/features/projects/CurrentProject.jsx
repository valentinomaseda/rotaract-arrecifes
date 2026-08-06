import React from 'react';

const CurrentProject = () => {
  return (
    <section className="bg-gray-50 py-20 px-6 lg:px-8" aria-labelledby="current-project-title">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="w-full md:w-1/2 rounded-2xl overflow-hidden shadow-sm">
          <img 
            src="https://placehold.co/600x400/eeeeee/d41367?text=Proyecto+Actual" 
            alt="Proyecto actual" 
            className="w-full aspect-square md:aspect-auto md:h-[400px] object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
          <h2 id="current-project-title" className="text-sm font-bold text-cranberry tracking-widest uppercase mb-2 font-heading">
            Proyecto Destacado
          </h2>
          <h3 className="text-3xl md:text-4xl font-heading text-gray-900 leading-snug">
            Colecta Anual de Alimentos
          </h3>
          <p className="text-gray-600 font-body leading-relaxed text-lg">
            Estamos reuniendo alimentos no perecederos para abastecer a comedores comunitarios de la ciudad durante los meses de invierno. Tu aporte hace la diferencia.
          </p>
          <div className="pt-4">
            <a 
              href="https://forms.google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block border-2 border-cranberry text-cranberry font-body font-semibold px-6 py-3 rounded-full hover:bg-cranberry hover:text-white transition-colors duration-300"
              aria-label="Participar en la colecta (Abre en nueva pestaña)"
            >
              Quiero colaborar
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurrentProject;
