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
          <h4 style={{ marginBottom: '14px' }}>
            First things first - connect Stripe
          </h4>
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
          <p className="info">
            <strong>Please note</strong>: While we're in beta we will use Stripe
            in test-mode. Please use a Stripe test card to checkout.
            <br />
            The one we tend to use is <code>4242 4242 4242 4242</code> with a
            zip code of <code>12345</code> and <code>US</code> as the country.
            Use any future date and any 3 digits for the CCV.
          </p>
        </div>
      )}

      <h4 style={{ marginBottom: '14px' }}>Your Zapier API key</h4>
      <p>
        When setting up your Zapling Zaps, you'll be asked to sign in to
        Zapling. Copy and paste the text below into the API Key field and it
        should authorise Zapier for your account.
      </p>
      <div className="banner">{user.apiKey}</div>

      <br />

      <div className="your-trees">
        <h4>Your trees</h4>
        <p>
          Every time one of your zaps gets triggered, we plant a tree in your
          name! At the end of every month, we'll charge your card for the total
          tree spend.
        </p>
        <p className="big">
          {user.trees} tree{user.trees === 1 ? '' : 's'}
        </p>
      </div>
    </section>
  )
}

export default Dashboard
