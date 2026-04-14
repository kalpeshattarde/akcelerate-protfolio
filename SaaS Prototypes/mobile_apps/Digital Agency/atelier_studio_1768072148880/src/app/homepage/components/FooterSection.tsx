import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const FooterSection = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    studio: [
      { label: 'About', href: '/about' },
      { label: 'Capabilities', href: '/capabilities' },
      { label: 'Team', href: '/team' },
      { label: 'Recognition', href: '/recognition' }
    ],
    work: [
      { label: 'Portfolio', href: '/work-portfolio' },
      { label: 'Case Studies', href: '/work-portfolio' },
      { label: 'Insights', href: '/insights' },
      { label: 'Process', href: '/about' }
    ],
    connect: [
      { label: 'Contact', href: '/contact' },
      { label: 'Careers', href: '/team' },
      { label: 'Partnerships', href: '/contact' },
      { label: 'Press', href: '/insights' }
    ]
  };

  const socialLinks = [
    { name: 'Instagram', icon: 'CameraIcon', href: '#' },
    { name: 'LinkedIn', icon: 'BriefcaseIcon', href: '#' },
    { name: 'Twitter', icon: 'ChatBubbleLeftIcon', href: '#' },
    { name: 'Dribbble', icon: 'PaintBrushIcon', href: '#' }
  ];

  return (
    <footer className="relative bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/homepage" className="inline-block group">
              <svg
                width="180"
                height="40"
                viewBox="0 0 180 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform duration-300 group-hover:scale-105"
              >
                <text
                  x="0"
                  y="28"
                  fontFamily="Playfair Display"
                  fontSize="24"
                  fontWeight="700"
                  fill="var(--color-primary)"
                  letterSpacing="0.05em"
                >
                  ATELIER
                </text>
                <text
                  x="0"
                  y="38"
                  fontFamily="JetBrains Mono"
                  fontSize="10"
                  fontWeight="400"
                  fill="var(--color-text-secondary)"
                  letterSpacing="0.2em"
                >
                  STUDIO
                </text>
              </svg>
            </Link>

            <p className="font-body text-text-secondary leading-relaxed max-w-sm">
              Crafting exceptional digital experiences at the intersection of timeless design and cutting-edge technology.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-muted/50 rounded-lg flex items-center justify-center hover:bg-primary/20 hover:border-primary/30 border border-border transition-all duration-300"
                  aria-label={social.name}
                >
                  <Icon name={social.icon as any} size={20} className="text-text-secondary hover:text-primary transition-colors duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Studio Links */}
          <div>
            <h3 className="font-cta font-semibold text-foreground mb-4">Studio</h3>
            <ul className="space-y-3">
              {footerLinks.studio.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-text-secondary hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Work Links */}
          <div>
            <h3 className="font-cta font-semibold text-foreground mb-4">Work</h3>
            <ul className="space-y-3">
              {footerLinks.work.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-text-secondary hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Links */}
          <div>
            <h3 className="font-cta font-semibold text-foreground mb-4">Connect</h3>
            <ul className="space-y-3">
              {footerLinks.connect.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-text-secondary hover:text-primary transition-colors duration-300"
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
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="font-body text-sm text-text-secondary">
              © {currentYear} Atelier Studio. All rights reserved.
            </div>

            <div className="flex gap-6">
              <Link
                href="#"
                className="font-body text-sm text-text-secondary hover:text-primary transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="font-body text-sm text-text-secondary hover:text-primary transition-colors duration-300"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="font-body text-sm text-text-secondary hover:text-primary transition-colors duration-300"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;