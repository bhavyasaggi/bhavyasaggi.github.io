function checkCashRegister(price, cash, cid) {
  const toDecimal = (v) => Number(v.toFixed(2))
  const costMap = {
    PENNY: 0.01,
    NICKEL: 0.05,
    DIME: 0.1,
    QUARTER: 0.25,
    ONE: 1,
    FIVE: 5,
    TEN: 10,
    TWENTY: 20,
    'ONE HUNDRED': 100,
  }
  const costOrder = [
    'PENNY',
    'NICKEL',
    'DIME',
    'QUARTER',
    'ONE',
    'FIVE',
    'TEN',
    'TWENTY',
    'ONE HUNDRED',
  ]
  const resFail = { status: 'INSUFFICIENT_FUNDS', change: [] }
  const resClosed = { status: 'CLOSED', change: cid }
  const resOpen = { status: 'OPEN', change: [] }

  let changeDue = toDecimal(cash - price)

  const cidCheck = structuredClone(cid)
    .sort(([key1], [key2]) => costMap[key2] - costMap[key1])
    .map(([cidKey, cidValue]) => {
      const cashValue = costMap[cidKey]
      let cashReturnKey = cidKey
      let cashReturnValue = 0
      while (cidValue > 0 && changeDue >= cashValue) {
        changeDue = toDecimal(changeDue - cashValue)
        cidValue = toDecimal(cidValue - cashValue)
        cashReturnValue = toDecimal(cashReturnValue + cashValue)
      }
      if (cashReturnValue) {
        resOpen.change.push([cashReturnKey, cashReturnValue])
      }
      return [cidKey, cidValue]
    })
    .filter(([cidKey, cidValue]) => cidValue > 0)

  if (changeDue) {
    return resFail
  }
  if (!cidCheck.length) {
    return resClosed
  }
  return resOpen
}

checkCashRegister(19.5, 20, [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100],
])
