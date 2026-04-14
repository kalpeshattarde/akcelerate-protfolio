import Header from '@/components/common/Header';
import CheckoutInteractive from './components/CheckoutInteractive';

export const metadata = {
  title: 'Checkout - LuxeFashion',
  description: 'Complete your luxury fashion purchase with secure checkout. Fast shipping, easy returns, and premium customer service.'
};

export default function CheckoutPage() {
  // Mock cart items - in real app, this would come from cart state/API
  const mockCartItems = [
  {
    id: 1,
    name: "Premium Streetwear Hoodie",
    price: 189.99,
    quantity: 1,
    size: "L",
    color: "Black",
    image: "https://images.unsplash.com/photo-1722396434380-a5c9b477674f",
    alt: "Black premium streetwear hoodie with modern design on white background"
  },
  {
    id: 2,
    name: "Designer Denim Jacket",
    price: 299.99,
    quantity: 1,
    size: "M",
    color: "Indigo",
    image: "https://images.unsplash.com/photo-1721029194707-07589dacf836",
    alt: "Indigo designer denim jacket with premium stitching and modern cut"
  },
  {
    id: 3,
    name: "Luxury Sneakers",
    price: 449.99,
    quantity: 1,
    size: "10",
    color: "White",
    image: "https://images.unsplash.com/photo-1581954813630-14c9bd135692",
    alt: "White luxury sneakers with premium leather and modern design elements"
  }];


  return (
    <>
      <Header />
      <CheckoutInteractive initialCartItems={mockCartItems} />
    </>);

}