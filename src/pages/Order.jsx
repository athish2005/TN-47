import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { menuItems } from '../data/menuData';
import bgImage from '../assets/about-cinematic.png';

export function Order() {
  const [searchParams] = useSearchParams();
  const initialItem = searchParams.get('item') || '';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Initialize quantities state
  const initialQuantities = {};
  menuItems.forEach(item => {
    initialQuantities[item.id] = item.id === initialItem ? 1 : 0;
  });
  const [quantities, setQuantities] = useState(initialQuantities);
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');

  const handleQuantityChange = (id, delta) => {
    setQuantities(prev => {
      const newQty = prev[id] + delta;
      if (newQty < 0) return prev;
      return { ...prev, [id]: newQty };
    });
  };

  const totalAmount = menuItems.reduce((total, item) => {
    const qty = quantities[item.id] || 0;
    if (qty > 0) {
      const priceVal = parseInt(item.price.replace(/\D/g, ''), 10);
      return total + (priceVal * qty);
    }
    return total;
  }, 0);

  const handleOrderSubmit = (e) => {
    e.preventDefault();

    const orderedItems = menuItems.filter(item => quantities[item.id] > 0);

    if (orderedItems.length === 0) {
      alert("Please select at least one coffee.");
      return;
    }
    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }

    let message = `*New Order from ${name}*\n\n`;
    message += `*Items:*\n`;
    orderedItems.forEach(item => {
      message += `- ${item.name} x ${quantities[item.id]} (${item.price})\n`;
    });
    
    message += `\n*Total Amount:* ₹${totalAmount}\n`;

    if (notes.trim()) {
      message += `\n*Special Requests:*\n${notes}\n`;
    }

    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = "6381612308";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
  };

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

        <form className="order-form" onSubmit={handleOrderSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Select Your Coffee</label>
            <div className="coffee-selection-grid">
              {menuItems.map(item => (
                <div key={item.id} className={`coffee-selection-item ${quantities[item.id] > 0 ? 'selected' : ''}`}>
                  <div className="coffee-selection-image-container">
                    <img src={item.image} alt={item.name} className="coffee-selection-image" />
                  </div>
                  <div className="coffee-selection-details">
                    <h4>{item.name}</h4>
                    <p className="coffee-selection-price">{item.price}</p>
                  </div>
                  <div className="quantity-controls">
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(item.id, -1)}
                      disabled={quantities[item.id] === 0}
                      className="quantity-btn"
                    >
                      -
                    </button>
                    <span className="quantity-display">{quantities[item.id]}</span>
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="quantity-btn"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="notes">Special Requests</label>
            <textarea
              id="notes"
              placeholder="Extra hot, oat milk..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </div>

          {totalAmount > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', padding: '15px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', fontWeight: '600', fontSize: '1.25rem', letterSpacing: '0.05em' }}>
              <span>Total Amount</span>
              <span style={{ color: '#d4af37' }}>₹{totalAmount}</span>
            </div>
          )}

          <button type="submit" className="menu-order-btn order-submit-btn">
            Place Order
            <svg className="menu-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
