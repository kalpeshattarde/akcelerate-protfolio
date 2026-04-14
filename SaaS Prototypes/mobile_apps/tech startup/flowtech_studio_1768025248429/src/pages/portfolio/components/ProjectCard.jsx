import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProjectCard = ({ project, index, onViewDetails }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1]
      }}
      className="group relative bg-card rounded-2xl overflow-hidden card-elevated hover:shadow-strong transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Project Image */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={project?.image}
          alt={project?.imageAlt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-primary/90 backdrop-blur-sm text-white text-xs font-medium rounded-full">
            {project?.category}
          </span>
        </div>

        {/* Tech Stack Icons */}
        <div className="absolute top-4 right-4 flex space-x-2">
          {project?.techStack?.slice(0, 3)?.map((tech, idx) => (
            <div
              key={idx}
              className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center"
              title={tech}
            >
              <Icon name={tech === 'React' ? 'Atom' : tech === 'Node.js' ? 'Server' : 'Code'} size={16} className="text-primary" />
            </div>
          ))}
        </div>

        {/* View Details Button - Appears on Hover */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-4 left-4 right-4"
        >
          <Button
            variant="default"
            fullWidth
            onClick={() => onViewDetails(project)}
            className="bg-white/90 backdrop-blur-sm text-primary hover:bg-white"
          >
            <Icon name="Eye" size={16} className="mr-2" />
            View Case Study
          </Button>
        </motion.div>
      </div>
      {/* Project Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-text-primary group-hover:text-primary transition-colors duration-300">
            {project?.title}
          </h3>
          <div className="flex items-center space-x-1 text-accent">
            <Icon name="Star" size={16} fill="currentColor" />
            <span className="text-sm font-medium">{project?.rating}</span>
          </div>
        </div>

        <p className="text-text-secondary text-sm mb-4 line-clamp-2">
          {project?.description}
        </p>

        {/* Client Info */}
        <div className="flex items-center space-x-3 mb-4">
          <Image
            src={project?.client?.logo}
            alt={project?.client?.logoAlt}
            className="w-8 h-8 rounded-lg object-contain"
          />
          <div>
            <p className="text-sm font-medium text-text-primary">{project?.client?.name}</p>
            <p className="text-xs text-text-secondary">{project?.client?.industry}</p>
          </div>
        </div>

        {/* Project Metrics */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          {project?.metrics?.slice(0, 3)?.map((metric, idx) => (
            <div key={idx} className="text-center">
              <p className="text-lg font-semibold text-primary">{metric?.value}</p>
              <p className="text-xs text-text-secondary">{metric?.label}</p>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project?.tags?.slice(0, 3)?.map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-md"
            >
              {tag}
            </span>
          ))}
          {project?.tags?.length > 3 && (
            <span className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-md">
              +{project?.tags?.length - 3} more
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;