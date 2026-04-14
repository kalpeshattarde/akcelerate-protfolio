'use client';

import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';
import FilterPanel from './FilterPanel';
import SortDropdown from './SortDropdown';
import ProductGrid from './ProductGrid';

const ProductCatalogInteractive = ({ initialProducts }) => {
  const [products] = useState(initialProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: 'All Categories',
    brand: 'All Brands',
    priceRange: [0, 1000],
    sizes: []
  });
  const [sortBy, setSortBy] = useState('relevance');

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    // Apply category filter
    if (filters?.category && filters?.category !== 'All Categories') {
      filtered = filtered?.filter(product => 
        product?.category === filters?.category
      );
    }

    // Apply brand filter
    if (filters?.brand && filters?.brand !== 'All Brands') {
      filtered = filtered?.filter(product => 
        product?.brand === filters?.brand
      );
    }

    // Apply price range filter
    filtered = filtered?.filter(product => 
      product?.price >= filters?.priceRange?.[0] && 
      product?.price <= filters?.priceRange?.[1]
    );

    // Apply size filter
    if (filters?.sizes && filters?.sizes?.length > 0) {
      filtered = filtered?.filter(product => 
        product?.sizes && product?.sizes?.some(size => filters?.sizes?.includes(size))
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered?.sort((a, b) => a?.price - b?.price);
        break;
      case 'price-high':
        filtered?.sort((a, b) => b?.price - a?.price);
        break;
      case 'newest':
        filtered?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'popularity':
        filtered?.sort((a, b) => (b?.reviewCount || 0) - (a?.reviewCount || 0));
        break;
      default: // relevance
        // Keep original order
        break;
    }

    return filtered;
  }, [products, filters, sortBy]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      category: 'All Categories',
      brand: 'All Brands',
      priceRange: [0, 1000],
      sizes: []
    });
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
  };

  const handleAddToCart = (product) => {
    try {
      const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existingItem = existingCart?.find(item => item?.id === product?.id);

      let updatedCart;
      if (existingItem) {
        updatedCart = existingCart?.map(item =>
          item?.id === product?.id
            ? { ...item, quantity: item?.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...existingCart, { ...product, quantity: 1 }];
      }

      localStorage.setItem('cart', JSON.stringify(updatedCart));
      
      // Trigger storage event for header update
      window.dispatchEvent(new Event('storage'));
      
      // Show success feedback (you could add a toast notification here)
      console.log('Product added to cart:', product?.title);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="bg-primary text-primary-foreground py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-heading font-bold text-4xl lg:text-6xl uppercase tracking-tight mb-4">
              Product Catalog
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Discover our complete collection of luxury fashion and streetwear pieces
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-24">
              <FilterPanel
                isOpen={true}
                onClose={() => {}}
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                productCount={filteredAndSortedProducts?.length}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter & Sort Controls */}
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <button
                onClick={() => setIsFilterOpen(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-background border border-border text-foreground hover:border-accent hover:text-accent transition-colors btn-press"
              >
                <Icon name="AdjustmentsHorizontalIcon" size={20} />
                <span className="font-semibold">Filters</span>
              </button>
              <SortDropdown
                currentSort={sortBy}
                onSortChange={handleSortChange}
              />
            </div>

            {/* Desktop Sort & Results Count */}
            <div className="hidden lg:flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <h2 className="font-heading font-semibold text-lg">
                  {filteredAndSortedProducts?.length} Products
                </h2>
                {(filters?.category !== 'All Categories' || 
                  filters?.brand !== 'All Brands' || 
                  filters?.sizes?.length > 0 || 
                  filters?.priceRange?.[0] > 0 || 
                  filters?.priceRange?.[1] < 1000) && (
                  <button
                    onClick={handleClearFilters}
                    className="text-sm text-accent hover:text-accent/80 transition-colors"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
              <SortDropdown
                currentSort={sortBy}
                onSortChange={handleSortChange}
              />
            </div>

            {/* Active Filters Display */}
            {(filters?.category !== 'All Categories' || 
              filters?.brand !== 'All Brands' || 
              filters?.sizes?.length > 0) && (
              <div className="flex flex-wrap gap-2 mb-6">
                {filters?.category !== 'All Categories' && (
                  <div className="flex items-center space-x-2 bg-accent text-accent-foreground px-3 py-1 text-sm">
                    <span>{filters?.category}</span>
                    <button
                      onClick={() => handleFilterChange('category', 'All Categories')}
                      className="hover:text-accent-foreground/80"
                    >
                      <Icon name="XMarkIcon" size={14} />
                    </button>
                  </div>
                )}
                {filters?.brand !== 'All Brands' && (
                  <div className="flex items-center space-x-2 bg-accent text-accent-foreground px-3 py-1 text-sm">
                    <span>{filters?.brand}</span>
                    <button
                      onClick={() => handleFilterChange('brand', 'All Brands')}
                      className="hover:text-accent-foreground/80"
                    >
                      <Icon name="XMarkIcon" size={14} />
                    </button>
                  </div>
                )}
                {filters?.sizes?.map(size => (
                  <div key={size} className="flex items-center space-x-2 bg-accent text-accent-foreground px-3 py-1 text-sm">
                    <span>Size {size}</span>
                    <button
                      onClick={() => {
                        const newSizes = filters?.sizes?.filter(s => s !== size);
                        handleFilterChange('sizes', newSizes);
                      }}
                      className="hover:text-accent-foreground/80"
                    >
                      <Icon name="XMarkIcon" size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Product Grid */}
            <ProductGrid
              products={filteredAndSortedProducts}
              onAddToCart={handleAddToCart}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
      {/* Mobile Filter Panel */}
      {isFilterOpen && (
        <FilterPanel
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          productCount={filteredAndSortedProducts?.length}
        />
      )}
    </div>
  );
};

ProductCatalogInteractive.propTypes = {
  initialProducts: PropTypes?.arrayOf(PropTypes?.shape({
    id: PropTypes?.oneOfType([PropTypes?.string, PropTypes?.number])?.isRequired,
    title: PropTypes?.string?.isRequired,
    brand: PropTypes?.string?.isRequired,
    price: PropTypes?.number?.isRequired,
    originalPrice: PropTypes?.number,
    image: PropTypes?.string?.isRequired,
    alt: PropTypes?.string?.isRequired,
    hoverImage: PropTypes?.string,
    isOnSale: PropTypes?.bool,
    isNew: PropTypes?.bool,
    rating: PropTypes?.number,
    reviewCount: PropTypes?.number,
    sizes: PropTypes?.arrayOf(PropTypes?.string),
    category: PropTypes?.string,
    createdAt: PropTypes?.string
  }))?.isRequired
};

export default ProductCatalogInteractive;