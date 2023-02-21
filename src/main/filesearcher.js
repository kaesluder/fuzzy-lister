import util from 'node:util'
import * as fsWalk from '@nodelib/fs.walk'

const ignoreDirs = [/[.]git[/]/, /[/]node_modules[/]/]

const ignore = function (entry, ignoreDirs) {
  for (let i in ignoreDirs) {
    let dr = new RegExp(ignoreDirs[i])
    if (dr.test(entry.path)) {
      return true
    }
  }
  return false
}

const runGlob = function (searchStr, path, ignoreDirs) {
  // todo ramda might make this easier
  const searchThis = (entry) => {
    if (ignore(entry, ignoreDirs)) {
      return false
    } else {
      return true
    }
  }
  const searchReg = new RegExp(searchStr)

  // Transform a function that uses a callback into one that returns a promise.
  const walk = util.promisify(fsWalk.walk)
  return walk(path ?? '.', { deepFilter: searchThis }).then((response) =>
    response.filter((entry) => searchReg.test(entry.path))
  )
}

export { runGlob, ignore }
