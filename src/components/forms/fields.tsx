import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export const inputClass =
  "h-12 w-full rounded-2xl border border-input bg-card px-4 text-[15px] text-foreground outline-none transition placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-ring/30 aria-[invalid=true]:border-destructive";

export function Field({
  id,
  label,
  error,
  children,
  className,
  optional,
}: {
  id: string;
  label: string;
  error?: string | undefined;
  children: ReactNode;
  className?: string;
  optional?: boolean;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-sm font-semibold text-foreground">
        {label}
        {!optional && <span className="ml-0.5 text-primary">*</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

export function Segmented<T extends string>({
  name,
  value,
  onChange,
  options,
  label,
}: {
  name: string;
  value: T | undefined;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
  label: string;
}) {
  return (
    <div role="radiogroup" aria-label={label} className="grid grid-cols-2 gap-1 rounded-2xl border border-input bg-card p-1">
      {options.map((o) => {
        const active = o.value === value;
        return (
          <label
            key={o.value}
            className={cn(
              "flex h-10 cursor-pointer items-center justify-center rounded-xl text-sm font-semibold transition-all has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring",
              active ? "bg-primary text-primary-foreground shadow-soft" : "text-foreground/70 hover:bg-secondary",
            )}
          >
            <input type="radio" name={name} value={o.value} checked={active} onChange={() => onChange(o.value)} className="sr-only" />
            {o.label}
          </label>
        );
      })}
    </div>
  );
}
