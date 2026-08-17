import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

export function ScrollMenuItem({ item, index, count, scrollYProgress }) {
  // We divide the scroll range into (count + 1) segments.
  // 0 is Intro, 1 is Item 0, ..., 6 is Item 5, 7 (1.0) is Outro.
  const step = 1 / (count + 1);
  const center = (index + 1) * step;
  const margin = step * 0.5; // 0.0714
  const hold = step * 0.15; // 0.0214

  // Define the 4 keyframes for this item's lifecycle
  const startEnter = center - margin;
  const finishEnter = center - hold;
  const startExit = center + hold;
  const finishExit = center + margin;

  // Opacity transitions
  const opacity = useTransform(
    scrollYProgress,
    [startEnter, finishEnter, startExit, finishExit],
    [0, 1, 1, 0]
  );

  // Image animations
  // Enter scale: 0.92 -> 1.0. Exit scale: 1.0 -> 1.06
  const imageScale = useTransform(
    scrollYProgress,
    [startEnter, finishEnter, startExit, finishExit],
    [0.92, 1, 1, 1.06]
  );

  // Alternating entry directions to make it organic
  const dir = index % 2 === 0 ? 1 : -1;
  
  const imageX = useTransform(
    scrollYProgress,
    [startEnter, finishEnter, startExit, finishExit],
    [80 * dir, 0, 0, -80 * dir]
  );

  const textX = useTransform(
    scrollYProgress,
    [startEnter, finishEnter, startExit, finishExit],
    [-40 * dir, 0, 0, 40 * dir]
  );

  // Pointer events should only be active when the item is near the center
  const pointerEvents = useTransform(
    scrollYProgress,
    (v) => (v >= finishEnter && v <= startExit ? 'auto' : 'none')
  );

  // Background color interpolation is handled in MenuSection, 
  // this component just renders the content layer.

  return (
    <motion.div 
      className="scroll-menu-item"
      style={{
        opacity,
        pointerEvents,
        zIndex: count - index // Keep order natural
      }}
    >
      <div className="menu-item-container">
        
        {/* Left Side: Content */}
        <motion.div 
          className="menu-item-content"
          style={{ x: textX }}
        >
          <div className="menu-meta">
            <span className="menu-number">{item.id} <span className="menu-total">/ 0{count}</span></span>
            <span className="menu-category">{item.category}</span>
          </div>
          
          <h3 className="menu-title">{item.name}</h3>
          <p className="menu-desc">{item.desc}</p>
          <div className="menu-price">{item.price}</div>
          
          <Link to={`/order?item=${item.id}`}>
            <button className="menu-order-btn">
              Order Now 
              <svg className="menu-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </Link>
        </motion.div>

        {/* Right Side: Image */}
        <motion.div 
          className="menu-item-image-wrapper"
          style={{ x: imageX, scale: imageScale }}
        >
          {/* Subtle animated steam overlay */}
          <div className="menu-steam-overlay"></div>
          
          <img 
            src={item.image} 
            alt={item.name} 
            className="menu-item-image"
            loading="lazy"
          />
        </motion.div>

      </div>
    </motion.div>
  );
}
