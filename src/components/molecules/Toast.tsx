import { useEffect } from "react";

type Props = {
  message: string | null;
  type?: "success" | "error" | "info";
  onClose?: () => void;
  position?: "top-right" | "bottom-center";
};

export function Toast({
  message,
  type = "success",
  onClose,
  position = "top-right",
}: Props) {
  useEffect(() => {
    if (!message) return;
    const id = setTimeout(() => onClose?.(), 3000);
    return () => clearTimeout(id);
  }, [message, onClose]);

  if (!message) return null;
  const colors = {
    success: "border-green-200 bg-green-50 text-green-800",
    error: "border-red-200 bg-red-50 text-red-800",
    info: "border-blue-200 bg-blue-50 text-blue-800",
  } as const;
  const pos =
    position === "top-right"
      ? "fixed top-4 right-4"
      : "fixed bottom-4 left-1/2 -translate-x-1/2";
  return (
    <div
      role="status"
      aria-live="polite"
      className={`${pos} z-[100] rounded border px-5 py-3 text-base shadow-lg ${colors[type]}`}>
      <div className="flex items-center gap-3">
        <span>{message}</span>
        <button
          className="text-inherit/60 hover:text-inherit"
          onClick={onClose}
          aria-label="Fechar">
          ×
        </button>
      </div>
    </div>
  );
}
