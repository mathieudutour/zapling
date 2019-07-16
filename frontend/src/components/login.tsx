import * as React from 'react'

const Login = ({
  onLogin,
}: {
  onLogin: (email: String, apiKey: String, trees: Number) => void
}) => {
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
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error('Network response was not ok.')
      })
      .then(({ data }) => {
        onLogin(data.email, data.apiKey, data.trees)
      })
      .catch(response => console.error(response))
  }
  return (
    <form onSubmit={onSubmit}>
      Login
      <input name="email" type="email" placeholder="email" />
      <input name="password" type="password" placeholder="password" />
      <input type="submit" />
    </form>
  )
}

export default Login
