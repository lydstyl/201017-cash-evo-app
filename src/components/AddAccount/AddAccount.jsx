import React, { useContext, useState, useCallback } from 'react'

import { AppContext } from '../AppContextProvider/AppContextProvider'
import * as actionTypes from '../App/actionTypes'
import { postAccount } from '../../services/account'

import './AddAccount.css'

export const AddAccount = () => {
  const appContext = useContext(AppContext)
  const { appDispatch } = appContext

  const [name, setName] = useState('')

  const [amount, setAmount] = useState(0)

  const handleChange = useCallback((evt) => {
    if (evt.target.name === 'name') {
      setName(evt.target.value)
    }

    if (evt.target.name === 'amount') {
      setAmount(evt.target.value)
    }
  }, [])

  const handleClick = useCallback(async () => {
    try {
      appDispatch({ type: actionTypes.SET_LOADING, payload: true }) // comment this line fix the bug but we can't

      const defaultAccount = {
        name,
        amount
      }

      const response = await postAccount(defaultAccount)

      const newAccount = response.data

      if (!newAccount.moments) {
        newAccount.moments = []
      }

      setName('') // Clear input

      appDispatch({
        type: actionTypes.POST_ACCOUNT,
        payload: newAccount
      })
    } catch (error) {
      appDispatch({ type: actionTypes.SET_LOADING, payload: false })

      console.log('handleClick -> error', error)
    }
  }, [name])

  return (
    <div className='post-account'>
      <div className='field'>
        <label htmlFor='name'>Nom du compte à ajouter</label>

        <input
          onChange={handleChange}
          value={name}
          name='name'
          type='text'
          placeholder='Compte x'
        />

        {name && (
          <button className='post-account' onClick={handleClick}>
            Ajouter
          </button>
        )}
      </div>
    </div>
  )
}
