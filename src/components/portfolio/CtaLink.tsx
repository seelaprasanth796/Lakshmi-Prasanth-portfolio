import { cva, type VariantProps } from "class-variance-authority";
import type { AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const ctaVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-[transform,background-color,color,box-shadow,border-color] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        hero: "bg-gradient-cta text-primary-foreground shadow-cta hover:-translate-y-0.5",
        glass:
          "glass text-foreground hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary",
        ghost: "text-muted-foreground hover:text-foreground hover:bg-accent",
      },
      size: {
        default: "h-11 px-6 text-sm",
        lg: "h-12 px-7 text-[0.95rem]",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "hero", size: "default" },
  },
);

type CtaLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  VariantProps<typeof ctaVariants> & { external?: boolean };

export function CtaLink({ className, variant, size, external, ...props }: CtaLinkProps) {
  return (
    <a
      className={cn(ctaVariants({ variant, size }), className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    />
  );
}
