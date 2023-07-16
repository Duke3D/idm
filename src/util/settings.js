import { writable } from 'svelte/store'

export const recentDatasets = writable([])
export const gridImgWidth = writable(100)
export const imgDisplayStyle = writable('grid')
export const gridImgFilter = writable('')
export const activeTab = writable('dataset')

export const settings = {
  recentDatasets,
  gridImgWidth,
  gridImgFilter,
  imgDisplayStyle,
  activeTab
}

const registerSetting = (key, store) => {
  // load default
  const stored = localStorage.getItem(key)
  try {
    const val = JSON.parse( (stored == 'undefined') ? null : stored)
    if(val !== null) store.set(val)
  } catch(e) {
    console.log('Error while parsing setting: '+key)
    console.error(e)
  }

  store.subscribe( value => {
    console.log('setting change: '+key, value)
    localStorage.setItem(key, JSON.stringify(value))
  })
}

for(const s in settings) {
  registerSetting(s, settings[s])
}
