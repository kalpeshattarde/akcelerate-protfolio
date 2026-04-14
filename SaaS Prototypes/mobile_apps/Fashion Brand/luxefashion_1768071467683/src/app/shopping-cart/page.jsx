import ShoppingCartInteractive from './components/ShoppingCartInteractive';

export const metadata = {
  title: 'Shopping Cart - LuxeFashion',
  description: 'Review your selected luxury fashion items, modify quantities, and proceed to secure checkout with premium shipping options and exclusive deals.'
};

export default function ShoppingCartPage() {
  // Mock recommended products data
  const recommendedProducts = [
  {
    id: 'rec-1',
    name: 'Minimalist Chain Necklace',
    price: 79.99,
    originalPrice: 99.99,
    image: "https://images.unsplash.com/photo-1682822902997-8f1187e8ab0a",
    alt: 'Elegant gold minimalist chain necklace displayed on marble surface',
    isNew: true,
    discount: 20,
    rating: 4.8,
    reviewCount: 124
  },
  {
    id: 'rec-2',
    name: 'Vintage Leather Jacket',
    price: 199.99,
    image: "https://images.unsplash.com/photo-1630402175857-d510fb9f9354",
    alt: 'Classic black vintage leather jacket hanging on wooden hanger',
    isNew: false,
    discount: 0,
    rating: 4.6,
    reviewCount: 89
  },
  {
    id: 'rec-3',
    name: 'Designer Sunglasses',
    price: 149.99,
    originalPrice: 179.99,
    image: "https://images.unsplash.com/photo-1651780679067-2bc667cbb48a",
    alt: 'Stylish designer sunglasses with tortoiseshell frames on white background',
    isNew: false,
    discount: 17,
    rating: 4.7,
    reviewCount: 156
  },
  {
    id: 'rec-4',
    name: 'Silk Scarf Collection',
    price: 65.99,
    image: "https://images.unsplash.com/photo-1675095598961-c255df060e90",
    alt: 'Colorful silk scarves with floral patterns arranged artistically',
    isNew: true,
    discount: 0,
    rating: 4.9,
    reviewCount: 203
  }];


  // Mock recently viewed products data
  const recentlyViewed = [
  {
    id: 'recent-1',
    name: 'Urban Bomber Jacket',
    price: 129.99,
    image: "https://images.unsplash.com/photo-1512865389257-4bd1e8fd4db1",
    alt: 'Olive green urban bomber jacket with ribbed cuffs and collar'
  },
  {
    id: 'recent-2',
    name: 'High-Waisted Jeans',
    price: 89.99,
    image: "https://images.unsplash.com/photo-1718681536275-e89684c04e1d",
    alt: 'Dark blue high-waisted denim jeans with classic fit'
  },
  {
    id: 'recent-3',
    name: 'Statement Earrings',
    price: 39.99,
    image: "https://images.unsplash.com/photo-1727791721705-28906f1222ae",
    alt: 'Gold statement drop earrings with geometric design'
  },
  {
    id: 'recent-4',
    name: 'Canvas Sneakers',
    price: 69.99,
    image: "https://images.unsplash.com/photo-1452414071354-91281e36843e",
    alt: 'White canvas sneakers with rubber sole on clean background'
  }];


  return (
    <ShoppingCartInteractive
      recommendedProducts={recommendedProducts}
      recentlyViewed={recentlyViewed} />);


}