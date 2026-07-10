import { memo, useCallback } from 'react'
import { useBundle } from '../../hooks/useBundle'
import Badge from '../Badge/Badge'
import PriceTag from '../PriceTag/PriceTag'
import QuantityStepper from '../QuantityStepper/QuantityStepper'
import VariantSelector from '../VariantSelector/VariantSelector'

function ProductCard({ product }) {
  const { state, setQuantity, setActiveVariant } = useBundle()
  const variantId = state.activeVariant[product.id] || product.defaultVariantId || 'default'
  const quantity = state.quantities[`${product.id}::${variantId}`] || 0

  const increment = useCallback(
    () => setQuantity(product.id, variantId, quantity + 1),
    [product.id, quantity, setQuantity, variantId],
  )
  const decrement = useCallback(
    () => setQuantity(product.id, variantId, quantity - 1),
    [product.id, quantity, setQuantity, variantId],
  )
  const changeVariant = useCallback(
    (nextVariantId) => setActiveVariant(product.id, nextVariantId),
    [product.id, setActiveVariant],
  )

  return (
    <article className={`product-card${quantity > 0 ? ' is-selected' : ''}`}>
      {product.badge && <Badge>{product.badge.label}</Badge>}
      <img
        className="product-card__image"
        src={product.image}
        alt=""
        loading="lazy"
        onError={(event) => {
          event.currentTarget.src = '/images/product.svg'
        }}
      />
      <div className="product-card__body">
        <h3>{product.title}</h3>
        {product.description && (
          <p>
            {product.description}{' '}
            {product.learnMoreUrl && <a href={product.learnMoreUrl}>Learn More</a>}
          </p>
        )}
        <VariantSelector variants={product.variants} value={variantId} onChange={changeVariant} />
      </div>
      <div className="product-card__footer">
        <QuantityStepper
          value={quantity}
          onIncrement={increment}
          onDecrement={decrement}
          label={`${product.title} quantity`}
        />
        <PriceTag
          price={product.price}
          compareAtPrice={product.compareAtPrice}
          isFree={product.isFree}
          period={product.billingPeriod}
        />
      </div>
    </article>
  )
}

export default memo(ProductCard)
