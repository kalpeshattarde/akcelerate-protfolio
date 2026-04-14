import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ReactionsOverlay = ({ reactions = [], onReactionComplete }) => {
  const [activeReactions, setActiveReactions] = useState([]);

  // Add new reactions to the active list
  useEffect(() => {
    if (reactions?.length > 0) {
      const newReactions = reactions?.map((reaction, index) => ({
        ...reaction,
        id: `${Date.now()}-${index}`,
        timestamp: Date.now()
      }));
      
      setActiveReactions(prev => [...prev, ...newReactions]);
    }
  }, [reactions]);

  // Remove expired reactions
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setActiveReactions(prev => 
        prev?.filter(reaction => now - reaction?.timestamp < 4000)
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Get random position to prevent overlapping
  const getRandomPosition = (index) => {
    const positions = [
      { x: 20, y: 20 },
      { x: 60, y: 15 },
      { x: 15, y: 60 },
      { x: 70, y: 70 },
      { x: 40, y: 30 },
      { x: 25, y: 45 },
      { x: 65, y: 35 },
      { x: 35, y: 65 }
    ];
    
    return positions?.[index % positions?.length];
  };

  // Animation variants for reactions
  const reactionVariants = {
    initial: { 
      scale: 0,
      opacity: 0,
      y: 20
    },
    animate: { 
      scale: [0, 1.2, 1],
      opacity: [0, 1, 1, 0.8, 0],
      y: [20, -10, -20],
      transition: {
        duration: 4,
        times: [0, 0.1, 0.2, 0.8, 1],
        ease: "easeOut"
      }
    },
    exit: { 
      scale: 0,
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const handleAnimationComplete = (reactionId) => {
    setActiveReactions(prev => 
      prev?.filter(reaction => reaction?.id !== reactionId)
    );
    onReactionComplete?.(reactionId);
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-30">
      <AnimatePresence>
        {activeReactions?.map((reaction, index) => {
          const position = getRandomPosition(index);
          
          return (
            <motion.div
              key={reaction?.id}
              className="absolute"
              style={{
                left: `${position?.x}%`,
                top: `${position?.y}%`,
              }}
              variants={reactionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              onAnimationComplete={() => handleAnimationComplete(reaction?.id)}
            >
              <div className="flex flex-col items-center space-y-1">
                {/* Emoji */}
                <div className="text-4xl md:text-5xl lg:text-6xl drop-shadow-lg">
                  {reaction?.emoji}
                </div>
                
                {/* Participant name (optional) */}
                {reaction?.participantName && (
                  <div className="bg-black/70 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm max-w-[100px] truncate">
                    {reaction?.participantName}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default ReactionsOverlay;