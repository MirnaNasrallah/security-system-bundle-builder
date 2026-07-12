import { memo } from 'react'

function Accordion({ items, expandedId }) {
  return (
    <div className="accordion">
      {items.map((item) => {
        const expanded = item.id === expandedId
        return (
          <section className={`accordion__item${expanded ? ' is-expanded' : ''}`} key={item.id}>
            {item.header}
            <div
              className="accordion__panel"
              id={`step-panel-${item.id}`}
              role="region"
              aria-labelledby={`step-header-${item.id}`}
              aria-hidden={!expanded}
              inert={!expanded}
            >
              <div className="accordion__panel-inner">{item.content}</div>
            </div>
          </section>
        )
      })}
    </div>
  )
}

export default memo(Accordion)
