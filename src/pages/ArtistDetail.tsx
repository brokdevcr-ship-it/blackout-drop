import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { MOCK_ARTISTS, getArtistBySlug } from "@/lib/mockArtists";
import { getMockProductByHandle } from "@/lib/mockProducts";
import { onImgError } from "@/lib/imageUtils";
import { ArrowLeft } from "lucide-react";

const ArtistDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const artist = getArtistBySlug(slug ?? "");

  if (!artist) {
    return (
      <Layout>
        <div className="pt-28 min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <p className="font-body text-xs tracking-[0.5em] uppercase text-accent mb-4">404</p>
            <h1 className="font-display text-4xl font-black uppercase text-foreground mb-6">
              Artist Not Found
            </h1>
            <Link
              to="/artists"
              className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to Artists
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  // Resolve featured pieces to full product data
  const featuredProducts = artist.pieces
    .map((piece) => {
      const product = getMockProductByHandle(piece.handle);
      return product ? { piece, product } : null;
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null);

  // Other artists for the "More Artists" strip
  const otherArtists = MOCK_ARTISTS.filter((a) => a.slug !== artist.slug).slice(0, 3);

  return (
    <Layout>
      <div className="pt-28">
        {/* Back link */}
        <div className="container mx-auto px-6 py-6">
          <Link
            to="/artists"
            className="inline-flex items-center gap-2 font-body text-xs tracking-[0.3em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            <ArrowLeft className="h-3 w-3" />
            All Artists
          </Link>
        </div>

        {/* ── Hero: image + bio ─────────────────────────────────────── */}
        <section className="container mx-auto px-6 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Image */}
            <div className="relative overflow-hidden">
              <img
                src={artist.detailImageUrl}
                alt={artist.name}
                onError={onImgError}
                className="w-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="font-body text-[10px] tracking-[0.3em] uppercase text-accent border border-accent/30 bg-black/70 backdrop-blur-sm px-3 py-1">
                  {artist.genre}
                </span>
              </div>
              {artist.instagram && (
                <div className="absolute bottom-4 left-4">
                  <span className="font-body text-[10px] tracking-[0.2em] text-white/60 bg-black/50 backdrop-blur-sm px-3 py-1">
                    {artist.instagram}
                  </span>
                </div>
              )}
            </div>

            {/* Text content */}
            <div className="lg:pt-8 flex flex-col gap-8">
              <div>
                <p className="font-body text-[10px] tracking-[0.5em] uppercase text-accent mb-3">
                  {artist.role}
                </p>
                <h1 className="font-display text-5xl md:text-7xl font-black uppercase tracking-tight text-foreground leading-none mb-6">
                  {artist.name}
                </h1>
                <div className="w-12 h-px bg-accent" />
              </div>

              <blockquote className="border-l-2 border-accent pl-6">
                <p className="font-body text-lg md:text-xl text-foreground italic leading-relaxed">
                  "{artist.quote}"
                </p>
              </blockquote>

              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {artist.bio}
              </p>

              {/* Wearing — inline piece names linking to products */}
              <div>
                <p className="font-body text-[10px] tracking-[0.5em] uppercase text-accent mb-3">
                  Wearing
                </p>
                <div className="flex flex-wrap gap-2">
                  {artist.pieces.map((piece) => (
                    <Link
                      key={piece.handle}
                      to={`/product/${piece.handle}`}
                      className="font-body text-[10px] tracking-widest uppercase text-foreground/60 border border-border/50 px-3 py-1 hover:text-foreground hover:border-foreground/30 transition-colors duration-200"
                    >
                      {piece.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                to="/shop"
                className="inline-flex items-center justify-center h-12 px-10 bg-foreground text-background font-display text-xs tracking-[0.3em] uppercase hover:bg-foreground/90 transition-all duration-300 self-start"
              >
                Shop All Pieces
              </Link>
            </div>
          </div>
        </section>

        {/* ── Featured Products ──────────────────────────────────────── */}
        {featuredProducts.length > 0 && (
          <section className="py-16 border-t border-border">
            <div className="container mx-auto px-6">
              <div className="mb-10">
                <p className="font-body text-[10px] tracking-[0.5em] uppercase text-accent mb-2">
                  The Fit
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-black uppercase tracking-tight text-foreground">
                  {artist.name.split(" ")[0]}'s Pieces
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProducts.map(({ piece, product }) => {
                  const img = product.node.images.edges[0]?.node.url ?? "";
                  const { amount, currencyCode } = product.node.priceRange.minVariantPrice;
                  const price = currencyCode === "USD"
                    ? `$${parseFloat(amount).toFixed(2)}`
                    : `${currencyCode} ${parseFloat(amount).toFixed(2)}`;
                  return (
                    <div
                      key={piece.handle}
                      className="group bg-[#0a0a0a] border border-border flex flex-col"
                    >
                      {/* Product image */}
                      <Link
                        to={`/product/${piece.handle}`}
                        className="block relative overflow-hidden aspect-[3/4]"
                      >
                        <img
                          src={img}
                          alt={product.node.title}
                          onError={onImgError}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      </Link>

                      {/* Product info */}
                      <div className="p-4 flex flex-col gap-3 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-display text-sm uppercase tracking-[0.15em] text-foreground leading-tight">
                            {product.node.title}
                          </h3>
                          <span className="font-body text-sm text-foreground whitespace-nowrap tabular-nums">
                            {price}
                          </span>
                        </div>

                        <Link
                          to={`/product/${piece.handle}`}
                          className="mt-auto inline-flex items-center justify-center h-9 px-4 border border-foreground/20 text-foreground font-display text-[10px] tracking-[0.25em] uppercase hover:bg-foreground hover:text-background transition-all duration-300"
                        >
                          Shop This Piece
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ── More Artists strip ────────────────────────────────────── */}
        {otherArtists.length > 0 && (
          <section className="py-16 border-t border-border">
            <div className="container mx-auto px-6">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="font-body text-[10px] tracking-[0.5em] uppercase text-accent mb-1">
                    The Crew
                  </p>
                  <h2 className="font-display text-2xl font-black uppercase tracking-tight text-foreground">
                    More Artists
                  </h2>
                </div>
                <Link
                  to="/artists"
                  className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  View All →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {otherArtists.map((other) => (
                  <Link
                    key={other.id}
                    to={`/artists/${other.slug}`}
                    className="group relative overflow-hidden aspect-[3/4] block bg-[#0a0a0a]"
                  >
                    <img
                      src={other.imageUrl}
                      alt={other.name}
                      onError={onImgError}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="font-body text-[9px] tracking-[0.4em] uppercase text-white/50 mb-0.5">
                        {other.role}
                      </p>
                      <h3 className="font-display text-lg font-black uppercase tracking-tight text-foreground leading-none">
                        {other.name}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default ArtistDetail;
