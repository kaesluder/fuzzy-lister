import { useState, useEffect } from 'react'

function Versions() {
  const [versions] = useState(window.electron.process.versions)

  const [jsTest, setJSTest] = useState('')

  useEffect(() => {
    window.api.runGlob('file.*er').then((response) => setJSTest(JSON.stringify(response)))
  }, [])
  return (
    <div>
      <ul className="versions">
        <li className="electron-version">Electron v{versions.electron}</li>
        <li className="chrome-version">Chromium v{versions.chrome}</li>
        <li className="node-version">Node v{versions.node}</li>
        <li className="v8-version">V8 v{versions.v8}</li>
      </ul>

      <pre>{jsTest ?? ''}</pre>
    </div>
  )
}

export default Versions
