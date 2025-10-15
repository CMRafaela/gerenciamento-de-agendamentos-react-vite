import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger" | "ghost";
};

export function Button({
  variant = "primary",
  className = "",
  ...props
}: Props) {
  const base =
    "inline-flex items-center justify-center rounded px-3 py-2 text-sm font-medium transition-colors disabled:opacity-50 border focus:outline-none focus:ring-2 focus:ring-indigo-500";
  const variants: Record<string, string> = {
    primary: "bg-gray-900 text-white border-gray-900 hover:bg-gray-800",
    secondary: "bg-white text-gray-900 border-gray-300 hover:bg-gray-50",
    danger: "bg-red-600 text-white border-red-600 hover:bg-red-500",
    ghost: "bg-transparent text-gray-900 border-transparent hover:bg-gray-100",
  };
  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
