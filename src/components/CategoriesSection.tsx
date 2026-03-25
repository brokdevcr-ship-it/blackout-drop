import { Link } from "react-router-dom";
import { unsplashUrl, onImgError } from "@/lib/imageUtils";

const categories = [
  {
    title: "T-Shirts",
    subtitle: "Heavyweight blanks & graphics",
    image: unsplashUrl("1521572163474-6864f9cf17ab"),
    link: "/shop",
  },
  {
    title: "Hoodies",
    subtitle: "400gsm fleece, pullover & zip",
    image: unsplashUrl("1556821840-3a63f8a79d7e"),
    link: "/shop",
  },
  {
    title: "Pants",
    subtitle: "Cargo, track & utility",
    image: unsplashUrl("1542272604-787c3835535d"),
    link: "/shop",
  },
  {
    title: "Outerwear",
    subtitle: "Shell jackets & puffer",
    image: unsplashUrl("1591047139829-d91aecb6caea"),
    link: "/shop",
  },
  {
    title: "Accessories",
    subtitle: "Caps, beanies & bags",
    image: unsplashUrl("1588850561407-ed78c5b5d3e2"),
    link: "/shop",
  },
];

export const CategoriesSection = () => {
  return (
    <section id="collections" className="py-24 container mx-auto px-6">
      <div className="mb-12">
        <p className="font-body text-xs tracking-[0.5em] uppercase text-accent mb-2">Explore</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight text-foreground">
          Categories
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.title}
            to={cat.link}
            className="group relative aspect-[3/4] overflow-hidden block bg-[#0a0a0a]"
          >
            <img
              src={cat.image}
              alt={cat.title}
              loading="lazy"
              onError={onImgError}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
              <h3 className="font-display text-base md:text-lg font-bold uppercase tracking-wider text-foreground leading-tight">
                {cat.title}
              </h3>
              <p className="font-body text-[10px] tracking-widest uppercase text-muted-foreground mt-1 group-hover:text-accent transition-colors duration-300">
                {cat.subtitle}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
