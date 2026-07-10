import { useContext } from 'react'
import { BundleContext } from '../context/BundleContext'

export function useBundle() {
  const context = useContext(BundleContext)
  if (!context) throw new Error('useBundle must be used within a BundleProvider')
  return context
}
