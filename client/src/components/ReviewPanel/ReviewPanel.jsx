import { memo, useMemo, useState } from 'react'
import { useBundle } from '../../hooks/useBundle'
import { usePersistedBundle } from '../../hooks/usePersistedBundle'
import PriceTag from '../PriceTag/PriceTag'
import ReviewLineItem from '../ReviewLineItem/ReviewLineItem'
import ShippingIcon from './ShippingIcon'

const categoryOrder = ['Cameras', 'Sensors', 'Accessories', 'Plan']

function ReviewPanel() {
  const { catalog, selectedItems, totals } = useBundle()
  const { saveNow } = usePersistedBundle()
  const [message, setMessage] = useState('')
  const groups = useMemo(
    () =>
      categoryOrder.flatMap((category) => {
        const items = selectedItems.filter((item) => item.reviewCategory === category)
        return items.length ? [{ category, items }] : []
      }),
    [selectedItems],
  )
  const savings = totals.original - totals.current
  const { shipping, guarantee, financingText } = catalog.summaryExtras

  const handleCheckout = () => setMessage('Your bundle is ready for checkout.')
  const handleSave = () => {
    const saved = saveNow()
    setMessage(saved ? 'Your system was saved.' : 'We could not save your system.')
  }

  return (
    <div className="review-panel">
      <p className="review-panel__eyebrow">Review</p>
      <h2>Your security system</h2>
      <p className="review-panel__intro">
        Review your personalized protection system designed to keep what matters most safe.
      </p>
      <div className="review-panel__groups">
        {groups.map((group) => (
          <section className="review-group" key={group.category}>
            <h3>{group.category}</h3>
            {group.items.map((item) => (
              <ReviewLineItem item={item} key={item.key} />
            ))}
          </section>
        ))}
      </div>
      <div className="review-summary">
        <div className="shipping-row">
          <span className="shipping-row__icon"><ShippingIcon /></span>
          <span>{shipping.label}</span>
          <PriceTag
            price={shipping.price}
            compareAtPrice={shipping.compareAtPrice}
            isFree={shipping.isFree}
          />
        </div>
        <div className="checkout-details">
          <div className="guarantee-total">
            <div className="guarantee-details">
              <img
                className="guarantee-badge"
                src="/images/991e1497c0a1c9e070778c8eb0abab6e98ddb05a.png"
                alt={guarantee.label}
              />
              <p className="guarantee-copy">
                <strong>{guarantee.title}</strong>
                <span>{guarantee.description}</span>
              </p>
            </div>
            <div className="total-block">
              <span className="financing-pill">{financingText}</span>
              <PriceTag price={totals.current} compareAtPrice={totals.original} large />
            </div>
          </div>
          <p className="savings-copy">
            Congrats! You&apos;re saving ${savings.toFixed(2)} on your security bundle!
          </p>
          <button className="checkout-button" type="button" onClick={handleCheckout}>
            Checkout
          </button>
          <button className="save-button" type="button" onClick={handleSave}>
            Save my system for later
          </button>
          {message && <p className="action-message" aria-live="polite">{message}</p>}
        </div>
      </div>
    </div>
  )
}

export default memo(ReviewPanel)
