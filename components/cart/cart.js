import CartItems from '../../utils/cartItems';

export const checkout = () => {
    const items = CartItems.items.map(cartItem => {
        return {
            id: cartItem.id,
            quantity: 1
        }
    });

    fetch(`${process.env.NEXT_PUBLIC_SERVER}/payment/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items })
    })
        .then(res => {
            if (res.ok) return res.json();
            return res.json().then(json => Promise.reject(json));
        })
        .then(json => {
            window.location = json.url;
            clearCartItems();
            updateCartSubtotal();
        })
        .catch(err => console.log(err));
}

function clearCartItems() {
    window.localStorage.clear();

    const cartItems = document.querySelectorAll('.cart-table-item');
    cartItems.forEach(cartItem => cartItem.remove());
}