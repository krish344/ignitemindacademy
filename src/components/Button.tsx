import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  external?: boolean;
};

const variants: Record<NonNullable<Props["variant"]>, string> = {
  primary:
    "bg-gradient-to-r from-indigo-600 via-sky-600 to-emerald-500 text-white shadow-sm hover:shadow-md hover:brightness-[1.02] focus-visible:outline-indigo-600",
  secondary:
    "bg-white text-slate-900 ring-1 ring-slate-200 shadow-sm hover:bg-slate-50 hover:shadow-md focus-visible:outline-indigo-600",
  ghost:
    "bg-transparent text-slate-900 hover:bg-slate-100 focus-visible:outline-indigo-600",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  external,
}: Props) {
  const common =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition will-change-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 hover:-translate-y-0.5 active:translate-y-0";

  if (external) {
    return (
      <a
        href={href}
        className={`${common} ${variants[variant]} ${className}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={`${common} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}
