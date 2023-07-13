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

export const getImageDescription = (dataset, image) => {
  // take dataset.description, which is constructed like "some description {tag1} more description {tag2}"
  // use regex replace to look up every tag group in the string, defined by curly braces
  let result = dataset.descriptionString.replace(/{([^}]+)}/g, (match, tag) => {
    const tagGroup = dataset.tagGroups.find(tg => tg.name === tag)
    if(!tagGroup) return 'ERROR'
    // figure out which tags from this group the image has in its .tags array
    const tags = image.tags.filter(t => tagGroup.tags.includes(t))
    // if there are no tags, return an empty string
    if(tags.length === 0) return ''
    // if there is only one tag, return it
    if(tags.length === 1) return tags[0]
    // if there are multiple tags, return them comma separated
    return tags.join(' and ')
  })

  // remove any double spaces
  result = result.replace(/\s\s+/g, ' ')

  return result
}