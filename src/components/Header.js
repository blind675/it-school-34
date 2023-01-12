import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../store/Cart/context";

export function Header() {
  const { cartState } = useContext(CartContext);

  return (
    <header>
      <div className="d-flex justify-content-between mx-4">
        <Link to="/">Acasă</Link>
        <div>
          <Link to="/products" className="p-3">
            Produse
          </Link>
          <Link to="/cart">
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
