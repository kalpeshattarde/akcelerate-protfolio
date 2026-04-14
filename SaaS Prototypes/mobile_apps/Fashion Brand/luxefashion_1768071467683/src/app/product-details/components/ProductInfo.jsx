'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import PropTypes from 'prop-types';

const ProductInfo = ({ product, onAddToCart, onBuyNow }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    
    const cartItem = {
      ...product,
      selectedSize,
      selectedColor,
      quantity,
    };
    
    onAddToCart(cartItem);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    
    const cartItem = {
      ...product,
      selectedSize,
      selectedColor,
      quantity,
    };
    
    onBuyNow(cartItem);
  };

  const isInStock = product?.stock > 0;
  const discountPercentage = product?.originalPrice 
    ? Math.round(((product?.originalPrice - product?.price) / product?.originalPrice) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Product Title and Rating */}
      <div>
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            {product?.brand}
          </span>
          {product?.isNew && (
            <span className="bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded-full">
              NEW
            </span>
          )}
        </div>
        <h1 className="font-heading font-bold text-2xl lg:text-3xl text-foreground mb-2">
          {product?.name}
        </h1>
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            {[...Array(5)]?.map((_, i) => (
              <Icon
                key={i}
                name="StarIcon"
                size={16}
                variant={i < Math.floor(product?.rating) ? "solid" : "outline"}
                className={i < Math.floor(product?.rating) ? "text-yellow-400" : "text-gray-300"}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {product?.rating} ({product?.reviewCount} reviews)
          </span>
        </div>
      </div>
      {/* Pricing */}
      <div className="flex items-center space-x-3">
        <span className="font-heading font-bold text-3xl text-foreground">
          ${product?.price}
        </span>
        {product?.originalPrice && (
          <>
            <span className="text-xl text-muted-foreground line-through">
              ${product?.originalPrice}
            </span>
            <span className="bg-error text-error-foreground text-sm font-bold px-2 py-1 rounded-full">
              -{discountPercentage}%
            </span>
          </>
        )}
      </div>
      {/* Color Selection */}
      <div>
        <h3 className="font-heading font-semibold text-sm uppercase tracking-wide mb-3">
          Color: {selectedColor?.name}
        </h3>
        <div className="flex space-x-2">
          {product?.colors?.map((color) => (
            <button
              key={color?.name}
              onClick={() => handleColorSelect(color)}
              className={`w-10 h-10 rounded-full border-2 transition-all btn-press ${
                selectedColor?.name === color?.name
                  ? 'border-accent shadow-elevation-1'
                  : 'border-border hover:border-muted-foreground'
              }`}
              style={{ backgroundColor: color?.hex }}
              aria-label={`Select ${color?.name} color`}
            />
          ))}
        </div>
      </div>
      {/* Size Selection */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-heading font-semibold text-sm uppercase tracking-wide">
            Size
          </h3>
          <button
            onClick={() => setShowSizeGuide(!showSizeGuide)}
            className="text-sm text-accent hover:text-accent/80 transition-colors btn-press"
          >
            Size Guide
          </button>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {product?.sizes?.map((size) => (
            <button
              key={size?.size}
              onClick={() => handleSizeSelect(size?.size)}
              disabled={!size?.available}
              className={`py-3 px-4 border text-sm font-medium transition-all btn-press ${
                selectedSize === size?.size
                  ? 'border-accent bg-accent text-accent-foreground'
                  : size?.available
                  ? 'border-border hover:border-muted-foreground'
                  : 'border-border bg-muted text-muted-foreground cursor-not-allowed'
              }`}
            >
              {size?.size}
            </button>
          ))}
        </div>
        {showSizeGuide && (
          <div className="mt-3 p-4 bg-muted rounded-lg">
            <h4 className="font-semibold mb-2">Size Guide</h4>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>XS: 32-34 inches</p>
              <p>S: 34-36 inches</p>
              <p>M: 36-38 inches</p>
              <p>L: 38-40 inches</p>
              <p>XL: 40-42 inches</p>
            </div>
          </div>
        )}
      </div>
      {/* Quantity Selection */}
      <div>
        <h3 className="font-heading font-semibold text-sm uppercase tracking-wide mb-3">
          Quantity
        </h3>
        <div className="flex items-center space-x-3">
          <div className="flex items-center border border-border rounded-lg">
            <button
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
              className="p-2 hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed btn-press"
            >
              <Icon name="MinusIcon" size={16} />
            </button>
            <span className="px-4 py-2 font-medium">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= 10}
              className="p-2 hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed btn-press"
            >
              <Icon name="PlusIcon" size={16} />
            </button>
          </div>
          <span className="text-sm text-muted-foreground">
            {product?.stock} in stock
          </span>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={handleAddToCart}
          disabled={!isInStock}
          className="w-full bg-accent text-accent-foreground font-heading font-bold py-4 px-6 uppercase tracking-wide transition-all hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed btn-press"
        >
          {isInStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
        <button
          onClick={handleBuyNow}
          disabled={!isInStock}
          className="w-full bg-primary text-primary-foreground font-heading font-bold py-4 px-6 uppercase tracking-wide transition-all hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed btn-press"
        >
          Buy Now
        </button>
      </div>
      {/* Product Features */}
      <div className="pt-6 border-t border-border">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Icon name="TruckIcon" size={20} className="text-accent" />
            <span className="text-sm">Free Shipping</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="ArrowPathIcon" size={20} className="text-accent" />
            <span className="text-sm">Easy Returns</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="ShieldCheckIcon" size={20} className="text-accent" />
            <span className="text-sm">Secure Payment</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="SparklesIcon" size={20} className="text-accent" />
            <span className="text-sm">Premium Quality</span>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductInfo.propTypes = {
  product: PropTypes?.shape({
    name: PropTypes?.string?.isRequired,
    brand: PropTypes?.string?.isRequired,
    price: PropTypes?.number?.isRequired,
    originalPrice: PropTypes?.number,
    rating: PropTypes?.number?.isRequired,
    reviewCount: PropTypes?.number?.isRequired,
    stock: PropTypes?.number?.isRequired,
    isNew: PropTypes?.bool,
    colors: PropTypes?.arrayOf(
      PropTypes?.shape({
        name: PropTypes?.string?.isRequired,
        hex: PropTypes?.string?.isRequired,
      })
    )?.isRequired,
    sizes: PropTypes?.arrayOf(
      PropTypes?.shape({
        size: PropTypes?.string?.isRequired,
        available: PropTypes?.bool?.isRequired,
      })
    )?.isRequired,
  })?.isRequired,
  onAddToCart: PropTypes?.func?.isRequired,
  onBuyNow: PropTypes?.func?.isRequired,
};

export default ProductInfo;