import * as React from "react";

import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-14 w-full rounded-full px-6 py-4 text-sm md:text-base text-white/90",
          "bg-black/20 border border-white/20",
          "backdrop-blur-md",
          "placeholder:text-white/40",
          "transition-all duration-300 ease-in-out",
          "focus:outline-none focus:bg-black/40 focus:border-white focus:ring-1 focus:ring-white",
          "hover:border-white/40 hover:bg-black/30",
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
