"use client"

import { createContext, useContext, ReactNode, useState, useEffect } from 'react'
import { ConfigData } from '@/services/types'

type ConfigContextType = {
  config: ConfigData | null
  isLoading: boolean
  error: Error | null
}

const ConfigContext = createContext<ConfigContextType>({
  config: null,
  isLoading: true,
  error: null,
})

type ConfigProviderProps = {
  children: ReactNode
  initialConfig?: ConfigData | null
}

export function ConfigProvider({
  children,
  initialConfig = null,
}: ConfigProviderProps) {
  const [config, setConfig] = useState<ConfigData | null>(initialConfig)
  const [isLoading, setIsLoading] = useState<boolean>(!initialConfig)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (initialConfig) {
      setConfig(initialConfig)
      setIsLoading(false)
      return
    }

    // No client-side fetching is needed since we're passing the
    // data from the server component
  }, [initialConfig])

  const value = {
    config,
    isLoading,
    error,
  }

  return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
}

export function useConfig() {
  const context = useContext(ConfigContext)

  if (context === undefined) {
    throw new Error('useConfig deve ser usado dentro de um ConfigProvider')
  }

  return context
}
