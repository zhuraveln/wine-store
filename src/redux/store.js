import { configureStore } from '@reduxjs/toolkit'
import filterSearch from './slices/filterSearchSlice'

export const store = configureStore({
  reducer: {
    filterSearch
  },
})
