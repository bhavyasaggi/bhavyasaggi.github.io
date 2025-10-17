function palindrome(str) {
  const strAlphaNum = str.replace(/[^0-9a-zA-Z]/g, '').toLowerCase()
  const strAlphaNumReverse = strAlphaNum.split('').reverse().join('')

  return strAlphaNum === strAlphaNumReverse
}

palindrome('eye')
