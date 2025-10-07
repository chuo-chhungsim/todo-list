"use client";

import * as React from "react";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  indeterminate?: boolean;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className = "", indeterminate = false, disabled, ...props }, ref) => {
    const localRef = React.useRef<HTMLInputElement>(null);
    React.useEffect(() => {
      const input = localRef.current;
      if (!input) return;
      input.indeterminate = indeterminate;
    }, [indeterminate]);

    return (
      <label className={`inline-flex items-center gap-2 cursor-pointer select-none ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}>
        <input
          ref={(node) => {
            localRef.current = node;
            if (typeof ref === "function") ref(node!);
            else if (ref) (ref as any).current = node;
          }}
          type="checkbox"
          disabled={disabled}
          className="peer sr-only"
          {...props}
        />
        <span
          className="grid place-items-center h-5 w-5 rounded border-2 border-[var(--border)] bg-[var(--input)] transition-colors peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--ring)] peer-checked:bg-[var(--primary)] peer-checked:border-[var(--primary)]"
          aria-hidden
        >
          <svg className="h-3.5 w-3.5 text-[var(--primary-foreground)] opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";


