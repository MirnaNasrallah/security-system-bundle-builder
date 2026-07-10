import { memo, useMemo } from 'react'
import { useBundle } from '../../hooks/useBundle'
import ReviewLineItem from '../ReviewLineItem/ReviewLineItem'

const categoryOrder = ['Cameras', 'Sensors', 'Accessories', 'Plan']

function ReviewPanel() {
  const { selectedItems } = useBundle()
  const groups = useMemo(
    () =>
      categoryOrder.flatMap((category) => {
        const items = selectedItems.filter((item) => item.reviewCategory === category)
        return items.length ? [{ category, items }] : []
      }),
    [selectedItems],
  )

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
    </div>
  )
}

export default memo(ReviewPanel)
