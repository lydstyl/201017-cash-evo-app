import React, { useContext, useState } from 'react'

import { AppContext } from '../App/App'
import * as actionTypes from '../App/actionTypes'

import './AddAccount.css'
import { postAccount } from '../../services/account'

export const AddAccount = () => {
  const appContext = useContext(AppContext)

  const [name, setName] = useState(``)

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
      const defaultAccount = {
        name,
        amount,
      }

      const response = await postAccount(defaultAccount)

      const newAccount = response.data

      // Clear input
      setName('')

      appContext.appDispatch({
        type: actionTypes.POST_ACCOUNT,
        payload: newAccount,
      })
    } catch (error) {
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

      {/* <div className='field'>
        <label htmlFor='amount'>Montant</label>

        <input
          onChange={handleChange}
          value={amount}
          name='amount'
          type='number'
          placeholder='100'
          step='0.01'
        />
      </div> */}
    </div>
  )
}
