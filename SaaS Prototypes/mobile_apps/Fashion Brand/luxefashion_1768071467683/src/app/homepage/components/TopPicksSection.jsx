'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import PropTypes from 'prop-types';

const TopPicksSection = ({ products }) => {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (scrollContainerRef?.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef?.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction) => {
    if (scrollContainerRef?.current) {
      const scrollAmount = 320;
      const newScrollLeft = direction === 'left' ?
      scrollContainerRef?.current?.scrollLeft - scrollAmount :
      scrollContainerRef?.current?.scrollLeft + scrollAmount;

      scrollContainerRef?.current?.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const addToCart = (product) => {
    try {
      const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existingItem = existingCart?.find((item) => item?.id === product?.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        existingCart?.push({ ...product, quantity: 1 });
      }

      localStorage.setItem('cart', JSON.stringify(existingCart));

      // Trigger storage event for header update
      window.dispatchEvent(new Event('storage'));
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="w-full px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-4 tracking-tight">
            TOP PICKS
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Curated selection of our most coveted pieces, handpicked by our style experts
          </p>
        </div>

        {/* Products Scroll Container */}
        <div className="relative">
          {/* Scroll Buttons */}
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-background border border-border shadow-elevation-2 flex items-center justify-center transition-all btn-press ${
            canScrollLeft ? 'text-foreground hover:bg-muted' : 'text-muted-foreground cursor-not-allowed'}`
            }
            aria-label="Scroll left">

            <Icon name="ChevronLeftIcon" size={20} />
          </button>

          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-background border border-border shadow-elevation-2 flex items-center justify-center transition-all btn-press ${
            canScrollRight ? 'text-foreground hover:bg-muted' : 'text-muted-foreground cursor-not-allowed'}`
            }
            aria-label="Scroll right">

            <Icon name="ChevronRightIcon" size={20} />
          </button>

          {/* Products Grid */}
          <div
            ref={scrollContainerRef}
            onScroll={checkScrollButtons}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 px-12"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>

            {products?.map((product) =>
            <div key={product?.id} className="flex-shrink-0 w-80 group">
                <div className="bg-card border border-border shadow-elevation-1 hover:shadow-elevation-2 transition-all hover-lift">
                  {/* Product Image */}
                  <div className="relative overflow-hidden">
                    <AppImage
                    src={product?.image}
                    alt={product?.alt}
                    className="w-full h-96 object-cover" />
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <h3 className="font-heading font-bold text-lg text-card-foreground mb-2 line-clamp-2">
                      {product?.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {product?.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-heading font-bold text-xl text-card-foreground">
                          ${product?.price}
                        </span>
                        {product?.originalPrice &&
                      <span className="text-muted-foreground line-through text-sm">
                            ${product?.originalPrice}
                          </span>
                      }
                      </div>
                      
                      <Link
                      href={`/product-details?id=${product?.id}`}
                      className="text-black hover:text-black/80 font-semibold text-sm lowercase tracking-wide transition-colors">

                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/product-catalog"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 font-heading font-bold text-sm uppercase tracking-wide hover:bg-primary/90 transition-colors btn-press shadow-elevation-2">

            View All Products
            <Icon name="ArrowRightIcon" size={16} />
          </Link>
        </div>
      </div>
    </section>);

};

TopPicksSection.propTypes = {
  products: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.number?.isRequired,
      name: PropTypes?.string?.isRequired,
      description: PropTypes?.string?.isRequired,
      price: PropTypes?.number?.isRequired,
      originalPrice: PropTypes?.number,
      image: PropTypes?.string?.isRequired,
      alt: PropTypes?.string?.isRequired
    })
  )?.isRequired
};

export default TopPicksSection;