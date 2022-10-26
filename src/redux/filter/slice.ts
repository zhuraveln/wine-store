import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { categories, filterSliceState, SortPropertyEnum, SortType } from './types';

export const initialState: filterSliceState = {
  category: categories[0],
  // sortBy: sortTypes[0],
  sortBy: { name: 'популярные', sortProperty: SortPropertyEnum.RATING_DESCENDING },
  search: '',
  currentPage: 1,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
    },
    setSort(state, action: PayloadAction<SortType>) {
      state.sortBy = action.payload;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setFilters(state, action: PayloadAction<filterSliceState>) {
      state.category = action.payload.category;
      state.sortBy = action.payload.sortBy;
      state.search = action.payload.search;
    },
    setCurrentPage(state) {
      state.currentPage = state.currentPage + 1;
    },
  },
});

export const { setCategory, setSort, setSearch, setFilters, setCurrentPage } = filterSlice.actions;

export default filterSlice.reducer;
