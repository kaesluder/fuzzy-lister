import { useState } from 'react'

const EntryForm = function (props) {
  const [searchStr, setSearchStr] = useState('')
  const handleChange = function (event) {
    setSearchStr(event.target.value)
  }

  const handleSubmit = function (event) {
    event.preventDefault()
    // pass up feedURL
    props.handleSearch(searchStr)
  }

  return (
    <div>
      <form>
        <input onChange={handleChange} type="text"></input>
        <button onClick={handleSubmit} type="submit">
          submit
        </button>
      </form>
    </div>
  )
}

export default EntryForm
