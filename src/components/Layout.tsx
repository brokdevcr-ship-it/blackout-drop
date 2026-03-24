import { ReactNode } from "react";
import { AnnouncementBar } from "./AnnouncementBar";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

// Toggle isDropActive here to switch announcement bar site-wide
const IS_DROP_ACTIVE = true;

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => (
  <div className="min-h-screen bg-background">
    <AnnouncementBar isDropActive={IS_DROP_ACTIVE} />
    <Navbar />
    {children}
    <Footer />
  </div>
);
