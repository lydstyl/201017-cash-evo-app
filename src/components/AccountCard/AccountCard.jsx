import React, { useContext } from 'react'

import { AppContext } from '../App/App'
import * as actionTypes from '../App/actionTypes'
import { deleteAccount } from '../../services/account'
import './AccountCard.css'

export const AccountCard = ({ account }) => {
  const appContext = useContext(AppContext)

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

  return (
    <div className='account-card'>
      {account.name}

      <button onClick={handleDelete}>Supprimer</button>
    </div>
  )
}
