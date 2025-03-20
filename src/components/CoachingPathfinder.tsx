import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QuestionStep from './QuestionStep';
import RecommendationStep from './RecommendationStep';
import { getQuestionById, getRecommendationById } from '@/lib/coachingData';

const CoachingPathfinder: React.FC = () => {
  const [currentQuestionId, setCurrentQuestionId] = useState('coaching-type');
  const [isResult, setIsResult] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(1);
  
  const currentQuestion = getQuestionById(currentQuestionId);
  const recommendation = isResult ? getRecommendationById(currentQuestionId) : undefined;

  const handleSelect = (choiceId: string) => {
    if (!currentQuestion) return;
    
    const nextQuestionId = currentQuestion.nextQuestionMap[choiceId];
    
    // Update history
    setHistory(prev => [...prev, currentQuestionId]);
    
    if (nextQuestionId && nextQuestionId.startsWith('result-')) {
      setIsResult(true);
      setCurrentQuestionId(nextQuestionId);
    } else if (nextQuestionId) {
      setIsResult(false);
      setCurrentQuestionId(nextQuestionId);
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const restart = () => {
    setCurrentQuestionId('coaching-type');
    setIsResult(false);
    setHistory([]);
    setCurrentStepIndex(1);
  };

  // Calculate total steps based on typical path lengths
  const estimateTotalSteps = () => {
    // Based on our data structure, most paths are 3-4 steps
    return 4;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-5xl">
        <motion.header 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <motion.div 
            className="inline-block text-sm bg-primary/10 text-primary px-3 py-1 rounded-full mb-4"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
          >
            Find Your Path
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-semibold mb-3">Ramindu Randeni Coaching Pathfinder</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Answer a few questions to discover the perfect coaching program tailored to your specific needs and goals.
          </p>
        </motion.header>

        <div className="relative w-full overflow-hidden rounded-2xl bg-card border shadow-lg min-h-[500px]">
          <AnimatePresence mode="wait">
            {currentQuestion && !isResult && (
              <QuestionStep
                key={currentQuestionId}
                question={currentQuestion}
                onSelect={handleSelect}
                currentStep={currentStepIndex}
                totalSteps={estimateTotalSteps()}
              />
            )}
            
            {isResult && recommendation && (
              <RecommendationStep
                key="recommendation"
                recommendation={recommendation}
                onRestart={restart}
              />
            )}
          </AnimatePresence>
        </div>
        
        <motion.footer 
          className="text-center mt-8 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <p>Powered by Ramindu Randeni Coaching</p>
        </motion.footer>
      </div>
    </div>
  );
};

export default CoachingPathfinder;
