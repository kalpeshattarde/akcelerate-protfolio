import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import PropTypes from 'prop-types';

const BlogSection = ({ blogPosts }) => {
  return (
    <section className="py-20 bg-card">
      <div className="w-full px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-card-foreground mb-4 tracking-tight">
            FASHION INSIGHTS
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay ahead of the curve with our latest fashion trends, styling tips, and industry insights
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts?.map((post) => (
            <article key={post?.id} className="bg-background border border-border shadow-elevation-1 hover:shadow-elevation-2 transition-all hover-lift group">
              {/* Featured Image */}
              <div className="relative overflow-hidden">
                <AppImage
                  src={post?.image}
                  alt={post?.imageAlt}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-accent text-accent-foreground px-3 py-1 text-xs font-bold uppercase tracking-wide">
                    {post?.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta Info */}
                <div className="flex items-center gap-4 text-muted-foreground text-sm mb-3">
                  <div className="flex items-center gap-1">
                    <Icon name="CalendarIcon" size={14} />
                    <span>{post?.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="ClockIcon" size={14} />
                    <span>{post?.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-heading font-bold text-xl text-foreground mb-3 leading-tight line-clamp-2 group-hover:text-accent transition-colors">
                  {post?.title}
                </h3>

                {/* Excerpt */}
                <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                  {post?.excerpt}
                </p>

                {/* Author & CTA */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <AppImage
                        src={post?.author?.avatar}
                        alt={post?.author?.avatarAlt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-sm font-semibold text-foreground">
                      {post?.author?.name}
                    </span>
                  </div>
                  
                  <Link
                    href={`/blog/${post?.slug}`}
                    className="inline-flex items-center gap-1 text-black hover:text-black/80 font-semibold text-sm uppercase tracking-wide transition-colors"
                  >
                    Read More
                    <Icon name="ArrowRightIcon" size={14} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 font-heading font-bold text-sm uppercase tracking-wide hover:bg-primary/90 transition-colors btn-press shadow-elevation-2"
          >
            View All Articles
            <Icon name="ArrowRightIcon" size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

BlogSection.propTypes = {
  blogPosts: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.number?.isRequired,
      title: PropTypes?.string?.isRequired,
      excerpt: PropTypes?.string?.isRequired,
      category: PropTypes?.string?.isRequired,
      date: PropTypes?.string?.isRequired,
      readTime: PropTypes?.string?.isRequired,
      image: PropTypes?.string?.isRequired,
      imageAlt: PropTypes?.string?.isRequired,
      slug: PropTypes?.string?.isRequired,
      author: PropTypes?.shape({
        name: PropTypes?.string?.isRequired,
        avatar: PropTypes?.string?.isRequired,
        avatarAlt: PropTypes?.string?.isRequired
      })?.isRequired
    })
  )?.isRequired
};

export default BlogSection;