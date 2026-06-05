"use client";

import { Field } from "@base-ui/react/field";
import { Input as BaseInput } from "@base-ui/react/input";
import * as React from "react";

import { cn } from "@/lib/utils";

type FieldRootProps = React.ComponentPropsWithoutRef<typeof Field.Root>;
type BaseInputProps = React.ComponentPropsWithoutRef<typeof BaseInput>;

export type InputProps = Omit<BaseInputProps, "id" | "name" | "disabled"> &
  Pick<FieldRootProps, "name" | "disabled" | "invalid" | "validate"> & {
    required?: boolean;
    label: string;
    helperText?: string;
    errorText?: string;
    premiumFocus?: boolean;
    className?: string;
    inputClassName?: string;
  };

const rootStyles = "group relative space-y-2";

const inputShellStyles = cn(
  "relative rounded-xl border border-zinc-200/90 bg-white/90 shadow-[0_1px_2px_rgba(0,0,0,0.04)]",
  "transition-[border-color,box-shadow,background-color,transform] duration-250 ease-out",
  "group-data-[disabled]:bg-zinc-100 group-data-[disabled]:shadow-none",
  "group-data-[invalid]:border-rose-300/90 dark:group-data-[invalid]:border-rose-400/70",
  "group-has-[[data-focused]]:border-zinc-300 dark:group-has-[[data-focused]]:border-zinc-600",
  "group-has-[[data-focused]]:shadow-[0_0_0_1px_rgba(24,24,27,0.06),0_0_0_6px_rgba(24,24,27,0.06)]",
  "dark:border-zinc-800/90 dark:bg-zinc-950/80",
);

const premiumFocusShellStyles = cn(
  "group-has-[[data-focused]]:border-sky-300/80 dark:group-has-[[data-focused]]:border-sky-500/70",
  "group-has-[[data-focused]]:shadow-[0_0_0_1px_rgba(56,189,248,0.32),0_0_0_7px_rgba(56,189,248,0.14)]",
  "group-has-[[data-focused]]:translate-y-[-1px]",
);

const inputStyles = cn(
  "peer w-full rounded-xl bg-transparent px-4 pt-6 pb-2.5 text-sm text-zinc-900 outline-none placeholder:text-transparent",
  "transition-colors duration-200 disabled:cursor-not-allowed disabled:text-zinc-500",
  "dark:text-zinc-100 dark:disabled:text-zinc-500",
);

const labelStyles = cn(
  "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-zinc-500",
  "transition-[transform,color,top,font-size] duration-200 ease-out",
  "peer-focus:top-3 peer-focus:-translate-y-0 peer-focus:text-[11px] peer-focus:font-medium",
  "peer-data-[filled]:top-3 peer-data-[filled]:-translate-y-0 peer-data-[filled]:text-[11px] peer-data-[filled]:font-medium",
  "peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm",
  "peer-placeholder-shown:font-normal peer-data-[focused]:text-zinc-700",
  "group-data-[invalid]:text-rose-600 dark:text-zinc-400 dark:group-data-[invalid]:text-rose-400",
  "dark:peer-data-[focused]:text-zinc-200",
);

const helperTextStyles = "text-xs text-zinc-500 dark:text-zinc-400";
const errorTextStyles = "text-xs font-medium text-rose-600 dark:text-rose-400";

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      errorText,
      premiumFocus = false,
      className,
      inputClassName,
      disabled,
      invalid,
      required,
      validate,
      name,
      placeholder,
      ...props
    },
    ref,
  ) => {
    const reactId = React.useId();
    const inputId = `${name ?? "input"}-${reactId}`;

    return (
      <Field.Root
        name={name}
        disabled={disabled}
        invalid={invalid}
        validate={validate}
        className={cn(rootStyles, className)}
      >
        <div className={cn(inputShellStyles, premiumFocus && premiumFocusShellStyles)}>
          <BaseInput
            ref={ref}
            id={inputId}
            placeholder={placeholder ?? " "}
            required={required}
            className={cn(inputStyles, inputClassName)}
            {...props}
          />
          <Field.Label htmlFor={inputId} className={labelStyles}>
            {label}
          </Field.Label>
        </div>

        {helperText ? <Field.Description className={helperTextStyles}>{helperText}</Field.Description> : null}

        <Field.Error className={errorTextStyles}>{errorText ?? "This field is invalid."}</Field.Error>
      </Field.Root>
    );
  },
);

Input.displayName = "Input";

export { Input };
