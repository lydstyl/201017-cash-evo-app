import { UrlConstants } from './urlConstants'

const { scheme, authority, pathBegin } = UrlConstants

export const getMoments = (accountId) => {
  const pathEnd = `/accounts/${accountId}/moments`

  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `${scheme}://${authority}${pathBegin}${pathEnd}`
      )

      const data = await response.json()

      resolve(data)
    } catch (error) {
      console.log('getMoments -> error', error)

      reject(error)
    }
  })
}
