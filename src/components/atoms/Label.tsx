import { LabelHTMLAttributes } from "react";

type Props = LabelHTMLAttributes<HTMLLabelElement>;

export function Label({ className = "", ...props }: Props) {
  return (
    <label
      className={`block text-sm font-medium text-gray-700 ${className}`}
      {...props}
    />
  );
}
