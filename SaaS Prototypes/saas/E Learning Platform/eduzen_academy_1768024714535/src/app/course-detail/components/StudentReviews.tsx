'use client';

import React, { useState, useEffect } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Review {
  id: number;
  student: {
    name: string;
    image: string;
    alt: string;
    title: string;
  };
  rating: number;
  date: string;
  review: string;
  helpful: number;
}

interface StudentReviewsProps {
  reviews: Review[];
  overallRating: number;
  totalReviews: number;
  ratingDistribution: { stars: number; percentage: number }[];
}

const StudentReviews = ({ reviews, overallRating, totalReviews, ratingDistribution }: StudentReviewsProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [visibleReviews, setVisibleReviews] = useState(3);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="StarIcon"
        variant={index < Math.floor(rating) ? 'solid' : 'outline'}
        size={16}
        className={index < Math.floor(rating) ? 'text-accent' : 'text-muted'}
      />
    ));
  };

  const loadMore = () => {
    setVisibleReviews(prev => Math.min(prev + 3, reviews.length));
  };

  return (
    <section className="py-16 bg-background">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl font-headline font-semibold text-foreground mb-12 text-center">
          Student Reviews
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-1 bg-card rounded-xl p-6 text-center">
            <div className="text-5xl font-headline font-bold text-foreground mb-2">
              {overallRating}
            </div>
            {isHydrated && (
              <div className="flex items-center justify-center space-x-1 mb-2">
                {renderStars(overallRating)}
              </div>
            )}
            <p className="text-sm text-muted-foreground">
              Based on {totalReviews.toLocaleString()} reviews
            </p>
          </div>

          <div className="md:col-span-2 space-y-3">
            {ratingDistribution.map((dist) => (
              <div key={dist.stars} className="flex items-center space-x-4">
                <div className="flex items-center space-x-1 w-20">
                  <span className="text-sm font-medium text-foreground">{dist.stars}</span>
                  <Icon name="StarIcon" variant="solid" size={16} className="text-accent" />
                </div>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent transition-all duration-500"
                    style={{ width: `${dist.percentage}%` }}
                  />
                </div>
                <span className="text-sm text-muted-foreground w-12 text-right">
                  {dist.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {reviews.slice(0, visibleReviews).map((review) => (
            <div key={review.id} className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-start space-x-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <AppImage
                    src={review.student.image}
                    alt={review.student.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-foreground">{review.student.name}</h4>
                      <p className="text-sm text-muted-foreground">{review.student.title}</p>
                    </div>
                    <span className="text-sm text-muted-foreground">{review.date}</span>
                  </div>
                  {isHydrated && (
                    <div className="flex items-center space-x-1 mb-3">
                      {renderStars(review.rating)}
                    </div>
                  )}
                  <p className="text-muted-foreground font-body leading-relaxed mb-4">
                    {review.review}
                  </p>
                  <button className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                    <Icon name="HandThumbUpIcon" size={16} />
                    <span>Helpful ({review.helpful})</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {visibleReviews < reviews.length && (
          <div className="text-center mt-8">
            <button
              onClick={loadMore}
              className="px-8 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              Load More Reviews
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default StudentReviews;