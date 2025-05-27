'use client'

import { CookiesProvider } from 'next-client-cookies'

export function Providers({ children, cookies }: { children: React.ReactNode, cookies?: any }) {
  return (
    <CookiesProvider value={cookies}>
      {children}
    </CookiesProvider>
  )
}