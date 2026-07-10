import { useMemo } from 'react'
import './App.css'
import Accordion from './components/Accordion/Accordion'
import ProductCard from './components/ProductCard/ProductCard'
import ReviewPanel from './components/ReviewPanel/ReviewPanel'
import StepHeader from './components/StepHeader/StepHeader'
import { BundleProvider } from './context/BundleContext'
import catalog from './data/catalog.json'
import { useBundle } from './hooks/useBundle'

function BundleBuilder() {
  const { state: { expandedStepId }, stepCounts, setExpandedStep } = useBundle()
  const allProducts = useMemo(() => [...catalog.products, ...catalog.plans], [])
  const accordionItems = useMemo(
    () =>
      catalog.steps.map((step, index) => {
        const products = allProducts.filter((product) => product.stepId === step.id)
        const nextStep = catalog.steps[index + 1]
        const expanded = expandedStepId === step.id

        return {
          id: step.id,
          header: (
            <StepHeader
              step={step}
              totalSteps={catalog.steps.length}
              selectedCount={stepCounts[step.id] || 0}
              expanded={expanded}
              onToggle={() => setExpandedStep(expanded ? null : step.id)}
            />
          ),
          content: (
            <>
              <div className="step-products">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              {nextStep && (
                <button
                  className="next-step"
                  type="button"
                  onClick={() => setExpandedStep(nextStep.id)}
                >
                  Next: {nextStep.title}
                </button>
              )}
            </>
          ),
        }
      }),
    [allProducts, expandedStepId, setExpandedStep, stepCounts],
  )

  return <Accordion items={accordionItems} expandedId={expandedStepId} />
}

function App() {
  return (
    <BundleProvider catalog={catalog}>
      <main className="app-shell">
        <h1>Let&apos;s get started!</h1>
        <div className="builder-layout">
          <section className="builder-column" aria-label="Bundle builder">
            <BundleBuilder />
          </section>
          <aside className="review-column" aria-label="Bundle review">
            <ReviewPanel />
          </aside>
        </div>
      </main>
    </BundleProvider>
  )
}

export default App
