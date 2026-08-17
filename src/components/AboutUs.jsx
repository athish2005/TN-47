import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import aboutImage from '../assets/about-cinematic.png';

export function AboutUs() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax effect for the image: moves opposite to scroll
  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  // Staggered variants for text
  const textContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const eyebrowItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const headingItem = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const paragraphItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const ctaItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 } }
  };

  // Staggered variants for values section
  const valueContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.5 }
    }
  };

  const valueItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="about" className="about-section" ref={containerRef}>
      <div className="about-container">
        {/* 2 Column Layout */}
        <div className="about-grid">
        {/* Left Side: Image */}
        <div className="about-image-wrapper">
          <motion.div 
            className="about-image-overflow"
            initial={{ opacity: 0, scale: 1.04, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.img 
              src={aboutImage} 
              alt="Freshly brewed TN47 Coffee" 
              className="about-image"
              style={{ y: imageY }}
            />
          </motion.div>
        </div>

        {/* Right Side: Content */}
        <motion.div 
          className="about-content"
          variants={textContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.span className="about-eyebrow" variants={eyebrowItem}>
            OUR STORY
          </motion.span>
          <motion.h2 className="about-heading" variants={headingItem}>
            Crafted With Passion.<br/>Served With Love.
          </motion.h2>
          
          <motion.p className="about-text" variants={paragraphItem}>
            “At TN47 Coffee, every cup is more than a drink. It is a moment to slow down, connect, and enjoy something crafted with care.”
          </motion.p>
          <motion.p className="about-text" variants={paragraphItem}>
            “From carefully selected coffee beans to every handcrafted cup, we believe great coffee comes from quality ingredients, thoughtful preparation, and a passion for perfection.”
          </motion.p>
          
          <motion.div className="about-cta-container" variants={ctaItem}>
            <button className="about-cta">
              Discover Our Story <span className="cta-arrow">→</span>
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Values Section */}
      <motion.div 
        className="about-values"
        variants={valueContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div className="value-block" variants={valueItem}>
          <div className="value-number">01</div>
          <h3 className="value-heading">100% Freshly Brewed</h3>
          <p className="value-desc">Every cup is prepared fresh for the perfect taste.</p>
        </motion.div>

        <motion.div className="value-block" variants={valueItem}>
          <div className="value-number">02</div>
          <h3 className="value-heading">Premium Beans</h3>
          <p className="value-desc">Carefully selected beans for rich aroma and balanced flavor.</p>
        </motion.div>

        <motion.div className="value-block" variants={valueItem}>
          <div className="value-number">03</div>
          <h3 className="value-heading">Handcrafted Daily</h3>
          <p className="value-desc">Every cup is prepared with attention, passion and precision.</p>
        </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
