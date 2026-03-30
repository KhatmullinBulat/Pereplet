import type { IBookCategory } from '#entities/book/types/books.types'
import { bookBestsellerImage, bookFantasyImage, bookFictionImage, bookHistoryImage, bookKidImage, bookNewImage, bookRecipesImage, bookRomanceImage, booksListImage } from '#shared/assets/images/categories'

export const BOOK_CATEGORIES: IBookCategory[] = [
  {
    label: 'Все',
    key: 'all',
    image: booksListImage,
  },
  {
    label: 'Новые',
    key: 'new',
    image: bookNewImage,
  },
  {
    label: 'Бестселлер',
    key: 'bestseller',
    image: bookBestsellerImage,
  },
  {
    label: 'Научная ф.',
    key: 'science fiction',
    image: bookFictionImage,
  },
  {
    label: 'Романтика',
    key: 'Романтика',
    image: bookRomanceImage,
  },
  {
    label: 'Фантастика',
    key: 'fantasy',
    image: bookFantasyImage,
  },
  {
    label: 'История',
    key: 'history',
    image: bookHistoryImage,
  },
  {
    label: 'Детские',
    key: 'children',
    image: bookKidImage,
  },
  {
    label: 'Рецепты',
    key: 'recipes',
    image: bookRecipesImage,
  },
]
