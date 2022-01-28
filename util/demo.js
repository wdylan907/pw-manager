const User = require('../models/user')

const initDemo = async () => {
  try {
    const user = await User.findOne({ username: 'demo' })
    user.vault = [
      {
        label: 'U2FsdGVkX19BPBfwpdonthHZJ3xQZQbLdJMNLxS5QaE=',
        username:
          'U2FsdGVkX19nTp6TkAh9aKIUb5jEUSDjbTN61Wj79pdjsDfk08eMZQKt4uni2o5t',
        password:
          'U2FsdGVkX19mbUJICihoxCKI+civn77BYgL3V2QLUop6/3RwJChrfuHr9DTLgEnl',
      },
      {
        label: 'U2FsdGVkX1/LBUgOOfcPjaoCBHUSSgROGlrAk1699hE=',
        username: 'U2FsdGVkX18hrsuWxJ2kQj//hWjZPBUGWJ6IYdFtjWw=',
        password:
          'U2FsdGVkX1/fmN6ZBDeX8wq7ZWYpW2+893NsDPybC0/98lrofoNsZXDs9AoLkqJ8',
      },
      {
        label: 'U2FsdGVkX1+1jJzazpPO0Bw/9DHME7iorQM4lAqtpB8=',
        username: 'U2FsdGVkX19BZRPyjnMWIffsvQxupje565GQzFiM9Vc=',
        password:
          'U2FsdGVkX1+d+S4e4X8t0+Fy9g1x9cJlfR2epXX6FY5CwbVy0hBzLXig55m7YIeT',
      },
      {
        label: 'U2FsdGVkX1/ACZ4JiUOMRngm7hPF0bHJGPoMauAFl+Q=',
        username:
          'U2FsdGVkX1/Iii2qf7ag1mrTUwjgbwbCBKlNlMvoRA6WC1MOeZZYf6EL4GT2X+QA',
        password:
          'U2FsdGVkX18xy8P9LlQeVLwVeDifY+xoskk4ILZySf1GuDVE0SXAfC2iu5ZeuOwe',
      },
    ]
    await user.save()
  } catch (error) {
    console.log(error)
  }
}

module.exports = initDemo
