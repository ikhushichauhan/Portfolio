import React from "react";
import { cn } from "@/lib/utils";

const variants = {
  solid: "bg-[var(--ink)] text-[var(--bg)] hover:opacity-90",
  outline:
    "border border-[var(--line)] text-[var(--ink)] hover:border-[var(--accent)]",
  ghost: "text-[var(--ink)] hover:bg-[var(--surface-2)]",
};

export const Button = React.forwardRef(
  ({ className, variant = "solid", size = "md", ...props }, ref) => {
    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-sm",
      lg: "px-7 py-3.5 text-base",
    };
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-300 disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
