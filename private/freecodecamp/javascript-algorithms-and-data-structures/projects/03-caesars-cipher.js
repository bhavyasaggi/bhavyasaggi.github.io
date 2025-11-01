function rot13(str) {
  return str
    .split('')
    .map((s) => {
      const v = parseInt(s, 36)
      if (Number.isNaN(v)) {
        return s
      }
      return (((v - 10 + 13) % 26) + 10).toString(36)
    })
    .join('')
    .toUpperCase()
}

rot13('SERR PBQR PNZC')
