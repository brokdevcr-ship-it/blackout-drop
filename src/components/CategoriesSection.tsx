import { Link } from "react-router-dom";
import categoryTshirts from "@/assets/category-tshirts.jpg";
import categoryHoodies from "@/assets/category-hoodies.jpg";
import categoryPants from "@/assets/category-pants.jpg";
import categoryAccessories from "@/assets/category-accessories.jpg";

const categories = [
  { title: "T-Shirts", image: categoryTshirts, link: "/#products" },
  { title: "Hoodies", image: categoryHoodies, link: "/#products" },
  { title: "Pants", image: categoryPants, link: "/#products" },
  { title: "Accessories", image: categoryAccessories, link: "/#products" },
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

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <Link key={cat.title} to={cat.link} className="group relative aspect-[3/4] overflow-hidden block">
            <img
              src={cat.image}
              alt={cat.title}
              loading="lazy"
              width={800}
              height={1024}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="font-display text-xl md:text-2xl font-bold uppercase tracking-wider text-foreground">
                {cat.title}
              </h3>
              <p className="font-body text-xs tracking-widest uppercase text-muted-foreground mt-2 group-hover:text-accent transition-colors duration-300">
                View Collection →
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
