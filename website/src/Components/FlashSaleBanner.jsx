import React, { useState, useEffect } from 'react';
import { Timer, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FlashSaleBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState(14400); // 4 hours in seconds

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isVisible]);

  if (!isVisible) return null;

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        style={{
          background: 'linear-gradient(90deg, var(--accent-secondary), var(--accent-primary))',
          color: 'white',
          padding: '10px 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          position: 'relative',
          zIndex: 1001, // Above navbar
          fontWeight: 600,
          fontSize: '14px',
          boxShadow: '0 4px 15px rgba(236,72,153,0.3)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Timer size={18} />
          <span>MEGA FLASH SALE — Up to 50% Off Everything!</span>
        </div>
        
        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '4px 12px', borderRadius: 'var(--radius-full)', display: 'flex', gap: '4px', fontVariantNumeric: 'tabular-nums' }}>
          Ends In: 
          <span style={{ fontWeight: 800 }}>
            {hours.toString().padStart(2, '0')}:
            {minutes.toString().padStart(2, '0')}:
            {seconds.toString().padStart(2, '0')}
          </span>
        </div>

        <button 
          onClick={() => setIsVisible(false)}
          style={{ position: 'absolute', right: '16px', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '4px' }}
        >
          <X size={16} />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default FlashSaleBanner;
