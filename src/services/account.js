import { UrlConstants } from './urlConstants'

const { scheme, authority, pathBegin } = UrlConstants

export const getAllAccounts = () => {
  const pathEnd = '/accounts'

  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `${scheme}://${authority}${pathBegin}${pathEnd}`,

        {
          headers: {
            Authorization: localStorage.getItem('jwtToken')
          }
        }
      )

      const data = await response.json()

      // data.data = data.data.sort((accountA, accountB) => {
      //   const nameA = accountA.name.toUpperCase() // ignore upper and lowercase
      //   const nameB = accountB.name.toUpperCase()

      //   if (nameA < nameB) {
      //     return -1
      //   }
      //   if (nameA > nameB) {
      //     return 1
      //   }

      //   // names must be equal
      //   return 0
      // })

      resolve(data)
    } catch (error) {
      console.log('getAllAccounts -> error', error)

      reject(error)
    }
  })
}

export const postAccount = (data) => {
  const pathEnd = '/accounts'

  const body = data

  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `${scheme}://${authority}${pathBegin}${pathEnd}`,

        {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('jwtToken')
          },

          body: JSON.stringify(body) // body data type must match "Content-Type" header
        }
      )

      const data = await response.json()

      resolve(data)
    } catch (error) {
      console.log('getAllAccounts -> error', error)

      reject(error)
    }
  })
}

export const deleteAccount = (accountId) => {
  const pathEnd = `/accounts/${accountId}`

  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `${scheme}://${authority}${pathBegin}${pathEnd}`,

        {
          method: 'DELETE',
          headers: {
            Authorization: localStorage.getItem('jwtToken')
          }
        }
      )

      const data = await response.json()

      resolve(data)
    } catch (error) {
      console.log('getAllAccounts -> error', error)

      reject(error)
    }
  })
}

export const putAccount = (accountId, account) => {
  const pathEnd = `/accounts/${accountId}`

  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `${scheme}://${authority}${pathBegin}${pathEnd}`,

        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('jwtToken')
          },

          body: JSON.stringify(account)
        }
      )

      const data = await response.json()

      resolve(data)
    } catch (error) {
      console.log('getAllAccounts -> error', error)

      reject(error)
    }
  })
}
