import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import { ShieldCheck, ArrowLeft, CreditCard } from 'lucide-react';
import confetti from 'canvas-confetti';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, setCart } = useCart();
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((acc, item) => acc + (item.price || 0), 0);

  const handleCheckout = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#4ade80', '#ffffff', '#3b82f6']
      });
      alert("Order placed successfully! We are preparing your items.");
      setCart([]); // Clear cart
      navigate('/orders');
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="co-empty">
        <h2>Your cart is empty.</h2>
        <button onClick={() => navigate('/')}>Return to Shop</button>
      </div>
    );
  }

  return (
    <div className="co-page">
      <div className="co-left">
        <button className="co-back" onClick={() => navigate('/')}>
          <ArrowLeft size={16} /> Back to Shop
        </button>
        
        <div className="co-form-wrap">
          <div className="co-brand">ShopNest.</div>
          <h2>Secure Checkout</h2>
          <p className="co-subtitle">Complete your premium order.</p>

          <form onSubmit={handleCheckout} className="co-form">
            <h3 className="co-section-title">Contact Information</h3>
            <input type="email" placeholder="Email address" required />
            
            <h3 className="co-section-title">Shipping Address</h3>
            <div className="co-input-group">
              <input type="text" placeholder="First Name" required />
              <input type="text" placeholder="Last Name" required />
            </div>
            <input type="text" placeholder="Address" required />
            <input type="text" placeholder="Apartment, suite, etc. (optional)" />
            <div className="co-input-group">
              <input type="text" placeholder="City" required />
              <input type="text" placeholder="Postal Code" required />
            </div>

            <h3 className="co-section-title">Payment Method</h3>
            <div className="co-payment-card">
              <div className="co-pay-header">
                <CreditCard size={20} />
                <span>Credit Card</span>
              </div>
              <input type="text" placeholder="Card Number" required />
              <div className="co-input-group">
                <input type="text" placeholder="MM/YY" required />
                <input type="text" placeholder="CVC" required />
              </div>
            </div>

            <button type="submit" className="co-submit-btn" disabled={loading}>
              {loading ? 'Processing...' : `Pay ₹${total.toLocaleString()}`}
            </button>
            <p className="co-secure-msg"><ShieldCheck size={16}/> Payments are secure and encrypted.</p>
          </form>
        </div>
      </div>

      <div className="co-right">
        <div className="co-summary">
          <h3>Order Summary</h3>
          
          <div className="co-items-list">
            {cart.map((item, idx) => (
              <div key={idx} className="co-item">
                <div className="co-item-img">
                  <img src={item.images?.[0]?.url} alt={item.productName} />
                  <span className="co-item-qty">1</span>
                </div>
                <div className="co-item-info">
                  <h4>{item.productName}</h4>
                  <p>{item.category?.categoryName}</p>
                </div>
                <div className="co-item-price">
                  ₹{item.price?.toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          <div className="co-totals">
            <div className="co-row">
              <span>Subtotal</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
            <div className="co-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="co-row co-total-row">
              <span>Total</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
