import { createSlice } from '@reduxjs/toolkit';
import { fetchAllWine, fetchOneWine } from './asyncActions';
import { Status, WineItem, WineSliceState } from './types';

const initialState: WineSliceState = {
  wine: [] as WineItem[],
  wineStatus: Status.LOADING,

  selectWine: {} as WineItem,
  selectWineStatus: Status.LOADING,
};

export const wineSlice = createSlice({
  name: 'wine',
  initialState,
  reducers: {
    removeAllWine(state) {
      state.wine = [];
    },
  },
  extraReducers: (builder) => {
    // For all wine
    builder.addCase(fetchAllWine.pending, (state) => {
      state.wineStatus = Status.LOADING;
    });
    builder.addCase(fetchAllWine.fulfilled, (state, action) => {
      state.wine = [...state.wine, ...action.payload];

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

export const { removeAllWine } = wineSlice.actions;

export default wineSlice.reducer;
