'use client';

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, onAddToCart, isLoading }) => {
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const PRODUCTS_PER_PAGE = 12;

  useEffect(() => {
    // Reset when products change (due to filtering/sorting)
    setDisplayedProducts(products?.slice(0, PRODUCTS_PER_PAGE));
    setHasMore(products?.length > PRODUCTS_PER_PAGE);
  }, [products]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement?.scrollTop
        >= document.documentElement?.offsetHeight - 1000 &&
        !loadingMore &&
        hasMore
      ) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadingMore, hasMore, displayedProducts?.length, products?.length]);

  const loadMore = () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    
    setTimeout(() => {
      const currentLength = displayedProducts?.length;
      const nextProducts = products?.slice(currentLength, currentLength + PRODUCTS_PER_PAGE);
      
      setDisplayedProducts(prev => [...prev, ...nextProducts]);
      setHasMore(currentLength + nextProducts?.length < products?.length);
      setLoadingMore(false);
    }, 500);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)]?.map((_, index) => (
          <div key={index} className="bg-muted animate-pulse">
            <div className="aspect-[3/4] bg-muted-foreground/10" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-muted-foreground/10 rounded" />
              <div className="h-3 bg-muted-foreground/10 rounded w-2/3" />
              <div className="h-5 bg-muted-foreground/10 rounded w-1/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (displayedProducts?.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl text-muted-foreground">🔍</span>
          </div>
          <h3 className="font-heading font-bold text-xl mb-2">No Products Found</h3>
          <p className="text-muted-foreground mb-6">
            We couldn't find any products matching your current filters. Try adjusting your search criteria.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayedProducts?.map((product) => (
          <ProductCard
            key={product?.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
      {/* Loading More Indicator */}
      {loadingMore && (
        <div className="flex justify-center items-center py-8">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            <span className="text-sm">Loading more products...</span>
          </div>
        </div>
      )}
      {/* End of Results */}
      {!hasMore && displayedProducts?.length > PRODUCTS_PER_PAGE && (
        <div className="text-center py-8">
          <p className="text-muted-foreground text-sm">
            You've reached the end of our collection
          </p>
        </div>
      )}
    </div>
  );
};

ProductGrid.propTypes = {
  products: PropTypes?.arrayOf(PropTypes?.shape({
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
    brand: PropTypes?.string
  }))?.isRequired,
  onAddToCart: PropTypes?.func?.isRequired,
  isLoading: PropTypes?.bool
};

export default ProductGrid;