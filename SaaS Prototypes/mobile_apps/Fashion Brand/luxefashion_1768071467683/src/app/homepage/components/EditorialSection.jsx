'use client';

import { useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import PropTypes from 'prop-types';

const EditorialSection = ({ editorialItems }) => {
  const [hoveredItem, setHoveredItem] = useState(null);

  const addToCart = (item) => {
    try {
      const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existingCartItem = existingCart?.find((cartItem) => cartItem?.id === item?.productId);

      if (existingCartItem) {
        existingCartItem.quantity += 1;
      } else {
        existingCart?.push({
          id: item?.productId,
          name: item?.productName,
          price: item?.productPrice,
          image: item?.image,
          alt: item?.alt,
          quantity: 1
        });
      }

      localStorage.setItem('cart', JSON.stringify(existingCart));

      // Trigger storage event for header update
      window.dispatchEvent(new Event('storage'));
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      {/* Background Ghost Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-[15vw] font-heading font-bold text-white opacity-5 select-none whitespace-nowrap">
          EDITORIAL
        </span>
      </div>
      <div className="relative z-10 w-full px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-primary-foreground mb-4 tracking-tight">
            FASHION EDITORIAL
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-[rgba(210,208,208,1)]">Discover the latest trends through our curated fashion stories and exclusive collections

          </p>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {editorialItems?.map((item, index) =>
          <div
            key={item?.id}
            className={`group relative overflow-hidden shadow-elevation-3 hover:shadow-elevation-4 transition-all hover-lift ${
            index === 0 ? 'md:col-span-2 lg:col-span-1' : ''} ${

            index === 3 ? 'lg:col-span-2' : ''}`
            }
            onMouseEnter={() => setHoveredItem(item?.id)}
            onMouseLeave={() => setHoveredItem(null)}>

              {/* Image */}
              <div className="relative overflow-hidden">
                <AppImage
                src={item?.image}
                alt={item?.alt}
                className={`w-full object-cover group-hover:scale-105 transition-transform duration-500 ${
                index === 0 ? 'h-96 lg:h-[500px]' :
                index === 3 ? 'h-80 lg:h-96' : 'h-80'}`
                } />

                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-end">
                  <div className={`transform transition-all duration-300 ${
                hoveredItem === item?.id ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`
                }>
                    <span className="inline-block bg-accent text-accent-foreground px-3 py-1 text-xs font-bold uppercase tracking-wide mb-3">
                      {item?.category}
                    </span>
                    <h3 className="font-heading font-bold text-xl lg:text-2xl text-white mb-2 leading-tight">
                      {item?.title}
                    </h3>
                    <p className="text-white/90 text-sm mb-4 line-clamp-2">
                      {item?.description}
                    </p>
                    
                    <div className="flex items-center gap-3">
                      {item?.productId &&
                    <>
                          <button
                        onClick={() => addToCart(item)}
                        className="bg-accent text-accent-foreground px-4 py-2 text-sm font-bold uppercase tracking-wide hover:bg-accent/90 transition-colors btn-press flex items-center gap-2"
                        aria-label={`Add ${item?.productName} to cart`}>

                            <Icon name="ShoppingCartIcon" size={16} />
                            ${item?.productPrice}
                          </button>
                          <Link
                        href={`/product-details?id=${item?.productId}`}
                        className="text-white hover:text-accent transition-colors text-sm font-semibold uppercase tracking-wide">

                            View Product
                          </Link>
                        </>
                    }
                      {!item?.productId &&
                    <Link
                      href="/product-catalog"
                      className="bg-white text-black px-4 py-2 text-sm font-bold uppercase tracking-wide hover:bg-white/90 transition-colors btn-press">

                          Explore Collection
                        </Link>
                    }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* View More Button */}
        <div className="text-center mt-16">
          <Link
            href="/product-catalog"
            className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-4 font-heading font-bold text-sm uppercase tracking-wide hover:bg-accent/90 transition-colors btn-press shadow-elevation-2">

            View More Editorial
            <Icon name="ArrowRightIcon" size={16} />
          </Link>
        </div>
      </div>
    </section>);

};

EditorialSection.propTypes = {
  editorialItems: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.number?.isRequired,
      title: PropTypes?.string?.isRequired,
      description: PropTypes?.string?.isRequired,
      category: PropTypes?.string?.isRequired,
      image: PropTypes?.string?.isRequired,
      alt: PropTypes?.string?.isRequired,
      productId: PropTypes?.number,
      productName: PropTypes?.string,
      productPrice: PropTypes?.number
    })
  )?.isRequired
};

export default EditorialSection;