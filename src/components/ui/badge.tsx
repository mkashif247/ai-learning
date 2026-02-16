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

const Badge = ({ className, variant = "default", ...props }: BadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
        {
          "bg-violet-500/20 text-violet-300": variant === "default",
          "bg-slate-700 text-slate-300": variant === "secondary",
          "bg-emerald-500/20 text-emerald-300": variant === "success",
          "bg-amber-500/20 text-amber-300": variant === "warning",
          "bg-red-500/20 text-red-300": variant === "destructive",
          "border border-slate-700 text-slate-300": variant === "outline",
        },
        className,
      )}
      {...props}
    />
  );
};

export { Badge };
