import React, { useState } from 'react'

import './AddAccount.css'
import { postAccount } from '../../services/account'

export const AddAccount = () => {
  const [name, setName] = useState(
    `Account ${document.querySelectorAll('.account-card').length + 1}`
  )

  const [amount, setAmount] = useState(100)

  const handleChange = (evt) => {
    if (evt.target.name === 'name') {
      setName(evt.target.value)
    }

    if (evt.target.name === 'amount') {
      setAmount(evt.target.value)
    }
  }

  const handleClick = () => {
    ;(async () => {
      try {
        const defaultAccount = {
          name,
          amount,
        }

        const response = await postAccount(defaultAccount)

        // dispatch here instead of reload

        // window.location.reload()
        return false
      } catch (error) {
        console.log('AddAccount -> error', error)
      }
    })()
  }

  return (
    <div className='post-account'>
      <div className='field'>
        <label htmlFor='name'>Nom du compte</label>

        <input
          onChange={handleChange}
          value={name}
          name='name'
          type='text'
          placeholder='Compte x'
        />
      </div>

      <div className='field'>
        <label htmlFor='amount'>Montant</label>

        <input
          onChange={handleChange}
          value={amount}
          name='amount'
          type='number'
          placeholder='100'
          step='0.01'
        />
      </div>

      <button className='post-account' onClick={handleClick}>
        Ajouter un compte
      </button>
    </div>
  )
}
