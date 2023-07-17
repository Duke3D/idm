
export const toggleTagIdOnImage = (image, id) => {
  const ind = image.tags.indexOf(id)
  if (ind < 0) {
    image.tags.push(id)
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
    if (!tagGroup) return 'ERROR'
    // figure out which tags from this group the image has in its .tags array
    const tags = image.tags.filter(t => tagGroup.tags.includes(t))
    // if there are no tags, return an empty string
    if (tags.length === 0) return ''
    // if there is only one tag, return it
    if (tags.length === 1) return tags[0]
    // if there are multiple tags, return them comma separated
    return tags.join(' ')
  })

  // remove any double spaces
  result = result.replace(/\s\s+/g, ' ')

  return result
}

export const removeTagGroup = (group, dataset) => {
  dataset.tagGroups = dataset.tagGroups.filter(g => g !== group)
}

export const createTagGroup = (dataset) => {
  dataset.tagGroups = [...dataset.tagGroups, { name: 'Group', tags: [] }]
}

export const resolveTagId = (dataset, id) => {
  return dataset.tags.find(t => t.id === id)
}

export const getGroupTagData = (group, dataset) => {
  return group.tags.map(id => resolveTagId(dataset, id))
}

export const createTag = (group, dataset) => {
  // get next tag id
  const id = (dataset.tags.length > 0) ? (Math.max(...dataset.tags.map(t => t.id)) + 1) : 0
  const tag = { name: '', id }
  dataset.tags.push(tag)
  group.tags.push(id)
}

export const removeTag = (tag, dataset) => {

  // remove from dataset tags array
  dataset.tags = dataset.tags.filter(t => t !== tag)
  // remove from all groups arrays id referecing it
  dataset.tagGroups.forEach(g => {
    g.tags = g.tags.filter(t => t !== tag.id)
  })

  // remove from all images referencing it
  dataset.images.forEach(i => {
    i.tags = i.tags.filter(t => t !== tag.id)
  })

}