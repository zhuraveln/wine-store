import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import WineAPI from '../../API/WineAPI';
import { RootState } from '../store';
import { SortType } from './filterSlice';

export type fetchAllWineParams = {
  category: string;
  sortBy: SortType;
  search: string;
};

export const fetchAllWine = createAsyncThunk(
  'wine/fetchAllWineStatus',
  async (params: fetchAllWineParams) => {
    const { category, sortBy, search } = params;

    const data = await WineAPI.getAllWine(category, sortBy, search);
    return data;
  },
);

export const fetchOneWine = createAsyncThunk(
  'wine/fetchOneWineStatus',
  async (params: Record<string, string>) => {
    const { id } = params;
    const data = await WineAPI.getOneWine(id);
    return data;
  },
);

export type WineItem = {
  id: string;
  imageUrl: string;
  title: string;
  category: string;
  bottleSizes: number[];
  bottleTypes: string[];
  price: number;
  rating: number;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface WineSliceState {
  wine: WineItem[];
  wineStatus: Status;
  selectWine: WineItem;
  selectWineStatus: Status;
}

const initialState: WineSliceState = {
  wine: [] as WineItem[],
  wineStatus: Status.LOADING,

  selectWine: {} as WineItem,
  selectWineStatus: Status.LOADING,
};

export const wineSlice = createSlice({
  name: 'wine',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // For all wine
    builder.addCase(fetchAllWine.pending, (state) => {
      state.wine = [];
      state.wineStatus = Status.LOADING;
    });
    builder.addCase(fetchAllWine.fulfilled, (state, action) => {
      state.wine = action.payload;
      state.wineStatus = Status.SUCCESS;
    });
    builder.addCase(fetchAllWine.rejected, (state) => {
      state.wine = [];
      state.wineStatus = Status.ERROR;
    });

    // For one wine
    builder.addCase(fetchOneWine.pending, (state) => {
      state.selectWine = {} as WineItem;
      state.selectWineStatus = Status.LOADING;
    });
    builder.addCase(fetchOneWine.fulfilled, (state, action) => {
      state.selectWine = action.payload;
      state.selectWineStatus = Status.SUCCESS;
    });
    builder.addCase(fetchOneWine.rejected, (state) => {
      state.selectWine = {} as WineItem;
      state.selectWineStatus = Status.ERROR;
    });
  },
});

export const wineSelector = (state: RootState) => state.wine;

export default wineSlice.reducer;
