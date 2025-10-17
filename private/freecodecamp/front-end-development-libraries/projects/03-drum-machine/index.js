import React, {
  StrictMode,
  memo,
  forwardRef,
  useRef,
  useState,
  useCallback,
  useEffect,
} from 'https://cdn.skypack.dev/react@17.0.1'
import ReactDOM from 'https://cdn.skypack.dev/react-dom@17.0.1'

const DRUMS = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3',
  },
]

const Box = memo(({ id, url, keyCode, keyTrigger, active }) => {
  return (
    <div
      id={id}
      data-audio-id={keyTrigger}
      data-active={active}
      className='drum-pad'
    >
      {keyTrigger}
      <audio
        id={keyTrigger}
        className='clip'
        src={url}
        data-audio-code={keyCode}
        data-audio-name={id}
      />
    </div>
  )
})

function App() {
  const [active, setActive] = useState('')
  const playDrum = useCallback((e) => {
    let audio = null
    const audioCode = e.keyCode
    const { audioId } = e.target.dataset
    if (audioId) {
      audio = document.getElementById(audioId)
    } else if (audioCode) {
      audio = document.querySelector(`audio[data-audio-code="${audioCode}"]`)
    }
    if (!audio) {
      return
    }
    audio.currentTime = 0
    audio.play()
    setActive(audio.dataset.audioName)
  }, [])
  useEffect(() => {
    document.addEventListener('keydown', playDrum)
    return () => {
      document.removeEventListener('keydown', playDrum)
    }
  }, [])

  return (
    <div id='drum-machine' onClick={playDrum}>
      <div id='display'>{active}</div>
      {DRUMS.map(({ id, url, keyCode, keyTrigger }) => (
        <Box
          key={id}
          id={id}
          url={url}
          keyCode={keyCode}
          keyTrigger={keyTrigger}
          active={active === id}
        />
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
