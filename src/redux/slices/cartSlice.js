import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  totalPrice: 0,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find(item => item._id === action.payload._id)

      if (findItem) {
        findItem.count++
      } else {
        state.items.push({
          ...action.payload,
          count: 1
        })
      }

      state.totalPrice = state.items.reduce((sum, item) => item.price * item.count + sum, 0)
    },
    removeItem(state, action) {
      const findItem = state.items.find(item => item._id === action.payload)
      if (findItem.count > 1) {
        findItem.count--
        state.totalPrice -= findItem.price
      }
    },
    removeAllItems(state, action) {
      state.items = state.items.filter(item => item._id !== action.payload._id)
      state.totalPrice -= action.payload.count * action.payload.price
    },
    clearCart(state) {
      state.items = []
      state.totalPrice = 0
    }
  },
})

export const { addItem, removeItem, removeAllItems, clearCart } = cartSlice.actions

export default cartSlice.reducer