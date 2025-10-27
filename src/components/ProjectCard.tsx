import React from 'react';

type Project = {
  id: number;
  title: string;
  description: string;
  link: string;
};

const ProjectCard = ({ project }: { project: Project }) => (
  <div className="border border-secondary rounded-lg bg-primary/60 p-6 flex flex-col gap-4 transition-colors duration-150 hover:border-accent">
    <h3 className="text-xl font-bold uppercase tracking-widest mb-2 font-sans" style={{ fontFamily: 'Nimbus Sans L, sans-serif' }}>{project.title}</h3>
    <p className="text-base text-gray-300 leading-relaxed mb-2 font-sans" style={{ fontFamily: 'Nimbus Sans L, sans-serif' }}>
      {project.description}
    </p>
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block bg-accent text-secondary uppercase px-6 py-2 tracking-widest font-bold font-sans rounded hover:bg-accent transition-colors"
      style={{ fontFamily: 'Nimbus Sans L, sans-serif' }}
    >
      View Project
    </a>
  </div>
);

export default ProjectCard; 