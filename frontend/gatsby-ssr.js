import React from 'react'
import { GlobalStateProvider } from './src/store'

export const wrapRootElement = ({ element }) => {
  return <GlobalStateProvider>{element}</GlobalStateProvider>
}
