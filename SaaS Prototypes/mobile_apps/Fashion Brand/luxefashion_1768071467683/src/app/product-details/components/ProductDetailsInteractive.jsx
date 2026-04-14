'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProductImageGallery from './ProductImageGallery';
import ProductInfo from './ProductInfo';
import ProductTabs from './ProductTabs';
import RelatedProducts from './RelatedProducts';
import SocialShare from './SocialShare';
import PropTypes from 'prop-types';

const ProductDetailsInteractive = ({ initialData }) => {
  const router = useRouter();
  const [product] = useState(initialData?.product);
  const [reviews] = useState(initialData?.reviews);
  const [relatedProducts] = useState(initialData?.relatedProducts);

  useEffect(() => {
    // Update page title
    document.title = `${product?.name} - ${product?.brand} | LuxeFashion`;
  }, [product]);

  const handleAddToCart = (cartItem) => {
    try {
      // Get existing cart
      const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
      
      // Check if item already exists
      const existingItemIndex = existingCart?.findIndex(
        item => item?.id === cartItem?.id && 
                item?.selectedSize === cartItem?.selectedSize && 
                item?.selectedColor?.name === cartItem?.selectedColor?.name
      );

      if (existingItemIndex > -1) {
        // Update quantity
        existingCart[existingItemIndex].quantity += cartItem?.quantity;
      } else {
        // Add new item
        existingCart?.push({
          ...cartItem,
          addedAt: new Date()?.toISOString(),
        });
      }

      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(existingCart));
      
      // Trigger storage event for header update
      window.dispatchEvent(new Event('storage'));
      
      // Show success message
      alert('Product added to cart successfully!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart. Please try again.');
    }
  };

  const handleBuyNow = (cartItem) => {
    try {
      // Add to cart first
      handleAddToCart(cartItem);
      
      // Navigate to checkout
      router?.push('/checkout');
    } catch (error) {
      console.error('Error during buy now:', error);
      alert('Failed to proceed to checkout. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <ProductImageGallery 
              images={product?.images} 
              productName={product?.name}
            />
          </div>

          {/* Product Information */}
          <div className="space-y-8">
            <ProductInfo
              product={product}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
            />
            
            {/* Social Share */}
            <SocialShare product={product} />
          </div>
        </div>
      </div>
      {/* Product Details Tabs */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <ProductTabs product={product} reviews={reviews} />
        </div>
      </div>
      {/* Related Products */}
      <div className="border-t border-border">
        <RelatedProducts 
          products={relatedProducts}
          title="You May Also Like"
        />
      </div>
    </div>
  );
};

ProductDetailsInteractive.propTypes = {
  initialData: PropTypes?.shape({
    product: PropTypes?.object?.isRequired,
    reviews: PropTypes?.array?.isRequired,
    relatedProducts: PropTypes?.array?.isRequired,
  })?.isRequired,
};

export default ProductDetailsInteractive;