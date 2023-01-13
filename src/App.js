import "./styles.css";
import { Route, Routes } from "react-router-dom";
import { useReducer } from "react";
import { Home } from "./pages/Home";
import { Cart } from "./pages/Cart";
import { Products } from "./pages/Products";
import { Product } from "./pages/Product";
import { Header } from "./components/Header";
// Importam contextul creat.
import { CartContext } from "./store/Cart/context";
import { cartReducer, initialState } from "./store/Cart/reducer";
import {
  themeReducer,
  initialState as themeInitialState,
} from "./store/Theme/reducer";
import { ThemeContext } from "./store/Theme/context";

export default function App() {
  // Initializam reducerul pentru cart.
  const [cartState, cartDispatch] = useReducer(cartReducer, initialState);
  // Initializam reducerul pentru tema.
  const [themeState, themeDispatch] = useReducer(
    themeReducer,
    themeInitialState
  );
  // Cream valoarea pe care o vom pasa lui CartContext.Provider.
  const cartContextValue = {
    cartState,
    cartDispatch,
  };
  // Cream valoarea pe care o vom pasa lui ThemeContext.Provider.
  const themeContextValue = {
    themeState,
    themeDispatch,
  };
  // Facem dissponibile catre intreaga aplicatie state-urile globale, precum si functiile ce modifica state-urile globale.
  return (
    <ThemeContext.Provider value={themeContextValue}>
      <CartContext.Provider value={cartContextValue}>
        <div className="App primary">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </CartContext.Provider>
    </ThemeContext.Provider>
  );
}
