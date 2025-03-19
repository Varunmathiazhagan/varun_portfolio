import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { initSmoothScroll, destroySmoothScroll } from './utils/smoothScroll';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import EducationCertifications from './components/Edu';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Enhanced scroll behavior with proper cleanup
  useEffect(() => {
    // Add classes to optimize scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Initialize smooth scrolling without intrusive effects
    const smoothScrollInstance = initSmoothScroll();
    
    // Page transition effect
    const pageTransition = () => {
      const overlay = document.createElement('div');
      overlay.classList.add('page-transition');
      document.body.appendChild(overlay);

      setTimeout(() => {
        overlay.classList.add('fade-out');
        setTimeout(() => {
          document.body.removeChild(overlay);
          setIsLoading(false);
        }, 500);
      }, 800);
    };

    // Preload critical resources then remove loading state
    const preloadResources = async () => {
      // Simulate resource loading
      await new Promise(resolve => setTimeout(resolve, 500));
      pageTransition();
    };

    preloadResources();

    // Cleanup function
    return () => {
      destroySmoothScroll(smoothScrollInstance);
      // Remove inline styles
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ 
        duration: 0.8, 
        ease: 'easeOut'  // Use string easing to avoid cubic-bezier issues
      }}
      className={`min-h-screen bg-dark text-light ${isLoading ? 'loading' : ''}`}
    >
      <Navbar />
      
      <main className="smooth-scroll-container">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <EducationCertifications />
        <Contact />
      </main>
      
      <Footer />
      
      {/* Enhanced scroll progress indicator with smoother animation */}
      <motion.div 
        className="scroll-progress-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <div className="scroll-progress-bar"></div>
      </motion.div>
    </motion.div>
  );
}

export default App;
