'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import Header from '@/components/common/Header';
import CartItem from './CartItem';
import OrderSummary from './OrderSummary';
import RecommendedProducts from './RecommendedProducts';
import EmptyCart from './EmptyCart';
import Icon from '@/components/ui/AppIcon';

const ShoppingCartInteractive = ({ recommendedProducts, recentlyViewed }) => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [selectedShipping, setSelectedShipping] = useState(null);
  const [orderTotals, setOrderTotals] = useState({
    subtotal: 0,
    shipping: 0,
    tax: 0,
    total: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  // Mock cart data
  const mockCartItems = [
  {
    id: 'cart-1',
    name: 'Premium Streetwear Hoodie',
    price: 89.99,
    quantity: 2,
    size: 'L',
    color: 'Black',
    sku: 'PSH-001-L-BLK',
    image: "https://images.unsplash.com/photo-1562103277-af4db56b6022",
    alt: 'Black premium streetwear hoodie with minimalist design on white background'
  },
  {
    id: 'cart-2',
    name: 'Luxury Designer Sneakers',
    price: 299.99,
    quantity: 1,
    size: '10',
    color: 'White/Gold',
    sku: 'LDS-002-10-WG',
    image: "https://images.unsplash.com/photo-1620115245635-83e314d289cd",
    alt: 'White luxury designer sneakers with gold accents on clean studio background'
  },
  {
    id: 'cart-3',
    name: 'Oversized Graphic Tee',
    price: 45.99,
    quantity: 1,
    size: 'M',
    color: 'Forest Green',
    sku: 'OGT-003-M-FG',
    image: "https://images.unsplash.com/photo-1637729099654-9028fa6a1d72",
    alt: 'Forest green oversized graphic t-shirt with artistic print displayed flat'
  }];


  useEffect(() => {
    // Load cart from localStorage
    const loadCart = () => {
      try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          setCartItems(parsedCart);
        } else {
          // Use mock data if no saved cart
          setCartItems(mockCartItems);
          localStorage.setItem('cart', JSON.stringify(mockCartItems));
        }
      } catch (error) {
        console.error('Error loading cart:', error);
        setCartItems(mockCartItems);
      } finally {
        setIsLoading(false);
      }
    };

    // Set default shipping
    const defaultShipping = {
      id: 'standard',
      name: 'Standard Shipping',
      price: 0,
      days: '5-7 business days'
    };
    setSelectedShipping(defaultShipping);

    loadCart();
  }, []);

  useEffect(() => {
    // Calculate order totals
    const calculateTotals = () => {
      const subtotal = cartItems?.reduce((sum, item) => sum + item?.price * item?.quantity, 0);
      const shippingCost = selectedShipping ? selectedShipping?.price : 0;
      const tax = subtotal * 0.08; // 8% tax rate
      const total = subtotal + shippingCost + tax;

      setOrderTotals({
        subtotal,
        shipping: shippingCost,
        tax,
        total
      });
    };

    calculateTotals();
  }, [cartItems, selectedShipping]);

  const updateCartInStorage = (updatedCart) => {
    try {
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      // Trigger storage event for header cart count update
      window.dispatchEvent(new Event('storage'));
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  };

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    const updatedCart = cartItems?.map((item) =>
    item?.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    updateCartInStorage(updatedCart);
  };

  const handleRemoveItem = async (itemId) => {
    const updatedCart = cartItems?.filter((item) => item?.id !== itemId);
    setCartItems(updatedCart);
    updateCartInStorage(updatedCart);
  };

  const handleSaveForLater = async (itemId) => {
    // Mock save for later functionality
    const item = cartItems?.find((item) => item?.id === itemId);
    if (item) {
      // Save to wishlist in localStorage
      try {
        const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        const wishlistItem = { ...item, savedAt: new Date()?.toISOString() };
        const updatedWishlist = [...wishlist, wishlistItem];
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));

        // Remove from cart
        await handleRemoveItem(itemId);
      } catch (error) {
        console.error('Error saving for later:', error);
      }
    }
  };

  const handleApplyPromoCode = async (code) => {
    // Mock promo code validation
    const validCodes = {
      'SAVE10': { discount: 10, type: 'percentage', message: 'Promo code applied! 10% off your order.' },
      'WELCOME20': { discount: 20, type: 'fixed', message: 'Welcome discount applied! $20 off your order.' },
      'FREESHIP': { discount: 0, type: 'shipping', message: 'Free shipping applied!' }
    };

    const upperCode = code?.toUpperCase();
    if (validCodes?.[upperCode]) {
      return {
        success: true,
        code: upperCode,
        ...validCodes?.[upperCode]
      };
    } else {
      return {
        success: false,
        message: 'Invalid promo code. Please check and try again.'
      };
    }
  };

  const handleSelectShipping = (shippingOption) => {
    setSelectedShipping(shippingOption);
  };

  const handleProceedToCheckout = () => {
    // Save current cart state and navigate to checkout
    try {
      const checkoutData = {
        items: cartItems,
        shipping: selectedShipping,
        totals: orderTotals,
        timestamp: new Date()?.toISOString()
      };
      localStorage.setItem('checkoutData', JSON.stringify(checkoutData));
      router?.push('/checkout');
    } catch (error) {
      console.error('Error preparing checkout:', error);
    }
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="pt-16">
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center">
              <Icon name="ArrowPathIcon" size={48} className="text-muted-foreground animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Loading your cart...</p>
            </div>
          </div>
        </main>
      </>);

  }

  if (cartItems?.length === 0) {
    return (
      <>
        <Header />
        <main className="pt-16">
          <EmptyCart recentlyViewed={recentlyViewed} />
          <RecommendedProducts products={recommendedProducts} />
        </main>
      </>);

  }

  return (
    <>
      <Header />
      <main className="pt-16 bg-muted min-h-screen">
        {/* Page Header */}
        <section className="bg-primary py-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center">
              <h1 className="font-heading font-bold text-3xl lg:text-4xl text-primary-foreground mb-2">
                SHOPPING CART
              </h1>
              <p className="text-[rgba(207,207,207,1)]">Review your items and proceed to checkout

              </p>
            </div>
          </div>
        </section>

        {/* Cart Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white border border-border p-6 mb-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-heading font-bold text-xl text-foreground">
                      Cart Items ({cartItems?.length})
                    </h2>
                    <button
                      onClick={() => router?.push('/product-catalog')}
                      className="text-accent hover:text-accent/80 font-medium btn-press">

                      Continue Shopping
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {cartItems?.map((item) =>
                  <CartItem
                    key={item?.id}
                    item={item}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemoveItem={handleRemoveItem}
                    onSaveForLater={handleSaveForLater} />

                  )}
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <OrderSummary
                  subtotal={orderTotals?.subtotal}
                  shipping={orderTotals?.shipping}
                  tax={orderTotals?.tax}
                  total={orderTotals?.total}
                  onApplyPromoCode={handleApplyPromoCode}
                  onSelectShipping={handleSelectShipping}
                  selectedShipping={selectedShipping} />

              </div>
            </div>
          </div>
        </section>

        {/* Recommended Products */}
        <RecommendedProducts products={recommendedProducts} />
      </main>
    </>);

};

ShoppingCartInteractive.propTypes = {
  recommendedProducts: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.string?.isRequired,
      name: PropTypes?.string?.isRequired,
      price: PropTypes?.number?.isRequired,
      originalPrice: PropTypes?.number,
      image: PropTypes?.string?.isRequired,
      alt: PropTypes?.string?.isRequired,
      isNew: PropTypes?.bool,
      discount: PropTypes?.number,
      rating: PropTypes?.number,
      reviewCount: PropTypes?.number
    })
  )?.isRequired,
  recentlyViewed: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.string?.isRequired,
      name: PropTypes?.string?.isRequired,
      price: PropTypes?.number?.isRequired,
      image: PropTypes?.string?.isRequired,
      alt: PropTypes?.string?.isRequired
    })
  )
};

export default ShoppingCartInteractive;