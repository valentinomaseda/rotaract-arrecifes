import React from 'react';
import ProjectCard from './ProjectCard';
import { projectsData } from '../../data/projectsData';

const PastProjects = () => {
  return (
    <section className="bg-gray-50 py-24 px-6 lg:px-8" aria-labelledby="past-projects-title">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 id="past-projects-title" className="text-4xl md:text-5xl font-heading text-gray-900">
            Nuestros Proyectos
          </h2>
          <p className="text-lg text-gray-600 font-body max-w-2xl mx-auto">
            Conoce algunas de las iniciativas que hemos llevado a cabo para generar un impacto positivo en nuestra ciudad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project) => (
            <ProjectCard 
              key={project.id}
              title={project.title}
              description={project.description}
              imageUrl={project.imageUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PastProjects;
