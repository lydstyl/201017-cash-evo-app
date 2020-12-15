import * as actionTypes from './actionTypes'
import { calculateTotal } from '../../utils/total'

export const initialState = {
  accounts: null,
  total: 0,
  loading: false,
  isLogin: false
}

export const reducer = (state, action) => {
  const newState = { ...state }

  switch (action.type) {
    case actionTypes.SET_LOADING:
      newState.loading = action.payload

      return newState

    case actionTypes.SET_IS_LOGIN:
      newState.isLogin = action.payload

      newState.loading = false

      return newState

    case actionTypes.SET_ACCOUNTS:
      newState.accounts = action.payload.map((a) => {
        a.amount = +a.amount
        return a
      })

      newState.total = calculateTotal(newState.accounts)

      newState.loading = false

      return newState

    case actionTypes.POST_ACCOUNT:
    {
      const account = action.payload
      account.amount = 0

      newState.accounts.push(account)

      newState.loading = false

      return newState
    }

    case actionTypes.PUT_ACCOUNT:
      newState.accounts = newState.accounts.map((a) => {
        if (a.id === action.payload.id) {
          return { ...a, ...action.payload }
        }

        return a
      })

      newState.total = calculateTotal(newState.accounts)

      newState.loading = false

      return newState

    case actionTypes.DELETE_ACCOUNT:
      newState.accounts = newState.accounts.filter(
        (a) => a.id !== action.payload
      )

      newState.total = calculateTotal(newState.accounts)

      newState.loading = false

      return newState

    case actionTypes.SET_TOTAL:
    {
      const accounts = action.payload

      newState.total = calculateTotal(accounts)

      newState.loading = false

      return newState
    }

    default:
      return state
  }
}
