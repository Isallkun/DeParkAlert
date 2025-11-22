'use client'

import { TonConnectUIProvider } from '@tonconnect/ui-react'

export function TonProvider({ children }: { children: React.ReactNode }) {
  const manifestUrl = 'https://deparkalert.vercel.app/tonconnect-manifest.json'

  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      {children}
    </TonConnectUIProvider>
  )
}