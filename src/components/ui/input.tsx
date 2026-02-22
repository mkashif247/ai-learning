import * as React from "react";

import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-xl px-4 py-2 text-sm text-white/90",
          "bg-white/4border border-white/8]",
          "backdrop-blur-sm",
          "placeholder:text-white/25",
          "transition-all duration-200",
          "focus:outline-none focus:bg-white/6focus:border-white/15 focus:ring-1 focus:ring-white/8]",
          "hover:border-white/12",
          "disabled:cursor-not-allowed disabled:opacity-40",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
