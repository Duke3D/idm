export const parseTags = (tagString) => {
  return tagString.split(/[,;\s]+/).filter(t => t.length > 0)
}