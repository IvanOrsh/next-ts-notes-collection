import clsx from "clsx";
import { CSSProperties, MouseEventHandler, PropsWithChildren } from "react";

const suggestedStyles =
  "inline-flex items-center justify-center border-2 border-primary-700 bg-primary-100 px-4 py-2 transition-colors ease-in hover:bg-primary-200 active:bg-primary-300";

type ButtonProps = {
  variant?: string;
  size?: string;
  className?: string;
  style?: CSSProperties;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const Button = ({
  variant,
  size,
  className,
  style,
  children,
  onClick,
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      className={/*clsx(variant, size, className)*/ suggestedStyles}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;
