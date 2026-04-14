'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface EnrollmentCardProps {
  price: number;
  originalPrice: number;
  discount: number;
  features: string[];
}

const EnrollmentCard = ({ price, originalPrice, discount, features }: EnrollmentCardProps) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`bg-card border border-border rounded-xl p-8 space-y-6 transition-all duration-300 ${
        isSticky ? 'sticky top-24' : ''
      }`}
    >
      <div className="space-y-2">
        <div className="flex items-baseline space-x-3">
          <span className="text-4xl font-headline font-bold text-foreground">${price}</span>
          <span className="text-xl text-muted-foreground line-through">${originalPrice}</span>
        </div>
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-success/10 text-success rounded-full">
          <Icon name="TagIcon" size={16} />
          <span className="text-sm font-medium">{discount}% OFF - Limited Time</span>
        </div>
      </div>

      <div className="space-y-3">
        <Link
          href="/pricing"
          className="block w-full px-6 py-4 bg-primary text-primary-foreground font-cta font-semibold text-center rounded-lg hover:shadow-cta transition-all duration-300 hover:-translate-y-0.5"
        >
          Enroll Now
        </Link>
        <button className="w-full px-6 py-4 border-2 border-primary text-primary font-cta font-medium rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300">
          Add to Wishlist
        </button>
      </div>

      <div className="pt-6 border-t border-border space-y-4">
        <h4 className="font-headline font-semibold text-foreground">This course includes:</h4>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start space-x-3">
              <Icon name="CheckCircleIcon" variant="solid" size={20} className="text-success mt-0.5 flex-shrink-0" />
              <span className="text-sm text-muted-foreground font-body">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-6 border-t border-border space-y-3">
        <button className="w-full flex items-center justify-center space-x-2 text-primary hover:text-primary/80 transition-colors duration-200">
          <Icon name="ShareIcon" size={20} />
          <span className="font-medium">Share this course</span>
        </button>
        <button className="w-full flex items-center justify-center space-x-2 text-primary hover:text-primary/80 transition-colors duration-200">
          <Icon name="GiftIcon" size={20} />
          <span className="font-medium">Gift this course</span>
        </button>
      </div>

      <div className="pt-6 border-t border-border">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="ShieldCheckIcon" size={20} className="text-success" />
          <span>30-day money-back guarantee</span>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentCard;