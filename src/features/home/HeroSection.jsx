import React from 'react';

const HeroSection = () => {
  return (
    <section className="bg-white py-24 md:py-32 px-6 lg:px-8 text-center flex flex-col items-center justify-center min-h-[70vh]">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-5xl md:text-6xl font-heading text-gray-900 leading-tight">
          Transformando realidades, juntos
        </h1>
        <p className="text-lg md:text-xl text-gray-600 font-body max-w-2xl mx-auto leading-relaxed">
          Somos un grupo de jóvenes comprometidos con nuestra comunidad. 
          A través del servicio, el liderazgo y la amistad, buscamos crear un impacto positivo y duradero.
        </p>
        <div className="pt-4">
          <a 
            href="#unete" 
            className="inline-block bg-cranberry text-white font-body font-semibold px-8 py-4 rounded-full shadow-md hover:bg-opacity-90 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            aria-label="¡Únete a nosotros!"
          >
            ¡Únete a nosotros!
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
