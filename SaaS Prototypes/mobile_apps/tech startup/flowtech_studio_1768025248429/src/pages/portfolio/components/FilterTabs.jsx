import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const FilterTabs = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-12">
      {categories?.map((category) => (
        <motion.button
          key={category?.id}
          onClick={() => onCategoryChange(category?.id)}
          className={`
            relative px-6 py-3 rounded-full font-medium text-sm transition-all duration-300
            ${activeCategory === category?.id
              ? 'text-white bg-primary shadow-lg'
              : 'text-text-secondary bg-muted hover:bg-primary/10 hover:text-primary'
            }
          `}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex items-center space-x-2">
            <Icon name={category?.icon} size={16} />
            <span>{category?.name}</span>
            <span className={`
              px-2 py-0.5 rounded-full text-xs
              ${activeCategory === category?.id
                ? 'bg-white/20 text-white' :'bg-text-secondary/10 text-text-secondary'
              }
            `}>
              {category?.count}
            </span>
          </div>
          
          {activeCategory === category?.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-primary rounded-full -z-10"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </motion.button>
      ))}
    </div>
  );
};

export default FilterTabs;