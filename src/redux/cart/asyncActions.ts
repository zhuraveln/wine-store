import { createAsyncThunk } from '@reduxjs/toolkit'
import CartAPI from '../../API/CartAPI'
import { CartItem, UploadCartParams } from './types'

// Get Cart
export const getCart = createAsyncThunk(
  'cart/getCartStatus',
  async (cart: string) => {
    const data = await CartAPI.fetchGetCart(cart)

    return data
  }
)

// Upload Cart
// export const uploadCart = createAsyncThunk(
//   'cart/uploadCartStatus',
//   async (cart: string, items: CartItem[], totalPrice: number) => {
//     const data = await CartAPI.fetchUploadCart(cart, items, totalPrice)

//     return data
//   }
// )
