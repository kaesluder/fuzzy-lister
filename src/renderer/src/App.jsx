import Versions from './components/Versions'
import FileList from './components/FileList'
import EntryForm from './components/EntryForm'
import icons from './assets/icons.svg'
import { useState, useEffect } from 'react'

function App() {
  // state for storing the list of file objects
  const [fileObjects, setFileObjects] = useState([])
  const ignoreDirs = [/\.git$/, /[/]node_modules$/, /[/]venv$/, /[/][.]vscode$/]

  useEffect(() => {
    window.api.runGlob('', '.', ignoreDirs).then((response) => setFileObjects(response))
  }, [])

  const handleSearch = function (searchStr) {
    console.log(searchStr)
    window.api.runGlob(searchStr, '.', ignoreDirs).then((response) => setFileObjects(response))
  }

  return (
    <div className="container">
      <EntryForm handleSearch={handleSearch}></EntryForm>
      <FileList entryList={fileObjects}></FileList>
    </div>
  )
}

export default App
