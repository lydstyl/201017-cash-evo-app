export const calculateTotal = (accounts) => {
  let total = accounts.reduce((accumulator, currentValue) => {
    const amount = +currentValue.amount

    return accumulator + amount
  }, 0)

  return Math.round(total * 100) / 100
}
