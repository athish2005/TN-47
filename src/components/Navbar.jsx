import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logoImage from '../assets/logo/tn47-coffee-logo.png';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  return (
    <header className={`navbar-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <a href="#" className="navbar-logo-link">
          <img src={logoImage} alt="TN47 Coffee" className="logo-image" />
        </a>

        {/* Desktop Links */}
        <nav className="navbar-links desktop-only">
          <a href="#" className="nav-link">Home</a>
          <a href="#about" className="nav-link">About</a>
          <a href="#menu" className="nav-link">Menu</a>
          <a href="#gallery" className="nav-link">Gallery</a>
          <a href="#contact" className="nav-link">Contact</a>
          <a href="#order" className="nav-link order-btn">Order Now</a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-links">
          <a href="#" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Home</a>
          <a href="#about" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>About</a>
          <a href="#menu" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Menu</a>
          <a href="#gallery" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Gallery</a>
          <a href="#contact" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Contact</a>
          <a href="#order" className="mobile-link mobile-order-btn" onClick={() => setMobileMenuOpen(false)}>Order Now</a>
        </nav>
      </div>
    </header>
  );
}
