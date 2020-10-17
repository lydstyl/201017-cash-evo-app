import React from 'react'

import coin from './coin.jpeg'
import './spinner.css'

export const Spinner = () => {
  return (
    <div className='spinner-component'>
      <img src={coin} className='coin' alt='coin' />
    </div>
  )
}
