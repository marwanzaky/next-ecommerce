import Settings from './settings';
import CartItems from './cartItems';
import { convertNameToId } from './convertStr';

const addToCart = async event => {
    const clickedCartButton = event.target;
    const clickedCartItem = clickedCartButton.parentElement.parentElement.parentElement;
    const clickedCartUrl = clickedCartItem.querySelector('a').href;
    const clickedCartName = new URL(clickedCartUrl).pathname.replace('/product/', '');

    for (let i = 0; i < CartItems.items.length; i++) {
        if (CartItems.items[i]['name'] === clickedCartName) {
            alert('The item is already added to the cart.');
            return;
        }
    }

    const id = convertNameToId(clickedCartName);
    const res = await fetch(Settings.server + '/products/' + id);
    const json = await res.json();

    const cartItems = CartItems.items;
    cartItems.unshift(json.data.product);
    CartItems.items = cartItems;

    alert('The product is added to the cart.');
}

export default addToCart;