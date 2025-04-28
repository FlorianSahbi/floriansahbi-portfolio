"use client"

import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter, useParams } from "next/navigation"
import clsx from "clsx"
import type { NavigationItem } from "@/lib/content/service"

interface NavigationProps {
  withObserver?: boolean
  data: NavigationItem[]
}

export default function Navigation({
  withObserver = false,
  data,
}: NavigationProps) {
  const ref = useRef<HTMLElement>(null)
  const [isIntersecting, setIntersecting] = useState(true)

  const router = useRouter()
  const pathname = usePathname() || ""
  const { lang } = useParams() as { lang: "fr" | "en" }

  useEffect(() => {
    if (!withObserver || !ref.current) return
    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting)
    })
    observer.observe(ref.current)
    return () => {
      observer.disconnect()
    }
  }, [withObserver])

  const containerBase =
    "fixed inset-x-0 top-0 z-50 h-16 px-4 flex justify-between items-center duration-200 border-b"
  const linkBase = "duration-200"

  const containerClass = isIntersecting
    ? "bg-zinc-900/0 border-transparent"
    : "bg-zinc-900/500 border-zinc-800"

  const linkClass = isIntersecting
    ? "text-zinc-100 hover:text-zinc-400"
    : "text-zinc-900 hover:text-zinc-600"

  function handleLocaleSwitch(target: "fr" | "en") {
    if (lang === target) return
    const segments = pathname.split("/").filter(Boolean)
    if (segments[0] === "fr" || segments[0] === "en") {
      segments[0] = target
    } else {
      segments.unshift(target)
    }
    router.push("/" + segments.join("/"), { scroll: false })
  }

  return (
    <nav ref={ref}>
      <div className={clsx(containerBase, containerClass, "backdrop-blur")}>
        <div className="flex gap-4">
          {data.map(({ label, href }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={clsx(linkBase, linkClass, isActive && "font-bold")}
              >
                {label}
              </Link>
            )
          })}
        </div>

        <div className="flex items-center gap-1 text-sm">
          {(["fr", "en"] as const).map((locale, idx) => (
            <React.Fragment key={locale}>
              <button
                onClick={() => handleLocaleSwitch(locale)}
                className={clsx(
                  linkBase,
                  linkClass,
                  lang === locale ? "font-bold" : "opacity-50"
                )}
              >
                {locale.toUpperCase()}
              </button>
              {idx === 0 && <span className="text-zinc-500">|</span>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </nav>
  )
}