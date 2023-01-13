// Importam hook-urile useReducer si useContext.
import { useEffect, useState, useContext } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
// Importam contextul cart-ului.
import { CartContext } from "../store/Cart/context";
// Importam actiunea de adaugare in cart.
import { addToCart } from "../store/Cart/actions";
import { ThemeContext } from "../store/Theme/context";
import { setDarkTheme, setLightTheme } from "../store/Theme/actions";

export function Home() {
  // Vom modifica state-ul cart-ului, deci avem nevoie de dispatch.
  const { cartDispatch } = useContext(CartContext);
  // Vom accesa si modifica state-ul temei, deci avem nevoie si de state si de dispatch.
  const { themeState, themeDispatch } = useContext(ThemeContext);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://www.cheapshark.com/api/1.0/deals?pageSize=3")
      .then((response) => response.json())
      .then((products) => {
        // console.log("Produsele: ", products);

        setProducts(products);
      });
  }, []);

  // Functia care se ocupa de adaugarea in cart a produsului:
  function handleAddToCartClick(product) {
    // Apelam actiunea, cu payloadul aferent.
    const actionResult = addToCart(product);
    // Trimitem rezultatul actiunii catre reducer.
    cartDispatch(actionResult);
  }

  // Cand dam click pe butonul de schimbare a temei, in functie de valoarea temei, declansam actiunea corespunzatoare.
  function handleThemeChange() {
    let actionResult;
    if (themeState.theme === "light") {
      // Daca tema este light, declansam actiunea ce seteaza tema dark.
      actionResult = setDarkTheme();
    } else {
      // Daca tema este dark, declansam actiunea ce seteaza tema light.
      actionResult = setLightTheme();
    }

    themeDispatch(actionResult);
  }

  return (
    <div className={themeState.theme === "light" ? "bg-white" : "bg-dark"}>
      <div className="d-flex flex-column align-items-center">
        {/* Atasam butonului  */}
        <Button
          variant="outline-primary"
          className="mt-3"
          // Atasam functia care va schimba state-ul global al temei.
          onClick={handleThemeChange}
        >
          Change theme
        </Button>
        {/* Afisam produsele din cart. */}
        {products.map((product) => {
          return (
            <Card
              key={product.dealID}
              style={{ width: "18rem" }}
              className="m-3"
            >
              <Link
                to={`/product/${encodeURI(product.dealID)}`}
                className="text-dark"
              >
                <Card.Img variant="top" src={product.thumb} />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text className="text-danger">
                    {product.salePrice} $
                  </Card.Text>
                </Card.Body>
              </Link>
              <Button
                variant="success"
                onClick={() => {
                  // Construim payload-ul si il pasam ca argument functiei care va apela actiunea addToCart.
                  handleAddToCartClick({
                    id: product.dealID,
                    image: product.thumb,
                    name: product.title,
                    price: product.salePrice,
                  });
                }}
              >
                Adaugă în coș
              </Button>
            </Card>
          );
        })}
      </div>
      <Link to="/products">Vezi toate produsele</Link>
    </div>
  );
}
