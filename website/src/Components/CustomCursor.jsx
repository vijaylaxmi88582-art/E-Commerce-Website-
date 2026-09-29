import React, { useEffect, useState } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trailerPos, setTrailerPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target;
      if (
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.classList.contains('cat-card') ||
        target.closest('.prod-card') ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Smooth trailing effect
  useEffect(() => {
    const followCursor = () => {
      setTrailerPos(prev => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15
        };
      });
      requestAnimationFrame(followCursor);
    };
    const animId = requestAnimationFrame(followCursor);
    return () => cancelAnimationFrame(animId);
  }, [position]);

  return (
    <>
      <div 
        className={`custom-cursor-dot ${isHovering ? 'hover' : ''}`} 
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      ></div>
      <div 
        className={`custom-cursor-trailer ${isHovering ? 'hover' : ''}`} 
        style={{ left: `${trailerPos.x}px`, top: `${trailerPos.y}px` }}
      ></div>
    </>
  );
};

export default CustomCursor;
