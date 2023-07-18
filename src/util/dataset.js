import { open, save as savedialog } from '@tauri-apps/api/dialog'
import { writeTextFile, readTextFile } from '@tauri-apps/api/fs'
import { recentDatasets } from '../util/settings.js'
import { rescanImageFolders } from './images.js'

export const conform = (input) => {

  // function creates default dataset info and merges it with input if provided
  const result = {
    name                   : '',
    images                 : [],
    inputFolders           : [],
    tagGroups              : [],
    tags                   : [],
    descriptionString      : '{custom}',
    exportResize           : false,
    exportWidth            : 512,
    exportHeight           : 512,
    exportCrop             : false,
    exportCropWidth        : 512,
    exportCropHeight       : 512,
    exportPath             : '',
    exportClear            : false,
    exportFlattenAlpha     : false,
    exportReplaceAlpha     : false,
    exportReplaceAlphaColor: [0, 0, 0],
    ...(input !== undefined ? input : {})
  }

  // validate groups
  result.tagGroups.forEach(g => {
    if (g.join === undefined) g.join = ' '
    if (g.prefix === undefined) g.prefix = ''
    if (g.suffix === undefined) g.suffix = ''
  })

  // ensure every integer in exportReplaceAlphaColor is between 0 and 255
  // and also a valid integer
  const rep = result.exportReplaceAlphaColor
  rep[0] = Math.max(0, Math.min(255, parseInt(rep[0])))
  rep[1] = Math.max(0, Math.min(255, parseInt(rep[1])))
  rep[2] = Math.max(0, Math.min(255, parseInt(rep[2])))

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

