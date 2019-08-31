import React from 'react'

import { useGlobalState } from '../store'
import StripeConnectNotice from './stripe-connect-notice'
import './dashboard.css'

const Dashboard = ({ hideNoCheckoutWarning }) => {
  const [user] = useGlobalState('user')

  // @M can we remove this `hideNoCheckoutWarning` now?
  const isSetup = hideNoCheckoutWarning || !!user.subscriptionId

  return (
    <section className="wrapper" style={{ padding: '30px 0' }}>
      <h2>{isSetup ? 'Welcome back!' : 'Welcome!'}</h2>

      {isSetup ? (
        <div className="your-trees">
          <p className="big">
            You've planted {user.trees} tree{user.trees === 1 ? '' : 's'}
          </p>
          <p>
            Every time one of your zaps gets triggered, we plant a tree in your
            name! At the end of every month, we'll charge your card for the
            total tree spend.
          </p>
        </div>
      ) : (
        <StripeConnectNotice user={user} />
      )}

      <h4 style={{ marginBottom: '14px' }}>Your Zapier API key</h4>
      <div className="banner">{user.apiKey}</div>

      <br />

      <h4 style={{ marginBottom: '14px' }}>Building your first Zap</h4>
      <p className="one">
        Our Zapier app is not yet available on the public list as we're a new
        service. Because of this, you need to click the link below to activate
        it.
      </p>
      <a
        className="button"
        href=""
        rel="noopener noreferrer"
        style={{ display: 'inline-block', margin: '0 0 20px 30px' }}
        target="_blank"
      >
        Activate Zapling
      </a>
      <p className="two">
        In Zapier, click the "Make a Zap!" button and go to the Zap editor.
        Next, select any trigger you desire, authorise it if you need to and
        then configure it as required.
      </p>
      <p className="three">
        Finally, select Zapling as the "Do this..." step. You'll be asked to
        sign in to Zapling and you simply need to paste in the API Key listed
        above. Select the number of trees to plant per Zap and you're done!
      </p>
    </section>
  )
}

export default Dashboard
