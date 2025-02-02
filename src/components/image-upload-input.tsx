import clsx from "clsx";
import { forwardRef, type InputHTMLAttributes } from "react";

export const ImageUploadInput = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      type="file"
      accept="image/*"
      className={clsx("hidden", className)}
      {...props}
    />
  );
});
