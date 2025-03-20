
import React from 'react';
import { motion } from 'framer-motion';
import { type Recommendation } from '@/lib/coachingData';

interface RecommendationStepProps {
  recommendation: Recommendation;
  onRestart: () => void;
}

const RecommendationStep: React.FC<RecommendationStepProps> = ({
  recommendation,
  onRestart
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      }
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto px-6 py-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        className="text-sm text-primary font-medium tracking-wide uppercase mb-2"
        variants={itemVariants}
      >
        Perfect Match
      </motion.div>
      
      <motion.h2
        className="text-3xl md:text-4xl font-medium mb-6 text-center"
        variants={itemVariants}
      >
        {recommendation.title}
      </motion.h2>
      
      <motion.p
        className="text-lg text-center text-muted-foreground mb-8 max-w-2xl"
        variants={itemVariants}
      >
        {recommendation.description}
      </motion.p>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-8"
        variants={itemVariants}
      >
        <div className="bg-card rounded-2xl p-6 border shadow-sm">
          <h3 className="text-lg font-medium mb-4">Details</h3>
          
          <div className="space-y-4">
            {recommendation.price && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path>
                    <path d="M12 18V6"></path>
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium">Investment</div>
                  <div className="text-sm text-muted-foreground">{recommendation.price}</div>
                </div>
              </div>
            )}
            
            {recommendation.duration && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium">Duration</div>
                  <div className="text-sm text-muted-foreground">{recommendation.duration}</div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-card rounded-2xl p-6 border shadow-sm">
          <h3 className="text-lg font-medium mb-4">Features</h3>
          
          <ul className="space-y-3">
            {recommendation.features?.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
      
      <motion.div 
        className="flex flex-col sm:flex-row gap-4 mt-4"
        variants={itemVariants}
      >
        <motion.a
          href={recommendation.ctaLink}
          className="inline-flex items-center justify-center bg-primary text-primary-foreground h-11 px-8 py-2 rounded-md font-medium transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {recommendation.ctaText}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </motion.a>
        
        <motion.button
          onClick={onRestart}
          className="inline-flex items-center justify-center bg-secondary text-secondary-foreground h-11 px-8 py-2 rounded-md font-medium transition-colors hover:bg-secondary/80"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Start Over
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default RecommendationStep;
