import React from 'react'

import './AccountCard.css'

export const AccountCard = ({ account }) => {
  return <div className='account-card'>{account.name}</div>
}
