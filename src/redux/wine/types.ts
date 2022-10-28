import { SortType } from '../filter/types'

export type WineItem = {
  id: string
  imageUrl: string
  title: string
  category: string
  bottleSizes: number[]
  bottleTypes: string[]
  price: number
  rating: number
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

export interface WineSliceState {
  wine: WineItem[]
  wineStatus: Status
  selectWine: WineItem
  selectWineStatus: Status
  countWineItem: number
}

export type fetchAllWineParams = {
  category: string
  sortBy: SortType
  search: string
  currentPage: number
  limitWineFeching?: number
}
