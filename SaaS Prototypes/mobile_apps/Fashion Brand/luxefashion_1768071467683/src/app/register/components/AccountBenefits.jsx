import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

const AccountBenefits = ({ className = '' }) => {
  const benefits = [
    {
      icon: 'TruckIcon',
      title: 'Free Shipping',
      description: 'Free delivery on orders over $150'
    },
    {
      icon: 'StarIcon',
      title: 'Loyalty Rewards',
      description: 'Earn points with every purchase'
    },
    {
      icon: 'HeartIcon',
      title: 'Wishlist & Favorites',
      description: 'Save items for later purchase'
    },
    {
      icon: 'BellIcon',
      title: 'Early Access',
      description: 'First access to new collections and sales'
    },
    {
      icon: 'UserIcon',
      title: 'Personal Styling',
      description: 'Curated recommendations just for you'
    },
    {
      icon: 'ShieldCheckIcon',
      title: 'Secure Shopping',
      description: 'Protected transactions and data privacy'
    }
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="text-center">
        <h3 className="font-heading font-bold text-lg text-foreground mb-2">
          Join LuxeFashion Today
        </h3>
        <p className="text-sm text-muted-foreground">
          Unlock exclusive benefits and elevate your fashion experience
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {benefits?.map((benefit, index) => (
          <div key={index} className="flex items-start space-x-3 p-4 bg-card border border-border hover:shadow-elevation-1 transition-shadow">
            <div className="flex-shrink-0 w-10 h-10 bg-accent/10 flex items-center justify-center">
              <Icon name={benefit?.icon} size={20} className="text-accent" />
            </div>
            <div>
              <h4 className="font-medium text-sm text-card-foreground mb-1">
                {benefit?.title}
              </h4>
              <p className="text-xs text-muted-foreground">
                {benefit?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-primary text-primary-foreground p-4 text-center">
        <p className="text-sm font-medium mb-1">
          Welcome Offer
        </p>
        <p className="text-xs opacity-90">
          Get 15% off your first order when you create an account
        </p>
      </div>
    </div>
  );
};

AccountBenefits.propTypes = {
  className: PropTypes?.string
};

export default AccountBenefits;