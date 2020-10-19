import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import { AppContext } from '../AppContextProvider/AppContextProvider'
import { deleteAccount, putAccount } from '../../services/account'
import { postMoments } from '../../services/moment'
import * as actionTypes from '../App/actionTypes'

import './AccountCard.css'

export const AccountCard = ({ account }) => {
  const appContext = useContext(AppContext)
  const { appDispatch } = appContext

  const initialAttrs = {
    name: account.name,
    amount: +account.amount || 0,
  }

  const [accountAttrs, setAccountAttrs] = useState(initialAttrs)

  const initialName = account.name
  const initialAmount = parseFloat(account.amount)

  const handleDelete = async () => {
    try {
      appDispatch({ type: actionTypes.SET_LOADING, payload: true })

      await deleteAccount(account.id)

      appDispatch({
        type: actionTypes.DELETE_ACCOUNT,
        payload: account.id,
      })
    } catch (error) {
      console.log('handleDelete -> error', error)

      appDispatch({ type: actionTypes.SET_LOADING, payload: false })
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
      appDispatch({ type: actionTypes.SET_LOADING, payload: true })

      const response = await putAccount(account.id, accountAttrs)
      const newAccount = response.data

      const amount = accountAttrs.amount

      await postMoments(account.id, {
        amount,
      })

      newAccount.amount = amount

      appDispatch({
        type: actionTypes.PUT_ACCOUNT,
        payload: newAccount,
      })
    } catch (error) {
      console.log('handleChange -> error', error)

      appDispatch({ type: actionTypes.SET_LOADING, payload: false })
    }
  }

  return (
    <div className='account-card'>
      <div className='head'>
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
      </div>

      <div className='body'></div>

      <div className='footer'>
        <Link to={`/account/${account.id}/${account.name}`}>Détail</Link>

        {(initialName !== accountAttrs.name ||
          initialAmount !== accountAttrs.amount) && (
          <button onClick={handleSave}>Sauver</button>
        )}

        <button onClick={handleDelete}>Supprimer</button>
      </div>
    </div>
  )
}
