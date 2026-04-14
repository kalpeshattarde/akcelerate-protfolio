import Header from '@/components/common/Header';
import ProductDetailsInteractive from './components/ProductDetailsInteractive';

export const metadata = {
  title: 'Premium Streetwear Hoodie - LUXE | LuxeFashion',
  description: 'Discover our premium streetwear hoodie featuring luxury materials, contemporary design, and exceptional comfort. Available in multiple colors and sizes with fast shipping.'
};

export default function ProductDetailsPage() {
  const mockProduct = {
    id: 1,
    name: "Premium Streetwear Hoodie",
    brand: "LUXE",
    price: 189,
    originalPrice: 249,
    rating: 4.8,
    reviewCount: 127,
    stock: 15,
    isNew: true,
    description: `Elevate your streetwear game with our Premium Streetwear Hoodie. Crafted from the finest cotton blend, this hoodie combines luxury comfort with contemporary urban style. The oversized fit and premium construction make it perfect for both casual wear and fashion-forward styling. Each piece is carefully designed to deliver exceptional quality and lasting durability.`,
    features: [
    "Premium 80% cotton, 20% polyester blend for ultimate comfort",
    "Oversized fit with dropped shoulders for contemporary silhouette",
    "Reinforced double-stitched seams for enhanced durability",
    "Soft brushed interior lining for warmth and comfort",
    "Adjustable drawstring hood with metal eyelets",
    "Kangaroo pocket with hidden interior compartment",
    "Pre-shrunk fabric to maintain size and shape",
    "Ethically sourced materials and sustainable production"],

    materials: "80% Premium Cotton, 20% Polyester. Brushed fleece interior lining. Metal hardware details.",
    colors: [
    { name: "Charcoal Black", hex: "#2d2d2d" },
    { name: "Forest Green", hex: "#0b1c13" },
    { name: "Cream White", hex: "#f8f6f0" },
    { name: "Navy Blue", hex: "#1e3a8a" }],

    sizes: [
    { size: "XS", available: true },
    { size: "S", available: true },
    { size: "M", available: true },
    { size: "L", available: true },
    { size: "XL", available: false }],

    images: [
    {
      url: "https://images.unsplash.com/photo-1506803779819-d76e81ea975a",
      alt: "Young man in charcoal black premium hoodie standing against urban concrete wall"
    },
    {
      url: "https://images.unsplash.com/photo-1506777386746-b50cbbba1715",
      alt: "Close-up detail shot of hoodie fabric texture and stitching quality"
    },
    {
      url: "https://images.unsplash.com/photo-1543204511-aa1f89cace3f",
      alt: "Side profile view of model wearing forest green hoodie with hood up"
    },
    {
      url: "https://images.unsplash.com/photo-1515940037466-8f595ab6e713",
      alt: "Flat lay product shot showing hoodie front design and kangaroo pocket"
    }]

  };

  const mockReviews = [
  {
    id: 1,
    user: {
      name: "Marcus Johnson",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_12185ba5c-1762273750643.png",
      alt: "Professional headshot of African American man with short beard in casual attire"
    },
    rating: 5,
    comment: "Absolutely love this hoodie! The quality is exceptional and the fit is perfect. The fabric feels premium and the construction is solid. Definitely worth the investment for a luxury streetwear piece.",
    date: "November 10, 2024",
    verified: true,
    images: [
    {
      url: "https://images.unsplash.com/photo-1506777386746-b50cbbba1715",
      alt: "Customer photo showing hoodie fabric texture and quality details"
    }]

  },
  {
    id: 2,
    user: {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1620348698171-e2ea4d4ad3eb",
      alt: "Portrait of Asian woman with long dark hair smiling at camera"
    },
    rating: 5,
    comment: "This hoodie exceeded my expectations! The oversized fit is exactly what I was looking for, and the color is beautiful. Super comfortable and stylish. Will definitely be ordering more colors.",
    date: "November 8, 2024",
    verified: true
  },
  {
    id: 3,
    user: {
      name: "Alex Rodriguez",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1497555e7-1762249064367.png",
      alt: "Casual portrait of Hispanic man with dark hair in outdoor setting"
    },
    rating: 4,
    comment: "Great quality hoodie with excellent attention to detail. The only minor issue is that it runs slightly larger than expected, but that works well for the oversized aesthetic. Highly recommend!",
    date: "November 5, 2024",
    verified: true
  }];


  const mockRelatedProducts = [
  {
    id: 2,
    name: "Essential Crew Neck Sweatshirt",
    brand: "LUXE",
    price: 149,
    originalPrice: 189,
    image: "https://images.unsplash.com/photo-1597586539547-11326ab780f9",
    alt: "Model wearing cream colored crew neck sweatshirt in minimalist studio setting",
    rating: 4.6,
    reviewCount: 89,
    isNew: false,
    discount: 21
  },
  {
    id: 3,
    name: "Luxury Track Pants",
    brand: "LUXE",
    price: 169,
    image: "https://images.unsplash.com/photo-1580906853195-d687cc732c1f",
    alt: "Athletic man in black luxury track pants during urban workout session",
    rating: 4.7,
    reviewCount: 156,
    isNew: true
  },
  {
    id: 4,
    name: "Oversized Graphic Tee",
    brand: "LUXE",
    price: 89,
    originalPrice: 119,
    image: "https://images.unsplash.com/photo-1687806135191-a15ff985fc74",
    alt: "Young woman in oversized white graphic t-shirt with artistic print design",
    rating: 4.5,
    reviewCount: 203,
    discount: 25
  },
  {
    id: 5,
    name: "Premium Bomber Jacket",
    brand: "LUXE",
    price: 299,
    image: "https://images.unsplash.com/photo-1624548139462-89b5a73ffdd6",
    alt: "Fashion model wearing navy blue bomber jacket in urban street style photoshoot",
    rating: 4.9,
    reviewCount: 78,
    isNew: true
  },
  {
    id: 6,
    name: "Minimalist Joggers",
    brand: "LUXE",
    price: 129,
    image: "https://images.unsplash.com/photo-1561959679-4b3e35730d8d",
    alt: "Person wearing gray minimalist joggers in comfortable home setting",
    rating: 4.4,
    reviewCount: 134,
    isNew: false
  }];


  const initialData = {
    product: mockProduct,
    reviews: mockReviews,
    relatedProducts: mockRelatedProducts
  };

  return (
    <>
      <Header />
      <main className="pt-16">
        <ProductDetailsInteractive initialData={initialData} />
      </main>
    </>);

}