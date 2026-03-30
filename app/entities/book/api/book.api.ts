import type { UseFetchOptions } from '#app'
import type {
  OpenLibraryBookDetail,
  OpenLibrarySearchBook,
  OpenLibrarySearchParams,
  OpenLibrarySearchResponse,
} from '#entities/book/types/books.types'
import { useApiFactory } from '#shared/api/useApiFactory'

function createSearchToken(field: 'title' | 'author' | 'subject', value?: string) {
  const normalizedValue = value?.trim()

  if (!normalizedValue) {
    return null
  }

  return `${field}:"${normalizedValue.replaceAll('"', '\\"')}"`
}

function buildOpenLibrarySearchParams(params: OpenLibrarySearchParams = {}) {
  const {
    q,
    title,
    author,
    subject,
    ...restParams
  } = params

  const searchQuery = [
    q?.trim(),
    createSearchToken('title', title),
    createSearchToken('author', author),
    createSearchToken('subject', subject),
  ]
    .filter(Boolean)
    .join(' ')

  return {
    ...restParams,
    q: searchQuery || undefined,
  }
}

export function useBookApi() {
  const apiBaseURL = useRuntimeConfig().public.baseApiURL

  if (!apiBaseURL) {
    throw new Error('PUBLIC_API_BASE_URL is not configured')
  }

  const api = useApiFactory<
    OpenLibrarySearchBook,
    OpenLibrarySearchParams,
    Record<string, never>,
    OpenLibraryBookDetail,
    OpenLibrarySearchResponse
  >(apiBaseURL, {
    routes: {
      getOne: ({ endpoint, id }) => `${endpoint}/works/${id}.json`,
      getAll: ({ endpoint }) => `${endpoint}/search.json`,
      getMore: ({ endpoint }) => `${endpoint}/search.json`,
    },
  })

  return {
    ...api,

    getAll(config: {
      params?: OpenLibrarySearchParams
      options?: UseFetchOptions<OpenLibrarySearchResponse>
      additional_endpoint?: string
    }) {
      return api.getAll({
        ...config,
        params: buildOpenLibrarySearchParams(config.params),
        additional_endpoint: 'search.json',
      })
    },

    getMore(params?: OpenLibrarySearchParams) {
      return api.getMore(buildOpenLibrarySearchParams(params), 'search.json')
    },

    search(
      params: OpenLibrarySearchParams,
      options?: UseFetchOptions<OpenLibrarySearchResponse>,
    ) {
      return this.getAll({
        params,
        options,
      })
    },

    create(_data: Record<string, never>) {
      return Promise.reject(new Error('Open Library API is read-only'))
    },

    update(_id: number | string, _data: Partial<Record<string, never>>) {
      return Promise.reject(new Error('Open Library API is read-only'))
    },

    remove(_id: number | string) {
      return Promise.reject(new Error('Open Library API is read-only'))
    },
  }
}
