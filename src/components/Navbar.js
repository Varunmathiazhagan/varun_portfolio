import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { scrollToElement } from '../utils/smoothScroll';
import { easings } from '../utils/easings';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      // Set navbar state based on scroll position with threshold
      const scrollThreshold = 50;
      const currentPosition = window.scrollY;
      
      if (currentPosition > scrollThreshold) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Calculate scroll progress for the indicator with smoother updates
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (currentPosition / totalHeight) * 100;
      setScrollProgress(progress);
      
      // Track active section
      updateActiveSection(currentPosition);
    };

    // Throttled scroll handler for better performance
    let lastScrollTime = 0;
    const scrollThrottleTime = 10; // ms

    const throttledScrollHandler = () => {
      const now = Date.now();
      if (now - lastScrollTime >= scrollThrottleTime) {
        lastScrollTime = now;
        handleScroll();
      }
    };

    window.addEventListener('scroll', throttledScrollHandler, { passive: true });
    
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', throttledScrollHandler);
    };
  }, []);

  // Function to determine active section based on scroll position
  const updateActiveSection = (scrollPosition) => {
    const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
    
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        // Adjust the threshold based on section visibility
        const threshold = section === 'home' ? 0.5 : 0.3;
        
        if (rect.top <= window.innerHeight * threshold && 
            rect.bottom >= window.innerHeight * threshold) {
          setActiveSection(section);
          break;
        }
      }
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // Enhanced smooth scrolling with optimized performance
  const handleNavLinkClick = (target) => {
    // Use the optimized scrollToElement function
    scrollToElement(`#${target}`, 80);
    if (menuOpen) setMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', to: 'home' },
    { name: 'About', to: 'about' },
    { name: 'Skills', to: 'skills' },
    { name: 'Projects', to: 'projects' },
    { name: 'Experience', to: 'experience' },
    { name: 'Contact', to: 'contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      scrolled ? 'py-2 bg-opacity-80 backdrop-blur-lg shadow-lg' : 'py-4'
    } ${theme === 'dark' ? 'bg-gray-900' : 'bg-white text-gray-800'}`}>
      {/* Scroll Progress Indicator with easing */}
      <motion.div 
        className="h-0.5 bg-gradient-to-r from-primary-400 via-secondary-500 to-primary-400 absolute top-0 left-0"
        initial={{ width: "0%" }}
        animate={{ width: `${scrollProgress}%` }}
        transition={{ 
          type: "tween", // Use tween instead of spring for smoother progress
          ease: "linear",
          duration: 0.1 
        }}
      />
      
      <div className="container mx-auto px-4 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <div 
            onClick={() => handleNavLinkClick('home')}
            className="cursor-pointer"
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-secondary-500 text-transparent bg-clip-text">
              Varun
            </span>
          </div>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden md:flex space-x-8 items-center"
        >
          {navLinks.map((link, index) => (
            <div
              key={index}
              onClick={() => handleNavLinkClick(link.to)}
              className="relative group cursor-pointer"
            >
              <span className={`${
                activeSection === link.to ? 'text-primary-400' : 
                theme === 'dark' ? 'text-gray-300 hover:text-primary-400' : 'text-gray-700 hover:text-primary-600'
              } transition-colors duration-300`}>
                {link.name}
              </span>
              <span 
                className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary-400 to-secondary-500 transition-all duration-300
                ${activeSection === link.to ? 'w-full' : 'w-0 group-hover:w-full'}`}
              ></span>
            </div>
          ))}
          
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full hover:bg-gray-800 transition-colors duration-300"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
        </motion.div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={toggleTheme} 
            className="p-2 mr-2 rounded-full hover:bg-gray-800 transition-colors duration-300"
            aria-label="Toggle theme"
          >
            {/* Theme toggle icons same as above */}
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} focus:outline-none`}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Enhanced Mobile Navigation with smoother animations */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: easings.easeInOut }}
            className={`md:hidden backdrop-filter backdrop-blur-lg ${
              theme === 'dark' ? 'bg-gray-900 bg-opacity-95' : 'bg-white bg-opacity-90'
            }`}
          >
            <div className="container mx-auto px-4 py-2 flex flex-col space-y-4">
              {navLinks.map((link, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05, duration: 0.3, ease: "easeOut" }}
                >
                  <div
                    onClick={() => handleNavLinkClick(link.to)}
                    className={`block border-l-2 pl-3 ${
                      activeSection === link.to ? 
                        (theme === 'dark' ? 'text-primary-400 border-primary-400' : 'text-primary-600 border-primary-600') :
                        (theme === 'dark' ? 
                          'text-gray-300 hover:text-primary-400 border-gray-700 hover:border-primary-400' : 
                          'text-gray-700 hover:text-primary-600 border-gray-300 hover:border-primary-600')
                    } py-2 cursor-pointer transition-all duration-300`}
                  >
                    {link.name}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
