import { Link } from "react-router-dom";
import levnLogo from "@/assets/levn-logo.png";

export const Footer = () => {
  return (
    <footer className="py-16 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <h3 className="font-display text-xl font-bold tracking-[0.3em] uppercase text-foreground">BLACKOUT</h3>
            <p className="font-body text-sm text-muted-foreground mt-3 max-w-xs">
              Premium streetwear for the future generation.
            </p>
          </div>
          <div>
            <h4 className="font-display text-xs tracking-widest uppercase text-foreground mb-4">Shop</h4>
            <div className="flex flex-col gap-2">
              <Link to="/#products" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">New Arrivals</Link>
              <Link to="/#collections" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">Collections</Link>
              <Link to="/#products" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">All Products</Link>
            </div>
          </div>
          <div>
            <h4 className="font-display text-xs tracking-widest uppercase text-foreground mb-4">Follow</h4>
            <div className="flex flex-col gap-2">
              <a href="#" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">Instagram</a>
              <a href="#" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">TikTok</a>
              <a href="#" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">Twitter / X</a>
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-muted-foreground">© 2026 BLACKOUT. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors">Shipping</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
