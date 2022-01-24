const passwordGenerator = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  let string = ''
  for (let i = 0; i < 24; i++) {
    string += chars.charAt(Math.floor(Math.random() * chars.length))
  }

  return string
}

export default passwordGenerator
