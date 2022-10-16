import Settings from "./settings";
import CartItems from "./cartItems";

const addToCart = async (id, name) => {
    for (let i = 0; i < CartItems.items.length; i++)
        if (CartItems.items[i]['name'] === name)
            return alert('The item is already added to the cart.');

    const res = await fetch(Settings.server + '/products/' + id);
    const json = await res.json();

    const cartItems = CartItems.items;
    cartItems.unshift(json.data.product);
    CartItems.items = cartItems;

    alert('The product is added to the cart.');
}

export default addToCart;