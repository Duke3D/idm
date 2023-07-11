import { open, save as savedialog } from '@tauri-apps/api/dialog'
import { writeTextFile, readTextFile } from '@tauri-apps/api/fs'
import { recentDatasets } from '../util/settings.js'

export const conform = (input) => {

  // function creates default dataset info and merges it with input if provided
  const result = {
    name        : '',
    images      : [],
    inputFolders: [],
    ...( input !== undefined ? input : {} )
  }
  console.log(result)
  return result
}

export const load = async (path) => {
  // select file, load it
  if(!path)
    path = await open({
      filters: [{
        name      : 'Dataset',
        extensions: ['json']
      }]
    })
  if(path) {
    const data = await readTextFile(path)
    addToRecent(path)
    return { path, dataset: conform(JSON.parse(data)) }
  } else {
    return { }
  }
}

export const create = async (path) => {
  path = await savedialog({
    filters: [{
      name      : 'Dataset',
      extensions: ['json']
    }]
  })
  if(path) {
    addToRecent(path)
    return { path, dataset: conform() }
  } else {
    return { }
  }
}

export const save = async (path, data) => {
  writeTextFile({path, contents: JSON.stringify(data)})
  addToRecent(path)
}

const addToRecent = (r) => {
  if(r)
    recentDatasets.update( v => {
      if(v.indexOf(r) < 0)
        v.push(r)
      return v
    })
}