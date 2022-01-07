const passwordGenerator = special => {
  const numbers = '0123456789'
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  const specials = '!@#$%^&*()'

  let chars = ''
  if (special) {
    chars += numbers
    chars += letters
    chars += specials
  } else {
    chars += numbers
    chars += letters
  }

  let string = letters.charAt(Math.floor(Math.random() * letters.length))
  for (let i = 0; i < 23; i++) {
    string += chars.charAt(Math.floor(Math.random() * chars.length))
  }

  return string
}

export default passwordGenerator
