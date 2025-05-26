import type { ComponentType, PropsWithChildren } from 'react'

export function useMDXComponents(
  components: Record<string, ComponentType<any>>,
): Record<string, ComponentType<any>> {
  return {
    h1: (({ children }: PropsWithChildren<{}>) => (
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl md:text-center">
        {children}
      </h1>
    )) as ComponentType<any>,

    h2: (({ children }: PropsWithChildren<{}>) => (
      <h2 className="text-zinc-50">{children}</h2>
    )) as ComponentType<any>,

    ...components,
  }
}
