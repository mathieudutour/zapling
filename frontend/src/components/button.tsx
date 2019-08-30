import * as React from 'react'

import './button.css'

type Props = {
  children: React.ReactNode
  full?: boolean
  onClick?: (e?: any) => void
  red?: boolean
  submit?: boolean
}

const Button: React.FC<Props> = props => {
  const { full, red, submit, onClick, children } = props
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
