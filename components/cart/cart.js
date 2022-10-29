import CartItems from '../../utils/cartItems';

export const removeCartItem = (event, id) => {
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

    const clickedItem = event.target.parentElement.parentElement;
    clickedItem.remove();

    updateCartSubtotal();
}

export const updateCartSubtotal = () => {
    if (CartItems.items.length <= 0)
        return;

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