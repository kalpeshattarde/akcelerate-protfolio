import React from 'react';
import Icon from '../../../components/AppIcon';

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <section className="mb-6">
      <div className="flex items-center space-x-2 overflow-x-auto scrollbar-hide pb-2">
        <button
          onClick={() => onCategoryChange('all')}
          className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all micro-interaction ${
            selectedCategory === 'all' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground hover:bg-muted/80'
          }`}
        >
          All Articles
        </button>
        
        {categories?.map((category) => (
          <button
            key={category?.id}
            onClick={() => onCategoryChange(category?.id)}
            className={`flex-shrink-0 flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all micro-interaction ${
              selectedCategory === category?.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            <Icon name={category?.icon} size={14} />
            <span>{category?.name}</span>
            <span className="text-xs opacity-70">({category?.count})</span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default CategoryFilter;