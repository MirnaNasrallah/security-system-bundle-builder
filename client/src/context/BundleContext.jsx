import { useCallback, useMemo, useReducer } from 'react'
import { BundleContext, bundleReducer, createInitialState } from './bundleState'

function BundleProvider({ catalog, children, initialState }) {
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
      return [{
        ...item,
        image: variant?.thumbnail || variant?.image || item.image,
        variantId,
        variantLabel: variant?.label,
        quantity,
        key,
      }]
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

export default BundleProvider
