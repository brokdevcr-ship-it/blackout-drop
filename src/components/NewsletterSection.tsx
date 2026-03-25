import { useState } from "react";

export const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    // In production: send to Shopify Customer API or Klaviyo endpoint
    setSubmitted(true);
  };

  return (
    <section className="py-28 border-t border-border bg-[#080808]">
      <div className="container mx-auto px-6">
        <div className="max-w-lg mx-auto text-center">
          <p className="font-body text-[10px] tracking-[0.5em] uppercase text-accent mb-5">
            Get Early Access
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-black uppercase tracking-tight text-foreground leading-none mb-4">
            Join the Drop
          </h2>
          <p className="font-body text-sm text-muted-foreground leading-relaxed mb-10">
            Be the first to know when new drops go live.
            <br />
            No spam — just LEVN.
          </p>

          {submitted ? (
            <div className="flex flex-col items-center gap-3">
              <p className="font-display text-sm tracking-[0.3em] uppercase text-foreground">
                You're on the list
              </p>
              <div className="w-8 h-px bg-accent" />
              <p className="font-body text-xs text-muted-foreground">
                Watch your inbox for Drop 001 early access.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-0 max-w-sm mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                aria-label="Email address"
                className="flex-1 h-12 px-4 bg-transparent border border-border border-r-0 sm:border-r-0 text-foreground placeholder:text-muted-foreground/50 font-body text-sm focus:outline-none focus:border-foreground/40 transition-colors duration-200"
              />
              <button
                type="submit"
                className="h-12 px-7 bg-foreground text-background font-display text-[10px] tracking-[0.3em] uppercase hover:bg-foreground/90 active:scale-[0.98] transition-all duration-200 whitespace-nowrap border border-foreground"
              >
                Subscribe
              </button>
            </form>
          )}

          <p className="font-body text-[10px] text-muted-foreground/40 mt-5 tracking-wide">
            Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};
