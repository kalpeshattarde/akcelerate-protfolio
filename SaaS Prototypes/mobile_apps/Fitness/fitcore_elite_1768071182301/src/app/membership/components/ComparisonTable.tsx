import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface ComparisonFeature {
  category: string;
  features: {
    name: string;
    foundation: boolean | string;
    elite: boolean | string;
    champion: boolean | string;
    description?: string;
  }[];
}

const ComparisonTable = () => {
  const comparisonData: ComparisonFeature[] = [
    {
      category: 'Gym Access',
      features: [
        {
          name: 'Operating Hours',
          foundation: '6am - 10pm',
          elite: '24/7 Access',
          champion: '24/7 VIP Access'
        },
        {
          name: 'Equipment Access',
          foundation: 'Basic Equipment',
          elite: 'All Equipment',
          champion: 'Premium + Exclusive'
        },
        {
          name: 'Locker Room',
          foundation: true,
          elite: true,
          champion: 'VIP Locker Room'
        },
        {
          name: 'Guest Passes',
          foundation: false,
          elite: '4 per month',
          champion: 'Unlimited'
        }
      ]
    },
    {
      category: 'Training & Classes',
      features: [
        {
          name: 'Group Classes',
          foundation: '2 per week',
          elite: 'Unlimited',
          champion: 'Unlimited + Exclusive'
        },
        {
          name: 'Personal Training',
          foundation: false,
          elite: '2 sessions/month',
          champion: '8 sessions/month'
        },
        {
          name: 'Specialized Programs',
          foundation: false,
          elite: 'Access to 3 programs',
          champion: 'All programs + Custom'
        },
        {
          name: 'Form Analysis',
          foundation: false,
          elite: 'Monthly check-ins',
          champion: 'Weekly + Video analysis'
        }
      ]
    },
    {
      category: 'Nutrition & Wellness',
      features: [
        {
          name: 'Nutrition Consultation',
          foundation: false,
          elite: 'Quarterly sessions',
          champion: 'Dedicated coach'
        },
        {
          name: 'Meal Planning',
          foundation: false,
          elite: 'Basic templates',
          champion: 'Custom meal plans'
        },
        {
          name: 'Body Composition Analysis',
          foundation: false,
          elite: 'Monthly',
          champion: 'Bi-weekly + DEXA'
        },
        {
          name: 'Supplement Guidance',
          foundation: false,
          elite: 'Basic recommendations',
          champion: 'Personalized protocols'
        }
      ]
    },
    {
      category: 'Recovery & Amenities',
      features: [
        {
          name: 'Recovery Suite',
          foundation: false,
          elite: 'Standard access',
          champion: 'VIP suite + priority'
        },
        {
          name: 'Massage Therapy',
          foundation: false,
          elite: '20% discount',
          champion: '2 sessions/month included'
        },
        {
          name: 'Sauna & Steam',
          foundation: false,
          elite: true,
          champion: 'Private access available'
        },
        {
          name: 'Towel Service',
          foundation: false,
          elite: true,
          champion: 'Premium towels'
        }
      ]
    },
    {
      category: 'Technology & Analytics',
      features: [
        {
          name: 'Mobile App',
          foundation: 'Basic features',
          elite: 'Full access',
          champion: 'Premium + AI insights'
        },
        {
          name: 'Performance Tracking',
          foundation: false,
          elite: 'Standard metrics',
          champion: 'Advanced analytics'
        },
        {
          name: 'Wearable Integration',
          foundation: false,
          elite: true,
          champion: 'Premium devices included'
        },
        {
          name: 'Progress Reports',
          foundation: false,
          elite: 'Monthly',
          champion: 'Weekly + detailed analysis'
        }
      ]
    }
  ];

  const renderFeatureValue = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Icon name="CheckIcon" size={20} className="text-primary mx-auto" />
      ) : (
        <Icon name="XMarkIcon" size={20} className="text-muted-foreground mx-auto" />
      );
    }
    return <span className="text-xs sm:text-sm font-medium text-foreground text-center break-words">{value}</span>;
  };

  // Add plans data for mobile view
  const plans = [
    { id: 'foundation', name: 'Foundation', price: 89, popular: false, badge: null },
    { id: 'elite', name: 'Elite', price: 189, popular: true, badge: 'Most Popular' },
    { id: 'champion', name: 'Champion', price: 349, popular: false, badge: 'Premium' }
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6">
            Feature <span className="text-primary">Comparison</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            Compare all membership tiers side-by-side to find the perfect fit for your fitness journey.
          </p>
        </div>

        {/* Mobile Cards View (Small Screens) */}
        <div className="block lg:hidden space-y-6">
          {plans.map((plan, planIndex) => (
            <div key={planIndex} className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className={`p-4 text-center ${plan.popular ? 'bg-primary/5 border-b border-primary/20' : 'bg-muted/50 border-b border-border'}`}>
                <h3 className={`text-lg font-semibold ${plan.popular ? 'text-primary' : 'text-foreground'}`}>
                  {plan.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">${plan.price}/month</p>
                {plan.badge && (
                  <div className="inline-block bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full mt-2">
                    {plan.badge}
                  </div>
                )}
              </div>
              <div className="p-4 space-y-3">
                {comparisonData.map((category) => (
                  <div key={category.category}>
                    <h4 className="text-sm font-semibold text-foreground mb-2">{category.category}</h4>
                    {category.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center justify-between py-2 border-b border-border/50 last:border-b-0">
                        <span className="text-xs text-muted-foreground flex-1">{feature.name}</span>
                        <div className="flex-shrink-0 ml-2">
                          {renderFeatureValue(feature[plan.id as keyof typeof feature])}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
                <button className={`w-full mt-4 px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                  plan.popular
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'bg-muted text-foreground hover:bg-muted/80'
                }`}>
                  Choose {plan.name}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table View (Large Screens) */}
        <div className="hidden lg:block bg-card border border-border rounded-2xl overflow-hidden overflow-x-auto">
          {/* Table Header */}
          <div className="grid grid-cols-4 bg-muted/50 border-b border-border min-w-full">
            <div className="p-4 lg:p-6">
              <h3 className="text-base lg:text-lg font-semibold text-foreground">Features</h3>
            </div>
            <div className="p-4 lg:p-6 text-center border-l border-border">
              <h3 className="text-base lg:text-lg font-semibold text-foreground">Foundation</h3>
              <p className="text-sm text-muted-foreground mt-1">$89/month</p>
            </div>
            <div className="p-4 lg:p-6 text-center border-l border-border bg-primary/5">
              <h3 className="text-base lg:text-lg font-semibold text-primary">Elite</h3>
              <p className="text-sm text-primary/80 mt-1">$189/month</p>
              <div className="inline-block bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full mt-2">
                Most Popular
              </div>
            </div>
            <div className="p-4 lg:p-6 text-center border-l border-border">
              <h3 className="text-base lg:text-lg font-semibold text-foreground">Champion</h3>
              <p className="text-sm text-muted-foreground mt-1">$349/month</p>
            </div>
          </div>

          {/* Table Body */}
          {comparisonData.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              {/* Category Header */}
              <div className="grid grid-cols-4 bg-muted/30 border-b border-border">
                <div className="col-span-4 p-3 lg:p-4">
                  <h4 className="text-sm lg:text-base font-semibold text-foreground">{category.category}</h4>
                </div>
              </div>

              {/* Category Features */}
              {category.features.map((feature, featureIndex) => (
                <div 
                  key={featureIndex} 
                  className="grid grid-cols-4 border-b border-border hover:bg-muted/20 transition-colors"
                >
                  <div className="p-3 lg:p-4">
                    <span className="text-sm text-foreground">{feature.name}</span>
                    {feature.description && (
                      <p className="text-xs text-muted-foreground mt-1">{feature.description}</p>
                    )}
                  </div>
                  <div className="p-3 lg:p-4 text-center border-l border-border">
                    {renderFeatureValue(feature.foundation)}
                  </div>
                  <div className="p-3 lg:p-4 text-center border-l border-border bg-primary/5">
                    {renderFeatureValue(feature.elite)}
                  </div>
                  <div className="p-3 lg:p-4 text-center border-l border-border">
                    {renderFeatureValue(feature.champion)}
                  </div>
                </div>
              ))}
            </div>
          ))}

          {/* Table Footer */}
          <div className="grid grid-cols-4 bg-muted/50 p-4 lg:p-6">
            <div></div>
            <div className="text-center border-l border-border">
              <button className="px-4 lg:px-6 py-2 bg-muted text-foreground rounded-lg font-semibold hover:bg-muted/80 transition-colors text-sm">
                Choose Foundation
              </button>
            </div>
            <div className="text-center border-l border-border">
              <button className="px-4 lg:px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors text-sm">
                Choose Elite
              </button>
            </div>
            <div className="text-center border-l border-border">
              <button className="px-4 lg:px-6 py-2 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition-colors text-sm">
                Choose Champion
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;