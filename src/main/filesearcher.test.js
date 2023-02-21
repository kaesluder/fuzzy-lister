import { describe, it, expect } from 'vitest'
import { runGlob, ignore } from './filesearcher'

describe('testing filesearcher', () => {
  it('globTest', async () => {
    const result = await runGlob('filesearcher.js', '.', ignoreDirs)
    console.log(result)
    expect(result).toHaveLength(1)
  })
  it('globTest fails', async () => {
    const files = await runGlob('asdfasdf', '.', ignoreDirs)
    console.log(files.map((entry) => entry.path))
    expect(files).toHaveLength(0)
  })
  it('globTest handles regex', async () => {
    const files = await runGlob('fi.*searcher.js', '.', ignoreDirs)
    console.log(files.map((entry) => entry.path))
    expect(files).toHaveLength(1)
  })
})

const ignoreDirs = [/[.]git[/]/, /[/]node_modules[/]/, /[/]venv[/]/]

describe('testing ignore', () => {
  it('foo/.git/bar returns true', async () => {
    const result = ignore({ path: 'foo/.git/bar' }, ignoreDirs)
    expect(result).toBeTruthy()
  })
  it('foo/.gitignore returns false', async () => {
    const result = ignore({ path: 'foo/.gitignore' }, ignoreDirs)
    expect(result).toBeFalsy()
  })
  it('foo/node_modules returns true', async () => {
    const result = ignore({ path: 'foo/node_modules/bar' }, ignoreDirs)
    expect(result).toBeTruthy()
  })
  it('foo/node_modules returns true', async () => {
    const result = ignore({ path: 'foonode_modulesbar' }, ignoreDirs)
    expect(result).toBeFalsy()
  })
})
