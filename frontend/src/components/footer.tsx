import * as React from 'react'

import './footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrapper">
        <p>
          Zapling was built as part of{' '}
          <a href="https://fixathon.io/" target="_blank" rel="no-referrer">
            The Climate Fixathon
          </a>
          .
        </p>
        <p style={{ margin: '0' }}>
          If you’d like to support the running of Zapling, please{' '}
          <a
            href="https://www.buymeacoffee.com/xnJClkByV"
            target="_blank"
            rel="no-referrer"
          >
            buy us a coffee
          </a>
          !
        </p>
      </div>
    </footer>
  )
}
