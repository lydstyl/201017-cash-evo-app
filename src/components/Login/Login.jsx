import React, { useState, useContext } from 'react'
import { AppContext } from '../AppContextProvider/AppContextProvider'
import * as actionTypes from '../App/actionTypes'

import { postLogin, postSignUp } from '../../services/user'

import './Login.css'

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const appContext = useContext(AppContext)

  const { appState, appDispatch } = appContext

  const handleChange = (evt) => {
    if (evt.target.name === 'email') {
      setEmail(evt.target.value)
    } else {
      setPassword(evt.target.value)
    }
  }

  const handleClick = async (param) => {
    appDispatch({ type: actionTypes.SET_LOADING, payload: true })

    if (param === 'create-account') {
      console.log('create-account')
      // sign-up

      try {
        const response = await postSignUp({
          email,
          password
        })

        if (response.success) {
          appDispatch({ type: actionTypes.SET_IS_LOGIN, payload: true })
        }
      } catch (error) {
        console.log('🚀 ~ file: Login.jsx ~ line 42 ~ handleClick ~ error', error)

        appDispatch({ type: actionTypes.SET_LOADING, payload: false })
      }
    } else {
      try {
        // send email and password to back end
        const response = await postLogin({
          email,
          password
        })

        if (response.success) {
          appDispatch({ type: actionTypes.SET_IS_LOGIN, payload: true })
        }
      } catch (error) {
        console.log('App -> error', error)

        appDispatch({ type: actionTypes.SET_LOADING, payload: false })
      }
    }
  }

  return (
    <>
      {!appState.isLogin &&

        <div className='login'>
          <div className='inputs'>

            <label htmlFor='email'>Email</label>
            <input value={email} onChange={handleChange} type='email' name='email' />

            <label htmlFor='password'>Mot de passe</label>
            <input
              value={password}
              onChange={handleChange}
              type='password'
              name='password'
            />
          </div>

          <button onClick={handleClick}>Login</button>

          <button onClick={_ => handleClick('create-account')}>ou créer un compte</button>
        </div>}
    </>
  )
}
