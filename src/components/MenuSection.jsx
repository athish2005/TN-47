import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { Link } from 'react-router-dom';
import { menuItems } from '../data/menuData';
import { ScrollMenuItem } from './ScrollMenuItem';
import outroBg from '../assets/about-cinematic.png';

export function MenuSection() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // We track the scroll progress of the extremely tall container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Calculate background color transition
  // We include 0 (intro) and 1 (outro) with the default dark background
  const bgColors = ["#0a0807", ...menuItems.map(item => item.bg), "#0a0807"];
  const step = 1 / (menuItems.length + 1);
  const colorStops = [0, ...menuItems.map((_, i) => (i + 1) * step), 1];
  const backgroundColor = useTransform(scrollYProgress, colorStops, bgColors);

  // Track which item is currently active to update the sidebar indicator
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    let closestIdx = 0;
    let minDiff = Infinity;
    menuItems.forEach((_, idx) => {
      const center = (idx + 1) * step;
      const diff = Math.abs(latest - center);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = idx;
      }
    });
    setActiveIndex(closestIdx);
  });

  return (
    <motion.section 
      id="menu"
      ref={containerRef} 
      className="menu-section"
      // Height is 100vh per item to give enough scroll room
      style={{ height: `${menuItems.length * 100}vh`, backgroundColor }}
    >
      {/* The sticky viewport stays glued to the screen while we scroll the tall container */}
      <div className="menu-sticky-viewport">
        
        {/* Intro text that fades out as we start scrolling */}
        <motion.div 
          className="menu-intro"
          style={{ 
            opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]),
            pointerEvents: useTransform(scrollYProgress, [0, 0.05], ['auto', 'none']),
            y: useTransform(scrollYProgress, [0, 0.05], [0, -40])
          }}
        >
          <span className="intro-label">OUR MENU</span>
          <h2 className="intro-heading">Every Cup Has A Story.</h2>
          <p className="intro-sub">Discover our handcrafted coffee, one cup at a time.</p>
        </motion.div>

        {/* Vertical Active Indicator Sidebar */}
        <div className="menu-indicator-sidebar">
          {menuItems.map((item, idx) => (
            <React.Fragment key={item.id}>
              <div 
                className={`indicator-number ${activeIndex === idx ? 'active' : ''}`}
                onClick={() => {
                  // Optional: smooth scroll to this item
                  const el = containerRef.current;
                  if (el) {
                    const step = 1 / (menuItems.length + 1);
                    const center = (idx + 1) * step;
                    const top = el.offsetTop + center * (el.offsetHeight - window.innerHeight);
                    window.scrollTo({ top, behavior: 'smooth' });
                  }
                }}
              >
                {item.id}
              </div>
              {idx < menuItems.length - 1 && <div className="indicator-line"></div>}
            </React.Fragment>
          ))}
        </div>

        {/* Render the individual animated coffee items stacked on top of each other */}
        <div className="menu-items-stack">
          {menuItems.map((item, idx) => (
            <ScrollMenuItem 
              key={item.id}
              item={item}
              index={idx}
              count={menuItems.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* Ending hint that fades in at the very end */}
        <motion.div 
          className="menu-outro"
          style={{ 
            opacity: useTransform(scrollYProgress, [0.95, 1], [0, 1]),
            pointerEvents: useTransform(scrollYProgress, [0.95, 1], ['none', 'auto']),
            y: useTransform(scrollYProgress, [0.95, 1], [40, 0])
          }}
        >
          <div className="menu-outro-bg" style={{ backgroundImage: `url(${outroBg})` }}></div>
          <div className="menu-outro-overlay"></div>
          <div className="menu-steam-overlay outro-steam"></div>
          
          <div className="menu-outro-content">
            <span className="outro-label">YOUR COFFEE AWAITS</span>
            <h3>Find Your Perfect Cup.</h3>
            <p className="outro-desc">Experience our rich flavors, handcrafted to perfection.</p>
            <Link to="/order">
              <button className="menu-order-btn final-btn">
                Order Now 
                <svg className="menu-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </Link>
          </div>
        </motion.div>

      </div>
    </motion.section>
  );
}
