interface AnnouncementBarProps {
  isDropActive?: boolean;
  defaultMessage?: string;
  dropMessage?: string;
}

export const AnnouncementBar = ({
  isDropActive = false,
  defaultMessage = "Free shipping on orders over $100",
  dropMessage = "NEW DROP AVAILABLE — Limited pieces",
}: AnnouncementBarProps) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-9 flex items-center justify-center bg-black border-b border-border announcement-bar">
      <p className="text-white text-[10px] tracking-[0.25em] uppercase font-medium px-4 text-center">
        {isDropActive ? dropMessage : defaultMessage}
      </p>
    </div>
  );
};
