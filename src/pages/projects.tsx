import React from 'react';
import Image from 'next/image';

interface ProjectImageFormat {
  url: string;
  width: number;
  height: number;
}
interface ProjectImage {
  url: string;
  formats?: {
    thumbnail?: ProjectImageFormat;
    small?: ProjectImageFormat;
    [key: string]: ProjectImageFormat | undefined;
  };
}
interface Project {
  id: number;
  title: string;
  description: { type: string; children: { type: string; text: string }[] }[];
  url?: string | null;
  technologies?: string | null;
  image?: ProjectImage | null;
}

export async function getStaticProps() {
  let projects: Project[] = [];
  try {
    //Fetch projects from CMS
    const apiUrl = process.env.NEXT_PUBLIC_CMS_URL;
    const res = await fetch(`${apiUrl}/api/projects?populate=image`);
    const response = await res.json();
    if (response.data) {
      projects = response.data.map((proj: any) => ({
        id: proj.id,
        title: proj.title,
        description: proj.description,
        url: proj.url,
        technologies: proj.technologies,
        image: proj.image || null,
      }));
    }
  } catch (error) {
    console.error('Failed to fetch projects:', error);
  }
  return {
    props: { projects },
    revalidate: 60, // Regenerate every 60 seconds.
  };
}

// Function to Cut descriptions down to size
const truncate = (text: string, maxLength: number) =>
  text.length > maxLength ? text.slice(0, maxLength) + '…' : text;

const Projects = ({ projects }: { projects: Project[] }) => (
  <section className="max-w-3xl mx-auto py-24 px-6 bg-primary">
    <div className="mb-12">
      <div className="flex items-end w-full">
        <h1 className="text-5xl font-bold whitespace-nowrap pr-6 border-b-2 leading-none pb-1">
          Portfolio
        </h1>
        <div className="flex-1 border-b-2" style={{ minWidth: 0 }}></div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {projects.map((project) => {
        const apiUrl = process.env.NEXT_PUBLIC_CMS_URL;
        const imageUrl =
          project.image?.formats?.small?.url
            ? `${apiUrl}${project.image.formats.small.url}`
            : project.image?.url
            ? `${apiUrl}${project.image.url}`
            : null;
        const desc = project.description
          .map((block) => block.children.map((child) => child.text).join(''))
          .join(' ');
        return (
          <div
            key={project.id}
            className="flex flex-col items-center border-secondary bg-primary gap-4 hover:border-accent transition-colors duration-150 rounded-lg"
          >
            {imageUrl && (
              <div className="relative w-full aspect-square border-b border-secondary grayscale">
                <Image
                  src={imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover "
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                />
              </div>
            )}

            <div className="flex w-full items-center justify-between mb-1">
              <h2 className="text-xl font-bold text-secondary" style={{ fontFamily: 'Nimbus Sans L, sans-serif' }}>
                {project.title}
              </h2>
              {project.technologies && (
                <div className="text-xs uppercase tracking-widest text-secondary ml-4 whitespace-nowrap" style={{ fontFamily: 'Nimbus Sans L, sans-serif' }}>
                  {project.technologies}
                </div>
              )}
            </div>

            <p className="text-sm text-base leading-relaxed mb-1 max-w-prose text-center" style={{ fontFamily: 'Nimbus Sans L, sans-serif' }}>
              {truncate(desc, 180)}
            </p>
            
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block bg-accent text-secondary uppercase px-8 py-3 tracking-widest  text-center font-bold font-sans w-full hover:bg-accent transition-colors"
                style={{ fontFamily: 'Nimbus Sans L, sans-serif' }}
              >
                View Project
              </a>
            )}
          </div>
        );
      })}
    </div>
  </section>
);

export default Projects; 