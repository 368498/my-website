import React from 'react';
import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
//import Footer from '../components/Footer';
import '../styles/globals.css';

type NavLink = {
  id: number;
  label: string;
  sublabel: string;
  url: string;
};

type AppExtendedProps = AppProps & {
  navLinks: NavLink[];
};

function MyApp({ Component, pageProps, navLinks }: AppExtendedProps) {
  const router = useRouter();
  const isHomePage = router.pathname === '/';

  return (
    <div className="bg-primary min-h-screen">
      <Navbar navLinks={navLinks} isHomePage={isHomePage} />
      {/* Pages: home page uses full width; other pages are in a container */}
      <main className="min-h-screen">
        {isHomePage ? (
          <Component {...pageProps} />
        ) : (
          <div className="container mx-auto px-4">
            <Component {...pageProps} />
          </div>
        )}
      </main>
    </div>
  );
}

/**
 * Retrieve data from Strapi CMS backend - global nav links for all page
 * **/
MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  let navLinks: NavLink[] = [];

  try {
    const apiUrl = process.env.NEXT_PUBLIC_CMS_URL;
    const res = await fetch(`${apiUrl}/api/navigation?populate=links`);
    const response = await res.json();
    if (response.data && Array.isArray(response.data.links)) {
      navLinks = response.data.links.map((link: any) => ({
        id: link.id,
        label: link.label,
        sublabel: link.sublabel || '',
        url: link.url,
      }));
    }
  } catch (error) {
    console.error('Failed to fetch navigation:', error);
  }

  return { ...appProps, navLinks };
};

export default MyApp; 