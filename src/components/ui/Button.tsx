"use client";
import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary"|"secondary"|"outline"|"ghost"|"success"|"danger";
type Size = "sm"|"md"|"lg"|"xl";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant; size?: Size; loading?: boolean;
  icon?: React.ReactNode; iconRight?: React.ReactNode;
  fullWidth?: boolean; href?: string; target?: string; rel?: string;
}

const variants: Record<Variant,string> = {
  primary:   "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-brand",
  secondary: "bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200",
  outline:   "bg-white hover:bg-gray-50 text-gray-800 border-2 border-gray-200 hover:border-blue-300",
  ghost:     "bg-transparent hover:bg-gray-100 text-gray-700",
  success:   "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white",
  danger:    "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white",
};

const sizes: Record<Size,string> = {
  sm: "px-4 py-2 text-sm gap-1.5 rounded-xl",
  md: "px-6 py-3 text-base gap-2 rounded-2xl",
  lg: "px-8 py-4 text-lg gap-2.5 rounded-2xl font-semibold",
  xl: "px-10 py-5 text-xl gap-3 rounded-3xl font-semibold",
};

export function Button({ variant="primary", size="md", loading=false, icon, iconRight, fullWidth=false, className, children, disabled, href, target, rel, ...props }: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center font-semibold transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2",
    "active:scale-[0.97] cursor-pointer select-none touch-target hover:scale-[1.02]",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
    variants[variant], sizes[size], fullWidth && "w-full", className
  );

  const content = (
    <>
      {loading ? <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> : icon}
      <span>{children}</span>
      {!loading && iconRight}
    </>
  );

  if (href) return <a href={href} target={target} rel={rel} className={classes}>{content}</a>;

  return <button className={classes} disabled={disabled || loading} {...props}>{content}</button>;
}

export function StickyCTA() {
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const fn = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 transition-all duration-500"
      style={{ transform: visible ? "translateY(0)" : "translateY(100%)", opacity: visible ? 1 : 0 }}>
      <div className="border-t border-gray-800 px-4 py-3 flex items-center justify-between max-w-7xl mx-auto"
        style={{ background: "#0a0f1e", boxShadow: "0 -4px 30px rgba(0,0,0,0.5)" }}>
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
          <p className="text-sm font-medium text-white/70 hidden sm:block">Technicians available now — under 5 min response</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Button variant="outline" size="sm" href="tel:+13479531531"
            className="!bg-white/10 !text-white !border-white/20 hover:!bg-white/20">📞 Call</Button>
          <Button variant="primary" size="sm" href="/contact">Get Help →</Button>
        </div>
      </div>
    </div>
  );
}
