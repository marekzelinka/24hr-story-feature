import { type ReactNode } from "react";

export function EmptyState({
  icon,
  title = "No data",
  description,
  children,
}: {
  icon?: ReactNode;
  title?: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center text-sm">
      {icon ? (
        <div className="[&_svg]:text-muted-foreground/50 mb-4 [&_svg]:size-6">
          {icon}
        </div>
      ) : null}
      <h3 className="font-semibold">{title}</h3>
      <p className="text-muted-foreground mt-2">{description}</p>
      {children ? <div className="mt-4">{children}</div> : null}
    </div>
  );
}
