'use client';

import { useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const ProductCard = ({ product, onAddToCart }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToCart = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    onAddToCart(product);
  };

  return (
    <div 
      className="group relative bg-background border border-border hover:border-accent transition-all duration-300 hover-lift"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product-details?id=${product?.id}`} className="block">
        {/* Product Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-muted" />
          )}
          <AppImage
            src={isHovered && product?.hoverImage ? product?.hoverImage : product?.image}
            alt={product?.alt}
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Sale Badge */}
          {product?.isOnSale && (
            <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-2 py-1 text-xs font-bold uppercase tracking-wide">
              Sale
            </div>
          )}

          {/* New Badge */}
          {product?.isNew && (
            <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-2 py-1 text-xs font-bold uppercase tracking-wide">
              New
            </div>
          )}

          {/* Quick Add Button - Desktop Only */}
          <div className={`
            absolute inset-x-4 bottom-4 transform transition-all duration-300
            ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
            hidden md:block
          `}>
            <button
              onClick={handleAddToCart}
              className="w-full bg-accent text-accent-foreground font-semibold py-3 hover:bg-primary hover:text-primary-foreground transition-colors btn-press"
            >
              Quick Add to Cart
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <div className="mb-2">
            <h3 className="font-heading font-semibold text-sm uppercase tracking-wide text-foreground group-hover:text-accent transition-colors line-clamp-2">
              {product?.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              {product?.brand}
            </p>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2 mb-3">
            <span className="font-bold text-lg text-foreground">
              ${product?.price}
            </span>
            {product?.originalPrice && product?.originalPrice > product?.price && (
              <span className="text-sm text-muted-foreground line-through">
                ${product?.originalPrice}
              </span>
            )}
          </div>

          {/* Rating */}
          {product?.rating && (
            <div className="flex items-center space-x-1 mb-3">
              <div className="flex items-center">
                {[...Array(5)]?.map((_, i) => (
                  <Icon
                    key={i}
                    name="StarIcon"
                    size={14}
                    variant={i < Math.floor(product?.rating) ? 'solid' : 'outline'}
                    className={i < Math.floor(product?.rating) ? 'text-accent' : 'text-muted-foreground'}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                ({product?.reviewCount})
              </span>
            </div>
          )}

          {/* Available Sizes */}
          {product?.sizes && product?.sizes?.length > 0 && (
            <div className="flex items-center space-x-1 mb-3">
              <span className="text-xs text-muted-foreground">Sizes:</span>
              <div className="flex space-x-1">
                {product?.sizes?.slice(0, 4)?.map((size) => (
                  <span key={size} className="text-xs text-foreground font-semibold">
                    {size}
                  </span>
                ))}
                {product?.sizes?.length > 4 && (
                  <span className="text-xs text-muted-foreground">+{product?.sizes?.length - 4}</span>
                )}
              </div>
            </div>
          )}

          {/* Mobile Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full md:hidden bg-accent text-accent-foreground font-semibold py-2 hover:bg-primary hover:text-primary-foreground transition-colors btn-press"
          >
            Add to Cart
          </button>
        </div>
      </Link>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes?.shape({
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
    sizes: PropTypes?.arrayOf(PropTypes?.string)
  })?.isRequired,
  onAddToCart: PropTypes?.func?.isRequired
};

export default ProductCard;