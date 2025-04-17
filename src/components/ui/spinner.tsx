// src/components/ui/spinner.tsx
import * as React from "react";
import { cn } from "@/lib/utils"; // tu helper de clases
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

const spinnerVariants = cva("flex-col items-center justify-center", {
  variants: {
    show: {
      true: "flex",
      false: "hidden",
    },
  },
  defaultVariants: {
    show: true,
  },
});

const loaderVariants = cva("animate-spin text-primary", {
  variants: {
    size: {
      small: "h-6 w-6",
      medium: "h-8 w-8",
      large: "h-12 w-12",
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

export interface SpinnerProps
  extends VariantProps<typeof spinnerVariants>,
    VariantProps<typeof loaderVariants> {
  className?: string;
  children?: React.ReactNode;
}

export function Spinner({ size, show, children, className }: SpinnerProps) {
  return (
    <span className={cn(spinnerVariants({ show }), className)}>
      <Loader2 className={cn(loaderVariants({ size }))} />
      {children}
    </span>
  );
}
