'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      setIsAuthenticated(!!token);
    };

    // Get cart item count
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const totalItems = cart?.reduce((sum, item) => sum + (item?.quantity || 1), 0);
      setCartItemCount(totalItems);
    };

    checkAuth();
    updateCartCount();

    // Listen for storage changes
    const handleStorageChange = () => {
      checkAuth();
      updateCartCount();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleAccountMenu = () => {
    setIsAccountMenuOpen(!isAccountMenuOpen);
  };

  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsAccountMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setIsAccountMenuOpen(false);
  };

  const navigationItems = [
    { label: 'Home', path: '/homepage', icon: 'HomeIcon' },
    { label: 'Shop', path: '/product-catalog', icon: 'ShoppingBagIcon' },
  ];

  const categoryItems = [
    { label: 'Streetwear', path: '/product-catalog?category=Streetwear', icon: 'TagIcon' },
    { label: 'Luxury Pieces', path: '/product-catalog?category=Luxury%20Pieces', icon: 'SparklesIcon' },
    { label: 'Accessories', path: '/product-catalog?category=Accessories', icon: 'RectangleGroupIcon' },
    { label: 'Footwear', path: '/product-catalog?category=Footwear', icon: 'CubeIcon' },
    { label: 'Seasonal', path: '/product-catalog?category=Seasonal%20Collections', icon: 'SunIcon' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-navigation bg-background border-b border-border">
        <div className="w-full px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/homepage" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
                <span className="text-primary-foreground font-heading font-bold text-lg">L</span>
              </div>
              <span className="font-heading font-bold text-xl text-foreground tracking-tight">
                LuxeFashion
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  href={item?.path}
                  className="font-heading font-semibold text-sm uppercase tracking-wide text-foreground hover:text-accent transition-colors btn-press"
                >
                  {item?.label}
                </Link>
              ))}
              
              {/* Categories Dropdown */}
              <div className="relative group">
                <button className="flex items-center space-x-1 font-heading font-semibold text-sm uppercase tracking-wide text-foreground hover:text-accent transition-colors btn-press">
                  <span>Categories</span>
                  <Icon name="ChevronDownIcon" size={16} />
                </button>
                
                <div className="absolute top-full left-0 mt-2 w-48 bg-popover border border-border shadow-elevation-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-dropdown">
                  {categoryItems?.map((category) => (
                    <Link
                      key={category?.path}
                      href={category?.path}
                      className="flex items-center space-x-3 px-4 py-3 text-sm text-popover-foreground hover:bg-muted transition-colors"
                    >
                      <Icon name={category?.icon} size={16} />
                      <span>{category?.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Account Menu */}
              <div className="relative">
                <button
                  onClick={toggleAccountMenu}
                  className="flex items-center space-x-1 text-foreground hover:text-accent transition-colors btn-press"
                  aria-label="Account menu"
                >
                  <Icon name="UserIcon" size={20} />
                  <Icon name="ChevronDownIcon" size={16} />
                </button>

                {isAccountMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-dropdown"
                      onClick={() => setIsAccountMenuOpen(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border shadow-elevation-2 z-dropdown animate-fade-in">
                      {isAuthenticated ? (
                        <>
                          <Link
                            href="/user-account-dashboard"
                            className="block px-4 py-3 text-sm text-popover-foreground hover:bg-muted transition-colors"
                            onClick={closeMenus}
                          >
                            Dashboard
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-3 text-sm text-popover-foreground hover:bg-muted transition-colors"
                          >
                            Logout
                          </button>
                        </>
                      ) : (
                        <>
                          <Link
                            href="/login"
                            className="block px-4 py-3 text-sm text-popover-foreground hover:bg-muted transition-colors"
                            onClick={closeMenus}
                          >
                            Login
                          </Link>
                          <Link
                            href="/register"
                            className="block px-4 py-3 text-sm text-popover-foreground hover:bg-muted transition-colors"
                            onClick={closeMenus}
                          >
                            Register
                          </Link>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Cart */}
              <Link
                href="/shopping-cart"
                className="relative flex items-center text-foreground hover:text-accent transition-colors btn-press"
                aria-label={`Shopping cart with ${cartItemCount} items`}
              >
                <Icon name="ShoppingCartIcon" size={20} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-scale-in">
                    {cartItemCount > 99 ? '99+' : cartItemCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-foreground hover:text-accent transition-colors btn-press"
              aria-label="Toggle menu"
            >
              <Icon name={isMenuOpen ? "XMarkIcon" : "Bars3Icon"} size={24} />
            </button>
          </div>
        </div>
      </header>
      {/* Mobile Navigation Drawer */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-drawer md:hidden"
            onClick={closeMenus}
          />
          <div className="fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-background z-drawer md:hidden animate-slide-in">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <span className="font-heading font-bold text-lg">Menu</span>
                <button
                  onClick={closeMenus}
                  className="text-foreground hover:text-accent transition-colors btn-press"
                  aria-label="Close menu"
                >
                  <Icon name="XMarkIcon" size={24} />
                </button>
              </div>

              {/* Navigation Items */}
              <nav className="flex-1 px-6 py-4">
                <div className="space-y-1">
                  {navigationItems?.map((item) => (
                    <Link
                      key={item?.path}
                      href={item?.path}
                      className="flex items-center space-x-3 px-3 py-4 text-foreground hover:bg-muted hover:text-accent transition-colors font-heading font-semibold uppercase tracking-wide text-sm"
                      onClick={closeMenus}
                    >
                      <Icon name={item?.icon} size={20} />
                      <span>{item?.label}</span>
                    </Link>
                  ))}
                </div>

                {/* Categories Section */}
                <div className="mt-8 pt-6 border-t border-border">
                  <h3 className="px-3 mb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Categories
                  </h3>
                  <div className="space-y-1">
                    {categoryItems?.map((category) => (
                      <Link
                        key={category?.path}
                        href={category?.path}
                        className="flex items-center space-x-3 px-3 py-3 text-foreground hover:bg-muted hover:text-accent transition-colors"
                        onClick={closeMenus}
                      >
                        <Icon name={category?.icon} size={20} />
                        <span>{category?.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Account Section */}
                <div className="mt-8 pt-6 border-t border-border">
                  <h3 className="px-3 mb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Account
                  </h3>
                  <div className="space-y-1">
                    {isAuthenticated ? (
                      <>
                        <Link
                          href="/user-account-dashboard"
                          className="flex items-center space-x-3 px-3 py-3 text-foreground hover:bg-muted hover:text-accent transition-colors"
                          onClick={closeMenus}
                        >
                          <Icon name="UserIcon" size={20} />
                          <span>Dashboard</span>
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-3 px-3 py-3 text-foreground hover:bg-muted hover:text-accent transition-colors"
                        >
                          <Icon name="ArrowRightOnRectangleIcon" size={20} />
                          <span>Logout</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/login"
                          className="flex items-center space-x-3 px-3 py-3 text-foreground hover:bg-muted hover:text-accent transition-colors"
                          onClick={closeMenus}
                        >
                          <Icon name="ArrowRightOnRectangleIcon" size={20} />
                          <span>Login</span>
                        </Link>
                        <Link
                          href="/register"
                          className="flex items-center space-x-3 px-3 py-3 text-foreground hover:bg-muted hover:text-accent transition-colors"
                          onClick={closeMenus}
                        >
                          <Icon name="UserPlusIcon" size={20} />
                          <span>Register</span>
                        </Link>
                      </>
                    )}
                  </div>
                </div>

                {/* Cart Section */}
                <div className="mt-6 pt-6 border-t border-border">
                  <Link
                    href="/shopping-cart"
                    className="flex items-center justify-between px-3 py-4 text-foreground hover:bg-muted hover:text-accent transition-colors"
                    onClick={closeMenus}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon name="ShoppingCartIcon" size={20} />
                      <span>Shopping Cart</span>
                    </div>
                    {cartItemCount > 0 && (
                      <span className="bg-accent text-accent-foreground text-xs font-bold rounded-full px-2 py-1 min-w-[20px] text-center">
                        {cartItemCount > 99 ? '99+' : cartItemCount}
                      </span>
                    )}
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;