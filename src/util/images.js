import { readDir } from '@tauri-apps/api/fs'

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
  dataset.images = dataset.images.filter(i => {
    const wasSeen = seen.has(i)
    if(!wasSeen) console.log('removing unseen image: '+i.path)
    return wasSeen
  })

}