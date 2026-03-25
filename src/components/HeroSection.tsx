import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-model.jpg";
import levnLogo from "@/assets/levn-logo.png";
import { onImgError } from "@/lib/imageUtils";

export const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="LEVN Drop 001 campaign"
          width={1920}
          height={1080}
          onError={onImgError}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-background/10" />
      </div>

      <div className="relative h-full flex flex-col justify-end pb-20 md:pb-32 container mx-auto px-6">
        <div className="max-w-2xl">
          <img
            src={levnLogo}
            alt="LEVN"
            className="h-16 md:h-20 w-auto mb-6 fade-in-up"
          />

          {/* Drop label */}
          <p className="font-body text-[10px] tracking-[0.5em] uppercase text-accent mb-3 fade-in-up fade-in-up-delay-1">
            Drop 001
          </p>

          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-black uppercase leading-[0.85] tracking-tight text-foreground fade-in-up fade-in-up-delay-1">
            LEVN<br />DROP 001
          </h1>

          <p className="font-body text-base md:text-lg font-light tracking-[0.15em] uppercase text-muted-foreground mt-5 fade-in-up fade-in-up-delay-1">
            Oversized essentials. Limited pieces.
          </p>

          <p className="font-body text-sm text-muted-foreground/70 mt-3 mb-8 tracking-wide max-w-sm fade-in-up fade-in-up-delay-2">
            Premium streetwear engineered for the next era.
            Once it's gone, it's gone.
          </p>

          <div className="flex gap-4 fade-in-up fade-in-up-delay-3">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center h-12 px-10 bg-foreground text-background font-display text-xs tracking-[0.3em] uppercase hover:bg-foreground/90 transition-all duration-300"
            >
              Shop Now
            </Link>
            <Link
              to="/collections"
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
