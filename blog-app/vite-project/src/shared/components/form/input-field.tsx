import { Controller } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";

import { Input } from "../ui/input";
import { cn } from "@/shared/lib/utils";

interface InputFieldProps<
  T extends FieldValues,
> extends React.InputHTMLAttributes<HTMLInputElement> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  className?: string;
  labelClassName?: string;
  propsChildren?: React.ReactNode;
  customError?: string;
}

export function InputField<T extends FieldValues>({
  control,
  name,
  label,
  className,
  labelClassName,
  propsChildren,
  customError,
  ...inputProps
}: InputFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        return (
          <div className="w-full relative">
            {label && (
              <label className={cn(labelClassName, "block mb-1")}>
                {label}
              </label>
            )}

            <div className="flex items-center relative">
              <Input {...inputProps} {...field} className={cn(className)} />

              {propsChildren}
            </div>

            {(customError || fieldState.error?.message) && (
              <p className="text-center text-sm text-red-500 my-1.5">
                {customError ?? fieldState.error?.message}
              </p>
            )}
          </div>
        );
      }}
    />
  );
}
