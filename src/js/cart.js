import Server from '../js/server';
import CartItems from '../js/cartItems';

setTimeout(() => {
    // Remove cart item on click
    const removeCartItemButtons = document.getElementsByClassName('cart-table-item-remove-btn');
    for (let i = 0; i < removeCartItemButtons.length; i++)
        removeCartItemButtons[i].addEventListener('click', removeCartItem);

    // Update cart subtotal on change
    const cartItemQuantities = document.getElementsByClassName('cart-table-item-quantity-field');
    for (let i = 0; i < cartItemQuantities.length; i++)
        cartItemQuantities[i].addEventListener('change', updateCartSubtotal);

    // Purchase on click
    const cartItemCheckoutBtn = document.querySelector('.cart-item-checkout-btn');
    cartItemCheckoutBtn.addEventListener('click', checkout);

    // Update cart subtotal
    updateCartSubtotal();
}, 100);

function removeCartItem(event) {
    const clickedButton = event.target;
    const clickedItem = clickedButton.parentElement.parentElement;
    const clickedUrl = clickedItem.querySelector('a').href;

    const cartItems = CartItems.items;
    const id = new URL(clickedUrl).searchParams.get('id') * 1;

    for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i]['id'] === id) {
            const cartItemIndex = cartItems.indexOf(cartItems[i]);

            if (cartItemIndex !== -1) {
                cartItems.splice(cartItemIndex, 1);
                CartItems.items = cartItems;
            }
        }
    }

    clickedItem.remove();
    updateCartSubtotal();
}

function updateCartSubtotal() {
    let total = 0;

    const cartItems = document.querySelectorAll('.cart-table-item');
    const subtotal = document.querySelector('.cart-subtotal-div-price');

    for (let i = 0; i < cartItems.length; i++) {
        const cartItemPrice = cartItems[i].querySelector('.cart-table-item-price');
        const cartItemPriceValue = cartItemPrice.innerHTML.match(/[0-9]|\./ig).join('') * 1;

        const cartItemQuantity = cartItems[i].querySelector('.cart-table-item-quantity-field');
        const cartItemQuantityValue = cartItemQuantity.value;

        total += cartItemPriceValue * cartItemQuantityValue;
    }

    subtotal.innerHTML = '$' + (Math.round(total * 100) / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' USD';
}

function checkout() {
    const items = CartItems.items.map(cartItem => {
        return {
            id: cartItem.id,
            quantity: 1
        }
    });

    fetch(`${Server}/create-checkout-session`, {
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