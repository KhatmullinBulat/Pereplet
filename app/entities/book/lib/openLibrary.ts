import type { OpenLibraryBookDetail } from '#entities/book/types/books.types'

export type OpenLibraryCoverSize = 'S' | 'M' | 'L'

export function normalizeOpenLibraryWorkId(key: string) {
  return key
    .replace('/works/', '')
    .replace('.json', '')
    .trim()
}

export function getOpenLibraryCoverUrl(
  coverId?: number | null,
  size: OpenLibraryCoverSize = 'M',
) {
  if (!coverId) {
    return null
  }

  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`
}

export function getOpenLibraryDescription(
  description?: OpenLibraryBookDetail['description'],
) {
  if (!description) {
    return null
  }

  return typeof description === 'string' ? description : description.value
}
