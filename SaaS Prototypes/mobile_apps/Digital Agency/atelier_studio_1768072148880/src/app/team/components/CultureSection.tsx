import AppImage from '@/components/ui/AppImage';

export default function CultureSection() {
  const cultureImages = [
  {
    src: "https://img.rocket.new/generatedImages/rocket_gen_img_12e1a02d7-1764661943194.png",
    alt: "Creative team collaborating around large desk with laptops and design sketches in modern studio space"
  },
  {
    src: "https://img.rocket.new/generatedImages/rocket_gen_img_1e87432cd-1764659258684.png",
    alt: "Diverse group of designers reviewing work on large monitor in bright office with plants"
  },
  {
    src: "https://images.unsplash.com/photo-1590402494628-9b9acf0b90ae",
    alt: "Team members brainstorming with sticky notes on glass wall in contemporary workspace"
  }];


  return (
    <section className="py-20 lg:py-32 px-6 lg:px-12 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="space-y-6">
            <p className="font-body text-sm text-primary uppercase tracking-wider">Our Culture</p>
            <h2 className="font-headline text-4xl lg:text-5xl text-foreground leading-tight">
              Where craft meets<br />collaboration
            </h2>
            <p className="font-body text-lg text-text-secondary leading-relaxed">
              We believe exceptional work emerges from environments that nurture creativity, encourage experimentation, and celebrate diverse perspectives. Our studio culture is built on mutual respect, continuous learning, and the shared pursuit of creative excellence.
            </p>
            <p className="font-body text-base text-text-secondary leading-relaxed">
              From mentorship programs to collaborative workshops, we invest in our team's growth and foster connections that transcend traditional agency hierarchies. Every voice matters, every idea is valued, and every project is an opportunity to push boundaries together.
            </p>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-[3/4] overflow-hidden rounded-md">
                <AppImage
                  src={cultureImages?.[0]?.src}
                  alt={cultureImages?.[0]?.alt}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />

              </div>
              <div className="aspect-square overflow-hidden rounded-md">
                <AppImage
                  src={cultureImages?.[1]?.src}
                  alt={cultureImages?.[1]?.alt}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />

              </div>
            </div>
            <div className="pt-12">
              <div className="aspect-[3/4] overflow-hidden rounded-md">
                <AppImage
                  src={cultureImages?.[2]?.src}
                  alt={cultureImages?.[2]?.alt}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}