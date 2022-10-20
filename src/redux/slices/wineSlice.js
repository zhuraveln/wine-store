import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import WineAPI from '../../API/WineAPI';

export const fetchAllWine = createAsyncThunk(
  'wine/fetchAllWineStatus',
  async (params) => {
    const { category, sort, searchValue } = params
    const data = await WineAPI.getAllWine(category, sort, searchValue)
    return data
  }
)

const initialState = {
  wine: [],
  wineStatus: 'loading' // loading | success | error
}

export const wineSlice = createSlice({
  name: 'wine',
  initialState,
  reducers: {
    setWine(state, action) {
      state.wine = action.payload
    }
  },
  extraReducers: {
    [fetchAllWine.pending]: (state) => {
      state.wineStatus = 'loading'
      state.wine = []
    },
    [fetchAllWine.fulfilled]: (state, action) => {
      state.wine = action.payload
      state.wineStatus = 'success'
    },
    [fetchAllWine.rejected]: (state) => {
      state.wineStatus = 'error'
      state.wine = []
    }
  }
})

export const wineSelector = state => state.wine

export const { setWine } = wineSlice.actions

export default wineSlice.reducer