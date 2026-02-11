import { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow ? (
        <div className="text-sm font-semibold text-indigo-600">{eyebrow}</div>
      ) : null}
      <h2 className="mt-2 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {children ? (
        <p className="mt-3 text-pretty text-base leading-7 text-slate-600">
          {children}
        </p>
      ) : null}
    </div>
  );
}
