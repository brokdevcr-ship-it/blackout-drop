import { ReactNode } from "react";
import { AnnouncementBar } from "./AnnouncementBar";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

// ─── Site-wide drop settings ─────────────────────────────────────────────────
// Toggle IS_DROP_ACTIVE to switch the announcement bar between modes.
const IS_DROP_ACTIVE = true;
const DROP_MESSAGE = "LEVN DROP 001 — LIMITED PIECES · FREE SHIPPING OVER $100";
const DROP_LINK = "/shop";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => (
  <div className="min-h-screen bg-background">
    <AnnouncementBar
      isDropActive={IS_DROP_ACTIVE}
      dropMessage={DROP_MESSAGE}
      link={DROP_LINK}
    />
    <Navbar />
    {children}
    <Footer />
  </div>
);
