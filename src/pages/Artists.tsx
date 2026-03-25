import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { MOCK_ARTISTS } from "@/lib/mockArtists";
import { onImgError } from "@/lib/imageUtils";

const Artists = () => (
  <Layout>
    <div className="pt-28">
      {/* Header */}
      <section className="py-20 container mx-auto px-6 text-center">
        <p className="font-body text-xs tracking-[0.5em] uppercase text-accent mb-6">
          The Culture
        </p>
        <h1 className="font-display text-4xl md:text-7xl font-black uppercase tracking-tight text-foreground leading-none">
          Artists
        </h1>
        <p className="font-body text-muted-foreground mt-6 text-sm leading-relaxed max-w-xl mx-auto">
          These are the voices and faces that carry LEVN into culture. Not sponsored —
          chosen. Artists who wear the brand because it speaks to who they are.
        </p>
        <div className="mt-10 w-16 h-px bg-accent mx-auto" />
      </section>

      {/* Grid */}
      <section className="pb-24 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {MOCK_ARTISTS.map((artist) => (
            <div
              key={artist.id}
              className="group relative overflow-hidden bg-[#0a0a0a] border border-border flex flex-col"
            >
              {/* Image — clicking image or name navigates to detail */}
              <Link to={`/artists/${artist.slug}`} className="block relative overflow-hidden aspect-[3/4]">
                <img
                  src={artist.imageUrl}
                  alt={artist.name}
                  onError={onImgError}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                {/* Genre tag */}
                <div className="absolute top-4 left-4">
                  <span className="font-body text-[10px] tracking-[0.3em] uppercase text-accent border border-accent/30 bg-black/60 backdrop-blur-sm px-3 py-1">
                    {artist.genre}
                  </span>
                </div>

                {/* Name / role overlay on image */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="font-body text-[10px] tracking-[0.4em] uppercase text-white/50 mb-1">
                    {artist.role}
                  </p>
                  <h2 className="font-display text-2xl md:text-3xl font-black uppercase tracking-tight text-foreground leading-none mb-3">
                    {artist.name}
                  </h2>
                  <p className="font-body text-sm text-white/60 italic leading-relaxed line-clamp-2">
                    "{artist.quote}"
                  </p>
                </div>
              </Link>

              {/* Card footer — outside the image link */}
              <div className="p-6 flex flex-col gap-4 border-t border-border/50">
                {/* Wearing */}
                <div>
                  <p className="font-body text-[10px] tracking-[0.4em] uppercase text-accent mb-2">
                    Wearing
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {artist.pieces.map((piece) => (
                      <Link
                        key={piece.handle}
                        to={`/product/${piece.handle}`}
                        className="font-body text-[10px] tracking-widest uppercase text-foreground/60 border border-border/50 px-2 py-0.5 hover:text-foreground hover:border-foreground/30 transition-colors duration-200"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {piece.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <Link
                  to={`/artists/${artist.slug}`}
                  className="inline-flex items-center justify-center gap-2 h-10 px-6 border border-foreground/20 text-foreground font-display text-[10px] tracking-[0.3em] uppercase hover:bg-foreground hover:text-background transition-all duration-300 self-start"
                >
                  View Fit
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 border-t border-border text-center">
        <div className="container mx-auto px-6">
          <p className="font-body text-xs tracking-[0.5em] uppercase text-accent mb-4">
            Wear What They Wear
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-black uppercase tracking-tight text-foreground mb-8">
            Shop the Collection
          </h2>
          <Link
            to="/shop"
            className="inline-flex items-center justify-center h-12 px-10 bg-foreground text-background font-display text-xs tracking-[0.3em] uppercase hover:bg-foreground/90 transition-all duration-300"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  </Layout>
);

export default Artists;
