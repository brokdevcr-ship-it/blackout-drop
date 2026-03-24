import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";

const About = () => (
  <Layout>
    <div className="pt-28">
      {/* Brand story */}
      <section className="py-24 container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-body text-xs tracking-[0.5em] uppercase text-accent mb-6">The Brand</p>
          <h1 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tight text-foreground leading-tight">
            Where the future<br />meets the street
          </h1>
          <p className="font-body text-muted-foreground mt-8 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            Born from the intersection of technology and culture, BLACKOUT crafts pieces for those who refuse to blend in. Every thread, every cut, every detail — engineered for the next era.
          </p>
          <div className="mt-12 w-16 h-px bg-accent mx-auto" />
        </div>
      </section>

      {/* Values */}
      <section className="py-16 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <p className="font-display text-xs tracking-[0.5em] uppercase text-accent mb-4">01</p>
              <h3 className="font-display text-xl font-bold uppercase tracking-tight text-foreground mb-3">Quality First</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                Every garment is cut and sewn with precision. We source premium fabrics that hold their shape, colour, and feel — drop after drop.
              </p>
            </div>
            <div>
              <p className="font-display text-xs tracking-[0.5em] uppercase text-accent mb-4">02</p>
              <h3 className="font-display text-xl font-bold uppercase tracking-tight text-foreground mb-3">Limited Runs</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                We don't do mass production. Each drop is intentionally small — keeping pieces rare, and the community tight.
              </p>
            </div>
            <div>
              <p className="font-display text-xs tracking-[0.5em] uppercase text-accent mb-4">03</p>
              <h3 className="font-display text-xl font-bold uppercase tracking-tight text-foreground mb-3">Built for Culture</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                Streetwear for the next generation — designed at the intersection of music, art, and the digital underground.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-border text-center">
        <div className="container mx-auto px-6">
          <p className="font-body text-xs tracking-[0.5em] uppercase text-accent mb-4">Ready?</p>
          <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tight text-foreground mb-8">
            Shop the Drop
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

export default About;
