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
      console.log('App -> error', error)

      reject(error)
    }
  })
}
