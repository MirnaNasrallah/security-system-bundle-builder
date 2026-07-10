import { useCallback, useEffect, useRef } from 'react'
import { getItem, setItem } from '../utils/storage'
import { useBundle } from './useBundle'

const STORAGE_KEY = 'security-bundle-builder'

export function usePersistedBundle() {
  const { state, hydrate } = useBundle()
  const hydrated = useRef(false)

  useEffect(() => {
    const savedState = getItem(STORAGE_KEY)
    if (savedState) hydrate(savedState)
    hydrated.current = true
  }, [hydrate])

  useEffect(() => {
    if (!hydrated.current) return undefined
    const timer = window.setTimeout(() => setItem(STORAGE_KEY, state), 250)
    return () => window.clearTimeout(timer)
  }, [state])

  const saveNow = useCallback(() => setItem(STORAGE_KEY, state), [state])
  return { saveNow }
}
