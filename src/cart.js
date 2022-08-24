setTimeout(() => {
    const removeCartItemButtons = document.getElementsByClassName('cart-table-item-remove-btn');
    const cartItemQuantities = document.getElementsByClassName('cart-table-item-quantity-field');

    console.log(cartItemQuantities);

    for (let i = 0; i < removeCartItemButtons.length; i++) {
        const removeCartItemButton = removeCartItemButtons[i];

        removeCartItemButton.addEventListener('click', (event) => {
            const buttonClicked = event.target;
            const buttonItem = buttonClicked.parentElement.parentElement;

            buttonItem.remove();
            updateCartSubtotal();
        });
    }

    for (let i = 0; i < cartItemQuantities.length; i++) {
        const cartItemQuantity = cartItemQuantities[i];

        cartItemQuantity.addEventListener('change', (event) => {
            updateCartSubtotal();
        });
    }

    updateCartSubtotal();
}, 100);

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

    subtotal.innerHTML = '$' + (Math.round(total * 100) / 100).toFixed(2) + ' USD';
}
