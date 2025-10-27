import React from 'react';
import { GetStaticProps } from 'next';

type HomeProps = {
  heading: string;
  subheading: string;
  bannerUrl: string | null;
};

export const getStaticProps: GetStaticProps = async () => {
  let heading = "Welcome to My Portfolio"; 
  let subheading = "Explore my work and get in touch!";
  let bannerUrl = null;

  try {
    //Fetch homepage content from CMS
    const apiUrl = process.env.NEXT_PUBLIC_CMS_URL;
    const res = await fetch(`${apiUrl}/api/homepage?populate=banner`);
    const response = await res.json();

    if (response.data) {
      heading = response.data.heading;
      subheading = response.data.subheading;
      if (response.data.banner && Array.isArray(response.data.banner) && response.data.banner.length > 0) {
        bannerUrl = `${apiUrl}${response.data.banner[0].url}`;
      }
    }
  } catch (error) {
    console.error('Failed to fetch homepage content:', error);
  }

  
  return {
    props: {
      heading,
      subheading,
      bannerUrl,
    },
    revalidate: 60, // Regenerate page every 60 seconds
  };
};

const Home = ({ heading, subheading, bannerUrl }: HomeProps) => (
  <main className="min-h-screen flex flex-col items-center justify-center bg-primary">
    <section
      className="relative text-secondary h-screen flex flex-col justify-center items-center"
      style={{
        backgroundImage: bannerUrl ? `url(${bannerUrl})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-primary opacity-50"></div>
    </section>

    {/* content for the lower-left corner */}
    <div className="absolute bottom-0 left-0 p-16">
      <h1 className="text-5xl font-bold text-secondary">{heading}</h1>
      <p>{subheading}</p>
    </div>
  </main>
);

export default Home; 