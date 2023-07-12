export const parseTags = (tagString) => {
  return tagString.split(/[,;\s]+/).filter(t => t.length > 0)
}

export const toggleTagOnImage = (image, tag) => {
  const ind = image.tags.indexOf(tag)
  if(ind < 0) {
    image.tags.push(tag)
  } else {
    image.tags.splice(ind, 1)
  }
  return image
}