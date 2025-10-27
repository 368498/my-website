import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

type NavLink = {
  id: number;
  label: string;
  sublabel: string;
  url: string;
};

type NavbarProps = {
  navLinks: NavLink[];
  isHomePage?: boolean;
};

const Navbar = ({ navLinks, isHomePage }: NavbarProps) => {
  const router = useRouter();
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [widths, setWidths] = useState<number[]>([]);

  useEffect(() => {
    // Measure the width of each bold label to dynamically size when navlink is bolded
    const newWidths = labelRefs.current.map((el) => (el ? el.offsetWidth : 0));
    setWidths(newWidths);
  }, [navLinks]);

  const navClass = 'relative text-secondary';

  return (
    <nav className={`${navClass} p-4`}>
      <div className="container">
        <div className="space-x-2 flex flex-row ">
          {navLinks &&
            navLinks.map((link, index) => {
              const isActive = router.pathname === link.url;
              return (
                <Link 
                  key={link.id} 
                  href={link.url}
                  className = 'group flex flex-col border-t-4 border-secondary pt-1 hover:border-accent transition-colors duration-100 cursor-pointer'
                >
                  <div className='text-xs text-secondary pr-16 group-hover:text-accent transition-colors duration-100'>
                    <p>{link.sublabel}</p>
                  </div>
                  <div
                    className="relative"
                    style={{
                      width: widths[index] !== undefined ? `${widths[index] + 10}px` : undefined,
                      minWidth: 0,
                    }}
                  >
                    <span
                      className={`${isActive ? 'font-semibold' : ''} text-xl tracking-wider pr-4 group-hover:text-accent transition-colors duration-100`}
                    >
                      {link.label}
                    </span >
                    
                    {/* Hidden bold labels for measurement */}
                    <span
                      ref={el => { labelRefs.current[index] = el; }}
                      className="invisible font-semibold text-xl tracking-wider pr-4 absolute"
                      style={{ pointerEvents: 'none', whiteSpace: 'nowrap' }}
                      aria-hidden="true"
                    >
                      {link.label}
                    </span>
                  </div>
                </Link>
              )
            })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 
