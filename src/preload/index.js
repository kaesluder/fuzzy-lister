import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { runGlob } from '../main/filesearcher'

const HOME = process.env.HOME

// Custom APIs for renderer
const api = { runGlob: runGlob, HOME: HOME }

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
