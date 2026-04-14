'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const CartItem = ({ item, onUpdateQuantity, onRemoveItem, onSaveForLater }) => {
  const [quantity, setQuantity] = useState(item?.quantity);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1) return;
    
    setIsUpdating(true);
    setQuantity(newQuantity);
    
    try {
      await onUpdateQuantity(item?.id, newQuantity);
    } catch (error) {
      console.error('Failed to update quantity:', error);
      setQuantity(item?.quantity); // Revert on error
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemove = async () => {
    setIsUpdating(true);
    try {
      await onRemoveItem(item?.id);
    } catch (error) {
      console.error('Failed to remove item:', error);
      setIsUpdating(false);
    }
  };

  const handleSaveForLater = async () => {
    setIsUpdating(true);
    try {
      await onSaveForLater(item?.id);
    } catch (error) {
      console.error('Failed to save for later:', error);
      setIsUpdating(false);
    }
  };

  const totalPrice = (item?.price * quantity)?.toFixed(2);

  return (
    <div className={`bg-white border border-border p-6 transition-opacity ${isUpdating ? 'opacity-50' : ''}`}>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <div className="w-32 h-32 lg:w-40 lg:h-40 overflow-hidden bg-muted">
            <AppImage
              src={item?.image}
              alt={item?.alt}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-heading font-bold text-lg text-foreground mb-2">
                {item?.name}
              </h3>
              
              <div className="space-y-1 text-sm text-muted-foreground mb-4">
                {item?.size && (
                  <p>Size: <span className="text-foreground font-medium">{item?.size}</span></p>
                )}
                {item?.color && (
                  <p>Color: <span className="text-foreground font-medium">{item?.color}</span></p>
                )}
                <p>SKU: <span className="text-foreground font-data">{item?.sku}</span></p>
              </div>

              {/* Mobile Price */}
              <div className="lg:hidden mb-4">
                <p className="text-xl font-heading font-bold text-foreground">
                  ${totalPrice}
                </p>
                <p className="text-sm text-muted-foreground">
                  ${item?.price?.toFixed(2)} each
                </p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-4 mb-4">
                <label className="text-sm font-medium text-foreground">Quantity:</label>
                <div className="flex items-center border border-border">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1 || isUpdating}
                    className="w-10 h-10 flex items-center justify-center text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed btn-press"
                    aria-label="Decrease quantity"
                  >
                    <Icon name="MinusIcon" size={16} />
                  </button>
                  
                  <input
                    type="number"
                    min="1"
                    max="99"
                    value={quantity}
                    onChange={(e) => {
                      const newQty = parseInt(e?.target?.value) || 1;
                      if (newQty >= 1 && newQty <= 99) {
                        handleQuantityChange(newQty);
                      }
                    }}
                    disabled={isUpdating}
                    className="w-16 h-10 text-center border-0 border-l border-r border-border text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
                  />
                  
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= 99 || isUpdating}
                    className="w-10 h-10 flex items-center justify-center text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed btn-press"
                    aria-label="Increase quantity"
                  >
                    <Icon name="PlusIcon" size={16} />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleSaveForLater}
                  disabled={isUpdating}
                  className="flex items-center gap-2 text-sm text-foreground hover:text-accent transition-colors disabled:opacity-50 btn-press"
                >
                  <Icon name="HeartIcon" size={16} />
                  Save for Later
                </button>
                
                <button
                  onClick={handleRemove}
                  disabled={isUpdating}
                  className="flex items-center gap-2 text-sm text-error hover:text-red-700 transition-colors disabled:opacity-50 btn-press"
                >
                  <Icon name="TrashIcon" size={16} />
                  Remove
                </button>
              </div>
            </div>

            {/* Desktop Price */}
            <div className="hidden lg:block text-right">
              <p className="text-2xl font-heading font-bold text-foreground mb-1">
                ${totalPrice}
              </p>
              <p className="text-sm text-muted-foreground">
                ${item?.price?.toFixed(2)} each
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes?.shape({
    id: PropTypes?.string?.isRequired,
    name: PropTypes?.string?.isRequired,
    price: PropTypes?.number?.isRequired,
    quantity: PropTypes?.number?.isRequired,
    image: PropTypes?.string?.isRequired,
    alt: PropTypes?.string?.isRequired,
    size: PropTypes?.string,
    color: PropTypes?.string,
    sku: PropTypes?.string?.isRequired
  })?.isRequired,
  onUpdateQuantity: PropTypes?.func?.isRequired,
  onRemoveItem: PropTypes?.func?.isRequired,
  onSaveForLater: PropTypes?.func?.isRequired
};

export default CartItem;