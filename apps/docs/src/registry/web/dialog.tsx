"use client";

import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import * as React from "react";

import { cn } from "@/lib/utils";

const Dialog = BaseDialog.Root;

const DialogTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof BaseDialog.Trigger>
>(({ className, ...props }, ref) => (
  <BaseDialog.Trigger
    ref={ref}
    className={cn(className)}
    {...props}
  />
));
DialogTrigger.displayName = "DialogTrigger";

const DialogPortal = BaseDialog.Portal;

const DialogBackdrop = React.forwardRef<
  React.ComponentRef<typeof BaseDialog.Backdrop>,
  React.ComponentPropsWithoutRef<typeof BaseDialog.Backdrop>
>(({ className, ...props }, ref) => (
  <BaseDialog.Backdrop
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-zinc-950/70 backdrop-blur-[2px]",
      "transition-opacity duration-300 ease-out",
      "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0 data-[open]:opacity-100",
      className,
    )}
    {...props}
  />
));
DialogBackdrop.displayName = "DialogBackdrop";

const DialogViewport = React.forwardRef<
  React.ComponentRef<typeof BaseDialog.Viewport>,
  React.ComponentPropsWithoutRef<typeof BaseDialog.Viewport>
>(({ className, ...props }, ref) => (
  <BaseDialog.Viewport
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center",
      className,
    )}
    {...props}
  />
));
DialogViewport.displayName = "DialogViewport";

const DialogPopup = React.forwardRef<
  React.ComponentRef<typeof BaseDialog.Popup>,
  React.ComponentPropsWithoutRef<typeof BaseDialog.Popup>
>(({ className, ...props }, ref) => (
  <BaseDialog.Popup
    ref={ref}
    className={cn(
      "relative w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-2xl",
      "transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
      "data-[starting-style]:translate-y-4 data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
      "data-[ending-style]:translate-y-2 data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
      "data-[open]:translate-y-0 data-[open]:scale-100 data-[open]:opacity-100",
      "dark:border-zinc-800/80 dark:bg-zinc-950",
      className,
    )}
    {...props}
  />
));
DialogPopup.displayName = "DialogPopup";

type DialogContentProps = React.ComponentPropsWithoutRef<typeof BaseDialog.Popup> & {
  container?: React.ComponentPropsWithoutRef<typeof BaseDialog.Portal>["container"];
  showCloseButton?: boolean;
};

const DialogContent = React.forwardRef<
  React.ComponentRef<typeof BaseDialog.Popup>,
  DialogContentProps
>(({ className, children, container, showCloseButton = true, ...props }, ref) => (
  <DialogPortal container={container}>
    <DialogBackdrop />
    <DialogViewport>
      <DialogPopup ref={ref} className={className} {...props}>
        {children}
        {showCloseButton ? (
          <DialogClose
            className={cn(
              "absolute top-4 right-4 inline-flex size-8 items-center justify-center rounded-lg",
              "text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900",
              "dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50",
            )}
            aria-label="Close dialog"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </DialogClose>
        ) : null}
      </DialogPopup>
    </DialogViewport>
  </DialogPortal>
));
DialogContent.displayName = "DialogContent";

const DialogTitle = React.forwardRef<
  React.ComponentRef<typeof BaseDialog.Title>,
  React.ComponentPropsWithoutRef<typeof BaseDialog.Title>
>(({ className, ...props }, ref) => (
  <BaseDialog.Title
    ref={ref}
    className={cn("text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50", className)}
    {...props}
  />
));
DialogTitle.displayName = "DialogTitle";

const DialogDescription = React.forwardRef<
  React.ComponentRef<typeof BaseDialog.Description>,
  React.ComponentPropsWithoutRef<typeof BaseDialog.Description>
>(({ className, ...props }, ref) => (
  <BaseDialog.Description
    ref={ref}
    className={cn("mt-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400", className)}
    {...props}
  />
));
DialogDescription.displayName = "DialogDescription";

const DialogClose = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof BaseDialog.Close>
>(({ className, ...props }, ref) => (
  <BaseDialog.Close
    ref={ref}
    className={cn(className)}
    {...props}
  />
));
DialogClose.displayName = "DialogClose";

export {
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogPopup,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  DialogViewport,
};
