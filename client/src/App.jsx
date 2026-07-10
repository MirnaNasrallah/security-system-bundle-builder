import './App.css'
import ProductCard from './components/ProductCard/ProductCard'
import { BundleProvider } from './context/BundleContext'
import catalog from './data/catalog.json'

function App() {
  const cameraProducts = catalog.products.filter((product) => product.stepId === 'cameras')

  return (
    <BundleProvider catalog={catalog}>
      <main className="app-shell">
        <h1>Let&apos;s get started!</h1>
        <div className="builder-layout">
          <section className="builder-column product-grid" aria-label="Bundle builder">
            {cameraProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </section>
          <aside className="review-column" aria-label="Bundle review" />
        </div>
      </main>
    </BundleProvider>
  )
}

export default App
