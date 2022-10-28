import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CartItem, CartSliceState } from '../cart/types'

export const initialState: CartSliceState = {
  items: [],
  totalPrice: 0
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    //Add Item to Cart
    addItem(state, action: PayloadAction<CartItem>) {
      const { id, bottleType, bottleSize, price } = action.payload

      const findItem = state.items.find(
        item =>
          item.id === id &&
          item.bottleType === bottleType &&
          item.bottleSize === bottleSize
      )

      const bottlePrice = bottleType === 'Стеклянная бутылка' ? 250 : 0

      if (findItem) {
        findItem.count++
      } else {
        state.items.push({
          ...action.payload,
          price: Math.round(price * bottleSize) + bottlePrice,
          count: 1
        })
      }

      state.totalPrice = state.items.reduce(
        (sum, item) => item.price * item.count + sum,
        0
      )
    },
    //Remove Item in Cart
    removeItem(state, action: PayloadAction<CartItem>) {
      const { id, bottleType, bottleSize } = action.payload

      const findItem = state.items.find(
        item =>
          item.id === id &&
          item.bottleType === bottleType &&
          item.bottleSize === bottleSize
      )

      if (findItem) {
        findItem.count--
        state.totalPrice -= findItem.price
      }
    },
    //Remove All select Item in Cart
    removeAllItems(state, action: PayloadAction<CartItem>) {
      const { id, bottleType, bottleSize, price, count } = action.payload

      const findItem = state.items.find(
        item =>
          item.id === id &&
          item.bottleType === bottleType &&
          item.bottleSize === bottleSize
      )

      state.items = state.items.filter(item => item !== findItem)

      state.totalPrice -= count * price
    },
    //Clear All Cart
    clearCart(state) {
      state.items = []
      state.totalPrice = 0
    }
  }
})

export const { addItem, removeItem, removeAllItems, clearCart } =
  cartSlice.actions

export default cartSlice.reducer
