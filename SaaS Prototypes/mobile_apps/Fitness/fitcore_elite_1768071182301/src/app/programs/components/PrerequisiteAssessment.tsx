'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface AssessmentQuestion {
  id: string;
  question: string;
  type: 'multiple' | 'scale' | 'boolean';
  options?: string[];
  category: 'fitness' | 'experience' | 'goals' | 'availability';
}

interface PrerequisiteAssessmentProps {
  questions: AssessmentQuestion[];
}

const PrerequisiteAssessment = ({ questions }: PrerequisiteAssessmentProps) => {
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const nextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const calculateRecommendation = () => {
    const fitnessLevel = answers['fitness-level'] || 1;
    const experience = answers['experience'] || 1;
    const goals = answers['goals'] || [];
    
    if (fitnessLevel >= 4 && experience >= 3) {
      return {
        program: 'Strength Elite',
        level: 'Advanced',
        color: 'text-red-400',
        description: 'You\'re ready for our most intensive strength-focused program with advanced techniques and heavy compound movements.'
      };
    } else if (goals.includes('endurance') || goals.includes('cardio')) {
      return {
        program: 'Cardio Warrior',
        level: 'Intermediate',
        color: 'text-blue-400',
        description: 'Perfect for building cardiovascular endurance and metabolic conditioning with high-intensity training protocols.'
      };
    } else {
      return {
        program: 'Hybrid Athlete',
        level: 'Beginner-Intermediate',
        color: 'text-primary',
        description: 'Ideal starting point combining strength and cardio elements for well-rounded fitness development.'
      };
    }
  };

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  if (showResults) {
    const recommendation = calculateRecommendation();
    
    return (
      <div className="bg-card border border-border rounded-xl p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="CheckCircleIcon" size={32} className="text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-2">Assessment Complete!</h3>
          <p className="text-muted-foreground">Based on your responses, here's our recommendation:</p>
        </div>

        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6 border border-primary/20 mb-6">
          <div className="text-center">
            <h4 className={`text-xl font-bold ${recommendation.color} mb-2`}>
              {recommendation.program}
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              Recommended Level: {recommendation.level}
            </p>
            <p className="text-foreground leading-relaxed">
              {recommendation.description}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => {
              setShowResults(false);
              setCurrentStep(0);
              setAnswers({});
            }}
            className="flex-1 py-3 px-6 bg-muted text-foreground rounded-lg font-semibold hover:bg-muted/80 transition-colors duration-300"
          >
            Retake Assessment
          </button>
          <button className="flex-1 py-3 px-6 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-300">
            Start {recommendation.program}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-xl p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-foreground">Fitness Assessment</h3>
          <span className="text-sm text-muted-foreground font-mono">
            {currentStep + 1} / {questions.length}
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-8">
        <h4 className="text-lg font-semibold text-foreground mb-6">
          {currentQuestion.question}
        </h4>

        {currentQuestion.type === 'multiple' && (
          <div className="space-y-3">
            {currentQuestion.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(currentQuestion.id, option)}
                className={`w-full p-4 text-left rounded-lg border transition-all duration-300 ${
                  answers[currentQuestion.id] === option
                    ? 'border-primary bg-primary/10 text-primary' :'border-border bg-muted/20 text-foreground hover:border-primary/50'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {currentQuestion.type === 'scale' && (
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Beginner</span>
              <span>Expert</span>
            </div>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  onClick={() => handleAnswer(currentQuestion.id, value)}
                  className={`flex-1 h-12 rounded-lg border font-semibold transition-all duration-300 ${
                    answers[currentQuestion.id] === value
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-muted/20 text-foreground hover:border-primary/50'
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        )}

        {currentQuestion.type === 'boolean' && (
          <div className="grid grid-cols-2 gap-4">
            {['Yes', 'No'].map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(currentQuestion.id, option === 'Yes')}
                className={`p-4 rounded-lg border font-semibold transition-all duration-300 ${
                  answers[currentQuestion.id] === (option === 'Yes')
                    ? 'border-primary bg-primary/10 text-primary' :'border-border bg-muted/20 text-foreground hover:border-primary/50'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className="flex items-center space-x-2 px-6 py-3 bg-muted text-foreground rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted/80 transition-colors duration-300"
        >
          <Icon name="ChevronLeftIcon" size={16} />
          <span>Previous</span>
        </button>

        <button
          onClick={nextStep}
          disabled={!answers[currentQuestion.id]}
          className="flex items-center space-x-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors duration-300"
        >
          <span>{currentStep === questions.length - 1 ? 'Complete' : 'Next'}</span>
          <Icon name="ChevronRightIcon" size={16} />
        </button>
      </div>
    </div>
  );
};

export default PrerequisiteAssessment;