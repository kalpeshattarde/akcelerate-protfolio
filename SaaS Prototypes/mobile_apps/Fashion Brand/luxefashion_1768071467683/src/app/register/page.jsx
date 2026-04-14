import Header from '@/components/common/Header';
import RegisterInteractive from './components/RegisterInteractive';

export const metadata = {
  title: 'Create Account - LuxeFashion',
  description: 'Join LuxeFashion and unlock exclusive access to luxury fashion collections, early sale notifications, and personalized styling recommendations.',
};

export default function RegisterPage() {
  const pageData = {
    welcomeOffer: {
      code: 'WELCOME15',
      discount: 15,
      description: '15% off your first order'
    },
    benefits: {
      freeShippingThreshold: 150,
      loyaltyProgram: true,
      earlyAccess: true,
      personalStyling: true
    }
  };

  return (
    <>
      <Header />
      <main className="pt-16">
        <RegisterInteractive initialData={pageData} />
      </main>
    </>
  );
}