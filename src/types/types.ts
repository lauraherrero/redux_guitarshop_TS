import { Dispatch } from "react"
import { CartActions } from "../reducers/cart-reducer"

export type Guitar = {
  id: number
  name: string
  image: string
  description: string
  price: number
}

export type CartItem = Guitar & {
  quantity: number
}

export type GuitarProps = {
  guitar: Guitar, 
  dispatch: Dispatch<CartActions>
}

export type HeaderProps = {
  cart: CartItem[],
  dispatch: Dispatch<CartActions>
}