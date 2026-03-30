import type { PaginatedParams } from '#shared/types/api.types'

export interface IBookCategory {
  label: string
  key: string
  image: string
}

export interface OpenLibrarySearchParams extends PaginatedParams {
  q?: string
  title?: string
  author?: string
  subject?: string
  fields?: string
  sort?: string
  lang?: string
  limit?: number
  offset?: number
}

export interface OpenLibrarySearchBook {
  key: string
  title: string
  cover_i?: number
  author_name?: string[]
  author_key?: string[]
  first_publish_year?: number
  edition_count?: number
  subject?: string[]
}

export interface OpenLibrarySearchResponse {
  start: number
  num_found: number
  docs: OpenLibrarySearchBook[]
}

export interface OpenLibraryTextValue {
  type?: string
  value: string
}

export interface OpenLibraryAuthorReference {
  author: {
    key: string
  }
  type?: {
    key: string
  }
}

export interface OpenLibraryBookDetail {
  key: string
  title: string
  description?: string | OpenLibraryTextValue
  covers?: number[]
  subjects?: string[]
  authors?: OpenLibraryAuthorReference[]
  created?: OpenLibraryTextValue
  last_modified?: OpenLibraryTextValue
}
