import React from 'react'
import Button from './button'

type Props = {
  onLogin: (email: String, apiKey: String, trees: Number) => void
}

const LoginForm: React.FC<Props> = ({ onLogin }) => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = e.target[0].value
    const password = e.target[1].value

    fetch(`${process.env.GATSBY_API_URL}/login`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then(async response => {
        const data = await response.json()
        if (response.ok) {
          return data
        }
        throw new Error(data.message)
      })
      .then(({ data }) => {
        onLogin(data.email, data.apiKey, data.trees)
      })
      .catch(async message => {
        alert(message)
        console.error(message)
      })
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="wrapper" style={{ marginTop: '30px' }}>
        <h2 style={{ position: 'relative', top: '14px' }}>Login</h2>
        <br />
        <label style={{ display: 'block', marginBottom: '10px' }}>
          Email address
          <br />
          <input name="email" type="email" style={{ marginTop: '10px' }} />
        </label>
        <label style={{ display: 'block', marginBottom: '20px' }}>
          Password
          <br />
          <input
            name="password"
            type="password"
            style={{ marginTop: '10px' }}
          />
        </label>
        <Button submit>Login</Button>
      </div>
    </form>
  )
}

export default LoginForm
