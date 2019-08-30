import * as React from 'react'

const storageKey = '__authState'

type AuthState = {
  status: 'unknown' | 'in' | 'out'
  user:
    | undefined
    | {
        email: string
        apiKey: string
        trees: number
      }
  login: (email: string, apiKey: string, trees: number) => void
  signout: () => void
}

export function withAuth(WrappedComponent) {
  return () => {
    const [state, setState] = React.useState<
      Pick<AuthState, 'status' | 'user'>
    >(
      typeof window !== 'undefined' && window.localStorage[storageKey]
        ? {
            status: 'in',
            user: JSON.parse(window.localStorage[storageKey]),
          }
        : {
            status: 'out',
            user: undefined,
          }
    )

    const login = (email: string, apiKey: string, trees: number) => {
      if (typeof window !== 'undefined') {
        window.localStorage[storageKey] = JSON.stringify({
          email,
          apiKey,
          trees,
        })
      }

      setState({ status: 'in', user: { email, apiKey, trees } })
    }

    const signout = () => {
      if (typeof window !== 'undefined') {
        delete window.localStorage[storageKey]
      }

      setState({ status: 'out', user: undefined })
    }

    const props = { login, signout, ...state }

    return <WrappedComponent {...props} />
  }
}
