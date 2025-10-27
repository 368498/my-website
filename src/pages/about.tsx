import React from 'react';
import Image from 'next/image';

interface PortraitFormat {
  url: string;
  width: number;
  height: number;
}
interface Portrait {
  url: string;
  formats?: {
    thumbnail?: PortraitFormat;
    small?: PortraitFormat;
    [key: string]: PortraitFormat | undefined;
  };
}

interface Fact {
  label: string;
}
interface AboutData {
  title: string;
  bio: { type: string; children: { type: string; text: string }[] }[];
  cta_text: string;
  cta_link: string;
  portrait?: Portrait | null;
  facts?: Fact[];
}

export async function getStaticProps() {
  let aboutData: AboutData = {
    title: 'About Me',
    bio: [],
    cta_text: 'Contact',
    cta_link: '/contact',
    portrait: null,
  };

  // Fetch ABout me data from CMS
  try {
    const apiUrl = process.env.NEXT_PUBLIC_CMS_URL;
    const res = await fetch(`${apiUrl}/api/about?populate=portrait&populate=facts`);
    const response = await res.json();
    if (response.data) {
      aboutData = {
        title: response.data.title || aboutData.title,
        bio: response.data.bio || [],
        cta_text: response.data.cta_text || aboutData.cta_text,
        cta_link: response.data.cta_link || aboutData.cta_link,
        portrait: response.data.portrait || null,
        facts: response.data.facts || [],
      };
    }
  } catch (error) {
    console.error('Failed to fetch about content:', error);
  }

  return {
    props: { aboutData },
    revalidate: 60, // Regenerate every minute
  };
}

const About = ({ aboutData }: { aboutData: AboutData }) => {
  // Use the small format image if available, otherwise try the main url
  const apiUrl = process.env.NEXT_PUBLIC_CMS_URL;
  const portraitUrl =
    aboutData.portrait?.formats?.small?.url
      ? `${apiUrl}${aboutData.portrait.formats.small.url}`
      : aboutData.portrait?.url
        ? `${apiUrl}${aboutData.portrait.url}`
        : null;

  return (
    <main className="max-w-3xl mx-auto py-24 px-6 bg-primary">

      <div className="col-span-full mb-12">
        <div className="flex items-start w-full grid grid-cols-1 md:grid-cols-3 gap-4">
          <h1 className="text-5xl font-bold whitespace-nowrap h-14 md:col-span-2 border-b-2 border-secondary leading-none pb-1 ">About Me</h1>
          <div className="flex-1 border-b-2 border-secondary h-14 md:col-span-1" style={{ minWidth: 0 }}></div>
        </div>
      </div>

      <div className="flex items-start w-full grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 flex flex-col justify-center">
          {aboutData.bio &&
            aboutData.bio.map(
              (block, index) =>
                block.type === 'paragraph' && (
                  <p key={index} className="text-lg leading-relaxed mb-8 max-w-prose">
                    {block.children.map((child, cindex) => child.text).join('')}
                  </p>
                )
            )}
          <ul className="space-y-2 text-sm tracking-widest uppercase text-secondary">
            {aboutData.facts && aboutData.facts.map((fact, index) => (
              <li key={index}><span className="text-[#cc0000]">●</span> {fact.label}</li>
            ))}
          </ul>
        </div>
        
        <div className="flex flex-col justify-center align-top">
          {portraitUrl && (
            <Image
              src={portraitUrl}
              alt="Portrait"
              width={256}
              height={256}
              className="w-64 h-64 mr-4 border-b object-cover grayscale"
            />
          )}
            <a
            href={aboutData.cta_link}
            className="mt-10 inline-block bg-accent text-secondary uppercase px-8 py-3 tracking-widest font-bold text-center"
          >
            {aboutData.cta_text}
          </a>
        </div>
      </div>

    </main>
  );
};

export default About; 