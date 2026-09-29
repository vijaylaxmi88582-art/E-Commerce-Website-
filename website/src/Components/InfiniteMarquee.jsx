import React from 'react';
import { motion } from 'framer-motion';
import './InfiniteMarquee.css';

const InfiniteMarquee = ({ text }) => {
  return (
    <div className="marquee-container">
      <div className="marquee-content">
        <motion.div
          className="marquee-track"
          animate={{ x: [0, -1035] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
        >
          <h1>{text}</h1>
          <h1>{text}</h1>
          <h1>{text}</h1>
          <h1>{text}</h1>
        </motion.div>
      </div>
    </div>
  );
};

export default InfiniteMarquee;
