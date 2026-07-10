import { memo } from 'react'

function Badge({ children }) {
  return <span className="badge">{children}</span>
}

export default memo(Badge)
