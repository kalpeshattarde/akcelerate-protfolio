import React from 'react';
import AppImage from '@/components/ui/AppImage';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  image: string;
  alt: string;
}

const Testimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
  {
    quote: "Working with Atelier Studio transformed not just our digital presence, but our entire approach to brand storytelling. Their attention to craft and strategic thinking is unmatched.",
    author: "Sarah Chen",
    role: "Chief Marketing Officer",
    company: "Lumina Brands",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1abe8c93c-1763293838123.png",
    alt: "Professional Asian woman with long black hair in navy blazer smiling confidently in modern office"
  },
  {
    quote: "The team's ability to balance creative vision with business objectives is remarkable. They don't just design—they solve problems and create experiences that resonate.",
    author: "Michael Rodriguez",
    role: "Founder & CEO",
    company: "Vertex Innovations",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_17da3208d-1763296058834.png",
    alt: "Hispanic businessman with beard in charcoal suit standing in contemporary workspace"
  },
  {
    quote: "From our first conversation, it was clear that Atelier Studio operates at a different level. Their process is thorough, collaborative, and results in work that exceeds expectations.",
    author: "Emily Thompson",
    role: "Creative Director",
    company: "Meridian Gallery",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_11b35d77b-1763293703695.png",
    alt: "Young professional woman with blonde hair in white blouse smiling warmly in bright studio setting"
  }];


  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            What Our Clients Say
          </h2>
          <p className="font-body text-lg text-text-secondary max-w-2xl mx-auto">
            Testimonials from partners who value exceptional craft and strategic thinking
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) =>
          <div
            key={index}
            className="bg-surface border border-border rounded-lg p-8 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-dramatic">

              <div className="mb-6">
                <svg
                className="w-10 h-10 text-primary/30"
                fill="currentColor"
                viewBox="0 0 24 24">

                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              <p className="font-body text-foreground mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>

              <div className="flex items-center gap-4 pt-6 border-t border-border">
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <AppImage
                  src={testimonial.image}
                  alt={testimonial.alt}
                  fill
                  className="object-cover" />

                </div>
                <div>
                  <p className="font-cta font-semibold text-foreground">
                    {testimonial.author}
                  </p>
                  <p className="font-body text-sm text-text-secondary">
                    {testimonial.role}
                  </p>
                  <p className="font-body text-sm text-primary">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

};

export default Testimonials;