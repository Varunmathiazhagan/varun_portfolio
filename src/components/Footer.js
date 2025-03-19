import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiInstagram, FiArrowUp, FiHeart } from 'react-icons/fi';

const Footer = () => {
  const year = new Date().getFullYear();
  
  const socialLinks = [
    { icon: <FiLinkedin />, url: 'https://www.linkedin.com/in/varun-m-9307432b7/', label: 'LinkedIn', color: 'hover:bg-blue-600' },
    { icon: <FiGithub />, url: 'https://github.com/Varunmathiazhagan', label: 'GitHub', color: 'hover:bg-gray-600' },
    { icon: <FiInstagram />, url: 'https://instagram.com/varun._6_', label: 'Instagram', color: 'hover:bg-pink-600' }
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-gray-900 pt-20 pb-10 relative">
      {/* Top wave shape */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none h-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block h-10 w-full" fill="#121212">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/2 left-10 w-40 h-40 bg-primary-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-secondary-500/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4">
        {/* Scroll to top button */}
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -5 }}
          className="bg-primary-600 text-white p-3 rounded-full absolute right-10 top-0 transform -translate-y-1/2 shadow-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-gray-900"
          aria-label="Scroll to top"
        >
          <FiArrowUp />
        </motion.button>

        {/* Footer content */}
        <div className="flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h2 className="text-5xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-secondary-500">Varun</h2>
            <p className="text-gray-400 text-center mt-2">Full Stack Developer</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-6 mb-10"
          >
            <a href="#home" className="text-gray-400 hover:text-primary-400 transition-colors py-2 relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-400 transition-all group-hover:w-full"></span>
            </a>
            <a href="#about" className="text-gray-400 hover:text-primary-400 transition-colors py-2 relative group">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-400 transition-all group-hover:w-full"></span>
            </a>
            <a href="#skills" className="text-gray-400 hover:text-primary-400 transition-colors py-2 relative group">
              Skills
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-400 transition-all group-hover:w-full"></span>
            </a>
            <a href="#projects" className="text-gray-400 hover:text-primary-400 transition-colors py-2 relative group">
              Projects
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-400 transition-all group-hover:w-full"></span>
            </a>
            <a href="#experience" className="text-gray-400 hover:text-primary-400 transition-colors py-2 relative group">
              Experience
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-400 transition-all group-hover:w-full"></span>
            </a>
            <a href="#contact" className="text-gray-400 hover:text-primary-400 transition-colors py-2 relative group">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-400 transition-all group-hover:w-full"></span>
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex space-x-5 mb-10"
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className={`p-3 bg-gray-800 rounded-full text-gray-300 hover:text-white ${link.color} transition-all duration-300`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.icon}
              </motion.a>
            ))}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center"
          >
            <div className="mb-4 w-20 h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent mx-auto"></div>
            <p className="text-gray-500">© {year} Varun. All Rights Reserved.</p>
            <p className="mt-2 flex items-center justify-center text-gray-400">
              Designed & Built with <FiHeart className="mx-1 text-red-500" /> using React
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 p-3 bg-gray-800/30 rounded-lg text-xs text-gray-500"
          >
            <a href="#privacy" className="hover:text-primary-400 mr-4 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-primary-400 transition-colors">Terms of Service</a>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
