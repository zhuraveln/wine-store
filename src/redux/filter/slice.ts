import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  categories,
  filterSliceState,
  SortPropertyEnum,
  SortType
} from './types'

export const initialState: filterSliceState = {
  category: categories[0],
  // sortBy: sortTypes[0],
  sortBy: {
    name: 'популярные',
    sortProperty: SortPropertyEnum.RATING_DESCENDING
  },
  search: '',
  currentPage: 1,
  fetchLimit: 1,
  limitWineFeching: 8
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<string>) {
      state.category = action.payload
      state.currentPage = 1
    },
    setSort(state, action: PayloadAction<SortType>) {
      state.sortBy = action.payload
      state.currentPage = 1
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload
      state.currentPage = 1
    },
    setFilters(state, action: PayloadAction<filterSliceState>) {
      state.category = action.payload.category
      state.sortBy = action.payload.sortBy
      state.search = action.payload.search
      state.currentPage = 1
    },
    setNextPage(state) {
      state.currentPage = state.currentPage + 1
    },
    setFetchLimit(state, action: PayloadAction<number>) {
      state.fetchLimit = action.payload
    }
  }
})

export const {
  setCategory,
  setSort,
  setSearch,
  setFilters,
  setNextPage,
  setFetchLimit
} = filterSlice.actions

export default filterSlice.reducer
