
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { type Question, type Choice } from '@/lib/coachingData';

interface QuestionStepProps {
  question: Question;
  onSelect: (choiceId: string) => void;
  currentStep: number;
  totalSteps: number;
}

const QuestionStep: React.FC<QuestionStepProps> = ({
  question,
  onSelect,
  currentStep,
  totalSteps
}) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [hoveredChoice, setHoveredChoice] = useState<string | null>(null);

  const handleSelect = (choiceId: string) => {
    setSelected(choiceId);
    setTimeout(() => {
      onSelect(choiceId);
    }, 400); // Delay to allow animation to complete
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      }
    }
  };

  const choiceVariants = {
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

  const stepIndicatorWidth = `${(currentStep / totalSteps) * 100}%`;

  return (
    <motion.div
      className="flex flex-col w-full max-w-3xl mx-auto h-full justify-center px-6 py-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">
          Step {currentStep} of {totalSteps}
        </div>
      </div>
      
      <div className="w-full h-1 bg-secondary mb-8 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: stepIndicatorWidth }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <motion.h2
        className="text-3xl font-medium mb-8 text-center max-w-xl mx-auto"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {question.question}
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-4 mb-auto">
        {question.choices.map((choice) => (
          <motion.div
            key={choice.id}
            variants={choiceVariants}
            className={`option-card ${selected === choice.id ? 'selected' : ''}`}
            onClick={() => handleSelect(choice.id)}
            onMouseEnter={() => setHoveredChoice(choice.id)}
            onMouseLeave={() => setHoveredChoice(null)}
          >
            <motion.div 
              className="w-full h-full flex flex-col items-center text-center p-4"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-2 h-12 flex items-center justify-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                  selected === choice.id 
                    ? 'bg-primary text-white' 
                    : hoveredChoice === choice.id 
                    ? 'bg-primary/10 text-primary' 
                    : 'bg-secondary text-muted-foreground'
                }`}>
                  {selected === choice.id ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  ) : null}
                </div>
              </div>
              
              <h3 className="font-medium text-lg mb-2">{choice.label}</h3>
              {choice.description && (
                <p className="text-sm text-muted-foreground">{choice.description}</p>
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default QuestionStep;
