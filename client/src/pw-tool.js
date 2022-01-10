const passwordGenerator = length => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  const chars = letters + '0123456789'

  let string = letters.charAt(Math.floor(Math.random() * letters.length))
  for (let i = 0; i < length - 1; i++) {
    string += chars.charAt(Math.floor(Math.random() * chars.length))
  }

  return string
}

export default passwordGenerator
