import React from 'react';
import { Instagram, Facebook, Twitter } from 'lucide-react';
import logoImage from '../assets/logo/tn47-coffee-logo.png';

export function Footer() {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        
        {/* Brand Column */}
        <div className="footer-brand">
          <a href="/#" className="footer-logo-link">
            <img src={logoImage} alt="TN47 Coffee" className="footer-logo" />
          </a>
          <p className="footer-slogan">Crafted With Passion. Served With Love.</p>
        </div>
        
        {/* Quick Links Column */}
        <div className="footer-links-group">
          <h4 className="footer-heading">Quick Links</h4>
          <nav className="footer-nav">
            <a href="/#" className="footer-link">Home</a>
            <a href="/#about" className="footer-link">About</a>
            <a href="/#menu" className="footer-link">Menu</a>
            <a href="/#contact" className="footer-link">Contact</a>
          </nav>
        </div>
        
        {/* Contact Column */}
        <div className="footer-contact">
          <h4 className="footer-heading">Contact</h4>
          <p className="footer-text">contact@tn47coffee.com</p>
          <p className="footer-text">+1 (555) 123-4567</p>
          <div className="footer-socials">
            <a href="#" className="social-link" aria-label="Instagram"><Instagram size={20} /></a>
            <a href="#" className="social-link" aria-label="Facebook"><Facebook size={20} /></a>
            <a href="#" className="social-link" aria-label="Twitter"><Twitter size={20} /></a>
          </div>
        </div>
        
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} TN47 Coffee. All rights reserved.</p>
      </div>
    </footer>
  );
}
