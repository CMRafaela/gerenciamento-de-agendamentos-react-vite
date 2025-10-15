import { InputHTMLAttributes, forwardRef } from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, Props>(function InputBase(
  { className = "", ...props },
  ref
) {
  return (
    <input
      ref={ref}
      className={`w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${className}`}
      {...props}
    />
  );
});
