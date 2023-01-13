import { Link } from "react-router-dom";
import { useContext } from "react";
// Importam ce avem nevoie.
import { CartContext } from "../store/Cart/context";
import { ThemeContext } from "../store/Theme/context";

export function Header() {
  // Accesam state-ul global al cart-ului.
  const { cartState } = useContext(CartContext);
  const { themeState } = useContext(ThemeContext);

  return (
    <header className={themeState.theme === "light" ? "bg-white" : "bg-dark"}>
      <div className="d-flex justify-content-between mx-4">
        <Link to="/">Acasă</Link>
        <div>
          <Link to="/products" className="p-3">
            Produse
          </Link>
          <Link to="/cart">
            {/* Afisam datele din state pe ecran. */}
            Coș (
            {cartState.products.reduce(
              (sum, product) => sum + product.quantity,
              0
            )}
            )
          </Link>
        </div>
      </div>
    </header>
  );
}
