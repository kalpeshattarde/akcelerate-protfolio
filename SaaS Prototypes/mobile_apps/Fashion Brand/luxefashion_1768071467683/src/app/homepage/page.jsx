import HomepageInteractive from './components/HomepageInteractive';

export const metadata = {
  title: 'LuxeFashion - Premium Streetwear & Luxury Fashion',
  description: 'Discover the latest in luxury streetwear and high-end fashion. Shop curated collections from top designers with fast delivery and premium quality guarantee.'
};

export default function Homepage() {
  const pageData = {
    heroData: {
      title: "REDEFINE YOUR STYLE",
      subtitle: "Discover the perfect fusion of luxury and streetwear with our curated collection of premium fashion pieces that speak to your unique aesthetic.",
      primaryCta: "Shop Collection",
      secondaryCta: "View Lookbook",
      mainImage: {
        src: "https://images.unsplash.com/photo-1697095249680-b6aa0fcd8578",
        alt: "Confident young woman in oversized black blazer and gold jewelry posing against urban concrete wall"
      },
      secondaryImage: {
        src: "https://images.unsplash.com/photo-1674051388219-3ea61c1ef6dd",
        alt: "Stylish man in premium white streetwear hoodie and designer accessories in modern studio setting"
      }
    },
    topPicks: [
    {
      id: 1,
      name: "Oversized Luxury Hoodie",
      description: "Premium cotton blend hoodie with embossed logo detailing and relaxed fit",
      price: 189,
      originalPrice: 249,
      image: "https://images.unsplash.com/photo-1615441210974-74d0e1c4dfb7",
      alt: "Gray oversized hoodie with minimalist design on wooden hanger against white background"
    },
    {
      id: 2,
      name: "Designer Denim Jacket",
      description: "Vintage-inspired denim jacket with contemporary cuts and premium hardware",
      price: 299,
      image: "https://images.unsplash.com/photo-1572122936109-ce84b9cd5439",
      alt: "Classic blue denim jacket with silver buttons and distressed details on model"
    },
    {
      id: 3,
      name: "Statement Cargo Pants",
      description: "Technical fabric cargo pants with multiple pockets and tapered fit",
      price: 159,
      originalPrice: 199,
      image: "https://images.unsplash.com/photo-1582461409975-2f92f3820e7c",
      alt: "Black tactical cargo pants with utility pockets and adjustable straps on model"
    },
    {
      id: 4,
      name: "Luxury Sneakers",
      description: "Hand-crafted leather sneakers with premium materials and comfort technology",
      price: 349,
      image: "https://images.unsplash.com/photo-1715694031128-3ca9662a387b",
      alt: "White leather luxury sneakers with gold accents on clean white surface"
    },
    {
      id: 5,
      name: "Graphic Tee Collection",
      description: "Limited edition graphic tees featuring exclusive artist collaborations",
      price: 89,
      image: "https://images.unsplash.com/photo-1587638258742-0c605a56b2fe",
      alt: "Black graphic t-shirt with artistic print design displayed on mannequin"
    }],

    editorialItems: [
    {
      id: 1,
      title: "Urban Minimalism",
      description: "Discover the art of understated luxury with clean lines and premium materials that define modern streetwear elegance.",
      category: "Editorial",
      image: "https://images.unsplash.com/photo-1664585479419-87666004201e",
      alt: "Fashion model in minimalist black outfit walking through modern urban architecture",
      productId: 1,
      productName: "Oversized Luxury Hoodie",
      productPrice: 189
    },
    {
      id: 2,
      title: "Street Couture",
      description: "Where high fashion meets street culture - explore bold statements and innovative designs.",
      category: "Lookbook",
      image: "https://images.unsplash.com/photo-1727107045061-42e6158551c6",
      alt: "Stylish woman in designer streetwear posing confidently in urban graffiti setting",
      productId: 2,
      productName: "Designer Denim Jacket",
      productPrice: 299
    },
    {
      id: 3,
      title: "Future Forward",
      description: "Embrace tomorrow\'s fashion today with cutting-edge designs and sustainable luxury materials.",
      category: "Trend",
      image: "https://images.unsplash.com/photo-1644571197707-11b182dd0fd9",
      alt: "Model showcasing futuristic fashion pieces in high-tech studio environment with dramatic lighting"
    },
    {
      id: 4,
      title: "Seasonal Essentials",
      description: "Timeless pieces that transcend seasons while maintaining contemporary relevance and style.",
      category: "Collection",
      image: "https://images.unsplash.com/photo-1592233810486-f73c28198a07",
      alt: "Curated flat lay of essential fashion items including accessories and clothing on marble surface",
      productId: 3,
      productName: "Statement Cargo Pants",
      productPrice: 159
    }],

    features: [
    {
      id: 1,
      title: "Fast Delivery",
      description: "Express shipping worldwide with tracking. Get your luxury fashion pieces delivered within 2-3 business days.",
      icon: "TruckIcon"
    },
    {
      id: 2,
      title: "Secure Payment",
      description: "Shop with confidence using our encrypted payment system. Multiple payment options available.",
      icon: "ShieldCheckIcon"
    },
    {
      id: 3,
      title: "Premium Quality",
      description: "Handpicked luxury materials and expert craftsmanship ensure lasting quality and style.",
      icon: "StarIcon"
    },
    {
      id: 4,
      title: "Easy Returns",
      description: "30-day hassle-free returns and exchanges. Your satisfaction is our priority.",
      icon: "ArrowPathIcon"
    }],

    testimonials: [
    {
      id: 1,
      name: "Sarah Chen",
      location: "New York, NY",
      rating: 5,
      review: "LuxeFashion has completely transformed my wardrobe. The quality is exceptional and the styling is exactly what I was looking for. Every piece feels like it was made just for me.",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_19dc77a7e-1762274545448.png",
      avatarAlt: "Professional headshot of Asian woman with long black hair smiling warmly",
      purchaseInfo: "Oversized Luxury Hoodie"
    },
    {
      id: 2,
      name: "Marcus Johnson",
      location: "Los Angeles, CA",
      rating: 5,
      review: "The attention to detail is incredible. From the packaging to the product quality, everything exceeds expectations. This is luxury streetwear done right.",
      avatar: "https://images.unsplash.com/photo-1603464589997-4b3db06a460d",
      avatarAlt: "Portrait of confident Black man with beard wearing casual button-up shirt",
      purchaseInfo: "Designer Denim Jacket"
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      location: "Miami, FL",
      rating: 5,
      review: "I love how LuxeFashion combines comfort with high-end fashion. The pieces are versatile enough for both casual and elevated looks.",
      avatar: "https://images.unsplash.com/photo-1621864134272-7ed5f6e2ae26",
      avatarAlt: "Smiling Latina woman with curly brown hair in natural outdoor lighting",
      purchaseInfo: "Statement Cargo Pants"
    }],

    blogPosts: [
    {
      id: 1,
      title: "The Evolution of Luxury Streetwear",
      excerpt: "Explore how streetwear transformed from underground culture to high fashion runways, and what this means for the future of luxury fashion.",
      category: "Trends",
      date: "Nov 15, 2024",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1619245782813-4075c6d40aa3",
      imageAlt: "Fashion runway showing models in contemporary streetwear designs with dramatic lighting",
      slug: "evolution-luxury-streetwear",
      author: {
        name: "Alex Thompson",
        avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1f2ed03e6-1762274052722.png",
        avatarAlt: "Professional headshot of fashion writer with glasses and styled hair"
      }
    },
    {
      id: 2,
      title: "Sustainable Fashion: The Future is Now",
      excerpt: "Discover how luxury brands are embracing sustainability without compromising on style, quality, or exclusivity.",
      category: "Sustainability",
      date: "Nov 12, 2024",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1642429970888-b8bf4bd24462",
      imageAlt: "Eco-friendly fashion materials and sustainable clothing production process in modern factory",
      slug: "sustainable-fashion-future",
      author: {
        name: "Maya Patel",
        avatar: "https://images.unsplash.com/photo-1573496371496-9971e371e4de",
        avatarAlt: "Portrait of sustainability expert with natural makeup and eco-conscious styling"
      }
    },
    {
      id: 3,
      title: "Styling Tips: Mixing High and Low Fashion",
      excerpt: "Learn the art of combining luxury pieces with accessible fashion to create unique, personal style statements that turn heads.",
      category: "Style Guide",
      date: "Nov 10, 2024",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1652677481595-925d4e6be7d4",
      imageAlt: "Fashion stylist arranging mix of high-end and affordable clothing pieces on styling rack",
      slug: "mixing-high-low-fashion",
      author: {
        name: "Jordan Kim",
        avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1fc87bf21-1762274280639.png",
        avatarAlt: "Creative portrait of fashion stylist with artistic makeup and contemporary styling"
      }
    }],

    newsletterData: {
      title: "STAY IN STYLE",
      description: "Be the first to know about new collections, exclusive drops, and styling tips from our fashion experts.",
      benefits: [
      {
        title: "Exclusive Access",
        description: "Early access to new collections and limited drops",
        icon: "StarIcon"
      },
      {
        title: "Style Tips",
        description: "Weekly styling advice from fashion experts",
        icon: "SparklesIcon"
      },
      {
        title: "Special Offers",
        description: "Subscriber-only discounts and promotions",
        icon: "GiftIcon"
      }]

    },
    footerData: {
      brandDescription: "LuxeFashion redefines luxury streetwear with premium quality, innovative designs, and sustainable practices. Join our community of fashion-forward individuals.",
      socialLinks: [
      { name: "Instagram", url: "https://instagram.com/luxefashion", icon: "CameraIcon" },
      { name: "Twitter", url: "https://twitter.com/luxefashion", icon: "ChatBubbleLeftIcon" },
      { name: "Facebook", url: "https://facebook.com/luxefashion", icon: "UserGroupIcon" },
      { name: "TikTok", url: "https://tiktok.com/@luxefashion", icon: "PlayIcon" }],

      quickLinks: [
      { name: "New Arrivals", url: "/product-catalog?category=new" },
      { name: "Best Sellers", url: "/product-catalog?category=bestsellers" },
      { name: "Sale", url: "/product-catalog?category=sale" },
      { name: "Gift Cards", url: "/gift-cards" },
      { name: "Size Guide", url: "/size-guide" }],

      customerService: [
      { name: "Contact Us", url: "/contact" },
      { name: "Shipping Info", url: "/shipping" },
      { name: "Returns", url: "/returns" },
      { name: "FAQ", url: "/faq" },
      { name: "Track Order", url: "/track-order" }],

      contact: {
        address: "123 Fashion District, New York, NY 10001",
        phone: "+1 (555) 123-4567",
        email: "hello@luxefashion.com"
      },
      legalLinks: [
      { name: "Privacy Policy", url: "/privacy" },
      { name: "Terms of Service", url: "/terms" },
      { name: "Cookie Policy", url: "/cookies" }],

      paymentMethods: ["VISA", "MC", "AMEX", "PAYPAL"]
    }
  };

  return <HomepageInteractive pageData={pageData} />;
}