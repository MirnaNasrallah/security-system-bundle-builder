import { memo, useCallback } from 'react'
import { useBundle } from '../../hooks/useBundle'
import PriceTag from '../PriceTag/PriceTag'
import QuantityStepper from '../QuantityStepper/QuantityStepper'

function ReviewLineItem({ item }) {
  const { setQuantity } = useBundle()
  const increment = useCallback(
    () => setQuantity(item.id, item.variantId, item.quantity + 1),
    [item.id, item.quantity, item.variantId, setQuantity],
  )
  const decrement = useCallback(
    () => setQuantity(item.id, item.variantId, item.quantity - 1),
    [item.id, item.quantity, item.variantId, setQuantity],
  )

  return (
    <div className={`review-line review-line--${item.reviewCategory.toLowerCase()}`}>
      <div className="review-line__product">
        <img
          src={item.image}
          alt=""
          onError={(event) => {
            event.currentTarget.src = '/images/product.svg'
          }}
        />
        <div className="review-line__name">
          <span>{item.title}</span>
          {item.variantLabel && <small>{item.variantLabel}</small>}
        </div>
      </div>
      {item.editableInReview ? (
        <QuantityStepper
          value={item.quantity}
          onIncrement={increment}
          onDecrement={decrement}
          label={`${item.title} quantity`}
        />
      ) : (
        <span className="review-line__stepper-space" aria-hidden="true" />
      )}
      <PriceTag
        price={item.price * item.quantity}
        compareAtPrice={item.compareAtPrice && item.compareAtPrice * item.quantity}
        isFree={item.isFree}
        period={item.billingPeriod}
      />
    </div>
  )
}

export default memo(ReviewLineItem)
