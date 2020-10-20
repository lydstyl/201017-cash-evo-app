import { UrlConstants } from './urlConstants'

const { scheme, authority, pathBegin } = UrlConstants

export const getAllUsers = () => {
  const pathEnd = `/users`

  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `${scheme}://${authority}${pathBegin}${pathEnd}`
      )

      const data = await response.json()

      resolve(data)
    } catch (error) {
      console.log('getAllUsers -> error', error)

      reject(error)
    }
  })
}

export const postLogin = (data) => {
  const pathEnd = `/login`

  const body = data

  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `${scheme}://${authority}${pathBegin}${pathEnd}`,

        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify(body),
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
