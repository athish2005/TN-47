import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { drawImageCover } from '../utils/canvas';

const titleContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2
    }
  }
};

const letterVariants = {
  hidden: { 
    opacity: 0, 
    y: 28,
    filter: 'blur(10px)',
    scale: 0.9
  },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: 'blur(0px)',
    scale: 1,
    transition: { 
      duration: 0.6, 
      ease: [0.215, 0.61, 0.355, 1]
    } 
  }
};

export function CoffeeSequenceHero({ 
  images, 
  totalCount, 
  firstFrameReady,
  brandText = "TN47",
  subText = "COFFEE",
  scrollHintText = "SCROLL TO EXPLORE"
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  
  const animationFrameId = useRef(null);
  const currentFrameIndexRef = useRef(0);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const brandLetters = Array.from(brandText);
  const subLetters = Array.from(subText);

  // Check reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Main canvas render function
  const renderFrame = (index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    const safeIndex = Math.max(0, Math.min(index, totalCount - 1));
    const img = images[safeIndex];

    if (img && img.complete) {
      drawImageCover(ctx, img, width, height, dpr, {
        alignX: 0.5,
        alignY: 0.5
      });
    } else {
      let fallbackImg = null;
      for (let offset = 1; offset < totalCount; offset++) {
        if (images[safeIndex - offset]?.complete) {
          fallbackImg = images[safeIndex - offset];
          break;
        }
        if (images[safeIndex + offset]?.complete) {
          fallbackImg = images[safeIndex + offset];
          break;
        }
      }
      if (fallbackImg) {
        drawImageCover(ctx, fallbackImg, width, height, dpr, { alignX: 0.5, alignY: 0.5 });
      }
    }
  };

  // Handle Scroll & Window Resize
  useEffect(() => {
    if (!containerRef.current || totalCount === 0) return;

    const updateCanvas = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const totalScrollable = container.offsetHeight - window.innerHeight;

      if (totalScrollable <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));

      setScrollProgress(progress);

      if (isReducedMotion) {
        currentFrameIndexRef.current = 0;
      } else {
        const targetFrame = Math.floor(progress * (totalCount - 1));
        currentFrameIndexRef.current = targetFrame;
      }

      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      animationFrameId.current = requestAnimationFrame(() => {
        renderFrame(currentFrameIndexRef.current);
      });
    };

    updateCanvas();

    window.addEventListener('scroll', updateCanvas, { passive: true });
    window.addEventListener('resize', updateCanvas);

    return () => {
      window.removeEventListener('scroll', updateCanvas);
      window.removeEventListener('resize', updateCanvas);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [images, totalCount, firstFrameReady, isReducedMotion]);

  useEffect(() => {
    if (firstFrameReady) {
      renderFrame(0);
    }
  }, [firstFrameReady]);

  // Text timeline: visible 0-10%, fades out 10-20%
  let textOpacity = 1;
  let textY = 0;
  if (scrollProgress <= 0.10) {
    textOpacity = 1;
    textY = 0;
  } else if (scrollProgress <= 0.20) {
    textOpacity = (0.20 - scrollProgress) / 0.10;
    textY = (scrollProgress - 0.10) * -80;
  } else {
    textOpacity = 0;
    textY = -20;
  }

  return (
    <section ref={containerRef} className="hero-scroll-container">
      <div className="hero-sticky-viewport">
        {/* Canvas */}
        <canvas ref={canvasRef} className="hero-canvas" />

        {/* Minimal Hero Overlay */}
        <div 
          className="hero-text-overlay"
          style={{
            opacity: textOpacity,
            transform: `translateY(${textY}px)`,
            pointerEvents: textOpacity > 0.05 ? 'auto' : 'none',
            transition: 'opacity 0.1s linear, transform 0.1s linear'
          }}
        >
          <motion.div className="hero-content">
            <motion.h1 
              className="hero-title-single"
              variants={titleContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
            >
              <span className="title-brand">
                {brandLetters.map((char, index) => (
                  <motion.span 
                    key={`brand-${index}`} 
                    variants={letterVariants} 
                    className="char-span"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>

              <span className="title-sub">
                {subLetters.map((char, index) => (
                  <motion.span 
                    key={`sub-${index}`} 
                    variants={letterVariants} 
                    className="char-span"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            </motion.h1>
          </motion.div>

          <motion.div 
            className="hero-scroll-hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
          >
            <span className="scroll-text">{scrollHintText}</span>
            <span className="scroll-arrow">↓</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
