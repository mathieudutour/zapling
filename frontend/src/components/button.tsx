import * as React from 'react'

import './button.css'

export default function Button({
  full,
  red,
  onClick,
  children,
}: {
  full?: boolean
  red?: boolean
  onClick?: () => void
  children: React.ReactNode
}) {
  return (
    <button
      className={`button${full ? ' full' : ''}${red ? ' red' : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
