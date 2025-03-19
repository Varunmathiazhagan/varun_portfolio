import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-20 bg-dark relative overflow-hidden">
      {/* Background gradient elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-dark to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-dark to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <h2 className="section-heading text-4xl md:text-5xl font-bold text-white">About Me</h2>
          <div className="w-32 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto mt-4"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Column */}
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="aspect-square rounded-2xl overflow-hidden card-3d">
              <img 
                src="/image/varun.jpg" 
                alt="Varun M" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent" />
            </div>
          </motion.div>

          {/* Content Column */}
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-gradient">
              Turning Ideas into Reality
            </h3>
            
            <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
              <p>
                Hey there! 👋 I'm a Full Stack Developer passionate about creating seamless digital experiences. 
                With expertise in both front-end aesthetics and back-end architecture, I transform complex problems 
                into elegant solutions.
              </p>
              
              <p>
                From interactive web applications to scalable server architectures, I enjoy working across the entire 
                development stack. My approach combines technical precision with creative innovation.
              </p>

              <div className="text-primary-400">
                <span className="font-semibold">Currently working with:</span>
                <div className="mt-2 flex flex-wrap gap-3">
                  {['React', 'Node.js', 'TypeScript', 'AWS', 'MongoDB'].map((tech, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-800/50 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <a 
                href="/resume.pdf" 
                download="Varun_Resume.pdf" 
                className="btn-primary"
                rel="noopener noreferrer"
              >
                Download CV
              </a>
              <a href="#contact" className="btn-primary bg-transparent border-2 border-primary-500">
                Let's Talk
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;