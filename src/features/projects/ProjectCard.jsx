import React from 'react';

const ProjectCard = ({ title, description, imageUrl }) => {
  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full border border-gray-100">
      <div className="w-full aspect-video overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          onError={(e) => {
            e.target.src = 'https://placehold.co/600x400/eeeeee/a0a0a0?text=Proyecto';
          }}
        />
      </div>
      <div className="p-6 flex flex-col flex-grow space-y-3">
        <h3 className="text-xl font-heading text-gray-900 line-clamp-2">
          {title}
        </h3>
        <p className="text-gray-600 font-body flex-grow line-clamp-3">
          {description}
        </p>
      </div>
    </article>
  );
};

export default ProjectCard;
