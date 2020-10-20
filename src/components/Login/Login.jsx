import React, { useContext } from 'react'
import { AppContext } from '../AppContextProvider/AppContextProvider'
import * as actionTypes from '../App/actionTypes'

export const Login = () => {
  const appContext = useContext(AppContext)

  const { appDispatch } = appContext

  const handleClick = () => {
    appDispatch({ type: actionTypes.SET_IS_LOGIN, payload: true })
  }

  return (
    <div>
      <h1>Login</h1>

      <input type='email' name='email' />

      <input type='password' name='password' />

      <button onClick={handleClick}>Login</button>
    </div>
  )
}
