import { Input } from "@/components/atoms/Input";

type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  ariaLabel?: string;
};

export function SearchInput({
  value,
  onChange,
  placeholder = "Buscar...",
  ariaLabel = "Buscar por descrição",
}: Props) {
  return (
    <div className="relative max-w-sm">
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className="pl-9"
      />
      <svg
        className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-gray-400"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M9 3.5a5.5 5.5 0 104.473 8.682l3.172 3.173a.75.75 0 101.06-1.06l-3.173-3.173A5.5 5.5 0 009 3.5zM5 9a4 4 0 118 0 4 4 0 01-8 0z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
}
