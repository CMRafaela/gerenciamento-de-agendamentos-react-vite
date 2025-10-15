import { useEffect, useRef, useState } from "react";

type Props = {
  size?: number;
  storageKey?: string;
  title?: string;
};

export function Avatar({
  size = 36,
  storageKey = "userAvatar",
  title = "Alterar avatar",
}: Props) {
  const [src, setSrc] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) setSrc(saved);
  }, [storageKey]);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  function openFile() {
    inputRef.current?.click();
    setOpen(false);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result || "");
      setSrc(dataUrl);
      try {
        localStorage.setItem(storageKey, dataUrl);
      } catch {
        // Erros
      }
    };
    reader.readAsDataURL(file);
    e.currentTarget.value = "";
  }

  function removePhoto() {
    setSrc(null);
    try {
      localStorage.removeItem(storageKey);
    } catch {}
    setOpen(false);
  }

  const sizeClass = {
    width: `${size}px`,
    height: `${size}px`,
  } as React.CSSProperties;

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        title={title}
        aria-label={title}
        onClick={() => setOpen((v) => !v)}
        className="rounded-full ring-1 ring-slate-600 hover:ring-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        style={sizeClass}>
        {src ? (
          <img
            src={src}
            alt="Avatar"
            className="h-full w-full rounded-full object-cover"
          />
        ) : (
          <div className="h-full w-full rounded-full bg-slate-700 text-slate-200 flex items-center justify-center text-sm">
            U
          </div>
        )}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-48 rounded-md border border-slate-700 bg-slate-900 text-slate-100 py-1 text-sm shadow-lg z-50">
          <button
            className="block w-full px-3 py-2 text-left hover:bg-slate-800"
            onClick={openFile}>
            Adicionar/Trocar foto
          </button>
          <button
            className="block w-full px-3 py-2 text-left text-red-400 hover:bg-slate-800"
            onClick={removePhoto}>
            Remover foto
          </button>
          <div className="my-1 h-px bg-slate-700" />
          <button
            className="block w-full px-3 py-2 text-left hover:bg-slate-800"
            onClick={() => setOpen(false)}>
            Fechar
          </button>
        </div>
      )}
    </div>
  );
}
