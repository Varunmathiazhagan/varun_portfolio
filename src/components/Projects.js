import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiInfo, FiChevronUp, FiX } from 'react-icons/fi';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isInView, setIsInView] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const modalRef = useRef(null);
  
  const projects = [
    {
      id: 1,
      title: 'Alumni Association Portal',
      description: 'A comprehensive platform for connecting graduated students with their college for future engagement, networking, and collaboration opportunities.',
      longDescription: 'Built using the MERN stack, this portal offers alumni profiles, job boards, event management, and mentorship programs. Features include secure authentication, interactive alumni maps, personalized dashboards, and automated email notifications for upcoming events.',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
      tags: ['react', 'node', 'mongodb', 'express'],
      github: 'https://github.com/Varunmathiazhagan/Alumni-Association-Student-Portal',
      demo: '#',
      featured: true,
      category: 'web'
    },
    {
      id: 2,
      title: 'Social Media Dashboard Analyzer',
      description: 'A comprehensive analytics dashboard that provides sentiment analysis for Twitter, YouTube tracking, real-time trending news, and an integrated chatbot.',
      longDescription: 'This full-stack application utilizes machine learning for sentiment analysis of social media data. It provides real-time analytics with customizable dashboards, API integrations with multiple social platforms, and data visualization tools. The chatbot uses NLP to respond to user queries about social media trends and metrics.',
      image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80',
      tags: ['react', 'python', 'ml', 'api'],
      github: 'https://github.com/Varunmathiazhagan/Social-media-dashboard_fullstack',
      demo: '#',
      featured: true,
      category: 'data'
    },
    {
      id: 3,
      title: 'OAS - Organization Management',
      description: 'A comprehensive system for Organization and Administration Management, streamlining tasks, user management, and efficient data handling.',
      longDescription: 'OAS is designed to improve organizational efficiency with features including role-based access control, automated workflow management, document processing, and comprehensive reporting tools. The system integrates with existing platforms and provides a unified interface for all administrative tasks.',
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
      tags: ['react', 'node', 'sql', 'oauth'],
      github: 'https://github.com/Varunmathiazhagan/OAS',
      demo: '#',
      featured: true,
      category: 'web'
    },
    {
      id: 4,
      title: 'Personal AI Assistant',
      description: 'A Python-based personal assistant capable of providing weather reports, chat responses, and generating images and videos.',
      longDescription: 'This multimodal AI assistant leverages several machine learning models to offer a comprehensive personal assistant experience. It integrates with weather APIs, implements conversational AI using transformer models, and utilizes generative AI for creating images and videos based on text prompts. The system is designed to be extensible with a plugin architecture.',
      image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
      tags: ['python', 'ml', 'api', 'ai'],
      github: 'https://github.com/Varunmathiazhagan/mulitmodel_ai',
      demo: '#',
      featured: false,
      category: 'ai'
    },
    {
      id: 5,
      title: 'E-Commerce Platform',
      description: 'A full-featured e-commerce platform with payment processing, user authentication, and admin dashboard.',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
      tags: ['react', 'node', 'mongodb'],
      github: '#',
      demo: '#',
      featured: false,
      category: 'web'
    },
    {
      id: 6,
      title: 'Task Management App',
      description: 'Collaborative task management application with real-time updates and team features.',
      image: 'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80',
      tags: ['react', 'node', 'socket'],
      github: '#',
      demo: '#',
      featured: false,
      category: 'web'
    },
    {
      id: 7,
      title: 'Ziya - Ayurveda Health Platform',
      description: 'A comprehensive Ayurvedic wellness platform with advanced geofencing to connect users with nearby practitioners and herbal stores.',
      longDescription: 'This React-based application integrates advanced geofencing technology to help users locate Ayurveda practitioners, herbal stores, and wellness centers within their vicinity. Features include personalized health assessments, detailed practitioner profiles with ratings, appointment scheduling, secure payment processing, and a knowledge base of Ayurvedic remedies. The platform also offers inventory management for herbal stores and real-time availability tracking using MongoDB for efficient data handling and retrieval.',
      image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
      tags: ['react', 'mongodb', 'geolocation', 'healthcare'],
      github: 'https://github.com/Varunmathiazhagan/ziya-ayurveda',
      demo: '#',
      featured: true,
      category: 'web'
    },
    {
      id: 8,
      title: 'Interactive Knowledge Quiz',
      description: 'An enhanced quiz platform with real-time multiplayer capabilities, adaptive learning, and comprehensive analytics dashboard.',
      longDescription: 'This interactive quiz application features real-time multiplayer functionality, allowing users to compete against friends or random opponents. The platform incorporates adaptive learning algorithms that adjust question difficulty based on user performance. Built with React for the frontend and MongoDB for data persistence, it includes features such as leaderboards, achievement badges, question categorization, timed challenges, and detailed analytics that track learning progress over time. The responsive design ensures a seamless experience across desktop and mobile devices.',
      image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
      tags: ['react', 'mongodb', 'socket.io', 'analytics'],
      github: 'https://github.com/Varunmathiazhagan/interactive-quiz',
      demo: '#',
      featured: false,
      category: 'web'
    },
  ];
  
  // Apply filter
  const filteredProjects = filter === 'all' 
    ? projects 
    : filter === 'featured' 
      ? projects.filter(project => project.featured)
      : ['web', 'data', 'ai'].includes(filter)
        ? projects.filter(project => project.category === filter)
        : projects.filter(project => project.tags.includes(filter));
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    exit: { 
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
        duration: 0.5
      }
    },
    exit: {
      y: 50,
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 25
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: {
        duration: 0.3
      }
    }
  };

  const handleProjectDetails = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleEscapeKey = useCallback((e) => {
    if (e.key === 'Escape' && showModal) {
      closeModal();
    }
  }, [showModal]);

  const scrollToTop = () => {
    const projectsSection = document.getElementById('projects');
    projectsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle scroll to show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      const projectsSection = document.getElementById('projects');
      if (!projectsSection) return;
      
      const rect = projectsSection.getBoundingClientRect();
      setShowScrollTop(rect.top < -300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Handle keyboard navigation in modal
  const handleModalKeyDown = useCallback((e) => {
    if (!showModal) return;
    
    if (e.key === 'Escape') {
      closeModal();
    } else if (e.key === 'Tab') {
      // Keep focus trapped within modal
      if (!modalRef.current) return;
      
      const focusableElements = modalRef.current.querySelectorAll(
        'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements.length === 0) return;
      
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      
      if (e.shiftKey && document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  }, [showModal, closeModal]);

  // Manage focus when modal opens/closes
  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        if (modalRef.current) {
          const firstFocusable = modalRef.current.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
          if (firstFocusable) firstFocusable.focus();
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [showModal]);
  
  // Enhanced modal control with keyboard navigation
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleModalKeyDown);
    } else {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleModalKeyDown);
    }
    
    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleModalKeyDown);
    };
  }, [showModal, handleModalKeyDown]);

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 relative">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-900 to-transparent z-10"></div>
      
      <div className="container mx-auto px-4 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">My Projects</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            Explore my portfolio of projects across web development, data analysis, and artificial intelligence.
            Each project showcases different skills and technologies.
          </p>
        </motion.div>

        {/* Filter buttons */}
        <motion.div 
          className="flex flex-wrap justify-center mb-12 gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <button 
            onClick={() => setFilter('all')} 
            className={`px-6 py-2 rounded-full transition-all ${
              filter === 'all' 
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-neon' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:shadow-neon'
            }`}
            aria-pressed={filter === 'all'}
          >
            All Projects <span className="ml-1 opacity-70">({projects.length})</span>
          </button>
          <button 
            onClick={() => setFilter('featured')} 
            className={`px-6 py-2 rounded-full transition-all ${
              filter === 'featured' 
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-neon' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:shadow-neon'
            }`}
            aria-pressed={filter === 'featured'}
          >
            Featured <span className="ml-1 opacity-70">({projects.filter(p => p.featured).length})</span>
          </button>
          <button 
            onClick={() => setFilter('web')} 
            className={`px-6 py-2 rounded-full transition-all ${
              filter === 'web' 
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-neon' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:shadow-neon'
            }`}
            aria-pressed={filter === 'web'}
          >
            Web Dev <span className="ml-1 opacity-70">({projects.filter(p => p.category === 'web').length})</span>
          </button>
          <button 
            onClick={() => setFilter('data')} 
            className={`px-6 py-2 rounded-full transition-all ${
              filter === 'data' 
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-neon' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:shadow-neon'
            }`}
            aria-pressed={filter === 'data'}
          >
            Data Science <span className="ml-1 opacity-70">({projects.filter(p => p.category === 'data').length})</span>
          </button>
          <button 
            onClick={() => setFilter('ai')} 
            className={`px-6 py-2 rounded-full transition-all ${
              filter === 'ai' 
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-neon' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:shadow-neon'
            }`}
            aria-pressed={filter === 'ai'}
          >
            AI/ML <span className="ml-1 opacity-70">({projects.filter(p => p.category === 'ai').length})</span>
          </button>
        </motion.div>
        
        {/* Loading indicator */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        {/* Projects grid - now with larger cards */}
        <AnimatePresence mode="wait">
          {!loading && (
            <>
              {filteredProjects.length > 0 ? (
                <motion.div 
                  key={filter}
                  className="grid grid-cols-1 md:grid-cols-2 gap-10"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  viewport={{ once: true, margin: "-100px" }}
                  onViewportEnter={() => setIsInView(true)}
                >
                  {filteredProjects.map((project) => (
                    <motion.div
                      key={project.id}
                      variants={itemVariants}
                      layoutId={`project-card-${project.id}`}
                      className="card-3d group"
                      whileHover={{ 
                        scale: 1.02,
                        rotateY: 2,
                        rotateX: 2,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg h-full flex flex-col transform transition-all duration-300 hover:shadow-neon border border-gray-700/50 relative">
                        <div className="relative h-64 overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-800/50 to-transparent z-10 opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                          <motion.img 
                            src={project.image} 
                            alt={project.title} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            loading="lazy"
                          />
                          
                          {/* Overlay buttons with improved accessibility */}
                          <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                            <motion.a 
                              href={project.github} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="p-3 bg-gray-900/80 backdrop-blur-sm rounded-full text-white hover:bg-blue-600 hover:shadow-neon transition-all"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              aria-label={`View ${project.title} source code on GitHub`}
                            >
                              <FiGithub className="text-xl" />
                            </motion.a>
                            <motion.a 
                              href={project.demo} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="p-3 bg-gray-900/80 backdrop-blur-sm rounded-full text-white hover:bg-blue-600 hover:shadow-neon transition-all"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              aria-label={`View ${project.title} live demo`}
                            >
                              <FiExternalLink className="text-xl" />
                            </motion.a>
                            <motion.button 
                              onClick={() => handleProjectDetails(project)}
                              className="p-3 bg-gray-900/80 backdrop-blur-sm rounded-full text-white hover:bg-blue-600 hover:shadow-neon transition-all"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              aria-label={`View ${project.title} details`}
                            >
                              <FiInfo className="text-xl" />
                            </motion.button>
                          </div>
                        </div>
                        
                        <div className="p-8 flex-grow flex flex-col">
                          <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors">{project.title}</h3>
                          <p className="text-gray-300 mb-6 flex-grow text-base leading-relaxed">
                            {/* Display longer description directly in the card */}
                            {project.longDescription?.substring(0, 160) || project.description}
                            {project.longDescription?.length > 160 && '...'}
                          </p>
                          
                          <div className="flex flex-wrap gap-2 mt-4">
                            {project.tags.map((tag, index) => (
                              <motion.span 
                                key={index} 
                                className={`px-3 py-1 text-sm rounded-full transition-all cursor-pointer ${
                                  filter === tag 
                                    ? 'bg-blue-600/50 text-white' 
                                    : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                                }`}
                                onClick={() => setFilter(tag)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                {tag}
                              </motion.span>
                            ))}
                          </div>

                          {/* Add a "View Details" button */}
                          <button 
                            onClick={() => handleProjectDetails(project)}
                            className="mt-6 w-full py-3 bg-gradient-to-r from-blue-600/80 to-purple-600/80 hover:from-blue-600 hover:to-purple-600 
                                      text-white rounded-lg flex items-center justify-center gap-2 transition-all transform hover:translate-y-[-2px]"
                          >
                            <FiInfo /> View Project Details
                          </button>
                        </div>
                        
                        {project.featured && (
                          <motion.div 
                            className="absolute top-3 right-3 bg-gradient-to-r from-blue-500 to-purple-600 text-xs font-bold py-1 px-2 rounded text-white shadow-lg"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                          >
                            Featured
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  className="col-span-full text-center py-12"
                  variants={itemVariants}
                >
                  <p className="text-gray-400 text-lg">No projects found matching the selected filter.</p>
                  <button 
                    onClick={() => setFilter('all')} 
                    className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors"
                  >
                    Show all projects
                  </button>
                </motion.div>
              )}
            </>
          )}
        </AnimatePresence>
        
        {/* Show more button */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <a 
            href="https://github.com/Varunmathiazhagan" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-primary flex items-center justify-center gap-2 mx-auto hover:shadow-neon"
          >
            <FiGithub /> View All Projects on GitHub
          </a>
        </motion.div>

        {/* Scroll to top button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              className="fixed bottom-8 right-8 p-3 bg-blue-600 text-white rounded-full shadow-neon z-40"
              onClick={scrollToTop}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Scroll to top"
            >
              <FiChevronUp className="text-xl" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      
      {/* Project Details Modal with improved accessibility */}
      <AnimatePresence>
        {showModal && selectedProject && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div 
              ref={modalRef}
              className="bg-gray-800/90 backdrop-blur-md rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-700/50"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-labelledby="modal-title"
              aria-modal="true"
              tabIndex="-1"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 id="modal-title" className="text-2xl font-bold text-white bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                    {selectedProject.title}
                  </h3>
                  <motion.button 
                    onClick={closeModal}
                    className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all"
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(100, 100, 100, 0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Close modal"
                  >
                    <FiX className="text-xl" />
                  </motion.button>
                </div>
                
                <motion.div 
                  className="aspect-video rounded-lg overflow-hidden mb-6 group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                </motion.div>
                
                <motion.div 
                  className="mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h4 className="text-lg font-semibold text-blue-400 mb-2">Project Overview</h4>
                  <p className="text-gray-300 leading-relaxed">{selectedProject.longDescription || selectedProject.description}</p>
                </motion.div>
                
                <motion.div 
                  className="mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h4 className="text-lg font-semibold text-blue-400 mb-2">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag, index) => (
                      <motion.span 
                        key={index} 
                        className="px-3 py-1 bg-gray-700 text-sm text-gray-300 rounded-full border border-gray-600"
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.3)" }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ 
                          opacity: 1, 
                          y: 0,
                          transition: { delay: 0.4 + (index * 0.05) }
                        }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.a 
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex items-center gap-2"
                    whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FiGithub /> View Source Code
                  </motion.a>
                  <motion.a 
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary flex items-center gap-2"
                    whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(124, 58, 237, 0.5)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FiExternalLink /> Live Demo
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
