import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../Components/Footer';
import '../App.css';

const faqs = [
  {
    question: "How long does shipping take?",
    answer: "We offer expedited international shipping. Most orders arrive within 3-5 business days. You will receive a tracking number as soon as your order ships."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we ship to over 150 countries worldwide. Shipping costs are calculated at checkout based on your location."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day money-back guarantee. If you are not completely satisfied with your purchase, you can return it for a full refund."
  },
  {
    question: "Are your products under warranty?",
    answer: "Absolutely. All electronics come with a standard 1-year manufacturer warranty covering any hardware defects."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order is processed, you'll receive an email with a tracking link. You can also view your order status in the 'Orders' section of your account."
  }
];

const FAQ = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="page-wrapper" style={{ paddingTop: '100px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="content-container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 40px', flexGrow: 1, width: '100%' }}>
        <button 
          onClick={() => navigate('/')} 
          style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '40px' }}
        >
          <ArrowLeft size={16} /> Back to Home
        </button>
        
        <h1 style={{ fontSize: '56px', fontWeight: 800, letterSpacing: '-2px', marginBottom: '16px', textAlign: 'center' }}>Frequently Asked.</h1>
        <p style={{ fontSize: '18px', color: 'var(--text-secondary)', marginBottom: '60px', textAlign: 'center' }}>Everything you need to know about the product and billing.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '80px' }}>
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="glass-panel" 
              style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px', background: 'transparent', border: 'none', color: 'white', fontSize: '18px', fontWeight: 600, cursor: 'pointer', textAlign: 'left' }}
              >
                {faq.question}
                <motion.div animate={{ rotate: openIndex === index ? 180 : 0 }}>
                  <ChevronDown size={20} color="var(--text-muted)" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ padding: '0 24px 24px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FAQ;
