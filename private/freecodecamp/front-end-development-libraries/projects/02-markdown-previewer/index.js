import React, {
  StrictMode,
  useState,
  useEffect,
  useCallback,
} from 'https://cdn.skypack.dev/react@17.0.1'
import { render } from 'https://cdn.skypack.dev/react-dom@17.0.1'
import { marked } from 'https://cdn.skypack.dev/marked@4.0.18'
import { debounce } from 'https://cdn.skypack.dev/lodash@4.17.21'

marked.setOptions({
  breaks: true,
})

const placeholder = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`

const debouncedMarkedFn = debounce((string, cb) => cb(marked(string)), 300)

const markedFn = (string, cb) => cb(marked(string))

function Preview({ htmlString }) {
  return (
    <div
      id='preview'
      dangerouslySetInnerHTML={{
        __html: marked.parse(htmlString),
      }}
    />
  )
}

function Editor({ onChange }) {
  return (
    <textarea
      id='editor'
      onChange={onChange}
      type='text'
      defaultValue={placeholder}
    />
  )
}

function App() {
  const [htmlString, setHtmlString] = useState('')
  const onChange = useCallback((e) => {
    markedFn(e.target.value, setHtmlString)
  }, [])
  useEffect(() => {
    markedFn(placeholder, setHtmlString)
  }, [])
  return (
    <div id='container'>
      <Editor onChange={onChange} />
      <Preview htmlString={htmlString} />
    </div>
  )
}

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('app-root')
)
