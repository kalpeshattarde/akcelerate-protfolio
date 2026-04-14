import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import PropTypes from 'prop-types';

const Footer = ({ footerData }) => {
  const currentYear = new Date()?.getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* Main Footer Content */}
      <div className="w-full px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/homepage" className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-accent rounded-sm flex items-center justify-center">
                <span className="text-accent-foreground font-heading font-bold text-lg">L</span>
              </div>
              <span className="font-heading font-bold text-xl tracking-tight">
                LuxeFashion
              </span>
            </Link>
            <p className="text-secondary-foreground/80 mb-6 leading-relaxed">
              {footerData?.brandDescription}
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {footerData?.socialLinks?.map((social) => (
                <a
                  key={social?.name}
                  href={social?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-secondary-foreground/10 hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-all btn-press"
                  aria-label={`Follow us on ${social?.name}`}
                >
                  <Icon name={social?.icon} size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-6 tracking-tight">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {footerData?.quickLinks?.map((link) => (
                <li key={link?.name}>
                  <Link
                    href={link?.url}
                    className="text-secondary-foreground/80 hover:text-accent transition-colors"
                  >
                    {link?.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-6 tracking-tight">
              Customer Service
            </h3>
            <ul className="space-y-3">
              {footerData?.customerService?.map((link) => (
                <li key={link?.name}>
                  <Link
                    href={link?.url}
                    className="text-secondary-foreground/80 hover:text-accent transition-colors"
                  >
                    {link?.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-6 tracking-tight">
              Contact Us
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Icon name="MapPinIcon" size={20} className="text-accent mt-1 flex-shrink-0" />
                <div>
                  <p className="text-secondary-foreground/80 text-sm leading-relaxed">
                    {footerData?.contact?.address}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Icon name="PhoneIcon" size={20} className="text-accent flex-shrink-0" />
                <a
                  href={`tel:${footerData?.contact?.phone}`}
                  className="text-secondary-foreground/80 hover:text-accent transition-colors text-sm"
                >
                  {footerData?.contact?.phone}
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <Icon name="EnvelopeIcon" size={20} className="text-accent flex-shrink-0" />
                <a
                  href={`mailto:${footerData?.contact?.email}`}
                  className="text-secondary-foreground/80 hover:text-accent transition-colors text-sm"
                >
                  {footerData?.contact?.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="border-t border-secondary-foreground/20">
        <div className="w-full px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="text-secondary-foreground/60 text-sm text-center md:text-left">
              © {currentYear} LuxeFashion. All rights reserved.
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-6">
              {footerData?.legalLinks?.map((link) => (
                <Link
                  key={link?.name}
                  href={link?.url}
                  className="text-secondary-foreground/60 hover:text-accent transition-colors text-sm"
                >
                  {link?.name}
                </Link>
              ))}
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-2">
              <span className="text-secondary-foreground/60 text-sm mr-2">We Accept:</span>
              {footerData?.paymentMethods?.map((method) => (
                <div
                  key={method}
                  className="w-8 h-6 bg-secondary-foreground/10 flex items-center justify-center text-xs font-bold text-secondary-foreground/60"
                >
                  {method}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  footerData: PropTypes?.shape({
    brandDescription: PropTypes?.string?.isRequired,
    socialLinks: PropTypes?.arrayOf(
      PropTypes?.shape({
        name: PropTypes?.string?.isRequired,
        url: PropTypes?.string?.isRequired,
        icon: PropTypes?.string?.isRequired
      })
    )?.isRequired,
    quickLinks: PropTypes?.arrayOf(
      PropTypes?.shape({
        name: PropTypes?.string?.isRequired,
        url: PropTypes?.string?.isRequired
      })
    )?.isRequired,
    customerService: PropTypes?.arrayOf(
      PropTypes?.shape({
        name: PropTypes?.string?.isRequired,
        url: PropTypes?.string?.isRequired
      })
    )?.isRequired,
    contact: PropTypes?.shape({
      address: PropTypes?.string?.isRequired,
      phone: PropTypes?.string?.isRequired,
      email: PropTypes?.string?.isRequired
    })?.isRequired,
    legalLinks: PropTypes?.arrayOf(
      PropTypes?.shape({
        name: PropTypes?.string?.isRequired,
        url: PropTypes?.string?.isRequired
      })
    )?.isRequired,
    paymentMethods: PropTypes?.arrayOf(PropTypes?.string)?.isRequired
  })?.isRequired
};

export default Footer;