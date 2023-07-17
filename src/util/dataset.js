import { open, save as savedialog } from '@tauri-apps/api/dialog'
import { writeTextFile, readTextFile } from '@tauri-apps/api/fs'
import { recentDatasets } from '../util/settings.js'
import { rescanImageFolders } from './images.js'

export const conform = (input) => {

  // function creates default dataset info and merges it with input if provided
  const result = {
    name                  : '',
    images                : [],
    inputFolders          : [],
    tagGroups             : [],
    tags                  : [],
    descriptionString     : '',
    exportWidth           : 512,
    exportHeight          : 512,
    exportCropModulo      : false,
    exportCropModuloWidth : 512,
    exportCropModuloHeight: 512,
    exportCropWidth       : 512,
    exportCropHeight      : 512,
    exportPath            : '',
    exportClear           : false,
    ...(input !== undefined ? input : {})
  }

  // validate groups
  result.tagGroups.forEach(g => {
    g.joinString = g.joinString || ' '
  })

  rescanImageFolders(result)

  return result
}

export const load = async (path) => {
  // select file, load it
  if (!path)
    path = await open({
      filters: [{
        name      : 'Dataset',
        extensions: ['json']
      }]
    })
  if (path) {
    const data = await readTextFile(path)
    addToRecentDatasets(path)
    return { path, dataset: conform(JSON.parse(data)) }
  } else {
    return {}
  }
}

export const create = async (path) => {
  path = await savedialog({
    filters: [{
      name      : 'Dataset',
      extensions: ['json']
    }]
  })
  if (path) {
    addToRecentDatasets(path)
    return { path, dataset: conform() }
  } else {
    return {}
  }
}

export const save = async (path, data) => {

  // json.stringify data with formatting of two spaces for indentation
  const contents = JSON.stringify(data, null, 2)
  writeTextFile({ path, contents })
  addToRecentDatasets(path)
}

const addToRecentDatasets = (r) => {
  if (r)
    recentDatasets.update(v => {
      if (v.indexOf(r) < 0)
        v.push(r)
      return v
    })
}

