import { memo } from 'react'

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

function PriceTag({ price, compareAtPrice, isFree = false, period, large = false }) {
  return (
    <span className={`price-tag${large ? ' price-tag--large' : ''}`}>
      {compareAtPrice != null && compareAtPrice > price && (
        <del>{currency.format(compareAtPrice)}</del>
      )}
      <strong className={isFree ? 'price-tag__free' : ''}>
        {isFree ? 'FREE' : currency.format(price)}
        {period && <small>/{period}</small>}
      </strong>
    </span>
  )
}

export default memo(PriceTag)
