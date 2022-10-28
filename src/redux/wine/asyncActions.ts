import { createAsyncThunk } from '@reduxjs/toolkit'
import WineAPI from '../../API/WineAPI'
import { fetchAllWineParams } from './types'

export const fetchAllWine = createAsyncThunk(
  'wine/fetchAllWineStatus',
  async (params: fetchAllWineParams) => {
    const { category, sortBy, search, currentPage, limitWineFeching } = params

    const data = await WineAPI.getAllWine(
      category,
      sortBy,
      search,
      currentPage,
      limitWineFeching
    )

    return data
  }
)

export const fetchAllWineCalc = createAsyncThunk(
  'wine/fetchAllWineCalcStatus',
  async (params: fetchAllWineParams) => {
    const { category, sortBy, search, currentPage } = params

    const data = await WineAPI.getAllWine(category, sortBy, search, currentPage)

    return data.length
  }
)

export const fetchOneWine = createAsyncThunk(
  'wine/fetchOneWineStatus',
  async (params: Record<string, string>) => {
    const { id } = params
    const data = await WineAPI.getOneWine(id)

    return data
  }
)
