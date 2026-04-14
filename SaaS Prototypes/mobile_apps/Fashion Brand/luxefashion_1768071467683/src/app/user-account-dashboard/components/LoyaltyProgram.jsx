import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

const LoyaltyProgram = ({ loyaltyData }) => {
  const progressPercentage = (loyaltyData?.currentPoints / loyaltyData?.nextTierPoints) * 100;

  const getTierColor = (tier) => {
    switch (tier?.toLowerCase()) {
      case 'bronze':
        return 'text-amber-600 bg-amber-50';
      case 'silver':
        return 'text-gray-600 bg-gray-50';
      case 'gold':
        return 'text-yellow-600 bg-yellow-50';
      case 'platinum':
        return 'text-purple-600 bg-purple-50';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="bg-card p-6">
      <h2 className="text-xl font-heading font-bold text-card-foreground mb-6">Loyalty Program</h2>
      <div className="bg-gradient-to-r from-primary to-secondary text-primary-foreground p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-heading font-bold text-lg">{loyaltyData?.currentTier} Member</h3>
            <p className="text-primary-foreground/80">Current Status</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-heading font-bold text-accent">{loyaltyData?.currentPoints}</div>
            <div className="text-sm text-primary-foreground/80">Points Available</div>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span>Progress to {loyaltyData?.nextTier}</span>
            <span>{loyaltyData?.pointsToNextTier} points to go</span>
          </div>
          <div className="w-full bg-primary-foreground/20 h-2">
            <div 
              className="bg-accent h-2 transition-all duration-500"
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            />
          </div>
        </div>
        
        <p className="text-sm text-primary-foreground/80">
          Earn {loyaltyData?.pointsToNextTier} more points to unlock {loyaltyData?.nextTier} benefits!
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-background border border-border p-4">
          <div className="flex items-center gap-3 mb-3">
            <Icon name="GiftIcon" size={20} className="text-accent" />
            <h4 className="font-heading font-semibold text-foreground">Available Rewards</h4>
          </div>
          <div className="space-y-2">
            {loyaltyData?.availableRewards?.map((reward) => (
              <div key={reward?.id} className="flex items-center justify-between">
                <span className="text-sm text-foreground">{reward?.name}</span>
                <span className="text-xs bg-accent text-accent-foreground px-2 py-1 font-medium">
                  {reward?.points} pts
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-background border border-border p-4">
          <div className="flex items-center gap-3 mb-3">
            <Icon name="StarIcon" size={20} className="text-accent" />
            <h4 className="font-heading font-semibold text-foreground">Tier Benefits</h4>
          </div>
          <div className="space-y-2">
            {loyaltyData?.tierBenefits?.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2">
                <Icon name="CheckIcon" size={16} className="text-success" />
                <span className="text-sm text-foreground">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-background border border-border p-4">
        <h4 className="font-heading font-semibold text-foreground mb-3">Recent Activity</h4>
        <div className="space-y-3">
          {loyaltyData?.recentActivity?.map((activity) => (
            <div key={activity?.id} className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
              <div>
                <p className="text-sm font-medium text-foreground">{activity?.description}</p>
                <p className="text-xs text-muted-foreground">{activity?.date}</p>
              </div>
              <div className="text-right">
                <span className={`text-sm font-medium ${
                  activity?.points > 0 ? 'text-success' : 'text-error'
                }`}>
                  {activity?.points > 0 ? '+' : ''}{activity?.points} pts
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

LoyaltyProgram.propTypes = {
  loyaltyData: PropTypes?.shape({
    currentTier: PropTypes?.string?.isRequired,
    nextTier: PropTypes?.string?.isRequired,
    currentPoints: PropTypes?.number?.isRequired,
    nextTierPoints: PropTypes?.number?.isRequired,
    pointsToNextTier: PropTypes?.number?.isRequired,
    availableRewards: PropTypes?.arrayOf(
      PropTypes?.shape({
        id: PropTypes?.string?.isRequired,
        name: PropTypes?.string?.isRequired,
        points: PropTypes?.number?.isRequired
      })
    )?.isRequired,
    tierBenefits: PropTypes?.arrayOf(PropTypes?.string)?.isRequired,
    recentActivity: PropTypes?.arrayOf(
      PropTypes?.shape({
        id: PropTypes?.string?.isRequired,
        description: PropTypes?.string?.isRequired,
        date: PropTypes?.string?.isRequired,
        points: PropTypes?.number?.isRequired
      })
    )?.isRequired
  })?.isRequired
};

export default LoyaltyProgram;