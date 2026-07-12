import { createContext } from 'react'

export const BundleContext = createContext(null)

const itemKey = (productId, variantId = 'default') => `${productId}::${variantId}`

export function createInitialState(catalog) {
  const quantities = {}
  const activeVariant = {}

  for (const item of [...catalog.products, ...catalog.plans]) {
    activeVariant[item.id] = item.defaultVariantId || 'default'
    for (const [variantId, quantity] of Object.entries(item.initialQuantities || {})) {
      quantities[itemKey(item.id, variantId)] = quantity
    }
  }

  return { quantities, activeVariant, expandedStepId: catalog.steps[0]?.id ?? null }
}

export function sanitizePersistedState(catalog, savedState) {
  const initialState = createInitialState(catalog)
  if (!savedState || typeof savedState !== 'object') return initialState

  const savedQuantities = savedState.quantities && typeof savedState.quantities === 'object'
    ? savedState.quantities
    : {}
  const savedVariants = savedState.activeVariant && typeof savedState.activeVariant === 'object'
    ? savedState.activeVariant
    : {}
  const quantities = {}
  const activeVariant = {}

  for (const item of [...catalog.products, ...catalog.plans]) {
    const variantIds = item.variants?.map((variant) => variant.id) || [item.defaultVariantId || 'default']
    const defaultVariantId = item.defaultVariantId || variantIds[0] || 'default'
    activeVariant[item.id] = variantIds.includes(savedVariants[item.id])
      ? savedVariants[item.id]
      : defaultVariantId

    for (const variantId of variantIds) {
      const key = itemKey(item.id, variantId)
      const savedQuantity = savedQuantities[key]
      const fallbackQuantity = initialState.quantities[key] || 0
      quantities[key] = Number.isFinite(savedQuantity)
        ? Math.max(0, Math.floor(savedQuantity))
        : fallbackQuantity
    }
  }

  const stepIds = new Set(catalog.steps.map((step) => step.id))
  const expandedStepId = savedState.expandedStepId === null || stepIds.has(savedState.expandedStepId)
    ? savedState.expandedStepId
    : initialState.expandedStepId

  return { quantities, activeVariant, expandedStepId }
}

export function bundleReducer(state, action) {
  switch (action.type) {
    case 'setQuantity': {
      const key = itemKey(action.productId, action.variantId)
      const nextValue = Math.max(0, action.value)
      return { ...state, quantities: { ...state.quantities, [key]: nextValue } }
    }
    case 'setActiveVariant':
      return {
        ...state,
        activeVariant: { ...state.activeVariant, [action.productId]: action.variantId },
      }
    case 'setExpandedStep':
      return { ...state, expandedStepId: action.stepId }
    default:
      return state
  }
}
