import { createContext, useCallback, useMemo, useReducer } from 'react'

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

export function BundleProvider({ catalog, children, initialState }) {
  const seed = useMemo(() => initialState || createInitialState(catalog), [catalog, initialState])
  const [state, dispatch] = useReducer(bundleReducer, seed)

  const setQuantity = useCallback((productId, variantId, value) => {
    dispatch({ type: 'setQuantity', productId, variantId, value })
  }, [])
  const setActiveVariant = useCallback((productId, variantId) => {
    dispatch({ type: 'setActiveVariant', productId, variantId })
  }, [])
  const setExpandedStep = useCallback((stepId) => {
    dispatch({ type: 'setExpandedStep', stepId })
  }, [])
  const hydrate = useCallback((savedState) => dispatch({ type: 'hydrate', state: savedState }), [])

  const itemsById = useMemo(
    () => new Map([...catalog.products, ...catalog.plans].map((item) => [item.id, item])),
    [catalog],
  )

  const selectedItems = useMemo(() => {
    return Object.entries(state.quantities).flatMap(([key, quantity]) => {
      if (quantity <= 0) return []
      const [productId, variantId] = key.split('::')
      const item = itemsById.get(productId)
      if (!item) return []
      const variant = item.variants?.find((entry) => entry.id === variantId)
      return [{ ...item, variantId, variantLabel: variant?.label, quantity, key }]
    })
  }, [itemsById, state.quantities])

  const stepCounts = useMemo(() => {
    const uniqueByStep = new Map()
    for (const item of selectedItems) {
      if (!uniqueByStep.has(item.stepId)) uniqueByStep.set(item.stepId, new Set())
      uniqueByStep.get(item.stepId).add(item.id)
    }
    return Object.fromEntries([...uniqueByStep].map(([stepId, ids]) => [stepId, ids.size]))
  }, [selectedItems])

  const totals = useMemo(() => {
    return selectedItems.reduce(
      (sum, item) => ({
        current: sum.current + item.price * item.quantity,
        original: sum.original + (item.compareAtPrice ?? item.price) * item.quantity,
      }),
      { current: 0, original: 0 },
    )
  }, [selectedItems])

  const value = useMemo(
    () => ({
      catalog,
      state,
      selectedItems,
      stepCounts,
      totals,
      setQuantity,
      setActiveVariant,
      setExpandedStep,
      hydrate,
    }),
    [
      catalog,
      hydrate,
      selectedItems,
      setActiveVariant,
      setExpandedStep,
      setQuantity,
      state,
      stepCounts,
      totals,
    ],
  )

  return <BundleContext.Provider value={value}>{children}</BundleContext.Provider>
}
