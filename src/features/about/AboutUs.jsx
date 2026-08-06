import React from 'react';

const AboutUs = () => {
  return (
    <section className="bg-white py-24 px-6 lg:px-8" aria-labelledby="about-us-title">
      <div className="max-w-5xl mx-auto space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-6">
          <h2 id="about-us-title" className="text-4xl md:text-5xl font-heading text-gray-900">
            Quiénes Somos
          </h2>
          <p className="text-lg text-gray-600 font-body leading-relaxed">
            Nuestra organización está formada por jóvenes líderes que intercambian ideas, adquieren nuevas habilidades profesionales y desarrollan proyectos para beneficiar a la comunidad.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4 text-center">
            <div className="w-16 h-16 mx-auto bg-cranberry/10 rounded-full flex items-center justify-center text-cranberry text-2xl font-bold">
              M
            </div>
            <h3 className="text-xl font-heading text-gray-900">Misión</h3>
            <p className="text-gray-600 font-body">
              Brindar oportunidades a los jóvenes para aumentar sus conocimientos y habilidades, a fin de contribuir a su desarrollo personal y promover mejores relaciones entre los pueblos de todo el mundo.
            </p>
          </div>
          <div className="space-y-4 text-center">
            <div className="w-16 h-16 mx-auto bg-cranberry/10 rounded-full flex items-center justify-center text-cranberry text-2xl font-bold">
              V
            </div>
            <h3 className="text-xl font-heading text-gray-900">Visión</h3>
            <p className="text-gray-600 font-body">
              Ser reconocidos como una organización líder de jóvenes que fomenta el cambio positivo a través de acciones solidarias y el desarrollo continuo del liderazgo.
            </p>
          </div>
          <div className="space-y-4 text-center">
            <div className="w-16 h-16 mx-auto bg-cranberry/10 rounded-full flex items-center justify-center text-cranberry text-2xl font-bold">
              V
            </div>
            <h3 className="text-xl font-heading text-gray-900">Valores</h3>
            <p className="text-gray-600 font-body">
              Compañerismo, integridad, diversidad, servicio y liderazgo son los pilares fundamentales que guían cada una de nuestras acciones y proyectos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
