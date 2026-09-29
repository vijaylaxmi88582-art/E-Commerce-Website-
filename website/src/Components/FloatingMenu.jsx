import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, User, Menu, X } from 'lucide-react';
import './FloatingMenu.css';
import { useSelector } from 'react-redux';
import { useCart } from '../Context/CartContext';

const FloatingMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { cart } = useCart();
  
  // Try to get user from local storage safely
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { icon: <ShoppingCart size={20} />, label: 'Cart', path: '/cart', badge: cart?.length || 0 },
    { icon: <Heart size={20} />, label: 'Wishlist', path: '/wishlist' },
    { icon: <User size={20} />, label: user ? 'Profile' : 'Login', path: user ? '/users' : '/login' },
  ];

  return (
    <div className="floating-menu-wrapper">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="floating-menu-backdrop"
            onClick={toggleMenu}
          />
        )}
      </AnimatePresence>

      <div className="floating-menu-container">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.8 }}
              className="floating-menu-items"
            >
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="fm-item"
                  onClick={() => {
                    navigate(item.path);
                    setIsOpen(false);
                  }}
                >
                  <span className="fm-label">{item.label}</span>
                  <div className="fm-icon-wrap">
                    {item.icon}
                    {item.badge > 0 && <span className="fm-badge">{item.badge}</span>}
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          className={`fm-toggle ${isOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.div>
        </motion.button>
      </div>
    </div>
  );
};

export default FloatingMenu;
