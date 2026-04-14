'use client';

import { useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import PropTypes from 'prop-types';

const RelatedProducts = ({ products, title = "You May Also Like" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 4;
  const maxIndex = Math.max(0, products?.length - itemsPerView);

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const canScrollLeft = currentIndex > 0;
  const canScrollRight = currentIndex < maxIndex;

  return (
    <div className="bg-background py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-heading font-bold text-2xl lg:text-3xl text-foreground">
            {title}
          </h2>
          
          {/* Navigation Controls */}
          {products?.length > itemsPerView && (
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrevious}
                disabled={!canScrollLeft}
                className="w-10 h-10 border border-border rounded-full flex items-center justify-center transition-all hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed btn-press"
                aria-label="Previous products"
              >
                <Icon name="ChevronLeftIcon" size={20} />
              </button>
              <button
                onClick={handleNext}
                disabled={!canScrollRight}
                className="w-10 h-10 border border-border rounded-full flex items-center justify-center transition-all hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed btn-press"
                aria-label="Next products"
              >
                <Icon name="ChevronRightIcon" size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Products Grid */}
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
          >
            {products?.map((product) => (
              <div
                key={product?.id}
                className="w-1/4 flex-shrink-0 px-3"
              >
                <Link href="/product-details" className="group block">
                  <div className="bg-card rounded-lg overflow-hidden shadow-elevation-1 hover:shadow-elevation-2 transition-all hover-lift">
                    {/* Product Image */}
                    <div className="aspect-square relative overflow-hidden">
                      <AppImage
                        src={product?.image}
                        alt={product?.alt}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Overlay Actions */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="bg-background/90 backdrop-blur-sm rounded-full p-3">
                          <Icon name="EyeIcon" size={20} className="text-foreground" />
                        </div>
                      </div>

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col space-y-2">
                        {product?.isNew && (
                          <span className="bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded-full">
                            NEW
                          </span>
                        )}
                        {product?.discount && (
                          <span className="bg-error text-error-foreground text-xs font-bold px-2 py-1 rounded-full">
                            -{product?.discount}%
                          </span>
                        )}
                      </div>

                      {/* Quick Add Button */}
                      <button className="absolute bottom-3 right-3 w-10 h-10 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-accent hover:text-accent-foreground btn-press">
                        <Icon name="PlusIcon" size={16} />
                      </button>
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <div className="mb-2">
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          {product?.brand}
                        </span>
                      </div>
                      <h3 className="font-heading font-semibold text-lg text-foreground mb-2 line-clamp-2">
                        {product?.name}
                      </h3>
                      
                      {/* Rating */}
                      <div className="flex items-center space-x-1 mb-3">
                        <div className="flex items-center">
                          {[...Array(5)]?.map((_, i) => (
                            <Icon
                              key={i}
                              name="StarIcon"
                              size={12}
                              variant={i < Math.floor(product?.rating) ? "solid" : "outline"}
                              className={i < Math.floor(product?.rating) ? "text-yellow-400" : "text-gray-300"}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          ({product?.reviewCount})
                        </span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center space-x-2">
                        <span className="font-heading font-bold text-lg text-foreground">
                          ${product?.price}
                        </span>
                        {product?.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${product?.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Scroll Indicator */}
        {products?.length > itemsPerView && (
          <div className="flex justify-center mt-6 md:hidden">
            <div className="flex space-x-2">
              {Array.from({ length: maxIndex + 1 })?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    currentIndex === index ? 'bg-accent' : 'bg-border'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

RelatedProducts.propTypes = {
  products: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.number?.isRequired,
      name: PropTypes?.string?.isRequired,
      brand: PropTypes?.string?.isRequired,
      price: PropTypes?.number?.isRequired,
      originalPrice: PropTypes?.number,
      image: PropTypes?.string?.isRequired,
      alt: PropTypes?.string?.isRequired,
      rating: PropTypes?.number?.isRequired,
      reviewCount: PropTypes?.number?.isRequired,
      isNew: PropTypes?.bool,
      discount: PropTypes?.number,
    })
  )?.isRequired,
  title: PropTypes?.string,
};

export default RelatedProducts;