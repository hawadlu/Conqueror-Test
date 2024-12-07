export const updateCartItem = async ({ cartId, quantity }: { cartId: number, quantity: number }) => {
    const response = await fetch('http://localhost:8000/cart/items', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart_id: cartId, quantity })
    });
    return response.json();
};