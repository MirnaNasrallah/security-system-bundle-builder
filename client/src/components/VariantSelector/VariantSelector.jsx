import { memo } from 'react'

function VariantSelector({ variants, value, onChange }) {
  if (!variants?.length) return null

  return (
    <div className="variant-selector" aria-label="Choose a color">
      {variants.map((variant) => (
        <button
          className={variant.id === value ? 'is-active' : ''}
          key={variant.id}
          type="button"
          onClick={() => onChange(variant.id)}
          aria-pressed={variant.id === value}
        >
          {variant.thumbnail || variant.image ? (
            <img className="variant-image" src={variant.thumbnail || variant.image} alt="" />
          ) : (
            <span className="variant-swatch" style={{ backgroundColor: variant.swatch }} />
          )}
          {variant.label}
        </button>
      ))}
    </div>
  )
}

export default memo(VariantSelector)
