import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="mega-footer">
      <div className="footer-container">
        
        <div className="footer-brand">
          <h2>ShopNest.</h2>
          <p>Elevating your lifestyle with premium, carefully curated products. Designed for the modern world.</p>
          <div className="social-links">
            <a href="#" aria-label="Mail"><Mail size={20} /></a>
            <a href="#" aria-label="Phone"><Phone size={20} /></a>
            <a href="#" aria-label="Location"><MapPin size={20} /></a>
          </div>
        </div>

        <div className="footer-links-group">
          <div className="footer-col">
            <h3>Company</h3>
            <button onClick={() => navigate('/about')}>About Us</button>
            <button onClick={() => navigate('/contact')}>Contact</button>
            <button>Careers</button>
          </div>
          
          <div className="footer-col">
            <h3>Support</h3>
            <button onClick={() => navigate('/faq')}>FAQ</button>
            <button>Shipping Info</button>
            <button>Returns</button>
          </div>
          
          <div className="footer-col">
            <h3>Legal</h3>
            <button>Privacy Policy</button>
            <button>Terms of Service</button>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} ShopNest. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
