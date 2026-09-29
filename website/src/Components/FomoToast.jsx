import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './FomoToast.css';

const fomoMessages = [
  { name: 'Alex from New York', action: 'just bought', product: 'Wireless Noise-Cancelling Headphones' },
  { name: 'Sarah from London', action: 'added to wishlist', product: 'Smart Watch Series 8' },
  { name: 'David from Sydney', action: 'just bought', product: 'Ergonomic Office Chair' },
  { name: 'Emma from Toronto', action: 'reviewed', product: '4K Ultra HD Smart TV', stars: '⭐⭐⭐⭐⭐' },
  { name: 'James from Dubai', action: 'just bought', product: 'Minimalist Leather Wallet' },
  { name: 'Sophia from Tokyo', action: 'just bought', product: 'Professional Camera Kit' }
];

const FomoToast = () => {
  const [currentFomo, setCurrentFomo] = useState(null);

  useEffect(() => {
    const showRandomFomo = () => {
      const randomMsg = fomoMessages[Math.floor(Math.random() * fomoMessages.length)];
      setCurrentFomo(randomMsg);
      
      // Hide after 4 seconds
      setTimeout(() => {
        setCurrentFomo(null);
      }, 4000);
    };

    // Initial delay then show randomly every 12 to 20 seconds
    const scheduleNext = () => {
      const delay = Math.random() * (20000 - 12000) + 12000;
      setTimeout(() => {
        showRandomFomo();
        scheduleNext();
      }, delay);
    };

    // Show first toast after 3 seconds
    setTimeout(() => {
      showRandomFomo();
      scheduleNext();
    }, 3000);

    return () => setCurrentFomo(null);
  }, []);

  return (
    <div className="fomo-container">
      <AnimatePresence>
        {currentFomo && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="fomo-toast"
          >
            <div className="fomo-icon">
              🛒
            </div>
            <div className="fomo-content">
              <p className="fomo-title">
                <strong>{currentFomo.name}</strong> {currentFomo.action}
              </p>
              <p className="fomo-product">{currentFomo.product}</p>
              {currentFomo.stars && <p className="fomo-stars">{currentFomo.stars}</p>}
              <small className="fomo-time">Just now</small>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FomoToast;
