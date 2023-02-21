import Versions from './components/Versions'
import FileList from './components/FileList'
import EntryForm from './components/EntryForm'
import icons from './assets/icons.svg'
import { useState, useEffect } from 'react'

const DEFAULT_DIR = window.api.HOME + '/Developer'

function App() {
  // state for storing the list of file objects
  const [fileObjects, setFileObjects] = useState([])
  const ignoreDirs = [
    /\.git$/,
    /[/]node_modules$/,
    /[/]venv$/,
    /[/][.]vscode$/,
    /cache$/,
    /__pycache__$/,
    /clj-static$/,
    /out$/,
    /build$/,
    /dist$/,
    /[.]webpack$/,
    /uberjar$/,
    /src-tauri$/,
    /coverage$/,
    /htmlcov$/
  ]

  useEffect(() => {
    window.api.runGlob('', DEFAULT_DIR, ignoreDirs).then((response) => setFileObjects(response))
  }, [])

  const handleSearch = function (searchStr) {
    console.log(searchStr)
    window.api
      .runGlob(searchStr, DEFAULT_DIR, ignoreDirs)
      .then((response) => setFileObjects(response))
  }

  return (
    <div className="container">
      <EntryForm handleSearch={handleSearch}></EntryForm>
      <FileList entryList={fileObjects}></FileList>
    </div>
  )
}

export default App
