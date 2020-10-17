import React from 'react'

import './AddAccount.css'
import { postAccount } from '../../services/account'

export const AddAccount = () => {
  const handleClick = () => {
    ;(async () => {
      try {
        const defaultAccount = { name: 'Account name' }

        const response = await postAccount(defaultAccount)

        console.log('handleClick -> response', response)
        // setResponse(response.data)
      } catch (error) {
        console.log('AddAccount -> error', error)
      }
    })()
  }

  return (
    <button className='post-account' onClick={handleClick}>
      Ajouter un compte
    </button>
  )
}
