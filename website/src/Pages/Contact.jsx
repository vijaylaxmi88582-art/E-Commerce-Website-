import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin } from 'lucide-react';
import Footer from '../Components/Footer';
import '../App.css';

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully! We will get back to you soon.");
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="page-wrapper" style={{ paddingTop: '100px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="content-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px', flexGrow: 1, width: '100%' }}>
        <button 
          onClick={() => navigate('/')} 
          style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '40px' }}
        >
          <ArrowLeft size={16} /> Back to Home
        </button>
        
        <h1 style={{ fontSize: '64px', fontWeight: 800, letterSpacing: '-2px', marginBottom: '16px' }}>Get in Touch.</h1>
        <p style={{ fontSize: '20px', color: 'var(--text-secondary)', marginBottom: '60px' }}>We'd love to hear from you. Reach out with any questions.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', marginBottom: '80px' }}>
          
          <form className="glass-panel" style={{ padding: '40px', borderRadius: 'var(--radius-xl)' }} onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Full Name</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                style={{ width: '100%', padding: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--radius-md)', color: 'white', outline: 'none' }} 
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Email Address</label>
              <input 
                type="email" 
                required
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                style={{ width: '100%', padding: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--radius-md)', color: 'white', outline: 'none' }} 
              />
            </div>
            <div style={{ marginBottom: '30px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Message</label>
              <textarea 
                rows="5"
                required
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
                style={{ width: '100%', padding: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--radius-md)', color: 'white', outline: 'none', resize: 'none' }} 
              ></textarea>
            </div>
            <button type="submit" style={{ width: '100%', padding: '16px', background: 'white', color: 'black', border: 'none', borderRadius: 'var(--radius-full)', fontWeight: 700, fontSize: '16px', cursor: 'pointer' }}>
              Send Message
            </button>
          </form>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Mail /></div>
                <h3 style={{ fontSize: '20px' }}>Email Us</h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', marginLeft: '64px' }}>support@shopnest.com</p>
            </div>
            
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Phone /></div>
                <h3 style={{ fontSize: '20px' }}>Call Us</h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', marginLeft: '64px' }}>+1 (555) 123-4567</p>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><MapPin /></div>
                <h3 style={{ fontSize: '20px' }}>Visit Us</h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', marginLeft: '64px' }}>123 Premium Way<br/>San Francisco, CA 94103</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
