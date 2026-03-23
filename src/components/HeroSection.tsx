import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-model.jpg";

export const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="New collection campaign"
          width={1920}
          height={1080}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
      </div>

      <div className="relative h-full flex flex-col justify-end pb-20 md:pb-32 container mx-auto px-6">
        <div className="max-w-2xl">
          <p className="font-body text-xs tracking-[0.5em] uppercase text-accent mb-4 fade-in-up">
            SS26 Collection
          </p>
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-black uppercase leading-[0.85] tracking-tight text-foreground fade-in-up fade-in-up-delay-1">
            NEW<br />DROP
          </h1>
          <p className="font-body text-sm md:text-base text-muted-foreground mt-6 mb-8 tracking-wide fade-in-up fade-in-up-delay-2">
            Disponible ahora — Limited pieces available
          </p>
          <div className="flex gap-4 fade-in-up fade-in-up-delay-3">
            <Link
              to="/#products"
              className="inline-flex items-center justify-center h-12 px-8 bg-primary text-primary-foreground font-display text-sm tracking-widest uppercase hover:bg-primary/90 transition-all duration-300"
            >
              Shop Now
            </Link>
            <Link
              to="/#collections"
              className="inline-flex items-center justify-center h-12 px-8 border border-foreground/30 text-foreground font-display text-sm tracking-widest uppercase hover:border-foreground hover:bg-foreground/5 transition-all duration-300"
            >
              Explorar
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
