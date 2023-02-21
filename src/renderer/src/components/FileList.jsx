const FileListItem = function (props) {
  return <li>{props.entry.path}</li>
}

const FileList = function (props) {
  const renderedList = props.entryList.map((entry) => {
    return <FileListItem key={entry.path} entry={entry}></FileListItem>
  })

  return <ol>{renderedList}</ol>
}

export default FileList
