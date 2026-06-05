"use client";

import { Button as BaseButton } from "@base-ui/react/button";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonBaseStyles =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 outline-none select-none disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-zinc-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 dark:focus-visible:ring-zinc-500/50 dark:focus-visible:ring-offset-zinc-950 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";

const buttonVariants = {
  default:
    "bg-zinc-900 text-zinc-50 shadow-sm hover:bg-zinc-800 active:scale-[0.98] dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200",
  outline:
    "border border-zinc-200 bg-transparent text-zinc-900 shadow-xs hover:bg-zinc-100 active:scale-[0.98] dark:border-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-900",
  premium:
    "relative overflow-hidden border border-white/10 bg-gradient-to-b from-zinc-100 via-zinc-50 to-zinc-200 px-5 py-2.5 text-zinc-900 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.8),0_1px_2px_rgba(0,0,0,0.12),0_8px_24px_rgba(0,0,0,0.08)] hover:from-white hover:via-zinc-50 hover:to-zinc-100 active:scale-[0.97] dark:border-white/10 dark:from-zinc-800 dark:via-zinc-900 dark:to-zinc-950 dark:text-zinc-50 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_1px_2px_rgba(0,0,0,0.4),0_12px_32px_rgba(0,0,0,0.35)] dark:hover:from-zinc-700 dark:hover:via-zinc-800 dark:hover:to-zinc-900",
} as const;

const buttonSizes = {
  default: "h-10 px-4 py-2",
  sm: "h-8 rounded-md px-3 text-xs",
  lg: "h-11 rounded-lg px-6 text-base",
  icon: "size-10 rounded-lg p-0",
} as const;

type ButtonVariant = keyof typeof buttonVariants;
type ButtonSize = keyof typeof buttonSizes;

type BaseButtonProps = React.ComponentProps<typeof BaseButton>;

export type ButtonProps = Omit<BaseButtonProps, "render" | "className"> & {
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /**
   * Shadcn-style composition API. Maps to Base UI's `render` prop.
   * Pass a single React element to merge button behavior onto.
   */
  asChild?: boolean;
  render?: BaseButtonProps["render"];
};

function getButtonClassName({
  variant = "default",
  size = "default",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}) {
  return cn(buttonBaseStyles, buttonVariants[variant], buttonSizes[size], className);
}

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  children,
  render,
  nativeButton,
  ...props
}: ButtonProps) {
  const classes = getButtonClassName({ variant, size, className });

  if (asChild) {
    const child = React.Children.only(children);

    if (!React.isValidElement(child)) {
      throw new Error("Button with `asChild` expects a single valid React element.");
    }

    return (
      <BaseButton
        {...props}
        className={classes}
        render={render ?? child}
        nativeButton={nativeButton ?? child.type === "button"}
      />
    );
  }

  return (
    <BaseButton {...props} className={classes} render={render}>
      {children}
    </BaseButton>
  );
}

export { Button, buttonBaseStyles, buttonSizes, buttonVariants, getButtonClassName };
