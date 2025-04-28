"use client";

import clsx from "clsx";
import Link from "next/link";
import { Linkedin, Mail, Github, MapPin, type LucideProps } from "lucide-react";

interface BadgeProps {
  icon?: string;
  label: string;
  href?: string;
  onClick?: () => void;
  active?: boolean;
  className?: string;
  variant?: "default" | "condensed" | "tag";
  hoverable?: boolean;
}

const iconMap: Record<string, React.ComponentType<LucideProps>> = {
  Linkedin,
  Github,
  Email: Mail,
};

export default function Badge({
  icon,
  label,
  href,
  onClick,
  active = false,
  className,
  variant = "default",
  hoverable = true,
}: BadgeProps) {
  if (!label) return null;

  const Icon = iconMap[icon ?? ""] ?? MapPin;

  const base = clsx(
    "inline-flex items-center gap-1",
    !hoverable && "cursor-default"
  );

  const variants = {
    default: clsx(
      "border rounded-2xl py-1 px-3 text-sm font-medium",
      active
        ? "border-emerald-800 text-zinc-400"
        : "bg-zinc-900/10 border-zinc-700 text-zinc-400",
      hoverable && "transition-colors duration-200 hover:bg-zinc-900/20 hover:text-zinc-300"
    ),
    condensed: clsx(
      "border rounded-md py-[2px] px-2 text-xs font-normal",
      active
        ? "border-emerald-700 text-zinc-300"
        : "bg-zinc-800/10 border-zinc-700 text-zinc-500",
      hoverable && "transition-colors duration-200 hover:bg-zinc-900/10 hover:text-zinc-300"
    ),
    tag: clsx(
      "border rounded-md py-[2px] px-2 text-xs font-medium",
      "bg-zinc-800/20 border-zinc-700 text-zinc-400",
      hoverable && "transition-colors duration-200 hover:bg-zinc-700/10 hover:text-zinc-300"
    ),
  };

  const classes = clsx(base, variants[variant], className);

  const content = (
    <div className="flex items-center gap-1">
      {icon && <Icon size={variant === "condensed" || variant === "tag" ? 12 : 16} />}
      <span>{label}</span>
    </div>
  );

  if (!href && !onClick) {
    return <div className={classes}>{content}</div>;
  }

  if (!href) {
    return (
      <button type="button" onClick={onClick} aria-pressed={active} className={classes}>
        {content}
      </button>
    );
  }

  const isExternal = !href.startsWith("/");

  return isExternal ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
      {content}
    </a>
  ) : (
    <Link href={href}>
      <a aria-pressed={active} className={classes}>
        {content}
      </a>
    </Link>
  );
}
