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

export default function App() {
  const [cartState, cartDispatch] = useReducer(cartReducer, initialState);

  const cartContextValue = {
    cartState,
    cartDispatch,
  };

  return (
    // Pasam catre toate componentele impachetate de CartContext.Provider obiectul {  productId: 123, productName: "Diablo II", price: 19.99  }.
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
  );
}
