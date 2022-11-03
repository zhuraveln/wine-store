import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CartItem, CartSliceState } from '../cart/types'
import { Status } from '../wine/types'
import { getCart, uploadCart, uploadCartItem } from './asyncActions'

export const initialState: CartSliceState = {
  items: [],
  totalPrice: 0,
  uploadStatus: Status.SUCCESS
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

      if (findItem) {
        findItem.count++
      } else {
        state.items.push(action.payload)
      }
      state.totalPrice += price
    },
    //Remove Item in Cart
    removeOneItem(state, action: PayloadAction<CartItem>) {
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
    //Remove All select Item in Cart // TODO bug with removeAll
    removeAllSelectItems(state, action: PayloadAction<CartItem>) {
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
  },
  extraReducers: builder => {
    // Get Cart
    builder.addCase(getCart.pending, state => {})
    builder.addCase(getCart.fulfilled, (state, action) => {
      state.items = action.payload.items
      state.totalPrice = action.payload.totalPrice
      // state.items = [...state.items, ...action.payload.items]
      // state.totalPrice = state.totalPrice + action.payload.totalPrice
    })
    builder.addCase(getCart.rejected, state => {})

    // Upload Cart
    builder.addCase(uploadCart.pending, state => {
      state.uploadStatus = Status.LOADING
    })
    builder.addCase(uploadCart.fulfilled, (state, action) => {
      state.items = action.payload.items
      state.totalPrice = action.payload.totalPrice
      state.uploadStatus = Status.SUCCESS
    })
    builder.addCase(uploadCart.rejected, state => {
      state.uploadStatus = Status.ERROR
    })

    // Upload Cart Item
    builder.addCase(uploadCartItem.pending, state => {})
    builder.addCase(uploadCartItem.fulfilled, (state, action) => {
      // state.items.push(action.payload.item)
      // state.totalPrice += action.payload.item.price
    })
    builder.addCase(uploadCartItem.rejected, state => {})
  }
})

export const { addItem, removeOneItem, removeAllSelectItems, clearCart } =
  cartSlice.actions

export default cartSlice.reducer
