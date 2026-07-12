import { getItem, setItem } from './storage'

const STORAGE_KEY = 'security-bundle-builder'

export const loadBundle = () => getItem(STORAGE_KEY)
export const saveBundle = (state) => setItem(STORAGE_KEY, state)
