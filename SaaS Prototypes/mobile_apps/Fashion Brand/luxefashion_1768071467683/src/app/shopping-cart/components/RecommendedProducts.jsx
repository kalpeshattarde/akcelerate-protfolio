import PropTypes from 'prop-types';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const RecommendedProducts = ({ products }) => {
  return (
    <section className="bg-background py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="font-heading font-bold text-2xl lg:text-3xl text-foreground mb-2">
            YOU MIGHT ALSO LIKE
          </h2>
          <p className="text-muted-foreground">
            Complete your look with these handpicked recommendations
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {products?.map((product) => (
            <div key={product?.id} className="group">
              <Link href={`/product-details?id=${product?.id}`} className="block">
                <div className="relative overflow-hidden bg-muted mb-4 aspect-square">
                  <AppImage
                    src={product?.image}
                    alt={product?.alt}
                    className="w-full h-full object-cover"
                  />
                  
                  {product?.isNew && (
                    <div className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs font-bold px-2 py-1">
                      NEW
                    </div>
                  )}
                  
                  {product?.discount > 0 && (
                    <div className="absolute top-3 right-3 bg-error text-error-foreground text-xs font-bold px-2 py-1">
                      -{product?.discount}%
                    </div>
                  )}

                  {/* Quick Add Button */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <button className="bg-accent text-accent-foreground px-4 py-2 font-medium opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 btn-press">
                      QUICK ADD
                    </button>
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="font-heading font-semibold text-sm lg:text-base text-foreground mb-1 group-hover:text-accent transition-colors">
                    {product?.name}
                  </h3>
                  
                  <div className="flex items-center justify-center gap-2">
                    {product?.originalPrice && product?.originalPrice > product?.price ? (
                      <>
                        <span className="text-sm text-muted-foreground line-through">
                          ${product?.originalPrice?.toFixed(2)}
                        </span>
                        <span className="font-bold text-foreground">
                          ${product?.price?.toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <span className="font-bold text-foreground">
                        ${product?.price?.toFixed(2)}
                      </span>
                    )}
                  </div>

                  {/* Rating */}
                  {product?.rating && (
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <div className="flex">
                        {[...Array(5)]?.map((_, i) => (
                          <Icon
                            key={i}
                            name="StarIcon"
                            size={12}
                            variant={i < Math.floor(product?.rating) ? 'solid' : 'outline'}
                            className={i < Math.floor(product?.rating) ? 'text-yellow-400' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        ({product?.reviewCount})
                      </span>
                    </div>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/product-catalog"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 font-heading font-semibold hover:bg-primary/90 transition-colors btn-press"
          >
            VIEW ALL PRODUCTS
            <Icon name="ArrowRightIcon" size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

RecommendedProducts.propTypes = {
  products: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.string?.isRequired,
      name: PropTypes?.string?.isRequired,
      price: PropTypes?.number?.isRequired,
      originalPrice: PropTypes?.number,
      image: PropTypes?.string?.isRequired,
      alt: PropTypes?.string?.isRequired,
      isNew: PropTypes?.bool,
      discount: PropTypes?.number,
      rating: PropTypes?.number,
      reviewCount: PropTypes?.number
    })
  )?.isRequired
};

export default RecommendedProducts;