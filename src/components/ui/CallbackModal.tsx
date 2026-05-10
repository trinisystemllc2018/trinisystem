/* ────────────────────────────────────────────────
   CallbackButton — opens the modal on click
──────────────────────────────────────────────── */
interface CallbackButtonProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function CallbackButton({ children, className, style, onClick }: CallbackButtonProps) {
  const [open, setOpen] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    if (!e.defaultPrevented) setOpen(true);
  };

  return (
    <>
      <button type="button" onClick={handleClick} className={className} style={style}>
        {children ?? "Request a Callback"}
      </button>
      <CallbackModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
