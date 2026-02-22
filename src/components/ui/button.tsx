import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-base font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      variant: {
        default:
          "bg-white text-[#0a0b0f] hover:bg-white/90 shadow-sm shadow-white/10",
        destructive:
          "bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20",
        outline:
          "border border-white/20 bg-transparent hover:bg-white/10 text-white backdrop-blur-sm focus:border-white focus:bg-white/5",
        secondary:
          "bg-white/10 text-white/80 hover:bg-white/20 border border-white/10",
        ghost: "hover:bg-white/10 text-white/50 hover:text-white/80",
        link: "text-white/80 underline-offset-4 hover:underline",
        premium:
          "bg-linear-to-r from-indigo-500 to-violet-500 text-white hover:from-indigo-400 hover:to-violet-400 shadow-lg shadow-indigo-500/20",
        glass:
          "liquid-glass text-white/80 hover:text-white hover:border-white/20",
      },
      size: {
        default: "h-14 px-8 py-4",
        sm: "h-10 px-4 text-sm",
        lg: "h-16 px-10 text-lg",
        icon: "h-14 w-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
