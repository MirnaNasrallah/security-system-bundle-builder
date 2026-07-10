import { memo } from 'react'

function StepHeader({ step, totalSteps, selectedCount, expanded, onToggle }) {
  return (
    <button
      className="step-header"
      type="button"
      onClick={onToggle}
      aria-expanded={expanded}
      aria-controls={`step-panel-${step.id}`}
    >
      <span className="step-header__eyebrow">
        Step {step.order} of {totalSteps}
      </span>
      <span className="step-header__row">
        <span className="step-header__title">
          <span aria-hidden="true">{step.icon}</span>
          {step.title}
        </span>
        <span className="step-header__status">
          {selectedCount > 0 && <span>{selectedCount} selected</span>}
          <span aria-hidden="true">{expanded ? '▴' : '▾'}</span>
        </span>
      </span>
    </button>
  )
}

export default memo(StepHeader)
