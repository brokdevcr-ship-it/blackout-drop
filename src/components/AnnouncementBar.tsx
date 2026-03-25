import { Link } from "react-router-dom";

interface AnnouncementBarProps {
  isDropActive?: boolean;
  defaultMessage?: string;
  dropMessage?: string;
  /** Where clicking the bar navigates. Defaults to /shop */
  link?: string;
}

export const AnnouncementBar = ({
  isDropActive = false,
  defaultMessage = "Free shipping on orders over $100",
  dropMessage = "LEVN DROP 001 — LIMITED PIECES",
  link = "/shop",
}: AnnouncementBarProps) => {
  const message = isDropActive ? dropMessage : defaultMessage;

  return (
    <Link
      to={link}
      className="fixed top-0 left-0 right-0 z-50 h-9 flex items-center justify-center bg-black border-b border-white/10 announcement-bar group"
    >
      <p className="text-white text-[10px] tracking-[0.3em] uppercase font-medium px-4 text-center group-hover:text-white/70 transition-colors duration-300">
        {message}
        <span className="ml-4 opacity-40 group-hover:opacity-80 group-hover:translate-x-0.5 inline-block transition-all duration-300">
          →
        </span>
      </p>
    </Link>
  );
};
