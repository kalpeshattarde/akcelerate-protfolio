'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import PropTypes from 'prop-types';

const ProductTabs = ({ product, reviews }) => {
  const [activeTab, setActiveTab] = useState('description');

  const tabs = [
    { id: 'description', label: 'Description', icon: 'DocumentTextIcon' },
    { id: 'sizing', label: 'Size & Care', icon: 'ScaleIcon' },
    { id: 'reviews', label: `Reviews (${reviews?.length})`, icon: 'StarIcon' },
  ];

  const renderStars = (rating) => {
    return [...Array(5)]?.map((_, i) => (
      <Icon
        key={i}
        name="StarIcon"
        size={16}
        variant={i < Math.floor(rating) ? "solid" : "outline"}
        className={i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}
      />
    ));
  };

  return (
    <div className="bg-background">
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <div className="flex space-x-8">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors btn-press ${
                activeTab === tab?.id
                  ? 'border-accent text-accent' :'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={20} />
              <span className="font-medium">{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Tab Content */}
      <div className="py-6">
        {activeTab === 'description' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-heading font-bold text-lg mb-3">Product Description</h3>
              <div className="prose prose-gray max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  {product?.description}
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-heading font-semibold mb-3">Key Features</h4>
              <ul className="space-y-2">
                {product?.features?.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <Icon name="CheckIcon" size={16} className="text-accent mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-semibold mb-3">Materials</h4>
              <p className="text-muted-foreground">{product?.materials}</p>
            </div>
          </div>
        )}

        {activeTab === 'sizing' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-heading font-bold text-lg mb-3">Size Chart</h3>
              <div className="overflow-x-auto">
                <table className="w-full border border-border">
                  <thead>
                    <tr className="bg-muted">
                      <th className="border border-border px-4 py-2 text-left font-semibold">Size</th>
                      <th className="border border-border px-4 py-2 text-left font-semibold">Chest (inches)</th>
                      <th className="border border-border px-4 py-2 text-left font-semibold">Waist (inches)</th>
                      <th className="border border-border px-4 py-2 text-left font-semibold">Length (inches)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-border px-4 py-2">XS</td>
                      <td className="border border-border px-4 py-2">32-34</td>
                      <td className="border border-border px-4 py-2">26-28</td>
                      <td className="border border-border px-4 py-2">26</td>
                    </tr>
                    <tr className="bg-muted/50">
                      <td className="border border-border px-4 py-2">S</td>
                      <td className="border border-border px-4 py-2">34-36</td>
                      <td className="border border-border px-4 py-2">28-30</td>
                      <td className="border border-border px-4 py-2">27</td>
                    </tr>
                    <tr>
                      <td className="border border-border px-4 py-2">M</td>
                      <td className="border border-border px-4 py-2">36-38</td>
                      <td className="border border-border px-4 py-2">30-32</td>
                      <td className="border border-border px-4 py-2">28</td>
                    </tr>
                    <tr className="bg-muted/50">
                      <td className="border border-border px-4 py-2">L</td>
                      <td className="border border-border px-4 py-2">38-40</td>
                      <td className="border border-border px-4 py-2">32-34</td>
                      <td className="border border-border px-4 py-2">29</td>
                    </tr>
                    <tr>
                      <td className="border border-border px-4 py-2">XL</td>
                      <td className="border border-border px-4 py-2">40-42</td>
                      <td className="border border-border px-4 py-2">34-36</td>
                      <td className="border border-border px-4 py-2">30</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h4 className="font-heading font-semibold mb-3">Care Instructions</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Icon name="SparklesIcon" size={16} className="text-accent" />
                  <span className="text-muted-foreground">Machine wash cold with like colors</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="SunIcon" size={16} className="text-accent" />
                  <span className="text-muted-foreground">Tumble dry low or hang to dry</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="FireIcon" size={16} className="text-accent" />
                  <span className="text-muted-foreground">Iron on low heat if needed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="XMarkIcon" size={16} className="text-error" />
                  <span className="text-muted-foreground">Do not bleach or dry clean</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-lg">Customer Reviews</h3>
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {renderStars(product?.rating)}
                </div>
                <span className="font-semibold">{product?.rating}</span>
                <span className="text-muted-foreground">({reviews?.length} reviews)</span>
              </div>
            </div>

            <div className="space-y-6">
              {reviews?.map((review) => (
                <div key={review?.id} className="border-b border-border pb-6 last:border-b-0">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      <AppImage
                        src={review?.user?.avatar}
                        alt={review?.user?.alt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">{review?.user?.name}</h4>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center">
                              {renderStars(review?.rating)}
                            </div>
                            <span className="text-sm text-muted-foreground">{review?.date}</span>
                          </div>
                        </div>
                        {review?.verified && (
                          <span className="bg-success text-success-foreground text-xs font-medium px-2 py-1 rounded-full">
                            Verified Purchase
                          </span>
                        )}
                      </div>
                      <p className="text-muted-foreground mb-3">{review?.comment}</p>
                      {review?.images && review?.images?.length > 0 && (
                        <div className="flex space-x-2">
                          {review?.images?.map((image, index) => (
                            <div key={index} className="w-16 h-16 rounded-lg overflow-hidden">
                              <AppImage
                                src={image?.url}
                                alt={image?.alt}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

ProductTabs.propTypes = {
  product: PropTypes?.shape({
    description: PropTypes?.string?.isRequired,
    features: PropTypes?.arrayOf(PropTypes?.string)?.isRequired,
    materials: PropTypes?.string?.isRequired,
    rating: PropTypes?.number?.isRequired,
  })?.isRequired,
  reviews: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.number?.isRequired,
      user: PropTypes?.shape({
        name: PropTypes?.string?.isRequired,
        avatar: PropTypes?.string?.isRequired,
        alt: PropTypes?.string?.isRequired,
      })?.isRequired,
      rating: PropTypes?.number?.isRequired,
      comment: PropTypes?.string?.isRequired,
      date: PropTypes?.string?.isRequired,
      verified: PropTypes?.bool,
      images: PropTypes?.arrayOf(
        PropTypes?.shape({
          url: PropTypes?.string?.isRequired,
          alt: PropTypes?.string?.isRequired,
        })
      ),
    })
  )?.isRequired,
};

export default ProductTabs;