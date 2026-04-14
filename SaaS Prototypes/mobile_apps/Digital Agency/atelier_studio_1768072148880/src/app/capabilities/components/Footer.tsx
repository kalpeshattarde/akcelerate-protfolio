import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    studio: [
      { label: 'About', href: '/about' },
      { label: 'Work', href: '/work-portfolio' },
      { label: 'Recognition', href: '/recognition' },
      { label: 'Team', href: '/team' }
    ],
    services: [
      { label: 'Brand Identity', href: '/capabilities' },
      { label: 'Digital Experience', href: '/capabilities' },
      { label: 'Web Development', href: '/capabilities' },
      { label: 'Motion Design', href: '/capabilities' }
    ],
    connect: [
      { label: 'Contact', href: '/contact' },
      { label: 'Insights', href: '/insights' },
      { label: 'Careers', href: '/team' },
      { label: 'Newsletter', href: '/insights' }
    ]
  };

  const socialLinks = [
    { name: 'Instagram', icon: 'CameraIcon', href: '#' },
    { name: 'LinkedIn', icon: 'BriefcaseIcon', href: '#' },
    { name: 'Twitter', icon: 'ChatBubbleLeftIcon', href: '#' },
    { name: 'Dribbble', icon: 'PaintBrushIcon', href: '#' }
  ];

  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/homepage" className="inline-block mb-4">
              <svg
                width="160"
                height="36"
                viewBox="0 0 160 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <text
                  x="0"
                  y="24"
                  fontFamily="Playfair Display"
                  fontSize="20"
                  fontWeight="700"
                  fill="var(--color-primary)"
                  letterSpacing="0.05em"
                >
                  ATELIER
                </text>
                <text
                  x="0"
                  y="32"
                  fontFamily="JetBrains Mono"
                  fontSize="8"
                  fontWeight="400"
                  fill="var(--color-text-secondary)"
                  letterSpacing="0.2em"
                >
                  STUDIO
                </text>
              </svg>
            </Link>
            <p className="font-body text-sm text-text-secondary leading-relaxed mb-6 max-w-sm">
              A creative studio where digital innovation meets timeless craftsmanship. We create exceptional experiences through confident restraint and artistic integrity.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-background border border-border rounded-full flex items-center justify-center hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
                  aria-label={social.name}
                >
                  <Icon name={social.icon as any} size={18} className="text-text-secondary hover:text-primary transition-colors duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Studio Links */}
          <div>
            <h3 className="font-headline text-sm font-bold text-foreground mb-4 uppercase tracking-wider">
              Studio
            </h3>
            <ul className="space-y-3">
              {footerLinks.studio.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-text-secondary hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="font-headline text-sm font-bold text-foreground mb-4 uppercase tracking-wider">
              Services
            </h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-text-secondary hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Links */}
          <div>
            <h3 className="font-headline text-sm font-bold text-foreground mb-4 uppercase tracking-wider">
              Connect
            </h3>
            <ul className="space-y-3">
              {footerLinks.connect.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-text-secondary hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-body text-xs text-text-secondary">
              &copy; {currentYear} Atelier Studio. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="#"
                className="font-body text-xs text-text-secondary hover:text-primary transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="font-body text-xs text-text-secondary hover:text-primary transition-colors duration-300"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="font-body text-xs text-text-secondary hover:text-primary transition-colors duration-300"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}