import React, { useContext, useState } from 'react'

import { AppContext } from '../App/App'
import * as actionTypes from '../App/actionTypes'
import { deleteAccount, putAccount } from '../../services/account'
import './AccountCard.css'

export const AccountCard = ({ account }) => {
  const appContext = useContext(AppContext)

  const [accountAttrs, setAccountAttrs] = useState({
    name: account.name,
    amount: account.amount | 0,
  })

  const initialName = account.name
  const initialAmount = parseFloat(account.amount)

  const handleDelete = async () => {
    try {
      await deleteAccount(account.id)

      appContext.appDispatch({
        type: actionTypes.DELETE_ACCOUNT,
        payload: account.id,
      })
    } catch (error) {
      console.log('handleDelete -> error', error)
    }
  }

  const handleChange = async (evt) => {
    const newAccountAttrs = { ...accountAttrs }

    let value = evt.target.value
    if (evt.target.name === 'amount') {
      value = parseFloat(value)
    }

    newAccountAttrs[evt.target.name] = value

    setAccountAttrs(newAccountAttrs)
  }

  const handleSave = async (evt) => {
    try {
      const response = await putAccount(account.id, accountAttrs)
      const newAccount = response.data

      appContext.appDispatch({
        type: actionTypes.PUT_ACCOUNT,
        payload: newAccount,
      })
    } catch (error) {
      console.log('handleChange -> error', error)
    }
  }

  return (
    <div className='account-card'>
      <input
        value={accountAttrs.name}
        onChange={handleChange}
        name='name'
        className='account-name'
        type='text'
      />
      <input
        value={accountAttrs.amount}
        onChange={handleChange}
        name='amount'
        className='account-amount'
        type='number'
        step='0.01'
      />

      {(initialName !== accountAttrs.name ||
        initialAmount !== accountAttrs.amount) && (
        <button onClick={handleSave}>Sauver</button>
      )}

      <button onClick={handleDelete}>Supprimer</button>
    </div>
  )
}
