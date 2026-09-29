import React, { useState, useEffect } from 'react';
import './SpecialOffer.css';

const SpecialOffer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 45, seconds: 0 });

  useEffect(() => {
    // Show banner after 2 seconds
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else {
          seconds = 59;
          if (minutes > 0) minutes--;
          else {
            minutes = 59;
            if (hours > 0) hours--;
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="special-offer-banner">
      <button className="close-offer" onClick={() => setIsVisible(false)}>✕</button>
      <div className="offer-content">
        <span className="offer-badge">Flash Sale</span>
        <h3>Get 20% Off!</h3>
        <p>Use code <strong>SUNDAR20</strong> at checkout.</p>
        <div className="offer-timer">
          <div className="time-box">
            <span>{String(timeLeft.hours).padStart(2, '0')}</span>
            <small>hr</small>
          </div>
          <span className="colon">:</span>
          <div className="time-box">
            <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
            <small>min</small>
          </div>
          <span className="colon">:</span>
          <div className="time-box">
            <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
            <small>sec</small>
          </div>
        </div>
        <button className="claim-btn">Claim Offer</button>
      </div>
    </div>
  );
};

export default SpecialOffer;
