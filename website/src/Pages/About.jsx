import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Target, Shield, Zap } from 'lucide-react';
import Footer from '../Components/Footer';
import '../App.css';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="page-wrapper" style={{ paddingTop: '100px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="content-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px', flexGrow: 1 }}>
        <button 
          onClick={() => navigate('/')} 
          style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '40px' }}
        >
          <ArrowLeft size={16} /> Back to Home
        </button>
        
        <h1 style={{ fontSize: '64px', fontWeight: 800, letterSpacing: '-2px', marginBottom: '24px' }}>Redefining Premium.</h1>
        <p style={{ fontSize: '20px', color: 'var(--text-secondary)', maxWidth: '600px', lineHeight: 1.6, marginBottom: '60px' }}>
          At ShopNest, we believe that everyday technology should be as beautiful as it is functional. We meticulously curate products that elevate your lifestyle.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginBottom: '80px' }}>
          <div className="glass-panel" style={{ padding: '40px', borderRadius: 'var(--radius-xl)' }}>
            <Target size={32} color="white" style={{ marginBottom: '20px' }} />
            <h3 style={{ fontSize: '24px', marginBottom: '12px' }}>Our Mission</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>To provide a seamless, premium shopping experience where quality meets modern design.</p>
          </div>
          
          <div className="glass-panel" style={{ padding: '40px', borderRadius: 'var(--radius-xl)' }}>
            <Shield size={32} color="white" style={{ marginBottom: '20px' }} />
            <h3 style={{ fontSize: '24px', marginBottom: '12px' }}>Quality Guaranteed</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>Every product in our store goes through a rigorous quality check to ensure absolute perfection.</p>
          </div>

          <div className="glass-panel" style={{ padding: '40px', borderRadius: 'var(--radius-xl)' }}>
            <Zap size={32} color="white" style={{ marginBottom: '20px' }} />
            <h3 style={{ fontSize: '24px', marginBottom: '12px' }}>Fast Delivery</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>We partner with the best logistics networks globally to bring your items to you at lightning speed.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
