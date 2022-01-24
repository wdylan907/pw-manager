import CryptoJS from 'crypto-js'

const encryptEntry = (entry, key) => {
  const encryptedEntry = {
    id: entry.id,
    label: CryptoJS.AES.encrypt(entry.label, key).toString(),
    username: CryptoJS.AES.encrypt(entry.username, key).toString(),
    password: CryptoJS.AES.encrypt(entry.password, key).toString(),
  }
  return encryptedEntry
}

const decryptVault = (vault, key) => {
  const vaultPlain = vault.map(entry => {
    return {
      _id: entry._id,
      label: CryptoJS.AES.decrypt(entry.label, key).toString(CryptoJS.enc.Utf8),
      username: CryptoJS.AES.decrypt(entry.username, key).toString(
        CryptoJS.enc.Utf8
      ),
      password: CryptoJS.AES.decrypt(entry.password, key).toString(
        CryptoJS.enc.Utf8
      ),
    }
  })
  return vaultPlain
}

export default {
  encryptEntry,
  decryptVault,
}
