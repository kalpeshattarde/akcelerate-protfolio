import Link from 'next/link';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

const EmptyCart = ({ recentlyViewed }) => {
  return (
    <div className="bg-background min-h-[60vh] flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-6">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="ShoppingCartIcon" size={48} className="text-muted-foreground" />
        </div>
        
        <h1 className="font-heading font-bold text-2xl text-foreground mb-4">
          YOUR CART IS EMPTY
        </h1>
        
        <p className="text-muted-foreground mb-8">
          Looks like you haven't added anything to your cart yet. Start shopping to fill it up with amazing fashion finds!
        </p>

        <div className="space-y-4">
          <Link
            href="/product-catalog"
            className="block w-full bg-accent text-accent-foreground font-heading font-bold py-3 px-6 hover:bg-accent/90 transition-colors btn-press"
          >
            START SHOPPING
          </Link>
          
          <Link
            href="/homepage"
            className="block w-full border border-border text-foreground font-heading font-semibold py-3 px-6 hover:bg-muted transition-colors btn-press"
          >
            BACK TO HOME
          </Link>
        </div>

        {recentlyViewed && recentlyViewed?.length > 0 && (
          <div className="mt-12">
            <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
              Recently Viewed
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {recentlyViewed?.slice(0, 4)?.map((item) => (
                <Link
                  key={item?.id}
                  href={`/product-details?id=${item?.id}`}
                  className="group block"
                >
                  <div className="aspect-square bg-muted mb-2 overflow-hidden">
                    <img
                      src={item?.image}
                      alt={item?.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <p className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                    {item?.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    ${item?.price?.toFixed(2)}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

EmptyCart.propTypes = {
  recentlyViewed: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.string?.isRequired,
      name: PropTypes?.string?.isRequired,
      price: PropTypes?.number?.isRequired,
      image: PropTypes?.string?.isRequired,
      alt: PropTypes?.string?.isRequired
    })
  )
};

export default EmptyCart;