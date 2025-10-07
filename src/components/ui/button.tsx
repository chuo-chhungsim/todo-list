"use client";

import * as React from "react";

type Variant = "default" | "secondary" | "ghost" | "destructive";
type Size = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const base = "inline-flex items-center justify-center rounded-md font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] disabled:opacity-50 disabled:pointer-events-none";

const variantClasses: Record<Variant, string> = {
  default: "bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 active:scale-[0.98] shadow-sm",
  secondary: "border border-[var(--border)] bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[var(--accent)]",
  ghost: "hover:bg-[var(--accent)] text-[var(--accent-foreground)]",
  destructive: "bg-[var(--destructive)] text-[var(--destructive-foreground)] hover:opacity-90",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-5 text-base",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={[base, variantClasses[variant], sizeClasses[size], className].join(" ")}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";


