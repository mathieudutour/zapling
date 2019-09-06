import React from 'react'

import User from '../models/user'
import Button from './button'

import './stripe-connect-notice.css'

type Props = {
  user: User
}

const StripeConnectNotice: React.FC<Props> = ({ user }) => {
  return (
    <div className="stripe-notice">
      <h4 style={{ marginBottom: '14px' }}>
        First things first - connect Stripe
      </h4>
      <p>
        In order to bill your card and plant trees, we need to link your account
        with Stripe. Stripe is a secure and trusted payment processor. Your
        payment details are not given to us at any time.
      </p>
      <Button
        full
        onClick={e => {
          e.preventDefault()
          const stripe = Stripe(process.env.GATSBY_STRIPE_PUBLIC_KEY)
          stripe.redirectToCheckout({
            sessionId: user.checkoutSessionId,
          })
        }}
      >
        Setup billing
      </Button>
    </div>
  )
}

export default StripeConnectNotice
