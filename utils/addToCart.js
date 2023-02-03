import CartItems from './cartItems';

export const addToCart = async id => {
    for (let i = 0; i < CartItems.items.length; i++)
        if (CartItems.items[i]['_id'] === id)
            return alert('The product is already added to the cart.');

    const res = await fetch(process.env.NEXT_PUBLIC_SERVER + '/products/' + id);
    const json = await res.json();

    const cartItems = CartItems.items;
    cartItems.unshift({ ...json.data.product, quantity: 1 });
    CartItems.items = cartItems;

    alert('The product is added to the cart.');
}

export const removeToCart = id => {
    const cartItems = CartItems.items;

    for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i]['id'] === id) {
            const cartItemIndex = cartItems.indexOf(cartItems[i]);

            if (cartItemIndex !== -1) {
                cartItems.splice(cartItemIndex, 1);
                CartItems.items = cartItems;
            }
        }
    }
}
