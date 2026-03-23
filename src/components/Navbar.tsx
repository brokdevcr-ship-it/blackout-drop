import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { CartDrawer } from "./CartDrawer";
import levnLogo from "@/assets/levn-logo.png";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/">
          <img src={levnLogo} alt="LEVN" className="h-8 w-auto" />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/#products" className="text-xs tracking-[0.3em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300">
            Shop
          </Link>
          <Link to="/#collections" className="text-xs tracking-[0.3em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300">
            Collections
          </Link>
          <Link to="/#about" className="text-xs tracking-[0.3em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300">
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
            <Link to="/#products" onClick={() => setIsOpen(false)} className="text-xs tracking-[0.3em] uppercase text-muted-foreground hover:text-foreground transition-colors">Shop</Link>
            <Link to="/#collections" onClick={() => setIsOpen(false)} className="text-xs tracking-[0.3em] uppercase text-muted-foreground hover:text-foreground transition-colors">Collections</Link>
            <Link to="/#about" onClick={() => setIsOpen(false)} className="text-xs tracking-[0.3em] uppercase text-muted-foreground hover:text-foreground transition-colors">About</Link>
          </div>
        </div>
      )}
    </nav>
  );
};
