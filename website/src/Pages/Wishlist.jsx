import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../Context/CartContext'
import axios from 'axios'
import { Heart, ShoppingBag, X, ArrowLeft } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import './Wishlist.css'

const Wishlist = () => {
    const navigate = useNavigate()
    const [wishlist, setWishlist] = useState([])
    const [loading, setLoading] = useState(true)
    const { addToCart } = useCart()
    const api_url = import.meta.env.VITE_API_URL
    const token = localStorage.getItem('token')

    const fetchWishlist = async () => {
        try {
            const res = await axios.get(`${api_url}/api/user/wishlist`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setWishlist(res.data.wishlist || [])
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const removeFromWishlist = async (productId) => {
        try {
            await axios.post(`${api_url}/api/user/wishlist/remove`, { productId }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setWishlist(wishlist.filter(item => item._id !== productId))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (!token) {
            navigate('/login')
            return
        }
        fetchWishlist()
    }, [navigate, token])

    if (loading) return (
        <div className="wishlist-page">
            <div className="wishlist-loading">
                <div className="spinner"></div>
                <p>Loading your desires...</p>
            </div>
        </div>
    )

    return (
        <div className="wishlist-page">
            <div className="wishlist-container">
                <div className="wishlist-header">
                    <button className="back-btn" onClick={() => navigate('/')}>
                        <ArrowLeft size={20} /> Back to Shop
                    </button>
                    <h2><Heart className="header-icon" /> My Wishlist</h2>
                </div>

                {wishlist.length === 0 ? (
                    <motion.div 
                        className="empty-wishlist glass-panel"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Heart size={48} color="var(--text-muted)" />
                        <p>Your wishlist is currently empty.</p>
                        <button className="shop-btn" onClick={() => navigate('/')}>
                            Start Exploring
                        </button>
                    </motion.div>
                ) : (
                    <div className="wishlist-grid">
                        <AnimatePresence>
                            {wishlist.map((item, index) => (
                                <motion.div 
                                    className="wishlist-card glass-panel" 
                                    key={item._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <div className="wishlist-img-wrap">
                                        <img src={item.images?.[0]?.url} alt={item.productName} />
                                        <button className="remove-wishlist-btn" onClick={() => removeFromWishlist(item._id)}>
                                            <X size={16} />
                                        </button>
                                    </div>
                                    <div className="wishlist-info">
                                        <span className="wishlist-cat">{item.category?.categoryName || "Premium"}</span>
                                        <h3>{item.productName}</h3>
                                        <p className="wishlist-price">₹{item.price?.toLocaleString()}</p>
                                        <button className="add-to-cart-btn" onClick={() => {
                                            addToCart(item);
                                            removeFromWishlist(item._id);
                                        }}>
                                            <ShoppingBag size={16} /> Move to Cart
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Wishlist
