import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "default"
    | "secondary"
    | "success"
    | "warning"
    | "destructive"
    | "outline";
}

const Badge = ({
  className,
  variant = "default",
  ...props
}: BadgeProps): React.JSX.Element => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors backdrop-blur-sm",
        {
          "bg-indigo-500/15 text-indigo-300 border border-indigo-500/20":
            variant === "default",
          "bg-white/6text-white/60 border border-white/8]":
            variant === "secondary",
          "bg-emerald-500/15 text-emerald-300 border border-emerald-500/20":
            variant === "success",
          "bg-amber-500/15 text-amber-300 border border-amber-500/20":
            variant === "warning",
          "bg-red-500/15 text-red-300 border border-red-500/20":
            variant === "destructive",
          "border border-white/10 text-white/50": variant === "outline",
        },
        className,
      )}
      {...props}
    />
  );
};

export { Badge };
