import { useCallback } from 'react'
import { saveBundle } from '../utils/bundleStorage'
import { useBundle } from './useBundle'

export function usePersistedBundle() {
  const { state } = useBundle()

  const saveNow = useCallback(() => saveBundle(state), [state])
  return { saveNow }
}
