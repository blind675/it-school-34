// Importam hook-urile useReducer si useContext.
import { useEffect, useState, useContext } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
// Importam contextul cart-ului.
import { CartContext } from "../store/Cart/context";
// Importam actiunea de adaugare in cart.
import { addToCart } from "../store/Cart/actions";

export function Home() {
  // Cerem 4 produse de la API si actualizam state-ul.
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://www.cheapshark.com/api/1.0/deals?pageSize=3")
      .then((response) => response.json())
      .then((products) => {
        // console.log("Produsele: ", products);

        setProducts(products);
      });
  }, []);

  // Utilizam valoarea oferita de context.
  const { cartDispatch } = useContext(CartContext);

  // Functia care se ocupa de adaugarea in cart a produsului:
  function handleAddToCartClick(product) {
    // Apelam actiunea, cu payloadul aferent.
    const actionResult = addToCart(product);
    // Trimitem rezultatul actiunii catre reducer.
    cartDispatch(actionResult);
  }

  return (
    <div>
      <div className="d-flex flex-column align-items-center">
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
