import PropTypes from 'prop-types';
import AppImage from '@/components/ui/AppImage';


const AccountHeader = ({ user }) => {
  return (
    <div className="bg-primary text-primary-foreground p-6 lg:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-secondary">
            <AppImage
              src={user?.profileImage}
              alt={user?.profileImageAlt}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold">Welcome back, {user?.firstName}!</h1>
            <p className="text-primary-foreground/80 mt-1">Member since {user?.memberSince}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-2xl font-heading font-bold text-accent">{user?.loyaltyPoints}</div>
            <div className="text-sm text-primary-foreground/80">Loyalty Points</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-heading font-bold">{user?.totalOrders}</div>
            <div className="text-sm text-primary-foreground/80">Total Orders</div>
          </div>
        </div>
      </div>
    </div>
  );
};

AccountHeader.propTypes = {
  user: PropTypes?.shape({
    firstName: PropTypes?.string?.isRequired,
    profileImage: PropTypes?.string?.isRequired,
    profileImageAlt: PropTypes?.string?.isRequired,
    memberSince: PropTypes?.string?.isRequired,
    loyaltyPoints: PropTypes?.number?.isRequired,
    totalOrders: PropTypes?.number?.isRequired
  })?.isRequired
};

export default AccountHeader;