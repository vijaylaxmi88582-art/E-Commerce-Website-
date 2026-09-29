import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory, fetchProduct } from "../Redux/StoreDataSlice";
import { useCart } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import confetti from 'canvas-confetti';
import Tilt from 'react-parallax-tilt';
import { motion, AnimatePresence } from 'framer-motion';
import InfiniteMarquee from '../Components/InfiniteMarquee';
import { Search, ShoppingCart, Heart, X, Filter, Star } from 'lucide-react';
import CartDrawer from "../Components/CartDrawer";
import FlashSaleBanner from "../Components/FlashSaleBanner";
import NewsletterPopup from "../Components/NewsletterPopup";
import Footer from "../Components/Footer";
import "../App.css";

const Product = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const [customerName, setCustomerName] = useState(user ? user.name : 'Guest')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [search, setSearch] = useState('')
  const [quickViewProduct, setQuickViewProduct] = useState(null)
  
  // Carousel State
  const [currentSlide, setCurrentSlide] = useState(0)
  
  // Cart Drawer State
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Recently Viewed State
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  // Phase 6 States
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlistItems, setWishlistItems] = useState([]);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const categoryData = useSelector((state) => state.storeData.category)
  const productData = useSelector((state) => state.storeData.products)
  const token = localStorage.getItem('token')
  const api_url = import.meta.env.VITE_API_URL
  const { addToCart, cart } = useCart()

  // Fetch product data on load
  useEffect(() => {
    dispatch(fetchCategory())
    dispatch(fetchProduct())
    if (user) setCustomerName(user.name)

    // Load recently viewed from local storage
    const saved = localStorage.getItem('recentlyViewed');
    if (saved) {
      setRecentlyViewed(JSON.parse(saved));
    }
  }, [dispatch, user])

  // Auto carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev === 2 ? 0 : prev + 1))
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const addToWishlist = async (productId) => {
    if (!user) {
        navigate('/login')
        return
    }
    try {
        await axios.post(`${api_url}/api/user/wishlist/add`, { productId }, {
            headers: { Authorization: `Bearer ${token}` }
        })
        // Show a custom toast if available, otherwise just log to avoid annoying alerts
        console.log("Added to Wishlist!")
    } catch (error) {
        console.log(error)
    }
  }

  const handleAddToCart = (item, e) => {
    const audio = new Audio('https://cdn.pixabay.com/download/audio/2021/08/04/audio_0625c1539c.mp3?filename=pop-39222.mp3');
    audio.volume = 0.5;
    audio.play().catch(e => console.log('Audio play failed:', e));

    if (e) {
      const rect = e.target.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { x, y },
        colors: ['#6366f1', '#ec4899', '#fde68a']
      });
    }

    addToCart(item);
    // Automatically open the cart drawer when adding an item
    setIsCartOpen(true);
  }

  const handleWishlistToggle = async (item, e) => {
    e.stopPropagation();
    
    // Optimistic UI update
    const isWished = wishlistItems.includes(item._id);
    if (isWished) {
      setWishlistItems(prev => prev.filter(id => id !== item._id));
    } else {
      setWishlistItems(prev => [...prev, item._id]);
    }

    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');
    try {
      const api_url = import.meta.env.VITE_API_URL;
      await axios.post(`${api_url}/api/user/wishlist/add`, { productId: item._id }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      console.log(err);
      // Revert if failed
      if (isWished) {
        setWishlistItems(prev => [...prev, item._id]);
      } else {
        setWishlistItems(prev => prev.filter(id => id !== item._id));
      }
    }
  };

  // Live Search & Category Filter
  const filteredProducts = productData.filter(item => {
    const matchesCategory = selectedCategory === "" || selectedCategory === "All" || item.category?._id === selectedCategory || item.category?.categoryName === selectedCategory;
    const matchesSearch = item.productName?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  const heroSlides = [
    { title: "Next-Gen Tech is Here.", subtitle: "Discover the latest gadgets and accessories with breathtaking performance.", badge: "NEW ARRIVALS" },
    { title: "Elevate Your Lifestyle.", subtitle: "Premium quality products designed to make your everyday life extraordinary.", badge: "PREMIUM COLLECTION" },
    { title: "Unbeatable Mega Deals.", subtitle: "Save up to 50% on select electronics and fashion items this week only.", badge: "LIMITED TIME OFFERS" }
  ]

  // Stagger variants for the product grid
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  const handleQuickView = (item) => {
    setQuickViewProduct(item);
    // Add to recently viewed
    const updated = [item, ...recentlyViewed.filter(p => p._id !== item._id)].slice(0, 4);
    setRecentlyViewed(updated);
    localStorage.setItem('recentlyViewed', JSON.stringify(updated));
  };

  return (
    <div className="shop-page">
      <NewsletterPopup />
      <FlashSaleBanner />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-brand">ShopNest</div>
        
        <div className="nav-search">
          <Search className="nav-search-icon" size={18} />
          <input 
            type="text" 
            placeholder="Search for products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="nav-actions">
          <button className="cart-icon-btn" onClick={() => navigate('/lookbook')} title="Lookbook" style={{ width: 'auto', padding: '0 16px', borderRadius: 'var(--radius-full)', fontWeight: 600 }}>
            Lookbook
          </button>
          
          <button className="cart-icon-btn" onClick={() => navigate('/wishlist')} title="Wishlist">
            <Heart size={20} />
          </button>
          
          <button className="cart-icon-btn" onClick={() => setIsCartOpen(true)} title="Cart">
            <ShoppingCart size={20} />
            {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
          </button>
          
          {user ? (
            <div className="user-info" onClick={() => navigate('/users')}>
              <div className="user-avatar">{user.name?.charAt(0).toUpperCase()}</div>
              <span className="user-name">{user.name}</span>
            </div>
          ) : (
            <button className="login-nav-btn" onClick={() => navigate('/login')}>Sign In</button>
          )}
        </div>
      </nav>

      {/* HERO CAROUSEL (with Parallax hint via motion) */}
      <motion.div 
        className="hero-wrapper"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentSlide}
            className="hero-card"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.5 }}
          >
            <div className="hero-content">
              <span className="hero-badge">{heroSlides[currentSlide].badge}</span>
              <h1>{heroSlides[currentSlide].title}</h1>
              <p>{heroSlides[currentSlide].subtitle}</p>
              <button className="hero-btn" onClick={() => window.scrollTo({top: 800, behavior: 'smooth'})}>Explore Collection</button>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
      
      <InfiniteMarquee text="🔥 UP TO 50% OFF TODAY • FREE INTERNATIONAL SHIPPING • 24/7 PREMIUM SUPPORT • NEW ARRIVALS EVERY FRIDAY 🔥" />

      {/* SHOP LAYOUT (SIDEBAR + GRID) */}
      <div className="shop-container">
        
        {/* SIDEBAR */}
        <aside className="shop-sidebar">
          <div className="filter-card glass-panel">
            <h3><Filter size={18} /> Categories</h3>
            
            <div className="cat-list">
              <button 
                className={`cat-item-btn ${selectedCategory === '' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('')}
              >
                All Products
              </button>
              
              {categoryData?.map((item) => (
                <button
                  key={item._id}
                  className={`cat-item-btn ${selectedCategory === item._id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(item._id)}
                >
                  {item.image && <img src={item.image} alt={item.categoryName} className="cat-item-img" />}
                  {item.categoryName}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* MAIN PRODUCT GRID */}
        <main className="shop-main">
          <div className="shop-header">
            <h2>{selectedCategory ? categoryData.find(c => c._id === selectedCategory)?.categoryName : 'All Products'}</h2>
            <span style={{color: 'var(--text-muted)'}}>{filteredProducts.length} items found</span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="glass-panel" style={{textAlign:'center', padding: '60px', borderRadius: 'var(--radius-xl)'}}>
              <p style={{color: 'var(--text-muted)'}}>No products match your search.</p>
            </div>
          ) : (
            <motion.div 
              className="product-grid"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {filteredProducts?.map((item) => (
                <motion.div variants={itemVariants} key={item._id}>
                  <Tilt 
                    tiltMaxAngleX={5} 
                    tiltMaxAngleY={5} 
                    scale={1.02} 
                    transitionSpeed={2000} 
                    className="prod-card-tilt-wrapper"
                  >
                    <div className="prod-card">
                      <div className="prod-img-wrap">
                        <img src={item.images?.[0]?.url} alt={item.productName} />
                        <div className="prod-overlay">
                          <button className="quick-add-btn" onClick={(e) => handleAddToCart(item, e)}>
                            <ShoppingCart size={16} /> Add to Cart
                          </button>
                          <button className="quick-view-btn" onClick={() => handleQuickView(item)}>
                            Quick View
                          </button>
                        </div>
                      </div>
                      
                      <div className="prod-info">
                        <span className="prod-category">{item.category?.categoryName}</span>
                        <h3>{item.productName}</h3>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '16px' }}>
                           <Star size={14} color="#fde047" fill="#fde047" />
                           <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 600 }}>4.8 (124 reviews)</span>
                        </div>

                        <div className="prod-footer">
                          <span className="prod-price">₹{item.price?.toLocaleString()}</span>
                          <div className="action-btns">
                            <button 
                              className="icon-btn wishlist" 
                              onClick={(e) => handleWishlistToggle(item, e)}
                              style={{ 
                                borderColor: wishlistItems.includes(item._id) ? '#ef4444' : '',
                                background: wishlistItems.includes(item._id) ? 'rgba(239, 68, 68, 0.1)' : '' 
                              }}
                            >
                              <Heart 
                                size={18} 
                                color={wishlistItems.includes(item._id) ? '#ef4444' : 'currentColor'} 
                                fill={wishlistItems.includes(item._id) ? '#ef4444' : 'none'}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Tilt>
                </motion.div>
              ))}
            </motion.div>
          )}
        </main>
      </div>

      {/* RECENTLY VIEWED SECTION */}
      {recentlyViewed.length > 0 && (
        <div style={{ maxWidth: '1600px', margin: '0 auto 80px', padding: '0 40px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '24px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '40px' }}>
            Recently Viewed
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
            {recentlyViewed.map(item => (
              <div key={item._id} className="glass-panel" style={{ borderRadius: 'var(--radius-lg)', padding: '16px', display: 'flex', gap: '16px', cursor: 'pointer' }} onClick={() => handleQuickView(item)}>
                <img src={item.images?.[0]?.url} alt={item.productName} style={{ width: '80px', height: '80px', objectFit: 'contain', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }} />
                <div>
                  <h4 style={{ fontSize: '14px', marginBottom: '4px' }}>{item.productName}</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '12px', marginBottom: '8px' }}>{item.category?.categoryName}</p>
                  <p style={{ fontWeight: 600 }}>₹{item.price?.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <Footer />

      {/* QUICK VIEW MODAL */}
      <AnimatePresence>
        {quickViewProduct && (
          <div className="modal-backdrop" onClick={() => setQuickViewProduct(null)}>
            <motion.div 
              className="modal-content"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-modal" onClick={() => setQuickViewProduct(null)}>
                <X size={20} />
              </button>
              
              <div className="modal-grid">
                <div className="modal-img">
                  <img src={quickViewProduct.images?.[0]?.url} alt={quickViewProduct.productName} />
                </div>
                
                <div className="modal-info">
                  <span className="modal-cat">{quickViewProduct.category?.categoryName}</span>
                  <h2>{quickViewProduct.productName}</h2>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                     <Star size={16} color="#fde047" fill="#fde047" />
                     <span style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 600 }}>4.8 out of 5 stars (124 reviews)</span>
                  </div>

                  <div className="modal-price">₹{quickViewProduct.price?.toLocaleString()}</div>
                  <p className="modal-desc">{quickViewProduct.description || "Premium quality product crafted with excellence. Experience the best."}</p>
                  
                  <div className="modal-actions">
                    <button className="modal-add-btn" onClick={(e) => {
                      handleAddToCart(quickViewProduct, e)
                      setQuickViewProduct(null)
                    }}>
                      <ShoppingCart size={18} /> Add to Cart
                    </button>
                    <button className="modal-wish-btn" onClick={() => addToWishlist(quickViewProduct._id)}>
                      <Heart size={18} /> Wishlist
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  )
}

export default Product
