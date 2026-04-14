'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';
import CheckoutProgress from './CheckoutProgress';
import BillingForm from './BillingForm';
import ShippingForm from './ShippingForm';
import PaymentForm from './PaymentForm';
import ShippingOptions from './ShippingOptions';
import OrderSummary from './OrderSummary';
import PromoCode from './PromoCode';

const CheckoutInteractive = ({ initialCartItems }) => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [selectedShipping, setSelectedShipping] = useState('standard');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [isGuestCheckout, setIsGuestCheckout] = useState(true);
  
  const [formData, setFormData] = useState({
    billing: {},
    shipping: {},
    payment: { paymentMethod: 'card' },
  });

  const [errors, setErrors] = useState({
    billing: {},
    shipping: {},
    payment: {},
  });

  const steps = [
    { id: 'billing', title: 'Billing', description: 'Contact & billing info' },
    { id: 'shipping', title: 'Shipping', description: 'Delivery address' },
    { id: 'payment', title: 'Payment', description: 'Payment method' },
    { id: 'review', title: 'Review', description: 'Confirm order' },
  ];

  const shippingCosts = {
    standard: 0,
    express: 15.00,
    overnight: 35.00,
  };

  const taxRate = 0.08; // 8% tax rate

  useEffect(() => {
    // Load cart items from localStorage if not provided
    if (initialCartItems?.length === 0) {
      const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartItems(savedCart);
    }

    // Check if user is authenticated
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsGuestCheckout(false);
      // Load saved user data
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      if (userData?.email) {
        setFormData(prev => ({
          ...prev,
          billing: {
            ...prev?.billing,
            email: userData?.email,
            firstName: userData?.firstName || '',
            lastName: userData?.lastName || '',
          }
        }));
      }
    }
  }, [initialCartItems]);

  const handleFormChange = (section, data) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev?.[section], ...data }
    }));
    
    // Clear errors for changed fields
    const newErrors = { ...errors };
    Object.keys(data)?.forEach(key => {
      if (newErrors?.[section]?.[key]) {
        delete newErrors?.[section]?.[key];
      }
    });
    setErrors(newErrors);
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 1: // Billing
        if (!formData?.billing?.firstName?.trim()) newErrors.firstName = 'First name is required';
        if (!formData?.billing?.lastName?.trim()) newErrors.lastName = 'Last name is required';
        if (!formData?.billing?.email?.trim()) newErrors.email = 'Email is required';
        if (!formData?.billing?.address?.trim()) newErrors.address = 'Address is required';
        if (!formData?.billing?.city?.trim()) newErrors.city = 'City is required';
        if (!formData?.billing?.state?.trim()) newErrors.state = 'State is required';
        if (!formData?.billing?.zipCode?.trim()) newErrors.zipCode = 'ZIP code is required';
        if (!formData?.billing?.country?.trim()) newErrors.country = 'Country is required';
        break;
        
      case 2: // Shipping
        if (!formData?.shipping?.firstName?.trim()) newErrors.firstName = 'First name is required';
        if (!formData?.shipping?.lastName?.trim()) newErrors.lastName = 'Last name is required';
        if (!formData?.shipping?.address?.trim()) newErrors.address = 'Address is required';
        if (!formData?.shipping?.city?.trim()) newErrors.city = 'City is required';
        if (!formData?.shipping?.state?.trim()) newErrors.state = 'State is required';
        if (!formData?.shipping?.zipCode?.trim()) newErrors.zipCode = 'ZIP code is required';
        if (!formData?.shipping?.country?.trim()) newErrors.country = 'Country is required';
        break;
        
      case 3: // Payment
        if (formData?.payment?.paymentMethod === 'card') {
          if (!formData?.payment?.cardNumber?.trim()) newErrors.cardNumber = 'Card number is required';
          if (!formData?.payment?.expiryDate?.trim()) newErrors.expiryDate = 'Expiry date is required';
          if (!formData?.payment?.cvv?.trim()) newErrors.cvv = 'CVV is required';
          if (!formData?.payment?.cardName?.trim()) newErrors.cardName = 'Name on card is required';
        }
        break;
    }
    
    return newErrors;
  };

  const handleNextStep = () => {
    const stepErrors = validateStep(currentStep);
    
    if (Object.keys(stepErrors)?.length > 0) {
      const section = currentStep === 1 ? 'billing' : currentStep === 2 ? 'shipping' : 'payment';
      setErrors(prev => ({ ...prev, [section]: stepErrors }));
      return;
    }
    
    if (currentStep < steps?.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePromoApply = (code, discount) => {
    setAppliedPromo({ code, discount });
  };

  const handlePromoRemove = () => {
    setAppliedPromo(null);
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Simulate order processing
    setTimeout(() => {
      // Clear cart
      localStorage.removeItem('cart');
      
      // Redirect to success page (would be order confirmation in real app)
      router?.push('/user-account-dashboard');
    }, 3000);
  };

  const subtotal = cartItems?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0);
  const shippingCost = shippingCosts?.[selectedShipping];
  const tax = subtotal * taxRate;
  const discount = appliedPromo ? (subtotal * appliedPromo?.discount) : 0;
  const total = subtotal + shippingCost + tax - discount;

  if (cartItems?.length === 0) {
    return (
      <div className="min-h-screen bg-background pt-16">
        <div className="max-w-4xl mx-auto px-6 py-12 text-center">
          <Icon name="ShoppingCartIcon" size={64} className="mx-auto text-muted-foreground mb-6" />
          <h1 className="font-heading font-bold text-2xl text-foreground mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">Add some items to your cart to proceed with checkout.</p>
          <button
            onClick={() => router?.push('/product-catalog')}
            className="px-8 py-3 bg-accent text-accent-foreground font-heading font-semibold uppercase tracking-wide hover:bg-accent/90 transition-colors btn-press"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <CheckoutProgress currentStep={currentStep} steps={steps} />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Guest Checkout Option */}
            {isGuestCheckout && currentStep === 1 && (
              <div className="bg-card p-6 border border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-heading font-bold text-lg text-foreground mb-2">Checkout Options</h3>
                    <p className="text-sm text-muted-foreground">
                      Continue as guest or create an account for faster future checkouts
                    </p>
                  </div>
                  <button
                    onClick={() => router?.push('/login')}
                    className="px-6 py-2 border border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-colors btn-press"
                  >
                    Login
                  </button>
                </div>
              </div>
            )}

            {/* Step Content */}
            {currentStep === 1 && (
              <BillingForm
                formData={formData?.billing}
                onFormChange={handleFormChange}
                errors={errors?.billing}
              />
            )}

            {currentStep === 2 && (
              <>
                <ShippingForm
                  formData={formData?.shipping}
                  onFormChange={handleFormChange}
                  errors={errors?.shipping}
                />
                <ShippingOptions
                  selectedOption={selectedShipping}
                  onOptionChange={setSelectedShipping}
                />
              </>
            )}

            {currentStep === 3 && (
              <>
                <PaymentForm
                  formData={formData?.payment}
                  onFormChange={handleFormChange}
                  errors={errors?.payment}
                />
                <PromoCode
                  onPromoApply={handlePromoApply}
                  appliedPromo={appliedPromo}
                  onPromoRemove={handlePromoRemove}
                />
              </>
            )}

            {currentStep === 4 && (
              <div className="bg-background p-6 border border-border">
                <h3 className="font-heading font-bold text-lg text-foreground mb-6">Review Your Order</h3>
                
                <div className="space-y-6">
                  {/* Billing Info */}
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Billing Information</h4>
                    <div className="text-sm text-muted-foreground">
                      <p>{formData?.billing?.firstName} {formData?.billing?.lastName}</p>
                      <p>{formData?.billing?.email}</p>
                      <p>{formData?.billing?.address}</p>
                      <p>{formData?.billing?.city}, {formData?.billing?.state} {formData?.billing?.zipCode}</p>
                    </div>
                  </div>

                  {/* Shipping Info */}
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Shipping Information</h4>
                    <div className="text-sm text-muted-foreground">
                      <p>{formData?.shipping?.firstName} {formData?.shipping?.lastName}</p>
                      <p>{formData?.shipping?.address}</p>
                      <p>{formData?.shipping?.city}, {formData?.shipping?.state} {formData?.shipping?.zipCode}</p>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Payment Method</h4>
                    <div className="text-sm text-muted-foreground">
                      {formData?.payment?.paymentMethod === 'card' ? (
                        <p>Credit Card ending in {formData?.payment?.cardNumber?.slice(-4)}</p>
                      ) : (
                        <p>{formData?.payment?.paymentMethod}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <button
                onClick={handlePrevStep}
                disabled={currentStep === 1}
                className="px-6 py-3 border border-border text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors btn-press"
              >
                <Icon name="ArrowLeftIcon" size={16} className="mr-2" />
                Previous
              </button>

              {currentStep < steps?.length ? (
                <button
                  onClick={handleNextStep}
                  className="px-6 py-3 bg-accent text-accent-foreground font-heading font-semibold uppercase tracking-wide hover:bg-accent/90 transition-colors btn-press"
                >
                  Continue
                  <Icon name="ArrowRightIcon" size={16} className="ml-2" />
                </button>
              ) : (
                <button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="px-8 py-3 bg-accent text-accent-foreground font-heading font-bold uppercase tracking-wide hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors btn-press"
                >
                  {isProcessing ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-accent-foreground border-t-transparent rounded-full animate-spin" />
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <>
                      Place Order - ${total?.toFixed(2)}
                      <Icon name="LockClosedIcon" size={16} className="ml-2" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <OrderSummary
              cartItems={cartItems}
              shippingCost={shippingCost}
              taxRate={taxRate}
              promoCode={appliedPromo?.code}
              promoDiscount={appliedPromo?.discount || 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

CheckoutInteractive.propTypes = {
  initialCartItems: PropTypes?.arrayOf(
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
};

export default CheckoutInteractive;