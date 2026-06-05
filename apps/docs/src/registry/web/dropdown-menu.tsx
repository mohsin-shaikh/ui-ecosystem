"use client";

import { Menu } from "@base-ui/react/menu";
import * as React from "react";

import { cn } from "@/lib/utils";

const DropdownMenu = Menu.Root;

const DropdownMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Menu.Trigger>
>(({ className, ...props }, ref) => (
  <Menu.Trigger
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-900 shadow-xs",
      "transition-[color,border-color,box-shadow,transform] duration-200 ease-out",
      "hover:border-zinc-300 hover:text-zinc-950 active:scale-[0.985]",
      "data-[popup-open]:border-zinc-300 data-[popup-open]:shadow-[0_0_0_1px_rgba(24,24,27,0.06),0_0_0_5px_rgba(24,24,27,0.08)]",
      "focus-visible:outline-none",
      "dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:border-zinc-700 dark:hover:text-zinc-50",
      "dark:data-[popup-open]:border-zinc-700 dark:data-[popup-open]:shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_0_0_5px_rgba(255,255,255,0.05)]",
      className,
    )}
    {...props}
  />
));
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

const DropdownMenuPortal = Menu.Portal;

const DropdownMenuPositioner = React.forwardRef<
  React.ComponentRef<typeof Menu.Positioner>,
  React.ComponentPropsWithoutRef<typeof Menu.Positioner>
>(({ className, sideOffset = 10, ...props }, ref) => (
  <Menu.Positioner ref={ref} sideOffset={sideOffset} className={cn("z-50", className)} {...props} />
));
DropdownMenuPositioner.displayName = "DropdownMenuPositioner";

const DropdownMenuPopup = React.forwardRef<
  React.ComponentRef<typeof Menu.Popup>,
  React.ComponentPropsWithoutRef<typeof Menu.Popup>
>(({ className, ...props }, ref) => (
  <Menu.Popup
    ref={ref}
    className={cn(
      "min-w-56 overflow-hidden rounded-xl border border-zinc-200/90 bg-white/90 p-1.5 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.45)] backdrop-blur-md",
      "origin-[var(--transform-origin)] will-change-[transform,opacity]",
      "transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
      "data-[starting-style]:scale-[0.96] data-[starting-style]:opacity-0",
      "data-[ending-style]:scale-[0.98] data-[ending-style]:opacity-0",
      "data-[open]:scale-100 data-[open]:opacity-100",
      "dark:border-zinc-800/90 dark:bg-zinc-950/80",
      className,
    )}
    {...props}
  />
));
DropdownMenuPopup.displayName = "DropdownMenuPopup";

const DropdownMenuItem = React.forwardRef<
  React.ComponentRef<typeof Menu.Item>,
  React.ComponentPropsWithoutRef<typeof Menu.Item> & {
    inset?: boolean;
  }
>(({ className, inset = false, children, ...props }, ref) => (
  <Menu.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default items-center rounded-lg px-2.5 py-2 text-sm text-zinc-700 outline-none select-none",
      "transition-[background-color,color,transform] duration-150 ease-out",
      "before:absolute before:left-1 before:h-5 before:w-0.5 before:rounded-full before:bg-zinc-400 before:opacity-0 before:transition-opacity before:duration-150",
      "data-[highlighted]:translate-x-[1px] data-[highlighted]:bg-zinc-900/[0.04] data-[highlighted]:text-zinc-950 data-[highlighted]:before:opacity-100",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-45",
      "dark:text-zinc-300 dark:before:bg-zinc-500 dark:data-[highlighted]:bg-zinc-50/[0.08] dark:data-[highlighted]:text-zinc-50",
      inset && "pl-8",
      className,
    )}
    {...props}
  >
    {children}
  </Menu.Item>
));
DropdownMenuItem.displayName = "DropdownMenuItem";

const DropdownMenuLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Menu.GroupLabel> & {
    inset?: boolean;
  }
>(({ className, inset = false, ...props }, ref) => (
  <Menu.GroupLabel
    ref={ref}
    className={cn(
      "px-2.5 py-2 text-xs font-semibold tracking-[0.04em] text-zinc-500 uppercase dark:text-zinc-400",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
));
DropdownMenuLabel.displayName = "DropdownMenuLabel";

const DropdownMenuSeparator = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Menu.Separator>
>(({ className, ...props }, ref) => (
  <Menu.Separator ref={ref} className={cn("my-1 h-px bg-zinc-200/80 dark:bg-zinc-800/90", className)} {...props} />
));
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

const DropdownMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn("ml-auto text-xs tracking-wide text-zinc-500 dark:text-zinc-400", className)} {...props} />
);
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

const DropdownMenuContent = React.forwardRef<
  React.ComponentRef<typeof Menu.Popup>,
  React.ComponentPropsWithoutRef<typeof Menu.Popup> &
    Pick<React.ComponentPropsWithoutRef<typeof Menu.Portal>, "container">
>(({ className, children, container, ...props }, ref) => (
  <DropdownMenuPortal container={container}>
    <DropdownMenuPositioner>
      <DropdownMenuPopup ref={ref} className={className} {...props}>
        {children}
      </DropdownMenuPopup>
    </DropdownMenuPositioner>
  </DropdownMenuPortal>
));
DropdownMenuContent.displayName = "DropdownMenuContent";

export {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuPositioner,
  DropdownMenuPopup,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
};
