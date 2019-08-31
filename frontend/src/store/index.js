// NEEDS TO BE JS NOT TS SO IT CAN BE USED IN gatsby-browser.js
import { createGlobalState } from 'react-hooks-global-state'

const initialState = {
  isLoadingUser: true,
  user: null,
}

const {
  GlobalStateProvider,
  getGlobalState,
  useGlobalState,
  setGlobalState,
} = createGlobalState(initialState)

export { GlobalStateProvider, getGlobalState, useGlobalState, setGlobalState }
