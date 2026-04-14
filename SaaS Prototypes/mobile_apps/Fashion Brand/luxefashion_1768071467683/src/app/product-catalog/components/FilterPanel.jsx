'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

const FilterPanel = ({ 
  isOpen, 
  onClose, 
  filters, 
  onFilterChange, 
  onClearFilters,
  productCount 
}) => {
  const [priceRange, setPriceRange] = useState(filters?.priceRange || [0, 1000]);

  const categories = [
    'All Categories',
    'Streetwear',
    'Luxury Pieces',
    'Seasonal Collections',
    'Accessories',
    'Footwear'
  ];

  const brands = [
    'All Brands',
    'LuxeFashion',
    'Urban Elite',
    'Street Couture',
    'Premium Threads',
    'Fashion Forward'
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const handlePriceChange = (index, value) => {
    const newRange = [...priceRange];
    newRange[index] = parseInt(value);
    setPriceRange(newRange);
    onFilterChange('priceRange', newRange);
  };

  const handleCategoryChange = (category) => {
    onFilterChange('category', category);
  };

  const handleBrandChange = (brand) => {
    onFilterChange('brand', brand);
  };

  const handleSizeChange = (size) => {
    const currentSizes = filters?.sizes || [];
    const newSizes = currentSizes?.includes(size)
      ? currentSizes?.filter(s => s !== size)
      : [...currentSizes, size];
    onFilterChange('sizes', newSizes);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      {/* Filter Panel */}
      <div className={`
        fixed lg:static top-0 right-0 h-full lg:h-auto w-80 lg:w-full
        bg-background lg:bg-transparent z-50 lg:z-auto
        transform transition-transform duration-300 ease-in-out lg:transform-none
        ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        overflow-y-auto lg:overflow-visible
      `}>
        <div className="p-6 lg:p-0">
          {/* Mobile Header */}
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <h2 className="font-heading font-bold text-xl">Filters</h2>
            <button
              onClick={onClose}
              className="text-foreground hover:text-accent transition-colors btn-press"
              aria-label="Close filters"
            >
              <Icon name="XMarkIcon" size={24} />
            </button>
          </div>

          {/* Results Count */}
          <div className="mb-6 p-4 bg-muted rounded-sm">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{productCount}</span> products
            </p>
          </div>

          {/* Category Filter */}
          <div className="mb-6">
            <h3 className="font-heading font-semibold text-sm uppercase tracking-wide mb-3">
              Category
            </h3>
            <div className="space-y-2">
              {categories?.map((category) => (
                <label key={category} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    checked={filters?.category === category}
                    onChange={() => handleCategoryChange(category)}
                    className="sr-only"
                  />
                  <div className={`
                    w-4 h-4 border-2 rounded-full mr-3 flex items-center justify-center
                    ${filters?.category === category 
                      ? 'border-accent bg-accent' :'border-border'
                    }
                  `}>
                    {filters?.category === category && (
                      <div className="w-2 h-2 bg-accent-foreground rounded-full" />
                    )}
                  </div>
                  <span className="text-sm text-foreground hover:text-accent transition-colors">
                    {category}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="mb-6">
            <h3 className="font-heading font-semibold text-sm uppercase tracking-wide mb-3">
              Price Range
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <label className="block text-xs text-muted-foreground mb-1">Min</label>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange?.[0]}
                    onChange={(e) => handlePriceChange(0, e?.target?.value)}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-sm font-semibold">${priceRange?.[0]}</span>
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-muted-foreground mb-1">Max</label>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange?.[1]}
                    onChange={(e) => handlePriceChange(1, e?.target?.value)}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-sm font-semibold">${priceRange?.[1]}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Brand Filter */}
          <div className="mb-6">
            <h3 className="font-heading font-semibold text-sm uppercase tracking-wide mb-3">
              Brand
            </h3>
            <div className="space-y-2">
              {brands?.map((brand) => (
                <label key={brand} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="brand"
                    value={brand}
                    checked={filters?.brand === brand}
                    onChange={() => handleBrandChange(brand)}
                    className="sr-only"
                  />
                  <div className={`
                    w-4 h-4 border-2 rounded-sm mr-3 flex items-center justify-center
                    ${filters?.brand === brand 
                      ? 'border-accent bg-accent' :'border-border'
                    }
                  `}>
                    {filters?.brand === brand && (
                      <Icon name="CheckIcon" size={12} className="text-accent-foreground" />
                    )}
                  </div>
                  <span className="text-sm text-foreground hover:text-accent transition-colors">
                    {brand}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Size Filter */}
          <div className="mb-6">
            <h3 className="font-heading font-semibold text-sm uppercase tracking-wide mb-3">
              Size
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {sizes?.map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeChange(size)}
                  className={`
                    px-3 py-2 text-sm font-semibold border-2 transition-colors btn-press
                    ${(filters?.sizes || [])?.includes(size)
                      ? 'border-accent bg-accent text-accent-foreground'
                      : 'border-border text-foreground hover:border-accent hover:text-accent'
                    }
                  `}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          <button
            onClick={onClearFilters}
            className="w-full px-4 py-3 bg-muted text-foreground font-semibold hover:bg-accent hover:text-accent-foreground transition-colors btn-press"
          >
            Clear All Filters
          </button>
        </div>
      </div>
    </>
  );
};

FilterPanel.propTypes = {
  isOpen: PropTypes?.bool?.isRequired,
  onClose: PropTypes?.func?.isRequired,
  filters: PropTypes?.shape({
    category: PropTypes?.string,
    brand: PropTypes?.string,
    priceRange: PropTypes?.arrayOf(PropTypes?.number),
    sizes: PropTypes?.arrayOf(PropTypes?.string)
  })?.isRequired,
  onFilterChange: PropTypes?.func?.isRequired,
  onClearFilters: PropTypes?.func?.isRequired,
  productCount: PropTypes?.number?.isRequired
};

export default FilterPanel;