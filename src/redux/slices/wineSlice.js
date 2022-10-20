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

export const fetchOneWine = createAsyncThunk(
  'wine/fetchOneWineStatus',
  async (params) => {
    const { id } = params
    const data = await WineAPI.getOneWine(id)
    return data
  }
)

const initialState = {
  wine: [],
  wineStatus: 'loading', // loading | success | error

  selectWine: {},
  selectWineStatus: 'loading' // loading | success | error
}

export const wineSlice = createSlice({
  name: 'wine',
  initialState,
  reducers: {
    // setWine(state, action) {
    //   state.wine = action.payload
    // }
  },
  extraReducers: {
    [fetchAllWine.pending]: (state) => {
      state.wine = []
      state.wineStatus = 'loading'
    },
    [fetchAllWine.fulfilled]: (state, action) => {
      state.wine = action.payload
      state.wineStatus = 'success'
    },
    [fetchAllWine.rejected]: (state) => {
      state.wine = []
      state.wineStatus = 'error'
    },

    [fetchOneWine.pending]: (state) => {
      state.selectWine = {}
      state.selectWineStatus = 'loading'
    },
    [fetchOneWine.fulfilled]: (state, action) => {
      state.selectWine = action.payload
      state.selectWineStatus = 'success'
    },
    [fetchOneWine.rejected]: (state) => {
      state.selectWine = {}
      state.selectWineStatus = 'error'
    }
  }
})

export const wineSelector = state => state.wine

// export const { setWine } = wineSlice.actions

export default wineSlice.reducer