import React, { useState, useEffect } from 'react';
import { X, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const NewsletterPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    // Check if user has already seen it
    const hasSeenPopup = sessionStorage.getItem('hasSeenNewsletter');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 5000); // Show after 5 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('hasSeenNewsletter', 'true');
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    
    setSubscribed(true);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#4ade80', '#ffffff', '#ec4899']
    });

    setTimeout(() => {
      handleClose();
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 99999,
          padding: '20px'
        }}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 'var(--radius-xl)',
              padding: '40px',
              maxWidth: '450px',
              width: '100%',
              position: 'relative',
              textAlign: 'center',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5), 0 0 30px rgba(99,102,241,0.2)'
            }}
          >
            <button 
              onClick={handleClose}
              style={{
                position: 'absolute', top: '16px', right: '16px',
                background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white',
                width: '32px', height: '32px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={16} />
            </button>

            {!subscribed ? (
              <>
                <div style={{ 
                  width: '64px', height: '64px', 
                  background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 24px'
                }}>
                  <Mail size={32} color="white" />
                </div>
                <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '12px' }}>Unlock 10% Off</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', lineHeight: 1.5 }}>
                  Join our premium newsletter and get an exclusive discount code instantly delivered to your inbox.
                </p>

                <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <input 
                    type="email" 
                    placeholder="Enter your email address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                      width: '100%', padding: '16px',
                      background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: 'var(--radius-full)', color: 'white', fontSize: '15px',
                      outline: 'none', textAlign: 'center'
                    }}
                  />
                  <button 
                    type="submit"
                    style={{
                      width: '100%', padding: '16px',
                      background: 'white', color: 'black', border: 'none',
                      borderRadius: 'var(--radius-full)', fontWeight: 700, fontSize: '16px',
                      cursor: 'pointer', transition: '0.3s'
                    }}
                  >
                    Get My 10% Off
                  </button>
                </form>
                <button 
                  onClick={handleClose}
                  style={{
                    background: 'transparent', border: 'none', color: 'var(--text-muted)',
                    fontSize: '13px', marginTop: '20px', cursor: 'pointer', textDecoration: 'underline'
                  }}
                >
                  No thanks, I prefer paying full price
                </button>
              </>
            ) : (
              <div style={{ padding: '20px 0' }}>
                <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#4ade80', marginBottom: '16px' }}>Success!</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
                  Your exclusive promo code has been sent to <strong>{email}</strong>. 
                  Enjoy your shopping!
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default NewsletterPopup;
