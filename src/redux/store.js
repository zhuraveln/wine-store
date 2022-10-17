import { configureStore } from '@reduxjs/toolkit'
import filterSearch from './slices/filterSearchSlice'
import cart from './slices/cartSlice'

export const store = configureStore({
  reducer: {
    filterSearch,
    cart
  },
})
