import React from 'react'
import { useParams } from 'react-router-dom'

export const AccountDetail = () => {
  let { id } = useParams()

  return <div>AccountDetail {id}</div>
}
