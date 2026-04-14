import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import CourseCatalogInteractive from './components/CourseCatalogInteractive';

export const metadata: Metadata = {
  title: 'Course Catalog - EduZen Academy',
  description: 'Explore our curated collection of transformative courses designed for mindful growth and professional excellence. Discover learning paths that honor your time and nurture your potential.',
};

export default function CourseCatalogPage() {
  return (
    <>
      <Header />
      <main>
        <CourseCatalogInteractive />
      </main>
    </>
  );
}