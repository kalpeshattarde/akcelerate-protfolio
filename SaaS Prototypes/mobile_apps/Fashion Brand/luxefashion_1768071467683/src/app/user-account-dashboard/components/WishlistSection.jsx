'use client';

import { useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const WishlistSection = ({ wishlistItems }) => {
  const [removingItem, setRemovingItem] = useState(null);

  const handleRemoveItem = (itemId) => {
    setRemovingItem(itemId);
    // Simulate API call
    setTimeout(() => {
      setRemovingItem(null);
      console.log('Item removed:', itemId);
    }, 1000);
  };

  const handleAddToCart = (item) => {
    console.log('Adding to cart:', item);
    // In a real app, this would add to cart
  };

  return (
    <div className="bg-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-bold text-card-foreground">My Wishlist</h2>
        <Link 
          href="/wishlist" 
          className="text-accent hover:text-accent/80 font-medium text-sm transition-colors"
        >
          View All ({wishlistItems?.length})
        </Link>
      </div>
      {wishlistItems?.length === 0 ? (
        <div className="text-center py-12">
          <Icon name="HeartIcon" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="font-heading font-semibold text-foreground mb-2">Your wishlist is empty</h3>
          <p className="text-muted-foreground mb-4">Save items you love to your wishlist</p>
          <Link 
            href="/product-catalog"
            className="inline-block bg-accent text-accent-foreground px-6 py-2 font-heading font-semibold text-sm uppercase tracking-wide hover:bg-accent/90 transition-colors btn-press"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {wishlistItems?.slice(0, 6)?.map((item) => (
            <div key={item?.id} className="bg-background border border-border group hover:border-accent transition-colors">
              <div className="relative">
                <div className="aspect-square overflow-hidden bg-muted">
                  <AppImage
                    src={item?.image}
                    alt={item?.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <button
                  onClick={() => handleRemoveItem(item?.id)}
                  disabled={removingItem === item?.id}
                  className="absolute top-2 right-2 w-8 h-8 bg-background/80 backdrop-blur-sm border border-border hover:bg-background hover:border-error hover:text-error transition-colors flex items-center justify-center btn-press"
                  aria-label="Remove from wishlist"
                >
                  {removingItem === item?.id ? (
                    <div className="w-4 h-4 border-2 border-muted-foreground border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Icon name="XMarkIcon" size={16} />
                  )}
                </button>

                {!item?.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="bg-error text-error-foreground px-3 py-1 text-sm font-medium uppercase tracking-wide">
                      Out of Stock
                    </span>
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
                  
                  {item?.salePrice && (
                    <span className="text-xs bg-error text-error-foreground px-2 py-1 font-medium uppercase tracking-wide">
                      Sale
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleAddToCart(item)}
                    disabled={!item?.inStock}
                    className={`flex-1 py-2 px-3 font-heading font-semibold text-sm uppercase tracking-wide transition-colors btn-press ${
                      item?.inStock
                        ? 'bg-accent text-accent-foreground hover:bg-accent/90'
                        : 'bg-muted text-muted-foreground cursor-not-allowed'
                    }`}
                  >
                    {item?.inStock ? 'Add to Cart' : 'Notify Me'}
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
      )}
    </div>
  );
};

WishlistSection.propTypes = {
  wishlistItems: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.string?.isRequired,
      name: PropTypes?.string?.isRequired,
      brand: PropTypes?.string?.isRequired,
      image: PropTypes?.string?.isRequired,
      alt: PropTypes?.string?.isRequired,
      originalPrice: PropTypes?.string?.isRequired,
      salePrice: PropTypes?.string,
      inStock: PropTypes?.bool?.isRequired
    })
  )?.isRequired
};

export default WishlistSection;