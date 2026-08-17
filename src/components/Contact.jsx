import React from 'react';
import { MapPin, Clock, Mail, Phone } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        
        <div className="contact-header">
          <span className="contact-label">GET IN TOUCH</span>
          <h2 className="contact-heading">Let's Connect.</h2>
          <p className="contact-sub">We'd love to hear from you. Drop by for a cup or send us a message.</p>
        </div>

        <div className="contact-grid">
          {/* Info Card 1: Location */}
          <div className="contact-card">
            <div className="contact-icon-wrapper">
              <MapPin size={28} />
            </div>
            <h3 className="contact-card-title">Location</h3>
            <p className="contact-card-text">
              Thanthonimalai,<br/>
              Karur
            </p>
          </div>

          {/* Info Card 2: Hours */}
          <div className="contact-card">
            <div className="contact-icon-wrapper">
              <Clock size={28} />
            </div>
            <h3 className="contact-card-title">Hours</h3>
            <p className="contact-card-text">
              Mon - Fri: 7:00 AM - 8:00 PM<br/>
              Sat - Sun: 8:00 AM - 9:00 PM
            </p>
          </div>

          {/* Info Card 3: Contact */}
          <div className="contact-card">
            <div className="contact-icon-wrapper">
              <Mail size={28} />
            </div>
            <h3 className="contact-card-title">Contact</h3>
            <p className="contact-card-text">
              contact@tn47coffee.com<br/>
              +1 (555) 123-4567
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
