import { db } from "../data/db";
import { CartItem, Guitar } from "../types/types";

export type CartActions =
  {
    type: "ADD_TO_CART";
    payload: { item: Guitar };
  }
| {
    type: "REMOVE_FROM_CART";
    payload: { id: Guitar["id"] };
  }
| {
    type: "DECREASE_QUANTITY";
    payload: { id: Guitar["id"] };
  }
| {
    type: "INCREASE_QUANTITY";
    payload: { id: Guitar["id"] };
  }
| {
    type: "CLEAR_CART";
    //No tiene payload porque se queda vacía la cesta
  };

const localStorageCart = () : CartItem[] => {
  const  cart = localStorage.getItem("cart");
   return cart ? JSON.parse(cart) : [];
}

export type CartState = {
  data: Guitar[];
  cart: CartItem[];
};

export const initialState: CartState = {
  data: db,
  cart: localStorageCart(),
};

const MIN_ITEMS = 1;
const MAX_ITEMS = 10;

export const cartReducer = (
  state: CartState = initialState,
  action: CartActions
) => {
  if (action.type === "ADD_TO_CART") {
    const itemExist = state.cart.find(
      (guitar) => guitar.id === action.payload.item.id
    );

    let updatedCart: CartItem[] = [];

    if (itemExist) {
      updatedCart = [
        ...state.cart.map((item) => {
          if (item.id === action.payload.item.id) {
            if (item.quantity < MAX_ITEMS) {
              return { ...item, quantity: item.quantity + 1 };
            } else {
              return item;
            }
          } else {
            return item;
          }
        }),
      ];
    } else {
      const newItem: CartItem = { ...action.payload.item, quantity: MIN_ITEMS };
      updatedCart = [...state.cart, newItem];
    }

    return {
      ...state,
      cart: updatedCart,
    };
  }

  if (action.type === "REMOVE_FROM_CART") {
    const updatedCart = state.cart.filter((item) => item.id !== action.payload.id);

    return {
      ...state,
      cart: updatedCart
    };
  }

  if (action.type === "INCREASE_QUANTITY") {
    const updatedCart = state.cart.map((item) => {
      if (item.id === action.payload.id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });

    return {
      ...state,
      cart: updatedCart,
    };
  }

  if (action.type === "DECREASE_QUANTITY") {
    const updatedCart = state.cart.map((item) => {
      if (item.id === action.payload.id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    return {
      ...state,
      cart: updatedCart,
    };
  }

  if (action.type === "CLEAR_CART") {
    return {
      ...state,
      cart: [],
    };
  }

  return state;
};
