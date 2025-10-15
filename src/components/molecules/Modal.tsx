import { useEffect, useRef } from "react";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
};

export function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onOpenChange(false);
    }
    if (open) {
      document.addEventListener("keydown", onKeyDown);
    }
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onOpenChange(false);
      }}>
      <div
        ref={containerRef}
        className="bg-white text-slate-900 rounded shadow-lg w-full max-w-md mx-4">
        {(title || description) && (
          <div className="p-4 border-b flex items-start justify-between gap-4">
            <div className="min-w-0">
              {title && (
                <h2 id="modal-title" className="text-lg font-semibold">
                  {title}
                </h2>
              )}
              {description && (
                <p className="mt-1 text-sm text-slate-600">{description}</p>
              )}
            </div>
            <button
              type="button"
              aria-label="Fechar"
              className="text-gray-500 hover:text-gray-700"
              onClick={() => onOpenChange(false)}>
              ✕
            </button>
          </div>
        )}
        <div className="p-4">{children}</div>
        {footer && (
          <div className="flex justify-end gap-2 border-t px-4 py-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
