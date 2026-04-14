'use client';

import { useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const PersonalizedRecommendations = ({ recommendations }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(recommendations?.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getCurrentItems = () => {
    const startIndex = currentSlide * itemsPerSlide;
    return recommendations?.slice(startIndex, startIndex + itemsPerSlide);
  };

  const handleAddToCart = (item) => {
    console.log('Adding to cart:', item);
    // In a real app, this would add to cart
  };

  return (
    <div className="bg-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading font-bold text-card-foreground">Recommended for You</h2>
          <p className="text-sm text-muted-foreground mt-1">Based on your purchase history and preferences</p>
        </div>
        
        {totalSlides > 1 && (
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              className="w-8 h-8 border border-border hover:border-accent hover:text-accent transition-colors flex items-center justify-center btn-press"
              aria-label="Previous recommendations"
            >
              <Icon name="ChevronLeftIcon" size={16} />
            </button>
            <span className="text-sm text-muted-foreground px-2">
              {currentSlide + 1} / {totalSlides}
            </span>
            <button
              onClick={nextSlide}
              className="w-8 h-8 border border-border hover:border-accent hover:text-accent transition-colors flex items-center justify-center btn-press"
              aria-label="Next recommendations"
            >
              <Icon name="ChevronRightIcon" size={16} />
            </button>
          </div>
        )}
      </div>
      {recommendations?.length === 0 ? (
        <div className="text-center py-12">
          <Icon name="SparklesIcon" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="font-heading font-semibold text-foreground mb-2">No recommendations yet</h3>
          <p className="text-muted-foreground mb-4">Shop more to get personalized recommendations</p>
          <Link 
            href="/product-catalog"
            className="inline-block bg-accent text-accent-foreground px-6 py-2 font-heading font-semibold text-sm uppercase tracking-wide hover:bg-accent/90 transition-colors btn-press"
          >
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {Array.from({ length: totalSlides })?.map((_, slideIndex) => (
              <div key={slideIndex} className="w-full flex-shrink-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {recommendations?.slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)?.map((item) => (
                      <div key={item?.id} className="bg-background border border-border group hover:border-accent transition-colors">
                        <div className="relative">
                          <div className="aspect-square overflow-hidden bg-muted">
                            <AppImage
                              src={item?.image}
                              alt={item?.alt}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          
                          {item?.reason && (
                            <div className="absolute top-2 left-2 bg-accent text-accent-foreground px-2 py-1 text-xs font-medium uppercase tracking-wide">
                              {item?.reason}
                            </div>
                          )}

                          {item?.salePrice && (
                            <div className="absolute top-2 right-2 bg-error text-error-foreground px-2 py-1 text-xs font-medium uppercase tracking-wide">
                              Sale
                            </div>
                          )}
                        </div>

                        <div className="p-4">
                          <h3 className="font-heading font-semibold text-foreground mb-1 line-clamp-2">
                            {item?.name}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-2">{item?.brand}</p>
                          
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              {item?.salePrice ? (
                                <>
                                  <span className="font-heading font-bold text-accent">${item?.salePrice}</span>
                                  <span className="text-sm text-muted-foreground line-through">${item?.originalPrice}</span>
                                </>
                              ) : (
                                <span className="font-heading font-bold text-foreground">${item?.originalPrice}</span>
                              )}
                            </div>
                            
                            {item?.rating && (
                              <div className="flex items-center gap-1">
                                <Icon name="StarIcon" size={14} className="text-accent" />
                                <span className="text-sm text-muted-foreground">{item?.rating}</span>
                              </div>
                            )}
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={() => handleAddToCart(item)}
                              className="flex-1 bg-accent text-accent-foreground py-2 px-3 font-heading font-semibold text-sm uppercase tracking-wide hover:bg-accent/90 transition-colors btn-press"
                            >
                              Add to Cart
                            </button>
                            
                            <Link
                              href={`/product-details?id=${item?.id}`}
                              className="px-3 py-2 border border-border hover:border-accent hover:text-accent transition-colors flex items-center justify-center btn-press"
                              aria-label="View product details"
                            >
                              <Icon name="EyeIcon" size={16} />
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

PersonalizedRecommendations.propTypes = {
  recommendations: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.string?.isRequired,
      name: PropTypes?.string?.isRequired,
      brand: PropTypes?.string?.isRequired,
      image: PropTypes?.string?.isRequired,
      alt: PropTypes?.string?.isRequired,
      originalPrice: PropTypes?.string?.isRequired,
      salePrice: PropTypes?.string,
      rating: PropTypes?.number,
      reason: PropTypes?.string
    })
  )?.isRequired
};

export default PersonalizedRecommendations;