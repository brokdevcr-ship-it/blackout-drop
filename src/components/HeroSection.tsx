import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-model.jpg";

export const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="LEVN Collection campaign"
          width={1920}
          height={1080}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/10" />
      </div>

      <div className="relative h-full flex flex-col justify-end pb-20 md:pb-32 container mx-auto px-6">
        <div className="max-w-2xl">
          <p className="font-body text-xs tracking-[0.5em] uppercase text-accent mb-4 fade-in-up">
            Limited Edition
          </p>
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-black uppercase leading-[0.85] tracking-tight text-foreground fade-in-up fade-in-up-delay-1">
            NEW<br />DROP
          </h1>
          <p className="font-display text-lg md:text-xl font-light tracking-[0.2em] uppercase text-muted-foreground mt-4 fade-in-up fade-in-up-delay-1">
            LEVN Collection
          </p>
          <p className="font-body text-sm text-muted-foreground mt-4 mb-8 tracking-wide fade-in-up fade-in-up-delay-2">
            Limited pieces available — Once they're gone, they're gone.
          </p>
          <div className="flex gap-4 fade-in-up fade-in-up-delay-3">
            <Link
              to="/#products"
              className="inline-flex items-center justify-center h-12 px-10 bg-foreground text-background font-display text-xs tracking-[0.3em] uppercase hover:bg-foreground/90 transition-all duration-300"
            >
              Shop Now
            </Link>
            <Link
              to="/#collections"
              className="inline-flex items-center justify-center h-12 px-10 border border-foreground/30 text-foreground font-display text-xs tracking-[0.3em] uppercase hover:border-foreground hover:bg-foreground/5 transition-all duration-300"
            >
              Explore
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
