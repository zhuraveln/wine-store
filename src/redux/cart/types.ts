import { Status } from '../wine/types'

export type CartItem = {
  id: string
  imageUrl: string
  title: string
  bottleType: string
  bottleSize: number
  price: number
  count: number
}

export interface CartSliceState {
  items: CartItem[]
  totalPrice: number
  uploadStatus: Status
}

export type UploadCartParams = {
  cart: string
  items: CartItem[]
  totalPrice: number
}

export type UploadCartItemParams = {
  cart: string
  item: CartItem
}
