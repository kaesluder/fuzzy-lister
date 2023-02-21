import util from 'node:util'
import * as fsWalk from '@nodelib/fs.walk'

// https://www.npmjs.com/package/@nodelib/fs.walk

const errorFilter = (error) => error.code === 'EACCES' || 'EPERM'

const ignoreDirs = [/[.]git[/]/, /[/]node_modules[/]/]

/**
 * Filter predicate to determine if a directory should be
 * ignored or not.
 * @param {fsWalk.Entry} entry Entry to match against.
 * @param {Regexp[]} ignoreDirs List of RegExps to match directories to ignore.
 * @returns {Boolean}
 */
const ignore = function (entry, ignoreDirs) {
  for (let i in ignoreDirs) {
    let dr = new RegExp(ignoreDirs[i])
    if (dr.test(entry.path)) {
      return true
    }
  }
  return false
}

/**
 * Run a search query and return a list of matching fsWalk entries.
 * @param {String} searchStr Regexp or string to match against target path.
 * @param {String} path Source path from which to start searching.
 * @param {String[]} ignoreDirs List matching dirs to ignore.
 * @returns
 */
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
  return walk(path ?? '.', { deepFilter: searchThis, errorFilter: errorFilter }).then((response) =>
    response.filter((entry) => searchReg.test(entry.path))
  )
}

export { runGlob, ignore }
