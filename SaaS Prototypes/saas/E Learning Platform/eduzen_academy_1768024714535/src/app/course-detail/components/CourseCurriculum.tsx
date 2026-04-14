'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Lesson {
  id: number;
  title: string;
  duration: string;
  type: 'video' | 'reading' | 'quiz';
  isPreview: boolean;
}

interface Module {
  id: number;
  title: string;
  lessonCount: number;
  duration: string;
  lessons: Lesson[];
}

interface CourseCurriculumProps {
  modules: Module[];
}

const CourseCurriculum = ({ modules }: CourseCurriculumProps) => {
  const [expandedModules, setExpandedModules] = useState<number[]>([1]);

  const toggleModule = (moduleId: number) => {
    setExpandedModules(prev =>
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video':
        return 'PlayCircleIcon';
      case 'reading':
        return 'DocumentTextIcon';
      case 'quiz':
        return 'ClipboardDocumentCheckIcon';
      default:
        return 'DocumentIcon';
    }
  };

  return (
    <section className="py-16 bg-background">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-headline font-semibold text-foreground mb-4">
            Course Curriculum
          </h2>
          <p className="text-muted-foreground font-body">
            {modules.length} modules • {modules.reduce((acc, m) => acc + m.lessonCount, 0)} lessons • {modules.reduce((acc, m) => {
              const hours = parseInt(m.duration);
              return acc + hours;
            }, 0)} hours total
          </p>
        </div>

        <div className="space-y-4">
          {modules.map((module) => (
            <div key={module.id} className="bg-card border border-border rounded-xl overflow-hidden">
              <button
                onClick={() => toggleModule(module.id)}
                className="w-full px-6 py-5 flex items-center justify-between hover:bg-muted/50 transition-colors duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-primary font-semibold">{module.id}</span>
                  </div>
                  <div className="text-left">
                    <h3 className="font-headline font-medium text-foreground">{module.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {module.lessonCount} lessons • {module.duration}
                    </p>
                  </div>
                </div>
                <Icon
                  name="ChevronDownIcon"
                  size={24}
                  className={`text-muted-foreground transition-transform duration-300 ${
                    expandedModules.includes(module.id) ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {expandedModules.includes(module.id) && (
                <div className="border-t border-border bg-muted/20">
                  {module.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="px-6 py-4 flex items-center justify-between hover:bg-background/50 transition-colors duration-200"
                    >
                      <div className="flex items-center space-x-4">
                        <Icon
                          name={getLessonIcon(lesson.type) as any}
                          size={20}
                          className="text-primary"
                        />
                        <span className="text-sm font-body text-foreground">{lesson.title}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                        {lesson.isPreview && (
                          <span className="px-3 py-1 bg-accent/20 text-accent text-xs font-medium rounded-full">
                            Preview
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseCurriculum;