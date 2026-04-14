'use client';



interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-6 py-2.5 rounded-full font-cta font-medium text-sm transition-all duration-300 ${
            activeCategory === category
              ? 'bg-primary text-primary-foreground shadow-dramatic'
              : 'bg-surface text-text-secondary hover:bg-muted hover:text-foreground'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;