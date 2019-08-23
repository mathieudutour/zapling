import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Login from '../components/login'
import Signup from '../components/signup'
import { AuthContextConsumer } from '../components/auth-context'
import Button from '../components/button'

import './index.css'

const DashboardLinkOrLogin = () => {
  return (
    <AuthContextConsumer>
      {({ status, login, user }) => {
        switch (status) {
          case 'in':
            return `Dashboard. API Key to copy paste in zapier to authenticate: ${user.apiKey}`
          case 'out':
            return (
              <>
                <Login onLogin={login} />
                <Signup onSignup={login} />
              </>
            )
          default:
            return null
        }
      }}
    </AuthContextConsumer>
  )
}

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <section className="hero">
      <div className="wrapper">
        <div className="intro">It's time to do something good</div>
        <h1>Plant a tree for any action on the web</h1>
        <p>
          Zapling allows you to plant a tree for any Zapier trigger. Make your
          service more rewarding and help reforest the world—It only takes 2
          minutes.
        </p>
        <Button full>Start here</Button>
      </div>
    </section>
    <section className="how-does-it-work">
      <div className="wrapper">
        <h2>How does it work?</h2>
        <ol>
          <li>Connect your Zapier account to Zapling.</li>
          <li>Set up a new trigger or add Zapling to an existing Zap.</li>
          <li>
            Each time your Zap is triggered, we’ll plant a tree on your behalf.
          </li>
        </ol>
      </div>
    </section>
    <section className="who-plants-the-trees">
      <div className="wrapper">
        <h2>Who plants the trees?</h2>
        <div className="big">
          <p>
            Tree planting is done through our sister company,{' '}
            <a href="https://offset.earth" target="_blank" rel="no-referrer">
              Offset Earth
            </a>
            .
          </p>
          <p>
            They use a non-profit called{' '}
            <a
              href="https://edenprojects.org"
              target="_blank"
              rel="no-referrer"
            >
              Eden Reforestation Projects
            </a>{' '}
            to plant the trees.
          </p>
        </div>
        <div>
          <p>
            Eden Projects hire local people in Indonesia and Madagascar to plant
            native trees around their communities, supporting local economies
            and wildlife.
          </p>

          <p>
            Offset Earth openly publishes all tree purchasing records as proof
            of impact. Please visit their{' '}
            <a
              href="https://offset.earth/pages/about"
              target="_blank"
              rel="no-referrer"
            >
              transparency
            </a>{' '}
            page to learn more.
          </p>
        </div>
        <Button>Sign up</Button>
      </div>
    </section>
    <section className="how-much-cost">
      <div className="wrapper">
        <h2>How much does it cost?</h2>
        <div className="big">
          <h3>Zero.</h3>
          <p>
            It’s <strong>free to use</strong> Zapling. You simply pay for the
            trees you plant.
          </p>
          <p>
            Each tree costs <strong>just $0.10</strong>.
          </p>
          <p>We’ll charge your card you at the end of each month.</p>
        </div>
        <div>
          <p>
            If your Zap was triggered 132 times this month, we’ll invoice you
            for $13.20. Once it’s paid, we’ll plant the trees.
          </p>
        </div>
        <Button red>Sign up</Button>
      </div>
    </section>
    <section className="why-do-this">
      <div className="wrapper">
        <h2>Why do this?</h2>
        <h3>We need more trees.</h3>
        <p>
          The Earth has room for over 1 trillion additional trees. Trees absorb
          CO2. This helps the climate crisis.
        </p>
        <h3>Give something back.</h3>
        <p>
          Zapling is a simple and affordable way to contribute to reversing
          climate breakdown.
        </p>
        <h3>Make People smile.</h3>
        <p>
          Your customers will enjoy knowing that your service helps the
          environment.
        </p>
      </div>
    </section>
    <section className="example-zaps">
      <div className="wrapper">
        <h2>Why do this?</h2>
        <p>Reward your customers for doing good things like:</p>
        <div className="example">
          <p>Paying for your product or services</p>
          <p>- Stripe</p>
        </div>
        <div className="example">
          <p>Subscribing to your email list</p>
          <p>- Mailchimp</p>
        </div>
        <div className="example">
          <p>Filling in your questionnaire</p>
          <p>- Typeform</p>
        </div>
        <Button>Start today</Button>
      </div>
    </section>
  </Layout>
)

export default IndexPage
