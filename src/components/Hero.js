import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Hero = () => {
  const threeContainerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const particleSystemRef = useRef(null);
  const animationIdRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cursorRef = useRef(null);

  // Track mouse for text movement and custom cursor
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Calculate mouse position as percentage of window
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      setMousePosition({ x, y });
      
      // Update custom cursor position
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Custom cursor animation for links
  useEffect(() => {
    const handleMouseOverLink = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.add('expanded');
      }
    };
    
    const handleMouseOutLink = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.remove('expanded');
      }
    };
    
    const links = document.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('mouseenter', handleMouseOverLink);
      link.addEventListener('mouseleave', handleMouseOutLink);
    });
    
    return () => {
      links.forEach(link => {
        link.removeEventListener('mouseenter', handleMouseOverLink);
        link.removeEventListener('mouseleave', handleMouseOutLink);
      });
    };
  }, [isLoading]); // Re-run after loading is complete to ensure links are available

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    
    let cleanup = null;
    
    const initThreeJS = () => {
      if (!threeContainerRef.current) return false;
      
      const containerElement = threeContainerRef.current;
      if (rendererRef.current && containerElement.contains(rendererRef.current.domElement)) {
        return false;
      }
      
      const isLowPerformance = window.navigator.hardwareConcurrency <= 4 || 
                             !window.devicePixelRatio || 
                             window.devicePixelRatio < 1.5;
      
      try {
        const scene = new THREE.Scene();
        sceneRef.current = scene;
        
        const camera = new THREE.PerspectiveCamera(
          75,
          containerElement.clientWidth / containerElement.clientHeight,
          0.1,
          2000
        );
        camera.position.z = 40;
        cameraRef.current = camera;
        
        const renderer = new THREE.WebGLRenderer({ 
          antialias: !isLowPerformance,
          alpha: true,
          powerPreference: "high-performance"
        });
        rendererRef.current = renderer;
        
        renderer.setSize(containerElement.clientWidth, containerElement.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        containerElement.appendChild(renderer.domElement);
        
        const TOTAL_PARTICLES = isLowPerformance ? 50000 : 150000;
        const DOT_SIZE = 0.1;
        const particleGeometry = new THREE.BufferGeometry();
        
        // Enhanced particle initialization
        const positions = new Float32Array(TOTAL_PARTICLES * 3);
        const colors = new Float32Array(TOTAL_PARTICLES * 3);
        const sizes = new Float32Array(TOTAL_PARTICLES);
        const velocities = new Float32Array(TOTAL_PARTICLES * 3);
        const originalPositions = new Float32Array(TOTAL_PARTICLES * 3);
        
        const palette = [
          new THREE.Color(0x00aaff),
          new THREE.Color(0xff3399),
          new THREE.Color(0xffdd00),
          new THREE.Color(0xaa44ff),
          new THREE.Color(0x00ffaa)
        ];

        // Improved particle texture with better glow effect
        const createDotTexture = () => {
          const canvas = document.createElement('canvas');
          canvas.width = 64;
          canvas.height = 64;
          const context = canvas.getContext('2d');
          const gradient = context.createRadialGradient(
            canvas.width / 2, canvas.height / 2, 0,
            canvas.width / 2, canvas.height / 2, canvas.width / 2
          );
          
          gradient.addColorStop(0, 'rgba(255,255,255,1)');
          gradient.addColorStop(0.4, 'rgba(255,255,255,0.8)');
          gradient.addColorStop(0.8, 'rgba(255,255,255,0.2)');
          gradient.addColorStop(1, 'rgba(255,255,255,0)');
          
          context.fillStyle = gradient;
          context.beginPath();
          context.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, Math.PI * 2);
          context.fill();
          
          const texture = new THREE.Texture(canvas);
          texture.needsUpdate = true;
          return texture;
        };
        
        const dotTexture = createDotTexture();
        
        // Enhanced particle distribution patterns
        for (let i = 0; i < TOTAL_PARTICLES; i++) {
          let x, y, z;
          const pattern = i % 4;
          
          if (pattern === 0) { // Spherical distribution
            const radius = 40 * Math.pow(Math.random(), 0.4);
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            x = radius * Math.sin(phi) * Math.cos(theta);
            y = radius * Math.sin(phi) * Math.sin(theta);
            z = radius * Math.cos(phi);
          } else if (pattern === 1) { // Cubic distribution
            x = (Math.random() - 0.5) * 150;
            y = (Math.random() - 0.5) * 150;
            z = (Math.random() - 0.5) * 100;
          } else { // Torus distribution
            const radius = 50;
            const tube = 20;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI * 2;
            x = (radius + tube * Math.cos(phi)) * Math.cos(theta);
            y = (radius + tube * Math.cos(phi)) * Math.sin(theta);
            z = tube * Math.sin(phi);
          }
          
          positions[i * 3] = x;
          positions[i * 3 + 1] = y;
          positions[i * 3 + 2] = z;
          
          originalPositions[i * 3] = x;
          originalPositions[i * 3 + 1] = y;
          originalPositions[i * 3 + 2] = z;
          
          velocities[i * 3] = (Math.random() - 0.5) * 0.2;
          velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.2;
          velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.2;
          
          sizes[i] = Math.random() * Math.random() * 2 + 0.5;
          
          const color = Math.random() > 0.97 
            ? new THREE.Color(0xffffff)
            : palette[Math.floor(Math.random() * palette.length)];
          
          colors[i * 3] = color.r;
          colors[i * 3 + 1] = color.g;
          colors[i * 3 + 2] = color.b;
        }
        
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        
        // Enhanced shader material
        const material = new THREE.ShaderMaterial({
          uniforms: {
            dotTexture: { value: dotTexture },
            time: { value: 0 },
            mouse: { value: new THREE.Vector2(0, 0) }
          },
          vertexShader: `
            attribute float size;
            attribute vec3 color;
            varying vec3 vColor;
            uniform float time;
            uniform vec2 mouse;
            
            void main() {
              vColor = color;
              vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
              
              // Add subtle pulsing effect
              float pulse = sin(time + length(position) * 0.1) * 0.5 + 0.5;
              mvPosition.xyz += position * pulse * 0.05;
              
              float dist = length(mvPosition.xyz);
              float sizeFactor = ${DOT_SIZE} * (400.0 / (dist + 30.0));
              gl_PointSize = size * sizeFactor * (1.0 + pulse * 0.3);
              gl_Position = projectionMatrix * mvPosition;
            }
          `,
          fragmentShader: `
            uniform sampler2D dotTexture;
            varying vec3 vColor;
            
            void main() {
              vec4 texColor = texture2D(dotTexture, gl_PointCoord);
              float alpha = texColor.r * 1.5;
              gl_FragColor = vec4(vColor * 2.0, alpha);
            }
          `,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthTest: false
        });

        const particleSystem = new THREE.Points(particleGeometry, material);
        scene.add(particleSystem);
        particleSystemRef.current = particleSystem;

        // Enhanced cursor interaction with improved response
        const cursor = {
          x: 0,
          y: 0,
          worldX: 0,
          worldY: 0,
          worldZ: 0,
          active: false,
          lastMoveTime: 0,
          strength: 0,
          trailPositions: [], // Store recent cursor positions for trail effect
          maxTrailLength: 10
        };
        
        const updateCursor = (event) => {
          cursor.active = true;
          cursor.lastMoveTime = Date.now();
          
          const x = event.clientX || (event.touches && event.touches[0].clientX);
          const y = event.clientY || (event.touches && event.touches[0].clientY);
          if (x === undefined || y === undefined) return;
          
          const rect = containerElement.getBoundingClientRect();
          cursor.x = ((x - rect.left) / rect.width) * 2 - 1;
          cursor.y = -((y - rect.top) / rect.height) * 2 + 1;
          
          const vector = new THREE.Vector3(cursor.x, cursor.y, 0.5);
          vector.unproject(camera);
          const dir = vector.sub(camera.position).normalize();
          const distance = -camera.position.z / dir.z;
          
          cursor.worldX = camera.position.x + dir.x * distance;
          cursor.worldY = camera.position.y + dir.y * distance;
          cursor.worldZ = 0;
          
          // Add current position to trail
          cursor.trailPositions.unshift({
            x: cursor.worldX,
            y: cursor.worldY,
            z: cursor.worldZ
          });
          
          // Maintain trail length
          if (cursor.trailPositions.length > cursor.maxTrailLength) {
            cursor.trailPositions.pop();
          }
        };
        
        containerElement.addEventListener('mousemove', updateCursor);
        containerElement.addEventListener('touchmove', (e) => {
          e.preventDefault();
          updateCursor(e.touches[0]);
        }, { passive: false });
        
        containerElement.addEventListener('click', (e) => {
          updateCursor(e);
          cursor.strength = 1.5; // Increased click effect strength
          
          // Create ripple effect on click
          const positions = particleGeometry.attributes.position.array;
          const velocitiesArray = velocities;
          
          for (let i = 0; i < TOTAL_PARTICLES; i++) {
            const i3 = i * 3;
            const dx = positions[i3] - cursor.worldX;
            const dy = positions[i3 + 1] - cursor.worldY;
            const dz = positions[i3 + 2] - cursor.worldZ;
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
            
            if (dist < 100) {
              const force = 10 * (1 - dist / 100);
              velocitiesArray[i3] += (dx / dist) * force;
              velocitiesArray[i3 + 1] += (dy / dist) * force;
              velocitiesArray[i3 + 2] += (dz / dist) * force;
            }
          }
        });
        
        const animationSettings = {
          attractionRadius: 100, // Increased radius
          baseStrength: 35, // Increased strength
          returnSpeed: 0.02,
          damping: 0.85,
          rotationSpeed: 0.0008,
          trailEffect: 0.5 // Strength of trail effect
        };

        const clock = new THREE.Clock();
        
        const animate = () => {
          animationIdRef.current = requestAnimationFrame(animate);
          const deltaTime = clock.getDelta();
          const elapsedTime = clock.elapsedTime;
          
          material.uniforms.time.value = elapsedTime;
          material.uniforms.mouse.value.set(cursor.x, cursor.y);
          
          // Gradually decrease cursor strength when not moving
          if (Date.now() - cursor.lastMoveTime > 2000) {
            cursor.active = false;
            cursor.strength *= 0.95;
          } else {
            // Maintain some minimum strength while active
            cursor.strength = Math.max(cursor.strength, 0.2);
          }
          
          particleSystem.rotation.y += animationSettings.rotationSpeed;
          particleSystem.rotation.x += animationSettings.rotationSpeed * 0.6;
          
          const positions = particleGeometry.attributes.position.array;
          const velocitiesArray = velocities;
          
          for (let i = 0; i < TOTAL_PARTICLES; i++) {
            const i3 = i * 3;
            
            // Primary cursor interaction
            if (cursor.active) {
              const dx = positions[i3] - cursor.worldX;
              const dy = positions[i3 + 1] - cursor.worldY;
              const dz = positions[i3 + 2] - cursor.worldZ;
              const distToCursor = Math.sqrt(dx * dx + dy * dy + dz * dz);
              
              if (distToCursor < animationSettings.attractionRadius) {
                const force = Math.pow((animationSettings.attractionRadius - distToCursor) / animationSettings.attractionRadius, 2);
                const strength = animationSettings.baseStrength * force * cursor.strength;
                
                velocitiesArray[i3] += (-dx / distToCursor) * strength * deltaTime;
                velocitiesArray[i3 + 1] += (-dy / distToCursor) * strength * deltaTime;
                velocitiesArray[i3 + 2] += (-dz / distToCursor) * strength * deltaTime;
              }
              
              // Trail effect - particles are influenced by recent cursor positions
              for (let t = 1; t < cursor.trailPositions.length; t++) {
                const trailPos = cursor.trailPositions[t];
                const trailFactor = (cursor.trailPositions.length - t) / cursor.trailPositions.length; // Fade effect
                
                const tdx = positions[i3] - trailPos.x;
                const tdy = positions[i3 + 1] - trailPos.y;
                const tdz = positions[i3 + 2] - trailPos.z;
                const trailDist = Math.sqrt(tdx * tdx + tdy * tdy + tdz * tdz);
                
                if (trailDist < animationSettings.attractionRadius * 0.7) {
                  const trailForce = Math.pow((animationSettings.attractionRadius * 0.7 - trailDist) / (animationSettings.attractionRadius * 0.7), 2);
                  const trailStrength = animationSettings.baseStrength * trailForce * cursor.strength * trailFactor * animationSettings.trailEffect;
                  
                  velocitiesArray[i3] += (-tdx / trailDist) * trailStrength * deltaTime;
                  velocitiesArray[i3 + 1] += (-tdy / trailDist) * trailStrength * deltaTime;
                  velocitiesArray[i3 + 2] += (-tdz / trailDist) * trailStrength * deltaTime;
                }
              }
            }
            
            // Organic motion
            velocitiesArray[i3] += Math.sin(elapsedTime * 0.5 + positions[i3] * 0.01) * 0.02;
            velocitiesArray[i3 + 1] += Math.cos(elapsedTime * 0.6 + positions[i3 + 1] * 0.01) * 0.02;
            velocitiesArray[i3 + 2] += Math.sin(elapsedTime * 0.7 + positions[i3 + 2] * 0.01) * 0.02;
            
            // Return to original position force
            velocitiesArray[i3] += (originalPositions[i3] - positions[i3]) * animationSettings.returnSpeed;
            velocitiesArray[i3 + 1] += (originalPositions[i3 + 1] - positions[i3 + 1]) * animationSettings.returnSpeed;
            velocitiesArray[i3 + 2] += (originalPositions[i3 + 2] - positions[i3 + 2]) * animationSettings.returnSpeed;
            
            // Apply damping
            velocitiesArray[i3] *= animationSettings.damping;
            velocitiesArray[i3 + 1] *= animationSettings.damping;
            velocitiesArray[i3 + 2] *= animationSettings.damping;
            
            // Update positions
            positions[i3] += velocitiesArray[i3];
            positions[i3 + 1] += velocitiesArray[i3 + 1];
            positions[i3 + 2] += velocitiesArray[i3 + 2];
          }
          
          particleGeometry.attributes.position.needsUpdate = true;
          renderer.render(scene, camera);
        };
        
        const handleResize = () => {
          if (containerElement) {
            camera.aspect = containerElement.clientWidth / containerElement.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(containerElement.clientWidth, containerElement.clientHeight);
          }
        };
        
        window.addEventListener('resize', handleResize);
        animate();
        
        cleanup = () => {
          window.removeEventListener('resize', handleResize);
          containerElement.removeEventListener('mousemove', updateCursor);
          containerElement.removeEventListener('touchmove', updateCursor);
          
          if (animationIdRef.current) {
            cancelAnimationFrame(animationIdRef.current);
          }
          
          if (rendererRef.current) {
            rendererRef.current.dispose();
            containerElement.removeChild(rendererRef.current.domElement);
          }
          
          if (particleSystemRef.current) {
            particleSystemRef.current.geometry.dispose();
            particleSystemRef.current.material.dispose();
          }
          
          sceneRef.current = null;
          rendererRef.current = null;
          particleSystemRef.current = null;
        };
        
        return true;
      } catch (error) {
        console.error("Error initializing THREE.js:", error);
        return false;
      }
    };
    
    const initTimeout = setTimeout(() => {
      if (!initThreeJS()) {
        setTimeout(initThreeJS, 500);
      }
    }, 300);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(initTimeout);
      if (cleanup) cleanup();
    };
  }, []);

  // Calculate text movement based on mouse position
  const textX = mousePosition.x * 20; // Movement amount in pixels
  const textY = mousePosition.y * 20;
  
  // Define social icon variants for enhanced hover effects
  const socialIconVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.25, 
      rotate: [0, -10, 10, -5, 5, 0],
      transition: { 
        scale: { type: "spring", stiffness: 400, damping: 10 },
        rotate: { duration: 0.5 }
      }
    }
  };
  
  return (
    <section id="home" className="relative h-screen flex items-center bg-gray-900">
      {/* Three.js Canvas */}
      <div 
        ref={threeContainerRef} 
        className="absolute inset-0 z-0"
        style={{ width: '100%', height: '100vh', cursor: 'none' }}
      />
      
      {/* Custom Cursor */}
      <div 
        ref={cursorRef}
        className="custom-cursor" 
        style={{
          position: 'fixed',
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          boxShadow: '0 0 20px 5px rgba(120, 220, 255, 0.5)',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.2s, height 0.2s, background-color 0.2s',
          mixBlendMode: 'difference'
        }}
      />
      
      {/* Gradient Overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-gray-900/40 to-gray-900/80 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />
      
      {/* Content with higher z-index */}
      <div className="container mx-auto px-4 z-20 relative">
        {/* Welcome Text with Cursor Tracking */}
        <motion.div
          className="flex flex-col items-center justify-center text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          style={{ 
            transform: `translate(${textX}px, ${textY}px)`,
            transition: 'transform 0.1s ease' // Simplified easing function
          }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 mb-4 tracking-tight">
            Welcome
          </h1>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl text-white font-bold mb-8">
            I am <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500">Varun M</span>
          </h2>
          
          {/* Enhanced Social Links with Updated URLs */}
          <motion.div 
            className="flex space-x-12 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <motion.a 
              href="https://github.com/Varunmathiazhagan" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon github"
              variants={socialIconVariants}
              initial="initial"
              whileHover="hover"
              whileTap={{ scale: 0.9 }}
            >
              <div className="relative p-3 rounded-full bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 transition-all duration-300 shadow-lg hover:shadow-2xl">
                <FaGithub className="text-3xl text-white" />
                <div className="absolute inset-0 rounded-full bg-white opacity-0 hover:opacity-20 transition-opacity"></div>
              </div>
            </motion.a>
            
            <motion.a 
              href="https://www.linkedin.com/in/varun-m-9307432b7/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon linkedin"
              variants={socialIconVariants}
              initial="initial"
              whileHover="hover"
              whileTap={{ scale: 0.9 }}
            >
              <div className="relative p-3 rounded-full bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-600 hover:to-blue-400 transition-all duration-300 shadow-lg hover:shadow-2xl">
                <FaLinkedin className="text-3xl text-white" />
                <div className="absolute inset-0 rounded-full bg-white opacity-0 hover:opacity-20 transition-opacity"></div>
              </div>
            </motion.a>
            
            <motion.a 
              href="https://instagram.com/varun._6_" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon instagram"
              variants={socialIconVariants}
              initial="initial"
              whileHover="hover"
              whileTap={{ scale: 0.9 }}
            >
              <div className="relative p-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all duration-300 shadow-lg hover:shadow-2xl">
                <FaInstagram className="text-3xl text-white" />
                <div className="absolute inset-0 rounded-full bg-white opacity-0 hover:opacity-20 transition-opacity"></div>
              </div>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
      
      <style jsx>{`
        .custom-cursor.expanded {
          width: 50px;
          height: 50px;
          background-color: rgba(255, 255, 255, 0.2);
          mix-blend-mode: overlay;
          transition: width 0.2s ease, height 0.2s ease, background-color 0.2s ease;
        }
        
        @media (max-width: 768px) {
          .custom-cursor {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;