import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum SortPropertyEnum {
  RATING_DESCENDING = 'rating',
  RATING_ASCENDING = '-rating',
  PRICE_DESCENDING = 'price',
  PRICE_ASCENDING = '-price',
}

export type SortType = {
  name: string;
  sortProperty: SortPropertyEnum;
};

export const sortTypes: SortType[] = [
  { name: 'популярности (DESC)', sortProperty: SortPropertyEnum.RATING_DESCENDING },
  { name: 'популярности (ASC)', sortProperty: SortPropertyEnum.RATING_ASCENDING },
  { name: 'цене (DESC)', sortProperty: SortPropertyEnum.PRICE_DESCENDING },
  { name: 'цене (ASC)', sortProperty: SortPropertyEnum.PRICE_ASCENDING },
];

export const categories: string[] = ['Все', 'Красное', 'Белое', 'Чача'];

export interface filterSliceState {
  category: string;
  sortBy: SortType;
  search: string;
}

const initialState: filterSliceState = {
  category: 'Все',
  sortBy: { name: 'популярности', sortProperty: SortPropertyEnum.RATING_DESCENDING },
  search: '',
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
  },
});

export const filterSelector = (state: RootState) => state.filter;

export const { setCategory, setSort, setSearch, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
