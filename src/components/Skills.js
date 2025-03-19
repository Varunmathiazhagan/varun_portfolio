import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DiReact, DiNodejsSmall, DiMongodb, DiJavascript1, DiCss3, DiHtml5, 
  DiJava, DiPython, DiGit, DiMysql, DiPostgresql, DiLinux, DiAndroid 
} from 'react-icons/di';
import { 
  SiTypescript, SiNextdotjs, SiTailwindcss, SiGraphql, SiDocker, 
  SiAmazonwebservices, SiC, SiCplusplus, SiRedux, SiFirebase, SiFlutter, 
  SiKubernetes, SiTensorflow, SiApple 
} from 'react-icons/si';
import { FaSearch, FaFilter, FaTimes } from 'react-icons/fa';

const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeAnimation, setActiveAnimation] = useState(true);

  // Simplified skill data without proficiency levels
  const skillCategories = [
    {
      name: "Programming Languages",
      skills: [
        { name: 'JavaScript', icon: <DiJavascript1 className="text-4xl" />, color: '#F7DF1E' },
        { name: 'Java', icon: <DiJava className="text-4xl" />, color: '#007396' },
        { name: 'C', icon: <SiC className="text-4xl" />, color: '#A8B9CC' },
        { name: 'C++', icon: <SiCplusplus className="text-4xl" />, color: '#00599C' },
        {name: 'Python', icon: <DiPython className="text-4xl" />, color: '#3776AB' },
      ]
    },
    {
      name: "Frontend Development",
      skills: [
        { name: 'React', icon: <DiReact className="text-4xl" />, color: '#61DAFB' },
        { name: 'Next.js', icon: <SiNextdotjs className="text-4xl" />, color: '#000000' },
        { name: 'HTML5', icon: <DiHtml5 className="text-4xl" />, color: '#E34F26' },
        { name: 'CSS3', icon: <DiCss3 className="text-4xl" />, color: '#1572B6' },
        { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-4xl" />, color: '#38B2AC' },
       
      ]
    },
    {
      name: "Backend Development",
      skills: [
        { name: 'Node.js', icon: <DiNodejsSmall className="text-4xl" />, color: '#539E43' },
        { name: 'MongoDB', icon: <DiMongodb className="text-4xl" />, color: '#47A248' },
        { name: 'MySQL', icon: <DiMysql className="text-4xl" />, color: '#4479A1' },
        { name: 'Firebase', icon: <SiFirebase className="text-4xl" />, color: '#FFCA28' },
      
      ]
    },
    {
      name: "DevOps & Tools",
      skills: [
        { name: 'Git', icon: <DiGit className="text-4xl" />, color: '#F05032' },
        { name: 'Docker', icon: <SiDocker className="text-4xl" />, color: '#2496ED' },
        { name: 'Kubernetes', icon: <SiKubernetes className="text-4xl" />, color: '#326CE5' },
        { name: 'AWS', icon: <SiAmazonwebservices className="text-4xl" />, color: '#FF9900' },
        { name: 'Linux', icon: <DiLinux className="text-4xl" />, color: '#FCC624' },
      ]
    },
    {
      name: "Mobile Development",
      skills: [
        { name: 'Flutter', icon: <SiFlutter className="text-4xl" />, color: '#02569B' },
        
      ]
    },
    {
      name: "AI & ML",
      skills: [
        { name: 'TensorFlow', icon: <SiTensorflow className="text-4xl" />, color: '#FF6F00' },
      ]
    }
  ];

  // Get all categories for filter
  const allCategories = ['All', ...skillCategories.map(category => category.name)];

  // Filter skills based on category and search query
  const getFilteredSkills = () => {
    if (selectedCategory === 'All' && !searchQuery) {
      return skillCategories;
    }

    if (selectedCategory === 'All') {
      return skillCategories.map(category => ({
        ...category,
        skills: category.skills.filter(skill => 
          skill.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.skills.length > 0);
    }

    const filteredCategory = skillCategories.find(
      category => category.name === selectedCategory
    );
    
    if (!filteredCategory) return [];
    
    if (!searchQuery) {
      return [filteredCategory];
    }
    
    return [{
      ...filteredCategory,
      skills: filteredCategory.skills.filter(skill => 
        skill.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }].filter(category => category.skills.length > 0);
  };

  const filteredSkills = getFilteredSkills();

  // Toggle animation state for performance
  useEffect(() => {
    const handleScroll = () => {
      const skillsSection = document.getElementById('skills');
      if (!skillsSection) return;
      
      const rect = skillsSection.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
      
      setActiveAnimation(isVisible);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.8 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        mass: 0.8
      }
    }
  };

  // Enhanced Simplified Skill Icon component
  const SkillIcon = ({ skill }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
      setIsHovered(true);
      setHoveredSkill(skill.name);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setHoveredSkill(null);
    };

    return (
      <motion.div
        className="relative"
        onHoverStart={handleMouseEnter}
        onHoverEnd={handleMouseLeave}
        whileHover={{ 
          scale: 1.15,
          transition: { type: "spring", stiffness: 300, damping: 15 }
        }}
        whileTap={{ scale: 0.95 }}
        aria-label={skill.name}
        tabIndex={0}
      >
        <motion.div
          className="w-24 h-24 bg-gray-800/50 backdrop-blur-sm rounded-xl flex items-center justify-center
                     border border-gray-700 shadow-xl cursor-pointer"
          animate={{
            boxShadow: isHovered
              ? `0 0 25px ${skill.color}60, 0 0 80px ${skill.color}30`
              : "0 0 0 transparent",
            scale: isHovered ? 1.05 : 1
          }}
          transition={{ 
            duration: 0.4, 
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
        >
          <div className="flex items-center justify-center flex-col">
            <div 
              className="mb-1"
              style={{ color: skill.color }}
            >
              {skill.icon}
            </div>
            <p className="text-xs font-medium opacity-80">{skill.name}</p>
          </div>
        </motion.div>

        {/* Tooltip */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 5, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-800/90 
                         backdrop-blur-sm px-4 py-1.5 rounded-lg shadow-xl z-50 whitespace-nowrap"
            >
              <p className="text-sm font-medium text-white">{skill.name}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <section id="skills" className="py-20 bg-gray-900/95 backdrop-blur-lg relative overflow-hidden">
      {/* Enhanced background gradient animation */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: activeAnimation ? [
            "radial-gradient(circle at 10% 10%, #4F46E5 0%, transparent 50%)",
            "radial-gradient(circle at 90% 20%, #8B5CF6 0%, transparent 50%)",
            "radial-gradient(circle at 10% 90%, #10B981 0%, transparent 50%)",
            "radial-gradient(circle at 90% 80%, #3B82F6 0%, transparent 50%)",
            "radial-gradient(circle at 50% 50%, #F59E0B 0%, transparent 50%)"
          ] : "radial-gradient(circle at 50% 50%, #4F46E5 0%, transparent 50%)"
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "easeInOut",
          repeatType: "reverse"
        }}
      />

      {/* Animated particles */}
      {activeAnimation && (
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-primary-300"
              initial={{ 
                opacity: Math.random() * 0.5 + 0.1,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: Math.random() * 0.5 + 0.2
              }}
              animate={{ 
                x: [
                  Math.random() * window.innerWidth,
                  Math.random() * window.innerWidth,
                  Math.random() * window.innerWidth
                ],
                y: [
                  Math.random() * window.innerHeight,
                  Math.random() * window.innerHeight,
                  Math.random() * window.innerHeight
                ]
              }}
              transition={{ 
                duration: 20 + Math.random() * 30, 
                ease: "linear",
                repeat: Infinity,
                repeatType: "reverse"
              }}
              style={{
                width: `${Math.random() * 10 + 3}px`,
                height: `${Math.random() * 10 + 3}px`,
              }}
            />
          ))}
        </div>
      )}

      <div className="container mx-auto px-4 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading">My Technical Toolkit</h2>
          <div className="w-32 h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-400 mx-auto rounded-full"></div>
          <p className="text-gray-300 mt-6 max-w-2xl mx-auto">
            I've developed expertise across the full software development stack.
            Hover over skills to explore the technologies I work with.
          </p>
        </motion.div>
        
        {/* Search and Filter Controls */}
        <motion.div 
          className="mb-12 flex flex-col md:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Category Filter */}
          <div className="relative w-full max-w-xs">
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 pr-10 rounded-lg bg-gray-800/80 text-white border border-gray-700 
                        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent cursor-pointer"
              aria-label="Filter skills by category"
            >
              {allCategories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
            <FaFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          {/* Search Bar */}
          <div className="relative w-full max-w-xs">
            <input
              type="text"
              placeholder="Search skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchOpen(true)}
              onBlur={() => setTimeout(() => setIsSearchOpen(false), 200)}
              className="w-full px-4 py-3 pl-10 rounded-lg bg-gray-800/80 text-white border border-gray-700 
                        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              aria-label="Search skills"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                aria-label="Clear search"
              >
                <FaTimes />
              </button>
            )}
          </div>
        </motion.div>
        
        {/* Skills Display */}
        <div className="space-y-20">
          {filteredSkills.length > 0 ? (
            filteredSkills.map((category, catIndex) => (
              category.skills.length > 0 && (
                <motion.div
                  key={catIndex}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <motion.h3 
                    className="text-2xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-primary-500 text-center"
                    whileInView={{ 
                      opacity: 1, 
                      y: 0,
                      scale: 1
                    }}
                    initial={{ 
                      opacity: 0, 
                      y: 20,
                      scale: 0.95
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 20
                    }}
                  >
                    {category.name}
                  </motion.h3>
                  
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-8 gap-y-16"
                  >
                    {category.skills.map((skill, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className="flex flex-col items-center"
                      >
                        <SkillIcon skill={skill} />
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              )
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center py-12"
            >
              <h3 className="text-xl text-gray-400">No skills found matching your criteria</h3>
              <button 
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors"
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </div>

        {/* Learning Journey */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-24 text-center px-4 py-8 bg-gray-800/40 backdrop-blur-md rounded-xl border border-gray-700"
        >
          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400 mb-4">My Learning Journey</h3>
          <p className="text-gray-300 max-w-3xl mx-auto">
            I'm passionate about continuous growth and staying at the forefront of technology trends.
            Currently exploring advanced AI integration, serverless architectures, and Web3 development.
          </p>
          
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a 
              href="#projects" 
              className="btn-primary relative overflow-hidden group"
            >
              <span className="relative z-10">View My Projects</span>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
            </a>
            
            <a 
              href="#contact" 
              className="btn-secondary relative overflow-hidden group"
            >
              <span className="relative z-10">Get In Touch</span>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
