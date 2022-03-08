import { createContext, useReducer } from "react";

export const AppContext = createContext();

const initialState = {
  isLogin: false,
  user: {},
  cart: [],
};

const arraysMatch = function (arr1, arr2) {
  // Check if the arrays are the same length
  if (arr1.length !== arr2.length) return false;

  // Check if all items exist and are in the same order
  for (var i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ADD_TO_CART":
      console.log("CART", state);
      const isInCart = state.cart.find((product) => {
        const matchedArray = arraysMatch(
          product.toppings,
          action.payload.toppings
        );
        return product.id === action.payload.id && matchedArray;
      });
      const subTotal = action.payload.quantity * action.payload.initialPrice;
      console.log(subTotal);

      if (isInCart) {
        const inCart = state.cart.map((product) => {
          if (product === action.payload) {
            return {
              ...product,
              quantity: product.quantity + 1,
              subTotal: (product.quantity + 1) * product.initialPrice,
            };
          } else {
            return product;
          }
        });
        return {
          ...state,
          cart: inCart,
        };
      }

      const newCart = [...state.cart, { ...action.payload }];
      return {
        ...state,
        cart: newCart,
      };

    case "SAVE_CART":
      localStorage.setItem("cart", JSON.stringify(state.cart));
      return state;

    case "REMOVE_FROM_CART":
      const newCarts = [...state.cart];
      newCarts.splice(action.payload, 1);
      return {
        ...state,
        cart: [...newCarts],
      };
    case "RESET_CART":
      localStorage.removeItem("cart");
      return {
        ...state,
        cart: [],
      };
    case "UPDATE_CART":
      const cartData = localStorage.getItem("cart");
      if (!cartData) {
        return state;
      }
      return { ...state, cart: JSON.parse(cartData) };

    case "USER_SUCCESS":
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        isLogin: true,
        user: payload,
      };
    case "AUTH_ERROR":
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        isLogin: false,
        user: {},
        cart: [],
      };
    default:
      throw new Error();
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  );
};
