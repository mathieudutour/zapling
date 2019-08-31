import React from 'react'

import Button from '../components/button'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { withAuth } from '../utils/auth'

import './index.css'

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
        <Button full to="/signup">
          Start here
        </Button>
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
          <p style={{ maxWidth: '800px' }}>
            Tree planting is done through our sister company,{' '}
            <a
              href="https://offset.earth/?r=5cf93dc278f4e5c015960a71"
              target="_blank"
              rel="no-referrer"
            >
              Offset Earth
            </a>
            .
          </p>
          <p style={{ maxWidth: '700px' }}>
            They use a non-profit called{' '}
            <a
              href="https://edenprojects.org"
              target="_blank"
              rel="no-referrer"
            >
              Eden Reforestation Projects
            </a>
            <br />
            to plant the trees.
          </p>
        </div>
        <div>
          <p style={{ maxWidth: '900px' }}>
            Eden Projects hire local people in Indonesia and Madagascar to plant
            native trees around their communities, supporting local economies
            and wildlife.
          </p>

          <p style={{ maxWidth: '900px' }}>
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
        <Button to="/signup">Sign up</Button>
      </div>
    </section>
    <section className="how-much-cost" id="pricing">
      <div className="wrapper">
        <h2>How much does it cost?</h2>
        <div className="big">
          <h3>Zero.</h3>
          <p style={{ maxWidth: '750px' }}>
            It’s <strong>free to use</strong> Zapling. You simply{' '}
            <em>pay for the trees you plant.</em>
          </p>
          <p>
            Each tree costs <strong>just $0.10</strong>.
          </p>

          <p style={{ maxWidth: '800px' }}>
            We’ll charge your card you at the end of each month.
          </p>
        </div>
        <div>
          <p style={{ maxWidth: '800px' }}>
            If your Zap was triggered 132 times this month, we’ll invoice you
            for $13.20. Once it’s paid, we’ll plant the trees.
          </p>
        </div>
        <Button red to="/signup">
          Sign up
        </Button>
      </div>
    </section>
    <section className="why-do-this">
      <div className="wrapper">
        <h2>Why do this?</h2>
        <h3>We need more trees.</h3>
        <p>
          The Earth has room for over 1 trillion additional trees.
          <br />
          Trees absorb CO2.
          <br />
          This helps the climate crisis.
        </p>
        <h3>Give something back.</h3>
        <p style={{ maxWidth: '800px' }}>
          Zapling is a simple and affordable way to contribute to reversing
          climate breakdown.
        </p>
        <h3>Make People smile.</h3>
        <p style={{ maxWidth: '800px' }}>
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
        <Button to="/signup">Start today</Button>
      </div>
    </section>
  </Layout>
)

export default withAuth(IndexPage)
