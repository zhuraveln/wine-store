import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { filterSliceState, initialState, SortType } from './types';

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
  },
});

export const { setCategory, setSort, setSearch, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
