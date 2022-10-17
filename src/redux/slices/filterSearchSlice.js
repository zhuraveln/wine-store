import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categories: ['Все', 'Красное', 'Белое', 'Чача'],
  selectCategory: 'Все',

  sortTypes: [
    { name: 'популярности (DESC)', sortProperty: '-rating' },
    { name: 'популярности (ASC)', sortProperty: 'rating' },
    { name: 'цене (DESC)', sortProperty: '-price' },
    { name: 'цене (ASC)', sortProperty: 'price' },
  ],
  selectSort: { name: 'популярности', sortProperty: '-rating' },

  searchValue: '',
}

export const filterSlice = createSlice({
  name: 'filterSearch',
  initialState,
  reducers: {
    setCategory(state, action) {
      state.selectCategory = action.payload
    },
    setSort(state, action) {
      state.selectSort = action.payload
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload
    },
    setFilters(state, action) {
      state.selectCategory = action.payload.category
      state.selectSort = action.payload.sortBy
      state.searchValue = action.payload.search
    }
  },
})

export const { setCategory, setSort, setSearchValue, setFilters } = filterSlice.actions

export default filterSlice.reducer