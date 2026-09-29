import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import './CartDrawer.css';

const CartDrawer = ({ isOpen, onClose }) => {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const totalAmount = cart.reduce((total, item) => total + (item.price || 0), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            className="cart-drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div 
            className="cart-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="cart-drawer-header">
              <h2><ShoppingBag size={20} /> Your Cart</h2>
              <button className="cart-close-btn" onClick={onClose}>
                <X size={20} />
              </button>
            </div>

            <div className="cart-drawer-body">
              {cart.length === 0 ? (
                <div className="cart-empty">
                  <ShoppingBag size={48} />
                  <p>Your cart is empty.</p>
                  <button className="cart-shop-btn" onClick={onClose}>Continue Shopping</button>
                </div>
              ) : (
                <div className="cart-items">
                  {cart.map((item, index) => (
                    <motion.div 
                      key={index} 
                      className="cart-item"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <img src={item.images?.[0]?.url} alt={item.productName} />
                      <div className="cart-item-info">
                        <h4>{item.productName}</h4>
                        <span className="cart-item-price">₹{item.price?.toLocaleString()}</span>
                      </div>
                      <button className="cart-item-remove" onClick={() => removeFromCart(item._id)}>
                        <Trash2 size={16} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="cart-drawer-footer">
                <div className="cart-summary-row">
                  <span className="summary-label">Subtotal</span>
                  <span>₹{totalAmount.toLocaleString()}</span>
                </div>
                <div className="cart-summary-row">
                  <span className="summary-label">Shipping & Taxes</span>
                  <span className="summary-calculated">Calculated at checkout</span>
                </div>
                
                <div className="cart-total-row">
                  <span>Total</span>
                  <span className="total-price">₹{totalAmount.toLocaleString()}</span>
                </div>

                <button 
                  className="cart-checkout-btn premium-btn" 
                  onClick={() => {
                    onClose();
                    navigate('/checkout');
                  }}
                >
                  Proceed to Secure Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
