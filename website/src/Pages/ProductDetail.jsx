import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShoppingBag, Heart, ArrowLeft, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { useCart } from '../Context/CartContext';
import Footer from '../Components/Footer';
import confetti from 'canvas-confetti';
import axios from 'axios';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const productData = useSelector((state) => state.storeData.products);
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

  const { scrollY } = useScroll();
  
  // Apple-style Parallax Effects
  const imageScale = useTransform(scrollY, [0, 500], [1, 1.2]);
  const textY = useTransform(scrollY, [0, 300], [0, 100]);
  const textOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const found = productData.find(p => p._id === id);
    if (found) {
      setProduct(found);
    } else {
      // Handle 404 or wait for fetch
      if (productData.length > 0) {
        navigate('/');
      }
    }
  }, [id, productData, navigate]);

  const handleAddToCart = (e) => {
    const audio = new Audio('https://cdn.pixabay.com/download/audio/2021/08/04/audio_0625c1539c.mp3?filename=pop-39222.mp3');
    audio.volume = 0.5;
    audio.play().catch(() => {});

    const rect = e.target.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x, y },
      colors: ['#ffffff', '#3b82f6', '#ec4899']
    });

    addToCart(product);
  };

  const handleWishlist = async () => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');
    try {
      const api_url = import.meta.env.VITE_API_URL;
      await axios.post(`${api_url}/api/user/wishlist/add`, { productId: product._id }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Added to Wishlist');
    } catch (err) {
      console.log(err);
    }
  };

  if (!product) {
    return (
      <div className="pd-loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="pd-page">
      {/* STICKY NAV OVERRIDE */}
      <nav className="pd-nav">
        <button onClick={() => navigate(-1)} className="pd-back-btn">
          <ArrowLeft size={20} /> Back
        </button>
        <div className="pd-nav-brand">ShopNest.</div>
        <div className="pd-nav-price">₹{product.price?.toLocaleString()}</div>
      </nav>

      {/* HERO SECTION */}
      <section className="pd-hero">
        <motion.div className="pd-hero-text" style={{ y: textY, opacity: textOpacity }}>
          <span className="pd-hero-cat">{product.category?.categoryName || 'Premium'}</span>
          <h1>{product.productName}</h1>
          <p>Profound power. Impossibly thin.</p>
        </motion.div>
        
        <div className="pd-hero-img-wrap">
          <motion.img 
            src={product.images?.[activeImage]?.url} 
            alt={product.productName} 
            style={{ scale: imageScale }}
            className="pd-hero-img"
          />
        </div>
      </section>

      {/* INTERACTIVE SHOWCASE */}
      <section className="pd-showcase">
        <div className="pd-gallery">
          {product.images?.map((img, idx) => (
            <button 
              key={idx} 
              className={`pd-gallery-btn ${activeImage === idx ? 'active' : ''}`}
              onClick={() => setActiveImage(idx)}
            >
              <img src={img.url} alt={`View ${idx+1}`} />
            </button>
          ))}
        </div>

        <div className="pd-details-grid">
          <div className="pd-specs">
            <h2>The ultimate display of excellence.</h2>
            <p className="pd-desc">{product.description || "Designed with absolute precision. This product pushes the boundaries of what is possible, bringing you unprecedented performance in a breathtakingly sleek design."}</p>
            
            <div className="pd-benefits">
              <div className="pd-benefit-item">
                <ShieldCheck size={24} color="var(--accent-secondary)" />
                <div>
                  <h4>1-Year Warranty</h4>
                  <p>Comprehensive coverage included.</p>
                </div>
              </div>
              <div className="pd-benefit-item">
                <Truck size={24} color="var(--accent-secondary)" />
                <div>
                  <h4>Free Express Delivery</h4>
                  <p>Arrives within 2-3 business days.</p>
                </div>
              </div>
              <div className="pd-benefit-item">
                <RotateCcw size={24} color="var(--accent-secondary)" />
                <div>
                  <h4>30-Day Returns</h4>
                  <p>No questions asked return policy.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pd-action-card glass-panel">
            <h3 className="pd-price-large">₹{product.price?.toLocaleString()}</h3>
            <p className="pd-stock">In Stock & Ready to Ship</p>
            
            <div className="pd-action-btns">
              <button className="pd-add-cart" onClick={handleAddToCart}>
                <ShoppingBag size={20} /> Add to Cart
              </button>
              <button className="pd-wishlist" onClick={handleWishlist}>
                <Heart size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductDetail;
