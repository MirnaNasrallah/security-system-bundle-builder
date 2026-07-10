import { memo } from 'react'

function QuantityStepper({ value, onIncrement, onDecrement, disabled = false, label = 'Quantity' }) {
  return (
    <div className="quantity-stepper" aria-label={label}>
      <button type="button" onClick={onDecrement} disabled={disabled || value === 0} aria-label="Decrease quantity">
        −
      </button>
      <span aria-live="polite">{value}</span>
      <button type="button" onClick={onIncrement} disabled={disabled} aria-label="Increase quantity">
        +
      </button>
    </div>
  )
}

export default memo(QuantityStepper)
