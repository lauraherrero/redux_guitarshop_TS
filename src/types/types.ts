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
  addToCart: (item: Guitar) => void
}

export type HeaderProps = {
  cart: CartItem[],
  removeFromCart: (id: Guitar['id']) => void
  increaseQuantity: (id: Guitar['id']) => void,
  decreaseQuantity: (id: Guitar['id']) => void,
  clearCart: () => void,
  isEmpty: boolean,
  cartTotal: number
}