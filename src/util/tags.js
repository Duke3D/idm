
export const toggleTagIdOnImage = (image, id) => {
  const ind = image.tags.indexOf(id)
  if (ind < 0) {
    image.tags.push(id)
  } else {
    image.tags.splice(ind, 1)
  }
  return image
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

export const resolveTagName = (dataset, name) => {
  return dataset.tags.find(t => t.name === name)
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