type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  children,
  type = "button",
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      {...props}
      className={`existing-classes-here ${props.className ?? ""}`}
    >
      {children}
    </button>
  );
};
