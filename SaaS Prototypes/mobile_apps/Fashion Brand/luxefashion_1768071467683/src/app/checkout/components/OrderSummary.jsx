import Link from 'next/link';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

const OrderSummary = ({ cartItems, shippingCost, taxRate, promoCode, promoDiscount }) => {
  const subtotal = cartItems?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0);
  const tax = subtotal * taxRate;
  const discount = promoCode ? (subtotal * promoDiscount) : 0;
  const total = subtotal + shippingCost + tax - discount;

  return (
    <div className="bg-card p-6 border border-border sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading font-bold text-lg text-foreground">Order Summary</h3>
        <Link 
          href="/shopping-cart" 
          className="text-sm text-accent hover:text-accent/80 transition-colors flex items-center space-x-1"
        >
          <Icon name="PencilIcon" size={14} />
          <span>Edit</span>
        </Link>
      </div>
      {/* Cart Items */}
      <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
        {cartItems?.map((item) => (
          <div key={`${item?.id}-${item?.size}-${item?.color}`} className="flex items-center space-x-3">
            <div className="relative w-16 h-16 bg-muted overflow-hidden">
              <AppImage
                src={item?.image}
                alt={item?.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {item?.quantity}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm text-foreground truncate">{item?.name}</p>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                {item?.size && <span>Size: {item?.size}</span>}
                {item?.color && <span>Color: {item?.color}</span>}
              </div>
              <p className="font-bold text-sm text-foreground">${(item?.price * item?.quantity)?.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Order Totals */}
      <div className="space-y-3 pt-4 border-t border-border">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal ({cartItems?.length} items)</span>
          <span className="text-foreground font-medium">${subtotal?.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span className="text-foreground font-medium">
            {shippingCost === 0 ? 'FREE' : `$${shippingCost?.toFixed(2)}`}
          </span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Tax</span>
          <span className="text-foreground font-medium">${tax?.toFixed(2)}</span>
        </div>
        
        {promoCode && (
          <div className="flex justify-between text-sm">
            <span className="text-success">Promo ({promoCode})</span>
            <span className="text-success font-medium">-${discount?.toFixed(2)}</span>
          </div>
        )}
        
        <div className="flex justify-between text-lg font-bold pt-3 border-t border-border">
          <span className="text-foreground">Total</span>
          <span className="text-foreground">${total?.toFixed(2)}</span>
        </div>
      </div>
      {/* Trust Signals */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="flex flex-col items-center space-y-1">
            <Icon name="ShieldCheckIcon" size={20} className="text-success" />
            <span className="text-xs text-muted-foreground">Secure Payment</span>
          </div>
          <div className="flex flex-col items-center space-y-1">
            <Icon name="ArrowPathIcon" size={20} className="text-success" />
            <span className="text-xs text-muted-foreground">Easy Returns</span>
          </div>
        </div>
      </div>
      {/* Customer Support */}
      <div className="mt-6 p-4 bg-muted border border-border">
        <div className="flex items-center space-x-3">
          <Icon name="ChatBubbleLeftRightIcon" size={20} className="text-accent flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-foreground">Need Help?</p>
            <p className="text-xs text-muted-foreground">Contact our support team</p>
          </div>
        </div>
      </div>
    </div>
  );
};

OrderSummary.propTypes = {
  cartItems: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.number?.isRequired,
      name: PropTypes?.string?.isRequired,
      price: PropTypes?.number?.isRequired,
      quantity: PropTypes?.number?.isRequired,
      image: PropTypes?.string?.isRequired,
      alt: PropTypes?.string?.isRequired,
      size: PropTypes?.string,
      color: PropTypes?.string,
    })
  )?.isRequired,
  shippingCost: PropTypes?.number?.isRequired,
  taxRate: PropTypes?.number?.isRequired,
  promoCode: PropTypes?.string,
  promoDiscount: PropTypes?.number,
};

export default OrderSummary;