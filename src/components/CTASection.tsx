import { Link } from "react-router-dom";

export const CTASection = () => {
  return (
    <section className="py-32 border-y border-border">
      <div className="container mx-auto px-6 text-center">
        <p className="font-body text-xs tracking-[0.5em] uppercase text-accent mb-4">Don't miss out</p>
        <h2 className="font-display text-5xl md:text-7xl font-black uppercase tracking-tight text-foreground">
          Join the Drop
        </h2>
        <p className="font-body text-muted-foreground mt-4 mb-2 text-sm tracking-wide">
          Limited stock — Once they're gone, they're gone.
        </p>
        <p className="font-display text-xs tracking-[0.4em] uppercase text-accent mb-10">
          LEVN Collection
        </p>
        <Link
          to="/#products"
          className="inline-flex items-center justify-center h-12 px-10 bg-foreground text-background font-display text-xs tracking-[0.3em] uppercase hover:bg-foreground/90 transition-all duration-300"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
};
