import React from 'react'

import './AddAccount.css'
import { postAccount } from '../../services/account'

export const AddAccount = () => {
  const handleClick = () => {
    ;(async () => {
      try {
        const defaultAccount = {
          name: `Account ${
            document.querySelectorAll('.account-card').length + 1
          }`,
        }

        const response = await postAccount(defaultAccount)

        console.log('handleClick -> response', response)

        window.location.reload()
        return false
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
