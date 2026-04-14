import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const NewsletterSubscription = () => {
  const [email, setEmail] = useState('');
  const [interests, setInterests] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const interestOptions = [
  { id: 'technology', label: 'Technology Insights', description: 'Latest trends in AI, ML, and emerging tech' },
  { id: 'design', label: 'Design Innovation', description: 'UX/UI best practices and design thinking' },
  { id: 'business', label: 'Business Strategy', description: 'Digital transformation and growth strategies' },
  { id: 'case-studies', label: 'Case Studies', description: 'Real-world project insights and outcomes' }];


  const benefits = [
  {
    icon: 'Zap',
    title: 'Weekly Insights',
    description: 'Curated content delivered every Tuesday'
  },
  {
    icon: 'Users',
    title: 'Exclusive Community',
    description: 'Access to our private Slack community'
  },
  {
    icon: 'Download',
    title: 'Premium Resources',
    description: 'Free access to templates and frameworks'
  },
  {
    icon: 'Calendar',
    title: 'Event Invites',
    description: 'First access to webinars and workshops'
  }];


  const handleInterestChange = (interestId, checked) => {
    if (checked) {
      setInterests([...interests, interestId]);
    } else {
      setInterests(interests?.filter((id) => id !== interestId));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubscribed(true);
    setLoading(false);
  };

  if (isSubscribed) {
    return (
      <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-background rounded-2xl p-12 card-elevated">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="CheckCircle" size={32} className="text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Welcome to the FlowTech Community!
            </h2>
            <p className="text-lg text-text-secondary mb-8">
              Thank you for subscribing. You'll receive your first insights newsletter within the next 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button
                variant="default"
                iconName="Slack"
                iconPosition="left">

                Join Slack Community
              </Button>
              <Button
                variant="outline"
                iconName="ArrowLeft"
                iconPosition="left"
                onClick={() => setIsSubscribed(false)}>

                Subscribe Another Email
              </Button>
            </div>
          </div>
        </div>
      </section>);

  }

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Benefits */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              Stay Ahead of the Curve
            </h2>
            <p className="text-lg text-text-secondary mb-8">
              Join 25,000+ innovators who rely on our insights to make better technology decisions. 
              Get exclusive access to our research, frameworks, and community.
            </p>

            <div className="space-y-6">
              {benefits?.map((benefit, index) =>
              <div key={index} className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name={benefit?.icon} size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary mb-1">
                      {benefit?.title}
                    </h3>
                    <p className="text-text-secondary text-sm">
                      {benefit?.description}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Social Proof */}
            <div className="mt-8 p-4 bg-background/50 rounded-lg border border-border">
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-2">
                  <img
                    src="https://images.unsplash.com/photo-1646041805292-fd77781436f9"
                    alt="Professional headshot of Asian woman with shoulder-length black hair wearing navy blazer"
                    className="w-8 h-8 rounded-full border-2 border-white object-cover" />

                  <img
                    src="https://images.unsplash.com/photo-1713946598186-8e28275719b9"
                    alt="Professional portrait of Hispanic man with beard wearing dark suit and glasses"
                    className="w-8 h-8 rounded-full border-2 border-white object-cover" />

                  <img
                    src="https://images.unsplash.com/photo-1503087065990-e2ef69dc88b4"
                    alt="Professional headshot of Asian man with short black hair wearing navy blue sweater"
                    className="w-8 h-8 rounded-full border-2 border-white object-cover" />

                </div>
                <div>
                  <p className="text-sm text-text-primary font-medium">
                    Join 25,000+ subscribers
                  </p>
                  <p className="text-xs text-text-secondary">
                    Including CTOs from Fortune 500 companies
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-background rounded-2xl p-8 card-elevated">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  Subscribe to Our Newsletter
                </h3>
                <p className="text-text-secondary text-sm">
                  Get weekly insights delivered to your inbox. No spam, unsubscribe anytime.
                </p>
              </div>

              {/* Email Input */}
              <Input
                type="email"
                label="Email Address"
                placeholder="your.email@company.com"
                value={email}
                onChange={(e) => setEmail(e?.target?.value)}
                required
                className="mb-6" />


              {/* Interest Selection */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-3">
                  What interests you most? (Optional)
                </label>
                <div className="space-y-3">
                  {interestOptions?.map((option) =>
                  <Checkbox
                    key={option?.id}
                    label={option?.label}
                    description={option?.description}
                    checked={interests?.includes(option?.id)}
                    onChange={(e) => handleInterestChange(option?.id, e?.target?.checked)} />

                  )}
                </div>
              </div>

              {/* Privacy Notice */}
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-start space-x-3">
                  <Icon name="Shield" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-text-secondary">
                      We respect your privacy. Your email will only be used for our newsletter 
                      and you can unsubscribe at any time. Read our{' '}
                      <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="default"
                size="lg"
                fullWidth
                loading={loading}
                disabled={!email}
                className="btn-magnetic"
                iconName="Send"
                iconPosition="left">

                {loading ? 'Subscribing...' : 'Subscribe Now'}
              </Button>

              {/* Additional Info */}
              <div className="text-center">
                <p className="text-xs text-text-secondary">
                  By subscribing, you agree to receive marketing emails from FlowTech Studio.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>);

};

export default NewsletterSubscription;