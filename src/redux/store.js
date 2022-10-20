import { configureStore } from '@reduxjs/toolkit'
import filterSearch from './slices/filterSearchSlice'
import cart from './slices/cartSlice'
import wine from './slices/wineSlice'

export const store = configureStore({
  reducer: {
    filterSearch,
    cart,
    wine
  },
})
