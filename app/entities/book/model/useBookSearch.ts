import type { OpenLibrarySearchBook } from '#entities/book/types/books.types'
import { useBookApi } from '#entities/book'

export function useBookSearch() {
  const bookApi = useBookApi()
  const query = useState<string>('book-search-query', () => '')
  const subject = useState<string | undefined>('book-search-subject', () => undefined)
  const page = useState<number>('book-search-page', () => 1)
  const books = useState<OpenLibrarySearchBook[]>('book-search-books', () => [])
  const total = useState<number>('book-search-total', () => 0)
  const pending = useState<boolean>('book-search-pending', () => false)
  const error = useState<string | null>('book-search-error', () => null)

  async function fetchBooks({ append = false }: { append?: boolean } = {}) {
    if (!query.value && !subject.value) {
      books.value = []
      total.value = 0
      return null
    }

    pending.value = true
    error.value = null

    try {
      const response = await bookApi.getMore({
        q: query.value || undefined,
        subject: subject.value,
        page: page.value,
        limit: 16,
      })

      total.value = response.num_found
      books.value = append
        ? [...books.value, ...response.docs]
        : response.docs

      return response
    }
    catch (err) {
      error.value = err instanceof Error ? err.message : 'Не удалось загрузить книги'
      return null
    }
    finally {
      pending.value = false
    }
  }

  const setSearch = (value: string) => {
    query.value = value.trim()
    page.value = 1
  }

  const setSubject = (value?: string) => {
    subject.value = value?.trim() || undefined
    query.value = ''
    page.value = 1
  }

  const submitSearch = async () => {
    page.value = 1
    return fetchBooks()
  }

  const loadMore = () => {
    page.value++
    return fetchBooks({ append: true })
  }

  const pageDown = () => {
    page.value--
    return fetchBooks()
  }

  const pageUp = () => {
    page.value++
    return fetchBooks()
  }

  const goToPage = (selectedPage: number) => {
    page.value = selectedPage
    return fetchBooks()
  }

  return {
    books,
    page,
    total,
    pending,
    error,
    query,
    subject,
    setSubject,
    setSearch,
    submitSearch,
    fetchBooks,
    loadMore,
    pageDown,
    pageUp,
    goToPage,
  }
}
