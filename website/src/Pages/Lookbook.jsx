import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Footer from '../Components/Footer';
import '../App.css';
import './Lookbook.css';

// Fake lifestyle images for the lookbook
const lookbookImages = [
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
  "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80",
  "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80",
  "https://images.unsplash.com/photo-1503602642458-232111445657?w=800&q=80"
];

const ParallaxImage = ({ src, offset }) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  return (
    <div className="lb-image-wrap">
      <motion.img 
        src={src} 
        alt="Lookbook Item" 
        style={{ y, scale: 1.15 }}
      />
      <div className="lb-overlay">
        <button>Shop The Look</button>
      </div>
    </div>
  );
};

const Lookbook = () => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 1.05]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="lb-page">
      <nav className="pd-nav">
        <button onClick={() => navigate('/')} className="pd-back-btn">
          <ArrowLeft size={20} /> Back
        </button>
        <div className="pd-nav-brand">ShopNest Lookbook.</div>
        <div style={{ width: 60 }}></div>
      </nav>

      <motion.div className="lb-hero" style={{ scale, opacity }}>
        <h1>Designed for the bold.</h1>
        <p>Explore our curated lifestyle gallery.</p>
      </motion.div>

      <div className="lb-grid">
        <div className="lb-column" style={{ marginTop: '0px' }}>
          <ParallaxImage src={lookbookImages[0]} offset={50} />
          <ParallaxImage src={lookbookImages[2]} offset={100} />
          <ParallaxImage src={lookbookImages[4]} offset={60} />
        </div>
        <div className="lb-column" style={{ marginTop: '120px' }}>
          <ParallaxImage src={lookbookImages[1]} offset={80} />
          <ParallaxImage src={lookbookImages[3]} offset={40} />
          <ParallaxImage src={lookbookImages[5]} offset={90} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Lookbook;
