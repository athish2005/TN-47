import React from 'react';
import { useSearchParams } from 'react-router-dom';
import bgImage from '../assets/about-cinematic.png';

export function Order() {
  const [searchParams] = useSearchParams();
  const selectedItem = searchParams.get('item') || '01';

  return (
    <div className="order-page-container">
      {/* Cinematic Background Elements */}
      <div 
        className="order-page-bg" 
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="order-page-overlay" />
      <div className="menu-steam-overlay order-steam" />

      <div className="order-content">
        <span className="order-label">TN47 COFFEE</span>
        <h1 className="order-heading">Start Your Order.</h1>
        <p className="order-sub">
          Experience our premium handcrafted coffee. Complete the form below and we'll prepare your order fresh for pickup.
        </p>

        <form className="order-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" placeholder="John Doe" />
          </div>

          <div className="form-group">
            <label htmlFor="coffee">Select Your Coffee</label>
            <select id="coffee" defaultValue={selectedItem}>
              <option value="01">Classic Espresso</option>
              <option value="02">Cappuccino</option>
              <option value="03">Signature Latte</option>
              <option value="04">Chocolate Mocha</option>
              <option value="05">Caramel Latte</option>
              <option value="06">TN47 Signature</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="notes">Special Requests</label>
            <textarea id="notes" placeholder="Extra hot, oat milk..."></textarea>
          </div>

          <button type="submit" className="menu-order-btn order-submit-btn">
            Place Order 
            <svg className="menu-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
