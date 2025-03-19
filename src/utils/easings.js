/**
 * Collection of easing functions for smooth animations
 */

export const easings = {
  // Linear - no easing
  linear: (t, b, c, d) => {
    return c * t / d + b;
  },
  
  // Quad easing functions
  easeInQuad: (t, b, c, d) => {
    t /= d;
    return c * t * t + b;
  },
  
  easeOutQuad: (t, b, c, d) => {
    t /= d;
    return -c * t * (t - 2) + b;
  },
  
  easeInOutQuad: (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  },
  
  // Cubic easing functions
  easeInCubic: (t, b, c, d) => {
    t /= d;
    return c * t * t * t + b;
  },
  
  easeOutCubic: (t, b, c, d) => {
    t /= d;
    t--;
    return c * (t * t * t + 1) + b;
  },
  
  easeInOutCubic: (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t * t + b;
    t -= 2;
    return c / 2 * (t * t * t + 2) + b;
  },
  
  // Quart easing functions
  easeInQuart: (t, b, c, d) => {
    t /= d;
    return c * t * t * t * t + b;
  },
  
  easeOutQuart: (t, b, c, d) => {
    t /= d;
    t--;
    return -c * (t * t * t * t - 1) + b;
  },
  
  easeInOutQuart: (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t * t * t + b;
    t -= 2;
    return -c / 2 * (t * t * t * t - 2) + b;
  },
  
  // Expo easing functions
  easeInExpo: (t, b, c, d) => {
    return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
  },
  
  easeOutExpo: (t, b, c, d) => {
    return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
  },
  
  easeInOutExpo: (t, b, c, d) => {
    if (t==0) return b;
    if (t==d) return b+c;
    if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
    return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
  },
  
  // Sine easing functions
  easeInSine: (t, b, c, d) => {
    return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
  },
  
  easeOutSine: (t, b, c, d) => {
    return c * Math.sin(t/d * (Math.PI/2)) + b;
  },
  
  easeInOutSine: (t, b, c, d) => {
    return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
  },
  
  // Custom easing functions for specific animations
  easeInOut: (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t * t + b;
    t -= 2;
    return c / 2 * (t * t * t + 2) + b;
  }
};

export default easings;
