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

export const postMoments = (accountId, body) => {
  const pathEnd = `/accounts/${accountId}/moments`

  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `${scheme}://${authority}${pathBegin}${pathEnd}`,
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify(body)
        }
      )

      const data = await response.json()

      resolve(data)
    } catch (error) {
      console.log('getMoments -> error', error)

      reject(error)
    }
  })
}
