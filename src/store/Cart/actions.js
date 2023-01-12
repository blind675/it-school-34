// Actiunea care adauga un produs in cart.
export function addToCart(product) {
  return {
    type: "ADD_TO_CART",
    payload: product,
  };
}

// Actiunea care sterge un produs din cart.
export function removeFromCart(productId) {
  return {
    type: "REMOVE_FROM_CART",
    payload: productId,
  };
}
