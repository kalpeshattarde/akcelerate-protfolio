import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const BenefitsSection = () => {
  const benefitCategories = [
    {
      id: 1,
      title: "Health & Wellness",
      icon: "Heart",
      color: "text-primary",
      benefits: [
        {
          name: "Premium Health Insurance",
          description: "100% covered medical, dental, and vision for you and your family",
          icon: "Shield"
        },
        {
          name: "Mental Health Support",
          description: "Therapy sessions, meditation apps, and wellness programs",
          icon: "Brain"
        },
        {
          name: "Fitness Allowance",
          description: "$200/month for gym memberships, fitness classes, or equipment",
          icon: "Dumbbell"
        },
        {
          name: "Flexible PTO",
          description: "Unlimited paid time off with a minimum 3-week requirement",
          icon: "Calendar"
        }
      ]
    },
    {
      id: 2,
      title: "Growth & Learning",
      icon: "TrendingUp",
      color: "text-accent",
      benefits: [
        {
          name: "Learning Budget",
          description: "$3,000 annual budget for courses, conferences, and certifications",
          icon: "BookOpen"
        },
        {
          name: "Conference Attendance",
          description: "Speak at or attend 2+ industry conferences per year",
          icon: "Mic"
        },
        {
          name: "Internal Mentorship",
          description: "Paired mentorship program with senior team members",
          icon: "Users"
        },
        {
          name: "Innovation Time",
          description: "20% time for personal projects and experimentation",
          icon: "Lightbulb"
        }
      ]
    },
    {
      id: 3,
      title: "Work-Life Balance",
      icon: "Scale",
      color: "text-trust",
      benefits: [
        {
          name: "Remote-First Culture",
          description: "Work from anywhere with quarterly team gatherings",
          icon: "Home"
        },
        {
          name: "Flexible Hours",
          description: "Core hours 10am-3pm, otherwise work when you're most productive",
          icon: "Clock"
        },
        {
          name: "Sabbatical Program",
          description: "4-week paid sabbatical after 3 years of service",
          icon: "Plane"
        },
        {
          name: "Family Support",
          description: "12 weeks parental leave and childcare assistance",
          icon: "Baby"
        }
      ]
    },
    {
      id: 4,
      title: "Financial & Equity",
      icon: "DollarSign",
      color: "text-primary",
      benefits: [
        {
          name: "Competitive Salary",
          description: "Market-rate compensation reviewed annually",
          icon: "TrendingUp"
        },
        {
          name: "Equity Package",
          description: "Meaningful ownership in the company\'s success",
          icon: "PieChart"
        },
        {
          name: "401(k) Matching",
          description: "6% company match with immediate vesting",
          icon: "Piggybank"
        },
        {
          name: "Performance Bonuses",
          description: "Quarterly bonuses based on individual and company performance",
          icon: "Award"
        }
      ]
    }
  ];

  const perks = [
    {
      id: 1,
      icon: "Coffee",
      title: "Premium Equipment",
      description: "Latest MacBook Pro, 4K monitors, and ergonomic setup"
    },
    {
      id: 2,
      icon: "Gamepad2",
      title: "Team Activities",
      description: "Game nights, hackathons, and creative challenges"
    },
    {
      id: 3,
      icon: "Utensils",
      title: "Food & Drinks",
      description: "Catered meals, snacks, and premium coffee in office"
    },
    {
      id: 4,
      icon: "Car",
      title: "Commuter Benefits",
      description: "Transit passes, parking, or bike maintenance allowance"
    },
    {
      id: 5,
      icon: "Smartphone",
      title: "Tech Stipend",
      description: "$100/month for phone, internet, and software subscriptions"
    },
    {
      id: 6,
      icon: "Gift",
      title: "Celebration Budget",
      description: "Team celebrations for milestones and achievements"
    }
  ];

  return (
    <section className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            Benefits & Perks
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            We believe in taking care of our team members so they can do their best work. 
            Here's how we support your growth, health, and happiness.
          </p>
        </motion.div>

        {/* Benefits Categories */}
        <div className="space-y-16 mb-20">
          {benefitCategories?.map((category, categoryIndex) => (
            <motion.div
              key={category?.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
            >
              {/* Category Header */}
              <div className="flex items-center space-x-3 mb-8">
                <div className={`p-3 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 ${category?.color}`}>
                  <Icon name={category?.icon} size={24} />
                </div>
                <h3 className="text-2xl font-bold text-text-primary">
                  {category?.title}
                </h3>
              </div>

              {/* Benefits Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category?.benefits?.map((benefit, benefitIndex) => (
                  <motion.div
                    key={benefitIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: benefitIndex * 0.1 }}
                    className="bg-background rounded-lg p-6 hover:shadow-medium transition-all duration-300 group"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                        <Icon name={benefit?.icon} size={20} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors duration-300">
                          {benefit?.name}
                        </h4>
                        <p className="text-text-secondary text-sm leading-relaxed">
                          {benefit?.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Perks */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-3xl font-bold text-text-primary text-center mb-12">
            Additional Perks
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {perks?.map((perk, index) => (
              <motion.div
                key={perk?.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-background rounded-lg p-6 text-center hover:shadow-medium transition-all duration-300 group"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon name={perk?.icon} size={20} className="text-primary" />
                </div>
                <h4 className="font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors duration-300">
                  {perk?.title}
                </h4>
                <p className="text-text-secondary text-sm">
                  {perk?.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-12 mt-16"
        >
          <Icon name="Quote" size={48} className="text-primary mx-auto mb-6" />
          <blockquote className="text-xl md:text-2xl font-medium text-text-primary mb-6 leading-relaxed">
            "FlowTech Studio doesn't just offer great benefits—they create an environment where you can truly thrive both professionally and personally. It's the best decision I've made for my career."
          </blockquote>
          <cite className="text-lg text-text-secondary font-medium">
            — Sarah Chen, Lead Creative Technologist
          </cite>
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsSection;