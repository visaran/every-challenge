interface BaseButtonProps {
  children: React.ReactNode;
  style: React.CSSProperties;
  disabled?: boolean;
  onClick?: () => void;
  type?: "submit" | "reset" | "button";
}

export default function BaseButton({
  children,
  style,
  disabled,
  onClick,
  type,
}: BaseButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...style,
        border: "none",
        color: "#fff",
        opacity: disabled ? "0.5" : 1,
      }}
      type={type}
    >
      {children}
    </button>
  );
}
