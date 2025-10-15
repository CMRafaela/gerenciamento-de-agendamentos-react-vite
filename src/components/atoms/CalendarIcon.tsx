type Props = {
  className?: string;
};

export function CalendarIcon({ className = "h-5 w-5" }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true">
      <path d="M7 2a1 1 0 0 1 1 1v1h8V3a1 1 0 1 1 2 0v1h1a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h1V3a1 1 0 0 1 1-1Zm12 8H5v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9ZM5 7h14V6a1 1 0 0 0-1-1h-1v1a1 1 0 1 1-2 0V5H8v1a1 1 0 1 1-2 0V5H5a1 1 0 0 0-1 1v1Z" />
    </svg>
  );
}
