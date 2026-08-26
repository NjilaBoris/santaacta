export function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
}

export function uniqueSlug(title: string) {
  return `${slugify(title)}-${Math.random().toString(36).slice(2, 7)}`
}