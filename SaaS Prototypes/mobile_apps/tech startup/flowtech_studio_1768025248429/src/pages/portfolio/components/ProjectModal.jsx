import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProjectModal = ({ project, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: "spring", bounce: 0.1, duration: 0.5 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 bg-background rounded-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center space-x-4">
                <Image
                  src={project?.client?.logo}
                  alt={project?.client?.logoAlt}
                  className="w-12 h-12 rounded-lg object-contain"
                />
                <div>
                  <h2 className="text-2xl font-semibold text-text-primary">{project?.title}</h2>
                  <p className="text-text-secondary">{project?.client?.name} • {project?.category}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="rounded-full"
              >
                <Icon name="X" size={24} />
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6 space-y-8">
                {/* Hero Image */}
                <div className="relative h-80 rounded-xl overflow-hidden">
                  <Image
                    src={project?.image}
                    alt={project?.imageAlt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center space-x-4 text-white">
                      <div className="flex items-center space-x-1">
                        <Icon name="Calendar" size={16} />
                        <span className="text-sm">{project?.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Users" size={16} />
                        <span className="text-sm">{project?.teamSize} team members</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Star" size={16} fill="currentColor" />
                        <span className="text-sm">{project?.rating}/5.0</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project Overview */}
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-text-primary mb-3">Project Overview</h3>
                      <p className="text-text-secondary leading-relaxed">{project?.fullDescription}</p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-text-primary mb-3">Challenge</h3>
                      <p className="text-text-secondary leading-relaxed">{project?.challenge}</p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-text-primary mb-3">Solution</h3>
                      <p className="text-text-secondary leading-relaxed">{project?.solution}</p>
                    </div>

                    {/* Technology Stack */}
                    <div>
                      <h3 className="text-xl font-semibold text-text-primary mb-4">Technology Stack</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {project?.techStack?.map((tech, idx) => (
                          <div
                            key={idx}
                            className="flex items-center space-x-3 p-3 bg-muted rounded-lg"
                          >
                            <Icon name={tech === 'React' ? 'Atom' : tech === 'Node.js' ? 'Server' : 'Code'} size={20} className="text-primary" />
                            <span className="text-sm font-medium text-text-primary">{tech}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-6">
                    {/* Key Metrics */}
                    <div className="bg-muted rounded-xl p-6">
                      <h4 className="text-lg font-semibold text-text-primary mb-4">Key Results</h4>
                      <div className="space-y-4">
                        {project?.metrics?.map((metric, idx) => (
                          <div key={idx} className="flex items-center justify-between">
                            <span className="text-text-secondary text-sm">{metric?.label}</span>
                            <span className="text-primary font-semibold">{metric?.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Client Testimonial */}
                    <div className="bg-primary/5 rounded-xl p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <Image
                          src={project?.testimonial?.avatar}
                          alt={project?.testimonial?.avatarAlt}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium text-text-primary">{project?.testimonial?.name}</p>
                          <p className="text-sm text-text-secondary">{project?.testimonial?.role}</p>
                        </div>
                      </div>
                      <blockquote className="text-text-secondary italic">
                        "{project?.testimonial?.quote}"
                      </blockquote>
                    </div>

                    {/* Project Tags */}
                    <div>
                      <h4 className="text-lg font-semibold text-text-primary mb-3">Project Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {project?.tags?.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button variant="outline" onClick={onClose}>
                    <Icon name="ArrowLeft" size={16} className="mr-2" />
                    Back to Portfolio
                  </Button>
                  {project?.liveUrl && (
                    <Button variant="default">
                      <Icon name="ExternalLink" size={16} className="mr-2" />
                      View Live Project
                    </Button>
                  )}
                </div>
                <div className="flex items-center space-x-2 text-text-secondary text-sm">
                  <Icon name="Clock" size={16} />
                  <span>Completed {project?.completedDate}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;