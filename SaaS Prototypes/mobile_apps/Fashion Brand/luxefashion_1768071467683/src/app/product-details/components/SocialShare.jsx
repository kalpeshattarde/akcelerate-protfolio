'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import PropTypes from 'prop-types';

const SocialShare = ({ product }) => {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? window.location?.href : '';
  const shareText = `Check out this amazing ${product?.name} from ${product?.brand}!`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard?.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleShare = (platform) => {
    let url = '';
    
    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'pinterest':
        url = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&description=${encodeURIComponent(shareText)}`;
        break;
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
        break;
      default:
        return;
    }

    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareButtons = [
    { platform: 'facebook', icon: 'ShareIcon', label: 'Facebook', color: 'hover:text-blue-600' },
    { platform: 'twitter', icon: 'ChatBubbleLeftRightIcon', label: 'Twitter', color: 'hover:text-blue-400' },
    { platform: 'pinterest', icon: 'PhotoIcon', label: 'Pinterest', color: 'hover:text-red-600' },
    { platform: 'whatsapp', icon: 'ChatBubbleBottomCenterTextIcon', label: 'WhatsApp', color: 'hover:text-green-600' },
  ];

  return (
    <div className="bg-card p-6 rounded-lg">
      <h3 className="font-heading font-semibold text-lg mb-4">Share This Product</h3>
      <div className="flex items-center space-x-4">
        {/* Social Share Buttons */}
        {shareButtons?.map((button) => (
          <button
            key={button?.platform}
            onClick={() => handleShare(button?.platform)}
            className={`w-10 h-10 rounded-full border border-border flex items-center justify-center transition-all hover:border-muted-foreground ${button?.color} btn-press`}
            aria-label={`Share on ${button?.label}`}
          >
            <Icon name={button?.icon} size={20} />
          </button>
        ))}

        {/* Copy Link Button */}
        <button
          onClick={handleCopyLink}
          className="flex items-center space-x-2 px-4 py-2 border border-border rounded-full transition-all hover:border-muted-foreground hover:bg-muted btn-press"
        >
          <Icon name={copied ? "CheckIcon" : "LinkIcon"} size={16} />
          <span className="text-sm font-medium">
            {copied ? 'Copied!' : 'Copy Link'}
          </span>
        </button>
      </div>
      {/* Wishlist Button */}
      <div className="mt-4 pt-4 border-t border-border">
        <button className="flex items-center space-x-2 text-muted-foreground hover:text-accent transition-colors btn-press">
          <Icon name="HeartIcon" size={20} />
          <span className="font-medium">Add to Wishlist</span>
        </button>
      </div>
    </div>
  );
};

SocialShare.propTypes = {
  product: PropTypes?.shape({
    name: PropTypes?.string?.isRequired,
    brand: PropTypes?.string?.isRequired,
  })?.isRequired,
};

export default SocialShare;