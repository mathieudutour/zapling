import * as React from 'react'
import { Link } from 'gatsby'

import './button.css'

type Props = {
  children: React.ReactNode
  full?: boolean
  onClick?: (e?: any) => void
  red?: boolean
  submit?: boolean
  to?: string
}

const Button: React.FC<Props> = props => {
  const { full, red, submit, onClick, children, to } = props
  if (to) {
    return (
      <Link
        to={to}
        className={`button${full ? ' full' : ''}${red ? ' red' : ''}`}
      >
        {children}
      </Link>
    )
  }
  return (
    <button
      className={`button${full ? ' full' : ''}${red ? ' red' : ''}`}
      onClick={onClick}
      type={submit ? 'submit' : 'button'}
    >
      {children}
    </button>
  )
}

export default Button
