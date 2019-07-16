import * as React from 'react'

const storageKey = '__authState'

type authState = {
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

const AuthContext = React.createContext<authState>({
  status: 'unknown',
  user: undefined,
  login: () => {},
  signout: () => {},
})

export const AuthContextProvider = ({ children }) => {
  const [state, setState] = React.useState<Pick<authState, 'status' | 'user'>>(
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
      window.localStorage[storageKey] = JSON.stringify({ email, apiKey, trees })
    }

    setState({ status: 'in', user: { email, apiKey, trees } })
  }

  const signout = () => {
    if (typeof window !== 'undefined') {
      delete window.localStorage[storageKey]
    }

    setState({ status: 'out', user: undefined })
  }

  return (
    <AuthContext.Provider value={{ ...state, login, signout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const AuthContextConsumer = AuthContext.Consumer
