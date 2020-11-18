let scheme
let authority
const pathBegin = process.env.REACT_APP_URL_PATH_BEGIN

if (process.env.REACT_APP_ENV === 'production') {
  scheme = process.env.REACT_APP_URL_SCHEME
  authority = process.env.REACT_APP_URL_AUTHORITY // or host here
} else {
  scheme = process.env.REACT_APP_DEV_URL_SCHEME
  authority = process.env.REACT_APP_DEV_URL_AUTHORITY
}

export const UrlConstants = {
  scheme,
  authority,
  pathBegin
}
