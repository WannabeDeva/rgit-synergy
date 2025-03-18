import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navbarRef = useRef(null);
  const logoRef = useRef(null);
  const menuRef = useRef(null);
  
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Features', path: '/features' },
    { name: 'Contact', path: '/contact' },
  ];

  // Initial animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Logo animation
      gsap.fromTo(
        logoRef.current,
        { 
          scale: 0,
          rotation: -180 
        },
        { 
          scale: 1,
          rotation: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.5)"
        }
      );
      
      // Menu items animation
      gsap.fromTo(
        ".nav-item",
        { 
          opacity: 0,
          y: -20 
        },
        { 
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out"
        }
      );
    }, navbarRef);
    
    return () => ctx.revert();
  }, []);

  // Handle mobile menu animation
  useEffect(() => {
    if (!menuRef.current) return;
    
    const ctx = gsap.context(() => {
      if (isOpen) {
        gsap.fromTo(
          ".menu-item",
          { 
            opacity: 0,
            x: -20 
          },
          { 
            opacity: 1,
            x: 0,
            duration: 0.3,
            stagger: 0.05,
            ease: "power2.out"
          }
        );
      }
    }, menuRef);
    
    return () => ctx.revert();
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header 
      ref={navbarRef}
      className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-backdrop-blur:bg-background/60 border-b"
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center space-x-2">
          <div
            ref={logoRef}
            className="h-8 w-8 rounded-full bg-primary"
          />
          <span className="text-xl font-bold">HackUI</span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex space-x-4">
          {navItems.map((item, index) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? 'bg-primary/10 text-primary'
                  : 'hover:bg-muted'
              }`}
            >
              {item.name}
            </Link>
          ))}
          <Button size="sm" className="nav-item ml-4">
            Get Started
          </Button>
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile navigation */}
      {isOpen && (
        <div
          ref={menuRef}
          className="md:hidden"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`menu-item block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === item.path
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-muted'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-2 menu-item">
              <Button className="w-full">Get Started</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;