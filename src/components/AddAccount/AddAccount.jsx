import React from 'react'

import './AddAccount.css'
import { postAccount } from '../../services/account'

export const AddAccount = () => {
  const handleClick = () => {
    ;(async () => {
      try {
        const response = await postAccount({ name: 'BNP' })

        console.log('handleClick -> response', response)
        // setResponse(response.data)
      } catch (error) {
        console.log('AddAccount -> error', error)
      }
    })()
  }

  return <button onClick={handleClick}>Ajouter un compte</button>
}
