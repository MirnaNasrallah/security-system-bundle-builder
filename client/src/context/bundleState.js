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
    case 'hydrate':
      return { ...state, ...action.state }
    default:
      return state
  }
}
