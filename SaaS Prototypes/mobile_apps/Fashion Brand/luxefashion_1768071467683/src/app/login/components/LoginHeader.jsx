import Link from 'next/link';
import PropTypes from 'prop-types';

const LoginHeader = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-12">
      {/* Logo */}
      <Link href="/homepage" className="inline-flex items-center space-x-2 mb-8 hover:opacity-80 transition-opacity">
        <div className="w-10 h-10 bg-primary rounded-sm flex items-center justify-center">
          <span className="text-primary-foreground font-heading font-bold text-xl">L</span>
        </div>
        <span className="font-heading font-bold text-2xl text-foreground tracking-tight">
          LuxeFashion
        </span>
      </Link>

      {/* Page Title */}
      <h1 className="font-heading font-bold text-3xl lg:text-4xl text-foreground mb-4 uppercase tracking-wide">
        {title}
      </h1>
      
      {subtitle && (
        <p className="text-muted-foreground text-lg max-w-md mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};

LoginHeader.propTypes = {
  title: PropTypes?.string?.isRequired,
  subtitle: PropTypes?.string
};

export default LoginHeader;