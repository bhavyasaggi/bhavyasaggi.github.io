import React, {
  StrictMode,
  memo,
  useReducer,
} from 'https://cdn.skypack.dev/react@17.0.1'
import ReactDOM from 'https://cdn.skypack.dev/react-dom@17.0.1'

const BUTTONS = [
  {
    id: 'clear',
    value: 'AC',
  },
  {
    id: 'equals',
    value: '=',
  },
  {
    id: 'seven',
    value: '7',
  },
  {
    id: 'eight',
    value: '8',
  },
  {
    id: 'nine',
    value: '9',
  },
  {
    id: 'divide',
    value: '/',
  },
  {
    id: 'four',
    value: '4',
  },
  {
    id: 'five',
    value: '5',
  },
  {
    id: 'six',
    value: '6',
  },
  {
    id: 'multiply',
    value: '*',
  },
  {
    id: 'one',
    value: '1',
  },
  {
    id: 'two',
    value: '2',
  },
  {
    id: 'three',
    value: '3',
  },
  {
    id: 'subtract',
    value: '-',
  },
  {
    id: 'zero',
    value: '0',
  },
  {
    id: 'decimal',
    value: '.',
  },
  {
    id: 'add',
    value: '+',
  },
]

const dataReducer = (prevData, e) => {
  const { key } = e.target.dataset
  if (key === undefined) {
    return prevData
  }
  let nextData = String(prevData)
  switch (key) {
    case '-':
      nextData =
        String(nextData).slice(-1) === '-' ? nextData : `${nextData}${key}`
      break
    case '*':
    case '/':
    case '+':
      nextData = `${String(nextData).replace(/[\/\*\+\-]+$/, '')}${key}`
      break
    case 'ac':
      nextData = 0
      break
    case '=':
      try {
        nextData = String(parseFloat(eval(nextData)).toFixed(4)).replace(
          /(\.*?)(0+)$/,
          (rem, p1, p2) => {
            if (p1.length <= 1) {
              return ''
            }
            return p1
          }
        )
      } catch (e) {
        console.error(e)
      }
      break
    case '.':
      nextData = String(nextData).match(/\d\.(\d*)$/)
        ? nextData
        : `${nextData}${key}`
      break
    default:
      nextData = String(nextData).match(/^0+$/) ? key : `${nextData}${key}`
      break
  }
  return nextData
}

const Button = memo(({ id, value }) => {
  return (
    <button id={id} className='btn' data-key={String(value).toLowerCase()}>
      {value}
    </button>
  )
})

function App() {
  const [data, updateData] = useReducer(dataReducer, '0')
  return (
    <div id='calculator' onClick={updateData}>
      <div id='display'>{data}</div>
      {BUTTONS.map(({ id, value }) => (
        <Button key={id} id={id} value={value} />
      ))}
    </div>
  )
}

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('app-root')
)
