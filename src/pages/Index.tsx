
import React from 'react';
import CoachingPathfinder from '@/components/CoachingPathfinder';
import { motion } from 'framer-motion';

const Index = () => {
  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-b from-background to-background/95"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <CoachingPathfinder />
    </motion.div>
  );
};

export default Index;
