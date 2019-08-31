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
          </a>{' '}
          by{' '}
          <a
            href="https://twitter.com/MathieuDutour"
            target="_blank"
            rel="no-referrer"
          >
            Mathieu Dutour
          </a>{' '}
          and{' '}
          <a
            href="https://twitter.com/remotealex"
            target="_blank"
            rel="no-referrer"
          >
            Alex Price
          </a>
          .
        </p>
        <p style={{ margin: '15px 0 10px', fontSize: '15px', opacity: 0.6 }}>
          If you'd like to support the development of Zapling, please consider
          buying us a coffee!
        </p>
        <a href="https://www.buymeacoffee.com/xnJClkByV" target="_blank">
          <img
            src="https://bmc-cdn.nyc3.digitaloceanspaces.com/BMC-button-images/custom_images/orange_img.png"
            alt="Buy Me A Coffee"
            style={{ height: 'auto !important', width: 'auto !important' }}
          />
        </a>
      </div>
    </footer>
  )
}
