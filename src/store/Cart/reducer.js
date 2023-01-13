// State-ul initial al cart-ului.
export const initialState = {
  // Initial nu avem produse in cart.
  products: [],
};

// Reducerul primeste ca parametri state-ul, respectiv rezultatul apelului unei actiuni.
export function cartReducer(state, action) {
  // Evaluam tipurile actiunii:
  switch (action.type) {
    case "ADD_TO_CART": {
      // Din state extragem produsele anterioare.
      const previousProducts = state.products;
      // Din actiune extragem produsul adaugat.
      const newProduct = action.payload;

      const foundProduct = previousProducts.find((product) => {
        return product.id === newProduct.id;
      });

      if (!foundProduct) {
        // Fiind prima data cand un produs este adaugat in cart, are cantitatea 1.
        newProduct.quantity = 1;

        const newState = {
          products: [...previousProducts, newProduct],
        };

        return newState;
      } else {
        // Este nevoie sa modificam cantitatea FARA sa modificam array-ul initial.
        // Astfel, folosim un map.
        const updatedProducts = previousProducts.map((product) => {
          // Daca produsul este cel cautat, returnam un nou produs, care contine campurile produsului anterior, dar cu cantitatea modificata.
          if (product.id === newProduct.id) {
            return {
              // Continutul produsului din state-ul anterior.
              ...product,
              // Cantitatea produsului din state-ul anterior + 1.
              quantity: product.quantity + 1,
            };
          }

          return product;
        });

        // Cream noul state, ce contine produsele actualizate.
        const newState = {
          products: [...updatedProducts],
        };
        // Returnam noul state.
        return newState;
      }
    }

    case "REMOVE_FROM_CART": {
      // Pentru a șterge produsele, filtram produsele din state, excuzandu-l pe cel care are id-ul venit din payload.
      const filteredProducts = state.products.filter((product) => {
        return product.id !== action.payload;
      });

      // State-ul nou va contine produsele filtrate.
      const newState = { products: filteredProducts };
      return newState;
    }
    // Nu uitam sa returnam state-ul pe cazul default
    default:
      return state;
  }
}
