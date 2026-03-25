import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";
import levnLogo from "@/assets/levn-logo.png";

const INSTAGRAM_URL = "https://www.instagram.com/levn.cr/";

export const Footer = () => {
  return (
    <footer className="py-16 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/">
              <img src={levnLogo} alt="LEVN" className="h-8 w-auto" />
            </Link>
            <p className="font-body text-sm text-muted-foreground mt-3 max-w-xs leading-relaxed">
              Premium streetwear for the next generation. Limited drops, no
              compromises.
            </p>
            {/* Instagram CTA */}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-5 font-body text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300 group"
            >
              <Instagram className="w-4 h-4 group-hover:text-foreground transition-colors" />
              @levn.cr
            </a>
          </div>

          {/* Shop links */}
          <div>
            <h4 className="font-display text-xs tracking-widest uppercase text-foreground mb-4">
              Shop
            </h4>
            <div className="flex flex-col gap-2.5">
              <Link
                to="/shop"
                className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                New Arrivals
              </Link>
              <Link
                to="/collections"
                className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Collections
              </Link>
              <Link
                to="/shop"
                className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                All Products
              </Link>
              <Link
                to="/artists"
                className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Artists
              </Link>
            </div>
          </div>

          {/* Follow / Social */}
          <div>
            <h4 className="font-display text-xs tracking-widest uppercase text-foreground mb-4">
              Follow
            </h4>
            <div className="flex flex-col gap-2.5">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors group"
              >
                <Instagram className="w-3.5 h-3.5" />
                Instagram
              </a>
              <a
                href="#"
                className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                TikTok
              </a>
              <a
                href="#"
                className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Twitter / X
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-muted-foreground">
            © 2026 LEVN. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms
            </a>
            <a
              href="#"
              className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Shipping
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LEVN on Instagram"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
