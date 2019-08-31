import React from 'react'

import { useGlobalState } from '../store'
import './dashboard.css'
import Button from './button'

const Dashboard = ({ hideNoCheckoutWarning }) => {
  const [user] = useGlobalState('user')

  const isSetup = hideNoCheckoutWarning || !!user.subscriptionId

  return (
    <section className="wrapper" style={{ padding: '30px 0' }}>
      <h2>{isSetup ? 'Welcome back!' : 'Welcome!'}</h2>

      {!isSetup && (
        <div className="stripe-notice">
          <h4 style={{ marginBottom: '14px' }}>Stripe setup</h4>
          <p>
            In order to bill your card and plant trees, we need to link your
            account with Stripe. Stripe is a secure and trusted payment
            processor. Your payment details are not given to us at any time.
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
            Setup
          </Button>
        </div>
      )}

      <h4 style={{ marginBottom: '14px' }}>Your Zapier API key</h4>
      <p>
        When setting up your first Zapling-Zap, you'll be asked to sign in to
        Zapling. Copy and paste the text below into the API Key field and it
        should authorise Zapier for your account.
      </p>
      <div className="banner">{user.apiKey}</div>

      <br />

      <div className="your-trees">
        <h4>Your trees</h4>
        <p>
          Every time your zaps get triggered, we plant a tree in your name. At
          the end of every month, we'll charge your card for the total tree
          spend.
        </p>
        <p className="big">{user.trees}</p>
      </div>
    </section>
  )
}

export default Dashboard
