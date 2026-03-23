import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { CartDrawer } from "./CartDrawer";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-display text-xl font-bold tracking-[0.3em] uppercase text-foreground">
          BLACKOUT
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-300">
            Shop
          </Link>
          <Link to="/#collections" className="text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-300">
            Collections
          </Link>
          <Link to="/#about" className="text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-300">
            About
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <CartDrawer />
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
            <Link to="/" onClick={() => setIsOpen(false)} className="text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors">Shop</Link>
            <Link to="/#collections" onClick={() => setIsOpen(false)} className="text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors">Collections</Link>
            <Link to="/#about" onClick={() => setIsOpen(false)} className="text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors">About</Link>
          </div>
        </div>
      )}
    </nav>
  );
};
