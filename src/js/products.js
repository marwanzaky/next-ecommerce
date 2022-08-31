import Settings from '../js/settings';
import CartItems from './cartItems';

setTimeout(() => {
    const productBtn = document.querySelectorAll('.product-tag-add');

    productBtn.forEach(el => el.addEventListener('click', addToCart));
}, 1000);

function addToCart(event) {
    const clickedCartButton = event.target;
    const clickedCartItem = clickedCartButton.parentElement.parentElement;
    const clickedCartUrl = clickedCartItem.querySelector('a').href;
    const id = new URL(clickedCartUrl).searchParams.get('id') * 1;

    for (let i = 0; i < CartItems.items.length; i++) {
        if (CartItems.items[i]['id'] === id) {
            alert('The item is already added to the cart.');
            return;
        }
    }

    fetch(Settings.server + '/products/' + id)
        .then((res) => res.json())
        .then((json) => {
            const cartItems = CartItems.items;

            cartItems.unshift(json);
            CartItems.items = cartItems;

            alert('The product is added to the cart.');
        });
}