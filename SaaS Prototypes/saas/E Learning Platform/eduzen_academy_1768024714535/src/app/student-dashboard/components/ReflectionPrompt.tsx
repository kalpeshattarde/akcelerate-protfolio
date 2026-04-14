import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface ReflectionPromptProps {
  prompt: string;
  onSaveReflection: (text: string) => void;
}

const ReflectionPrompt = ({ prompt, onSaveReflection }: ReflectionPromptProps) => {
  const [reflection, setReflection] = React.useState('');
  const [isSaved, setIsSaved] = React.useState(false);

  const handleSave = () => {
    if (reflection.trim()) {
      onSaveReflection(reflection);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }
  };

  return (
    <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-6 border border-primary/20">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Icon name="LightBulbIcon" variant="solid" size={20} className="text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-headline font-semibold text-foreground mb-2">
            Today&apos;s Reflection
          </h3>
          <p className="text-sm text-muted-foreground font-body italic">
            &quot;{prompt}&quot;
          </p>
        </div>
      </div>
      
      <textarea
        value={reflection}
        onChange={(e) => setReflection(e.target.value)}
        placeholder="Take a moment to reflect on your learning journey..."
        className="w-full h-32 px-4 py-3 bg-card border border-border rounded-xl text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
      />
      
      <div className="flex items-center justify-between mt-4">
        <p className="text-xs text-muted-foreground font-body">
          Your reflections are private and help track your growth
        </p>
        <button
          onClick={handleSave}
          disabled={!reflection.trim() || isSaved}
          className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-body font-medium text-sm hover:shadow-cta transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none flex items-center gap-2"
        >
          {isSaved ? (
            <>
              <Icon name="CheckIcon" size={16} variant="solid" />
              Saved
            </>
          ) : (
            'Save Reflection'
          )}
        </button>
      </div>
    </div>
  );
};

export default ReflectionPrompt;