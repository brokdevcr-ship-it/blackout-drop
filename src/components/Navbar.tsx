import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingCart, Instagram } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/stores/cartStore";
import levnLogo from "@/assets/levn-logo.png";

const INSTAGRAM_URL = "https://www.instagram.com/levn.cr/";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const totalItems = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <nav className="fixed top-9 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/">
          <img src={levnLogo} alt="LEVN" className="h-8 w-auto" />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/shop" className="text-xs tracking-[0.3em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300">
            Shop
          </Link>
          <Link to="/collections" className="text-xs tracking-[0.3em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300">
            Collections
          </Link>
          <Link to="/artists" className="text-xs tracking-[0.3em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300">
            Artists
          </Link>
          <Link to="/about" className="text-xs tracking-[0.3em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300">
            About
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LEVN on Instagram"
            className="hidden md:block text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            <Instagram className="h-4 w-4" />
          </a>
          <Link to="/cart" className="relative text-foreground hover:text-accent transition-colors duration-300">
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <Badge className="absolute -top-2 -right-2 h-4 w-4 rounded-full p-0 flex items-center justify-center text-[10px] bg-accent text-accent-foreground border-none">
                {totalItems}
              </Badge>
            )}
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
            <Link to="/shop" onClick={() => setIsOpen(false)} className="text-xs tracking-[0.3em] uppercase text-muted-foreground hover:text-foreground transition-colors">Shop</Link>
            <Link to="/collections" onClick={() => setIsOpen(false)} className="text-xs tracking-[0.3em] uppercase text-muted-foreground hover:text-foreground transition-colors">Collections</Link>
            <Link to="/artists" onClick={() => setIsOpen(false)} className="text-xs tracking-[0.3em] uppercase text-muted-foreground hover:text-foreground transition-colors">Artists</Link>
            <Link to="/about" onClick={() => setIsOpen(false)} className="text-xs tracking-[0.3em] uppercase text-muted-foreground hover:text-foreground transition-colors">About</Link>
            <Link to="/cart" onClick={() => setIsOpen(false)} className="text-xs tracking-[0.3em] uppercase text-muted-foreground hover:text-foreground transition-colors">Cart {totalItems > 0 && `(${totalItems})`}</Link>
          </div>
        </div>
      )}
    </nav>
  );
};
