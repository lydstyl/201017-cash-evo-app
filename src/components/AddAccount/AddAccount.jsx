import React, { useContext, useState } from 'react'

import { AppContext } from '../AppContextProvider/AppContextProvider'
import * as actionTypes from '../App/actionTypes'
import { postAccount } from '../../services/account'

import './AddAccount.css'

export const AddAccount = () => {
  const appContext = useContext(AppContext)
  const { appDispatch } = appContext

  const [name, setName] = useState('')

  const [amount, setAmount] = useState(100)

  const handleChange = (evt) => {
    if (evt.target.name === 'name') {
      setName(evt.target.value)
    }

    if (evt.target.name === 'amount') {
      setAmount(evt.target.value)
    }
  }

  const handleClick = async () => {
    try {
      appDispatch({ type: actionTypes.SET_LOADING, payload: true })

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
  }

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
