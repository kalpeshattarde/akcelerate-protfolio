import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BrowseByCategoryWithFilters from './components/BrowseByCategoryWithFilters';
import MenuGrid from './components/MenuGrid';
import Icon from '../../components/AppIcon';

const MenuCatalog = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [filters, setFilters] = useState({
    dietary: '',
    priceRange: '',
    sortBy: 'name'
  });
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(3);

  // Mock categories data
  const categories = [
  {
    id: 'all',
    name: 'All Items',
    icon: 'Grid3X3',
    count: 48,
    featured: false
  },
  {
    id: 'appetizers',
    name: 'Appetizers',
    icon: 'Soup',
    count: 12,
    featured: true
  },
  {
    id: 'mains',
    name: 'Main Courses',
    icon: 'UtensilsCrossed',
    count: 18,
    featured: false
  },
  {
    id: 'desserts',
    name: 'Desserts',
    icon: 'Cake',
    count: 10,
    featured: false
  },
  {
    id: 'beverages',
    name: 'Beverages',
    icon: 'Coffee',
    count: 8,
    featured: true
  }];


  // Mock menu items data
  const menuItems = [
  {
    id: 1,
    name: "Truffle Mushroom Risotto",
    subtitle: "Creamy Arborio rice with wild mushrooms",
    description: "A rich and creamy risotto made with Arborio rice, wild mushrooms, truffle oil, and Parmesan cheese. Finished with fresh herbs and a drizzle of white truffle oil.",
    price: 28.99,
    originalPrice: 32.99,
    image: "https://images.unsplash.com/photo-1692348023709-47ff577f7277",
    imageAlt: "Creamy mushroom risotto garnished with fresh herbs and truffle shavings in white ceramic bowl",
    category: 'mains',
    dietary: ['vegetarian', 'gluten-free'],
    tags: ['signature', 'premium', 'seasonal'],
    featured: true,
    rating: 4.8,
    reviewCount: 124,
    prepTime: 25,
    createdAt: '2024-10-10'
  },
  {
    id: 2,
    name: "Grilled Atlantic Salmon",
    subtitle: "Fresh salmon with lemon herb butter",
    description: "Fresh Atlantic salmon grilled to perfection and served with seasonal vegetables, roasted potatoes, and our signature lemon herb butter sauce.",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1722865382854-c2ac135189f5",
    imageAlt: "Grilled salmon fillet with golden-brown grill marks served with colorful roasted vegetables",
    category: 'mains',
    dietary: ['gluten-free', 'keto'],
    tags: ['healthy', 'protein-rich', 'omega-3'],
    featured: false,
    rating: 4.6,
    reviewCount: 89,
    prepTime: 20,
    createdAt: '2024-10-08'
  },
  {
    id: 3,
    name: "Crispy Calamari Rings",
    subtitle: "Golden fried squid with marinara",
    description: "Fresh squid rings lightly battered and fried to golden perfection. Served with our house-made marinara sauce and lemon wedges.",
    price: 16.99,
    image: "https://images.unsplash.com/photo-1639024469010-44d77e559f7d",
    imageAlt: "Golden-brown crispy calamari rings arranged on white plate with marinara dipping sauce",
    category: 'appetizers',
    dietary: [],
    tags: ['crispy', 'seafood', 'sharing'],
    featured: true,
    rating: 4.4,
    reviewCount: 156,
    prepTime: 12,
    createdAt: '2024-10-12'
  },
  {
    id: 4,
    name: "Classic Tiramisu",
    subtitle: "Traditional Italian dessert",
    description: "Layers of coffee-soaked ladyfingers and mascarpone cream, dusted with cocoa powder. Made fresh daily using our grandmother's recipe.",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1712262582604-4cbafeeca156",
    imageAlt: "Slice of tiramisu with distinct layers of cream and coffee-soaked ladyfingers dusted with cocoa",
    category: 'desserts',
    dietary: ['vegetarian'],
    tags: ['traditional', 'coffee', 'italian'],
    featured: false,
    rating: 4.7,
    reviewCount: 203,
    prepTime: 5,
    createdAt: '2024-10-05'
  },
  {
    id: 5,
    name: "Craft Beer Selection",
    subtitle: "Local brewery favorites",
    description: "Rotating selection of craft beers from local breweries. Ask your server about today's featured selections including IPAs, stouts, and seasonal brews.",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1565291133543-2c86c724f847",
    imageAlt: "Three different craft beer glasses with golden, amber, and dark beer varieties on wooden table",
    category: 'beverages',
    dietary: ['vegan'],
    tags: ['local', 'craft', 'rotating'],
    featured: true,
    rating: 4.3,
    reviewCount: 67,
    prepTime: 2,
    createdAt: '2024-10-11'
  },
  {
    id: 6,
    name: "Mediterranean Quinoa Bowl",
    subtitle: "Healthy grain bowl with fresh vegetables",
    description: "Nutritious quinoa bowl topped with roasted vegetables, chickpeas, feta cheese, olives, and tahini dressing. A perfect healthy and filling meal.",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf",
    imageAlt: "Colorful quinoa bowl with roasted vegetables, chickpeas, and feta cheese in ceramic bowl",
    category: 'mains',
    dietary: ['vegetarian', 'gluten-free'],
    tags: ['healthy', 'mediterranean', 'protein'],
    featured: false,
    rating: 4.5,
    reviewCount: 91,
    prepTime: 15,
    createdAt: '2024-10-09'
  },
  {
    id: 7,
    name: "Spinach & Artichoke Dip",
    subtitle: "Creamy dip with tortilla chips",
    description: "Our signature creamy spinach and artichoke dip served hot with crispy tortilla chips and fresh vegetables for dipping.",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1703219339970-98cd69cc896f",
    imageAlt: "Creamy spinach artichoke dip in cast iron skillet with golden-brown melted cheese top",
    category: 'appetizers',
    dietary: ['vegetarian'],
    tags: ['sharing', 'comfort', 'cheesy'],
    featured: false,
    rating: 4.2,
    reviewCount: 134,
    prepTime: 10,
    createdAt: '2024-10-07'
  },
  {
    id: 8,
    name: "Chocolate Lava Cake",
    subtitle: "Warm cake with molten center",
    description: "Decadent chocolate cake with a molten chocolate center, served warm with vanilla ice cream and fresh berries.",
    price: 11.99,
    image: "https://images.unsplash.com/photo-1457823622778-ccdb4b7aa62d",
    imageAlt: "Chocolate lava cake with molten chocolate flowing out, served with vanilla ice cream and berries",
    category: 'desserts',
    dietary: ['vegetarian'],
    tags: ['warm', 'chocolate', 'indulgent'],
    featured: true,
    rating: 4.9,
    reviewCount: 287,
    prepTime: 8,
    createdAt: '2024-10-13'
  },
  {
    id: 9,
    name: "Fresh Fruit Smoothie",
    subtitle: "Blend of seasonal fruits",
    description: "Refreshing smoothie made with seasonal fresh fruits, yogurt, and honey. Available in strawberry-banana, mango-passion, or mixed berry.",
    price: 7.99,
    image: "https://images.unsplash.com/photo-1662130187270-a4d52c700eb6",
    imageAlt: "Three colorful fruit smoothies in tall glasses with fresh fruit garnishes and straws",
    category: 'beverages',
    dietary: ['vegetarian', 'gluten-free'],
    tags: ['healthy', 'fresh', 'seasonal'],
    featured: false,
    rating: 4.1,
    reviewCount: 45,
    prepTime: 5,
    createdAt: '2024-10-06'
  },
  {
    id: 10,
    name: "BBQ Pulled Pork Sandwich",
    subtitle: "Slow-cooked pork with house BBQ sauce",
    description: "Tender pulled pork slow-cooked for 12 hours and tossed in our signature BBQ sauce. Served on a brioche bun with coleslaw and pickles.",
    price: 18.99,
    image: "https://images.unsplash.com/photo-1545196353-e431cf8d0803",
    imageAlt: "BBQ pulled pork sandwich on brioche bun with coleslaw and pickles on wooden plate",
    category: 'mains',
    dietary: [],
    tags: ['bbq', 'comfort', 'slow-cooked'],
    featured: false,
    rating: 4.4,
    reviewCount: 112,
    prepTime: 18,
    createdAt: '2024-10-04'
  },
  {
    id: 11,
    name: "Buffalo Chicken Wings",
    subtitle: "Spicy wings with blue cheese",
    description: "Crispy chicken wings tossed in our signature buffalo sauce. Served with celery sticks and house-made blue cheese dressing.",
    price: 15.99,
    image: "https://images.unsplash.com/photo-1624726175512-19b9baf9fbd1",
    imageAlt: "Golden-brown buffalo chicken wings with orange sauce coating served with celery sticks",
    category: 'appetizers',
    dietary: ['gluten-free'],
    tags: ['spicy', 'wings', 'sharing'],
    featured: false,
    rating: 4.3,
    reviewCount: 178,
    prepTime: 15,
    createdAt: '2024-10-03'
  },
  {
    id: 12,
    name: "Vanilla Bean Crème Brûlée",
    subtitle: "Classic French dessert",
    description: "Rich vanilla custard topped with caramelized sugar. Made with real vanilla beans and served with fresh seasonal berries.",
    price: 13.99,
    image: "https://images.unsplash.com/photo-1607235780843-a196b94386b4",
    imageAlt: "Crème brûlée in white ramekin with caramelized sugar top and fresh berries garnish",
    category: 'desserts',
    dietary: ['vegetarian', 'gluten-free'],
    tags: ['french', 'classic', 'elegant'],
    featured: false,
    rating: 4.6,
    reviewCount: 95,
    prepTime: 3,
    createdAt: '2024-10-02'
  }];


  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleAddToCart = async (item) => {
    // Simulate adding to cart
    console.log('Adding to cart:', item);
    setCartCount((prev) => prev + 1);

    // Show success feedback (you could add a toast notification here)
    return new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
  };

  const handleCartClick = () => {
    navigate('/shopping-cart');
  };

  const handleAccountClick = (action) => {
    if (action === 'login') navigate('/login');
    if (action === 'register') navigate('/register');
    if (action === 'account') navigate('/user-account');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header
        cartCount={cartCount}
        onCartClick={handleCartClick}
        onAccountClick={handleAccountClick}
        onSearch={() => {}} // Add missing onSearch prop
        onLogout={() => {}} />

      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-6 lg:py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-2xl lg:text-4xl font-heading font-bold mb-3">
                Our Menu
              </h1>
              <p className="text-base lg:text-lg font-body opacity-90 max-w-2xl mx-auto">
                Discover our carefully crafted dishes made with the finest ingredients. From appetizers to desserts, every item tells a story of flavor and passion.
              </p>
            </div>
          </div>
        </section>

        {/* Menu Content */}
        <section className="py-8 lg:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              {/* Unified Browse by Category with Filters & Sort */}
              <BrowseByCategoryWithFilters
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={handleCategoryChange}
                onFiltersChange={handleFiltersChange}
              />

              {/* Menu Grid */}
              <MenuGrid
                items={menuItems}
                loading={loading}
                onAddToCart={handleAddToCart}
                activeCategory={activeCategory}
                filters={filters} />

            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="bg-muted py-12 lg:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-card rounded-2xl p-8 lg:p-12 shadow-warm">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="Phone" size={24} color="white" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-4">
                Can't Find What You're Looking For?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Our chefs are happy to accommodate special requests and dietary restrictions. Give us a call to discuss custom menu options or ask about today's specials.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+15551234567"
                  className="inline-flex items-center space-x-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg font-body font-medium hover:bg-primary/90 transition-all duration-200 hover:scale-105">

                  <Icon name="Phone" size={18} />
                  <span>Call (555) 123-4567</span>
                </a>
                <button
                  onClick={() => navigate('/shopping-cart')}
                  className="inline-flex items-center space-x-2 px-8 py-3 bg-accent text-accent-foreground rounded-lg font-body font-medium hover:bg-accent/90 transition-all duration-200 hover:scale-105">

                  <Icon name="ShoppingCart" size={18} />
                  <span>View Cart ({cartCount})</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="UtensilsCrossed" size={20} color="white" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg">Pesto</h3>
                <p className="text-xs opacity-80 -mt-1">Restaurant</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm opacity-80">
                © {new Date()?.getFullYear()} Pesto Restaurant. All rights reserved.
              </p>
              <p className="text-xs opacity-60 mt-1">
                Made with ❤️ for food lovers everywhere
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>);

};

export default MenuCatalog;