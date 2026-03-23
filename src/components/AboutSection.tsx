export const AboutSection = () => {
  return (
    <section id="about" className="py-32 container mx-auto px-6">
      <div className="max-w-3xl mx-auto text-center">
        <p className="font-body text-xs tracking-[0.5em] uppercase text-accent mb-6">The Brand</p>
        <h2 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-tight text-foreground leading-tight">
          Where the future<br />meets the street
        </h2>
        <p className="font-body text-muted-foreground mt-8 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
          Born from the intersection of technology and culture, BLACKOUT crafts pieces for those who refuse to blend in. Every thread, every cut, every detail — engineered for the next era.
        </p>
        <div className="mt-12 w-16 h-px bg-accent mx-auto" />
      </div>
    </section>
  );
};
