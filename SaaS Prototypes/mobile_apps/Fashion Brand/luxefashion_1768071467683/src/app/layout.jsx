import '../styles/index.css';
import Header from '@/components/common/Header';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  title: 'Next.js with Tailwind CSS',
  description: 'A boilerplate project with Next.js 15 and Tailwind CSS 3.4.17',
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' }
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="section-scroll-container">
        <Header />
        <main className="pt-16 section-scroll-wrapper">
          {children}
        </main>
</body>
    </html>
  );
}