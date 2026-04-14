import DashboardInteractive from './components/DashboardInteractive';

export const metadata = {
  title: 'User Account Dashboard - LuxeFashion',
  description: 'Manage your account, view orders, track shipments, and access personalized recommendations in your LuxeFashion dashboard.'
};

export default function UserAccountDashboard() {
  const mockData = {
    user: {
      firstName: "Sarah",
      profileImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1274dd504-1762275023732.png",
      profileImageAlt: "Professional headshot of young woman with shoulder-length brown hair wearing white blazer",
      memberSince: "March 2023",
      loyaltyPoints: 2450,
      totalOrders: 18
    },
    quickActions: [
    {
      id: "track-order",
      label: "Track Orders",
      icon: "TruckIcon",
      href: "/orders"
    },
    {
      id: "reorder",
      label: "Reorder Items",
      icon: "ArrowPathIcon",
      href: "/reorder"
    },
    {
      id: "wishlist",
      label: "My Wishlist",
      icon: "HeartIcon",
      href: "/wishlist"
    },
    {
      id: "support",
      label: "Get Support",
      icon: "ChatBubbleLeftRightIcon",
      href: "/support"
    }],

    recentOrders: [
    {
      id: "ord-001",
      orderNumber: "LF240001",
      status: "Delivered",
      date: "November 10, 2024",
      total: "289.99",
      items: [
      {
        name: "Premium Oversized Hoodie",
        image: "https://images.unsplash.com/photo-1643217428854-65ac52a8eb98",
        alt: "Black oversized hoodie with minimalist design on white background",
        size: "M",
        quantity: 1,
        price: "129.99"
      },
      {
        name: "Luxury Denim Jacket",
        image: "https://images.unsplash.com/photo-1721029194707-07589dacf836",
        alt: "Classic blue denim jacket with silver buttons laid flat",
        size: "M",
        quantity: 1,
        price: "159.99"
      }]

    },
    {
      id: "ord-002",
      orderNumber: "LF240002",
      status: "Shipped",
      date: "November 14, 2024",
      total: "199.99",
      items: [
      {
        name: "Designer Sneakers",
        image: "https://images.unsplash.com/photo-1710472171218-da46dce3faf9",
        alt: "White leather sneakers with gold accents on clean background",
        size: "9",
        quantity: 1,
        price: "199.99"
      }]

    },
    {
      id: "ord-003",
      orderNumber: "LF240003",
      status: "Processing",
      date: "November 16, 2024",
      total: "349.98",
      items: [
      {
        name: "Cashmere Blend Sweater",
        image: "https://images.unsplash.com/photo-1636545637399-5dba186e1f0f",
        alt: "Cream colored cashmere sweater folded neatly showing soft texture",
        size: "S",
        quantity: 2,
        price: "174.99"
      }]

    }],

    accountData: {
      profile: {
        firstName: "Sarah",
        lastName: "Johnson",
        email: "sarah.johnson@email.com",
        phone: "+1 (555) 123-4567",
        dateOfBirth: "1992-08-15"
      },
      shippingAddress: {
        street: "123 Fashion Avenue, Apt 4B",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "United States"
      },
      paymentMethods: [
      {
        id: "pm-001",
        lastFour: "4242",
        brand: "Visa",
        expiry: "12/26",
        isDefault: true
      },
      {
        id: "pm-002",
        lastFour: "8888",
        brand: "Mastercard",
        expiry: "08/25",
        isDefault: false
      }],

      preferences: {
        emailNotifications: true,
        smsNotifications: false,
        marketingEmails: true
      }
    },
    wishlistItems: [
    {
      id: "wl-001",
      name: "Limited Edition Leather Jacket",
      brand: "LuxeFashion",
      image: "https://images.unsplash.com/photo-1588259166431-00a7e44b2712",
      alt: "Black leather motorcycle jacket with silver zippers on model",
      originalPrice: "399.99",
      salePrice: "299.99",
      inStock: true
    },
    {
      id: "wl-002",
      name: "Silk Midi Dress",
      brand: "Elegance Co",
      image: "https://images.unsplash.com/photo-1678536518628-4961623288e7",
      alt: "Flowing emerald green silk dress on dress form against white background",
      originalPrice: "249.99",
      inStock: false
    },
    {
      id: "wl-003",
      name: "Premium Wool Coat",
      brand: "Winter Luxe",
      image: "https://images.unsplash.com/photo-1708712107740-28d360d0a30d",
      alt: "Camel colored wool coat with belt displayed on hanger",
      originalPrice: "599.99",
      inStock: true
    }],

    loyaltyData: {
      currentTier: "Gold",
      nextTier: "Platinum",
      currentPoints: 2450,
      nextTierPoints: 5000,
      pointsToNextTier: 2550,
      availableRewards: [
      {
        id: "reward-001",
        name: "Free Shipping",
        points: 100
      },
      {
        id: "reward-002",
        name: "$25 Off Next Purchase",
        points: 500
      },
      {
        id: "reward-003",
        name: "Exclusive Early Access",
        points: 1000
      }],

      tierBenefits: [
      "Free shipping on all orders",
      "15% off sale items",
      "Birthday month discount",
      "Priority customer support"],

      recentActivity: [
      {
        id: "activity-001",
        description: "Purchase - Order #LF240001",
        date: "November 10, 2024",
        points: 290
      },
      {
        id: "activity-002",
        description: "Product Review",
        date: "November 8, 2024",
        points: 50
      },
      {
        id: "activity-003",
        description: "Redeemed - Free Shipping",
        date: "November 5, 2024",
        points: -100
      }]

    },
    recommendations: [
    {
      id: "rec-001",
      name: "Minimalist Turtleneck",
      brand: "Essential Basics",
      image: "https://images.unsplash.com/photo-1687275152975-52df19f931d0",
      alt: "Black turtleneck sweater on model against neutral background",
      originalPrice: "89.99",
      rating: 4.8,
      reason: "Similar Style"
    },
    {
      id: "rec-002",
      name: "High-Waisted Trousers",
      brand: "Modern Fit",
      image: "https://images.unsplash.com/photo-1611601111655-54348d5c72ce",
      alt: "Tailored black high-waisted trousers on model in studio setting",
      originalPrice: "149.99",
      salePrice: "119.99",
      rating: 4.6,
      reason: "Trending"
    },
    {
      id: "rec-003",
      name: "Statement Earrings",
      brand: "Jewelry Luxe",
      image: "https://images.unsplash.com/photo-1690474086722-44dba840b0b6",
      alt: "Gold geometric drop earrings displayed on marble surface",
      originalPrice: "79.99",
      rating: 4.9,
      reason: "Complete the Look"
    },
    {
      id: "rec-004",
      name: "Crossbody Bag",
      brand: "Urban Carry",
      image: "https://images.unsplash.com/photo-1728103601003-e74706fc3ba7",
      alt: "Brown leather crossbody bag with adjustable strap on white background",
      originalPrice: "199.99",
      rating: 4.7,
      reason: "Frequently Bought Together"
    }]

  };

  return <DashboardInteractive initialData={mockData} />;
}