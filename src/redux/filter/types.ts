export enum SortPropertyEnum {
  RATING_DESCENDING = 'rating',
  // RATING_ASCENDING = '-rating',
  PRICE_DESCENDING = 'price',
  PRICE_ASCENDING = '-price'
}

export type SortType = {
  name: string
  sortProperty: SortPropertyEnum
}

export const sortTypes: SortType[] = [
  { name: 'популярные', sortProperty: SortPropertyEnum.RATING_DESCENDING },
  // { name: 'популярности (ASC)', sortProperty: SortPropertyEnum.RATING_ASCENDING },
  { name: 'дорогие', sortProperty: SortPropertyEnum.PRICE_DESCENDING },
  { name: 'дешевые', sortProperty: SortPropertyEnum.PRICE_ASCENDING }
]

export const categories: string[] = ['Все', 'Красное', 'Белое', 'Чача']

export interface filterSliceState {
  category: string
  sortBy: SortType
  search: string
  currentPage: number
  fetchLimit: number
  limitWineFeching: number
}
