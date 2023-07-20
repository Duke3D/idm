import { appWindow } from '@tauri-apps/api/window'
import { getVersion } from '@tauri-apps/api/app'
const ver = await getVersion()

export const updateTitle = () => {
  const title = ['idm '+ver]
  if(filename.length > 0) title.unshift(filename+(unsavedIndicator?'*':''))
  appWindow.setTitle(title.join(' - '))
}

let filename = ''
export const setFilename = async (file) => {
  filename = file
  updateTitle()
}

let unsavedIndicator = false
export const setUnsavedIndicator = async (unsaved) => {
  unsavedIndicator = unsaved
  updateTitle()
}
