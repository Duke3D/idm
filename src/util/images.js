import { readDir } from '@tauri-apps/api/fs'
import * as tagFun from './tags'

// scan dataset.inputFolders for images
const filetypes = ['jpg', 'jpeg', 'png']

const isFileTypeAllowed = (name) => filetypes.indexOf(name.split('.').pop().toLowerCase()) >= 0

const addOrReturn = (path, dataset) => {
  const index =   dataset.images.findIndex(i => i.path === path)
  if(index < 0) {
    const img = {
      path
    }
    dataset.images.push(img)
    return img
  } else {
    // note that we've seen the image
    return dataset.images[index]
  }
}

const flatten = (flattened, files) => {
  for(let i = 0; i < files.length; i++) {
    const file = files[i]
    flattened.push(file)
    if(file.children) flatten(flattened, file.children)
  }
  return flattened
}

export const rescanImageFolders = async (dataset) => {

  // we store which images we've found
  const seen = new Set()

  // scan all folders for images
  const folders = dataset.inputFolders
  for(let i = 0; i < folders.length; i++) {
    const folder = folders[i]
    const files = await readDir(folder, { recursive: true })
    // each returned file can have a children array which contains more files
    // flatten files array
    const flattened = flatten([], files)
    for(let j = 0; j < flattened.length; j++) {
      const file = flattened[j]

      // ensure only files with allowed filetypes are added
      if(!isFileTypeAllowed(file.name)) continue
      const img = addOrReturn(file.path, dataset)
      // add to seen
      seen.add(img)
    }
  }

  // remove all unseen images
  dataset.images = dataset.images.filter(i => seen.has(i))

  // conform all image shapes
  dataset.images.forEach(i => {
    i.tags = i.tags || []
    if(i.custom === undefined) i.custom = ''
    if(i.export === undefined) i.export = true

    // sanitize tags, ensure they are all unique, integers and found in dataset.tags
    i.tags = i.tags.map(t => parseInt(t)).filter(t => !isNaN(t) && tagFun.resolveTagId(dataset, t))
  })

}

export const getImageDescription = (dataset, image) => {
  // take dataset.description, which is constructed like "some description {tag1} more description {tag2}"
  // use regex replace to look up every tag group in the string, defined by curly braces
  let result = dataset.descriptionString.replace(/{([^}]+)}/g, (match, name) => {

    name = name.toLowerCase()

    // exception for custom tag
    if(name === 'custom') return image.custom

    const tagGroup = dataset.tagGroups.find(g => g.name.toLowerCase() === name)
    if (!tagGroup) return 'ERROR'
    // figure out which tags from this group the image has in its .tags array
    const tags = image.tags.filter(t => tagGroup.tags.indexOf(t) >= 0)
    // if there are no tags, return an empty string
    if (tags.length === 0) return ''
    // if there are multiple tags, return them with spaces
    return tagGroup.prefix + tags.map(t => tagFun.resolveTagId(dataset, t).name).join(tagGroup.join) + tagGroup.suffix
  })

  // remove any double spaces
  result = result.replace(/\s\s+/g, ' ')

  return result
}