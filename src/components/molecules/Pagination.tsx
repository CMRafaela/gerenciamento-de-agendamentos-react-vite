type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  const pages = Math.max(1, totalPages);
  const neighbors = 2;
  const start = Math.max(1, currentPage - neighbors);
  const end = Math.min(pages, currentPage + neighbors);
  const items: (number | "ellipsis")[] = [];
  if (start > 1) items.push(1);
  if (start > 2) items.push("ellipsis");
  for (let p = start; p <= end; p++) items.push(p);
  if (end < pages - 1) items.push("ellipsis");
  if (end < pages) items.push(pages);

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        className="px-3 py-1 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}>
        ‹
      </button>
      {items.map((it, idx) =>
        it === "ellipsis" ? (
          <span key={`e${idx}`} className="px-3 py-1 text-slate-400">
            …
          </span>
        ) : (
          <button
            key={it}
            className={`px-3 py-1 border rounded-md transition-colors ${
              it === currentPage
                ? "bg-indigo-600 text-white border-indigo-600"
                : "border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700"
            }`}
            onClick={() => onPageChange(it as number)}>
            {it}
          </button>
        )
      )}
      <button
        className="px-3 py-1 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700"
        disabled={currentPage >= pages}
        onClick={() => onPageChange(currentPage + 1)}>
        ›
      </button>
    </div>
  );
}
