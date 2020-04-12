export function addToCart(product) {
  return {
    type: '@cart/ADD',
    product,
  };
}

export function removeFromCart(product) {
  return {
    type: '@cart/REMOVE',
    id: product.id,
  };
}

export function updateAmount(id, amount) {
  return {
    type: '@cart/UPDATE_AMOUNT',
    id,
    amount,
  };
}
