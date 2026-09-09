import type { ReactNode } from "react";
import { AlertTriangle, LoaderCircle, SearchX } from "lucide-react";

export function CorePage({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={"px-5 py-8 sm:px-6 lg:px-8 lg:py-10 " + className}>
      <div className="mx-auto max-w-[1540px]">{children}</div>
    </div>
  );
}

export function CorePageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
}) {
  return (
    <div className="grid gap-6 border-b border-[#002930]/14 pb-8 lg:grid-cols-[1fr_auto] lg:items-end">
      <div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-[#AC4A00]">
          {eyebrow}
        </p>
        <h1 className="mt-3 max-w-4xl text-4xl font-medium leading-[0.98] tracking-[-0.045em] text-[#002930] md:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-6 text-[#002930]/58 md:text-base">
          {description}
        </p>
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function StatGrid({ children }: { children: ReactNode }) {
  return (
    <div className="mt-8 grid gap-px border border-[#002930]/14 bg-[#002930]/14 sm:grid-cols-2 xl:grid-cols-4">
      {children}
    </div>
  );
}

export function StatCard({
  label,
  value,
  note,
  accent = "neutral",
}: {
  label: string;
  value: ReactNode;
  note?: string;
  accent?: "neutral" | "cream" | "orange" | "danger";
}) {
  const accentClass =
    accent === "orange"
      ? "text-[#AC4A00]"
      : accent === "danger"
        ? "text-[#8f2f20]"
        : accent === "cream"
          ? "text-[#002930]"
          : "text-[#002930]";

  return (
    <article className="min-h-32 bg-[#F8F0AF] p-5">
      <p className="text-[9px] uppercase tracking-[0.17em] text-[#002930]/42">
        {label}
      </p>
      <div className={"mt-3 text-3xl font-medium tracking-[-0.04em] " + accentClass}>
        {value}
      </div>
      {note && <p className="mt-2 text-xs leading-5 text-[#002930]/42">{note}</p>}
    </article>
  );
}

export function Panel({
  children,
  className = "",
  title,
  eyebrow,
  actions,
}: {
  children: ReactNode;
  className?: string;
  title?: string;
  eyebrow?: string;
  actions?: ReactNode;
}) {
  return (
    <section className={"border border-[#002930]/14 bg-[#F8F0AF] " + className}>
      {(title || eyebrow || actions) && (
        <div className="flex flex-col gap-4 border-b border-[#002930]/14 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {eyebrow && (
              <p className="text-[9px] uppercase tracking-[0.18em] text-[#AC4A00]">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="mt-1 text-lg font-medium tracking-[-0.025em] text-[#002930]">
                {title}
              </h2>
            )}
          </div>
          {actions}
        </div>
      )}
      {children}
    </section>
  );
}

export function LoadingState({ label = "Cargando información..." }: { label?: string }) {
  return (
    <div className="flex min-h-[48vh] items-center justify-center">
      <div className="text-center">
        <LoaderCircle className="mx-auto h-7 w-7 animate-spin text-[#AC4A00]" />
        <p className="mt-4 text-sm text-[#002930]/55">{label}</p>
      </div>
    </div>
  );
}

export function ErrorState({
  title,
  message,
  onRetry,
}: {
  title: string;
  message: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex min-h-[48vh] items-center justify-center">
      <div className="w-full max-w-xl border border-[#8f2f20]/20 bg-[#F8F0AF] p-7 text-[#002930]">
        <AlertTriangle className="h-6 w-6 text-[#8f2f20]" />
        <h2 className="mt-5 text-2xl font-medium tracking-[-0.03em]">{title}</h2>
        <p className="mt-3 text-sm leading-6 text-[#002930]/55">{message}</p>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="mt-6 min-h-11 bg-[#AC4A00] px-5 text-sm font-medium text-white transition hover:bg-[#D45A10]"
          >
            Reintentar
          </button>
        )}
      </div>
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="px-6 py-14 text-center">
      <SearchX className="mx-auto h-7 w-7 text-[#002930]/28" />
      <h3 className="mt-5 text-xl font-medium tracking-[-0.025em] text-[#002930]">
        {title}
      </h3>
      <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-[#002930]/50">
        {description}
      </p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export function FieldLabel({
  children,
  htmlFor,
}: {
  children: ReactNode;
  htmlFor?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-[9px] uppercase tracking-[0.16em] text-[#002930]/48"
    >
      {children}
    </label>
  );
}

export const inputClass =
  "min-h-11 w-full border border-[#002930]/16 bg-transparent px-3 py-2 text-sm text-[#002930] outline-none transition placeholder:text-[#002930]/30 focus:border-[#002930]";

export function Pagination({
  currentPage,
  totalPages,
  onChange,
  summary,
}: {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
  summary: string;
}) {
  if (totalPages <= 0) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  const visible =
    totalPages <= 7
      ? pages
      : pages.filter(
          (page) =>
            page === 1 ||
            page === totalPages ||
            Math.abs(page - currentPage) <= 1
        );

  return (
    <div className="flex flex-col gap-4 border-t border-[#002930]/14 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs text-[#002930]/46">{summary}</p>
      <div className="flex flex-wrap gap-1">
        <button
          type="button"
          onClick={() => onChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="min-h-9 border border-[#002930]/14 px-3 text-xs disabled:cursor-not-allowed disabled:opacity-30"
        >
          Anterior
        </button>
        {visible.map((page, index) => {
          const previous = visible[index - 1];
          const gap = previous && page - previous > 1;
          return (
            <span key={page} className="flex items-center gap-1">
              {gap && <span className="px-1 text-xs text-[#002930]/30">…</span>}
              <button
                type="button"
                onClick={() => onChange(page)}
                className={
                  "min-h-9 min-w-9 border px-3 text-xs transition " +
                  (currentPage === page
                    ? "border-[#002930] bg-[#002930] text-white"
                    : "border-[#002930]/14 hover:border-[#002930]/40")
                }
              >
                {page}
              </button>
            </span>
          );
        })}
        <button
          type="button"
          onClick={() => onChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="min-h-9 border border-[#002930]/14 px-3 text-xs disabled:cursor-not-allowed disabled:opacity-30"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
