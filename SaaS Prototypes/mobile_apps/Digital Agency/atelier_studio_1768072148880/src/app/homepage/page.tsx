import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import HomepageInteractive from './components/HomepageInteractive';

export const metadata: Metadata = {
  title: 'Atelier Studio - Award-Winning Digital Agency',
  description: 'Premium digital agency creating exceptional web experiences at the intersection of timeless design and cutting-edge technology. Award-winning creative studio specializing in brand experiences, digital platforms, and interactive storytelling.',
};

export default function Homepage() {
  return (
    <>
      <Header />
      <HomepageInteractive />
    </>
  );
}