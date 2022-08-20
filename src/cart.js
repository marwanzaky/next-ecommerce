const removeCartItemButtons = [...document.querySelectorAll("cart-item-remove")];

for (let i = 0; i < removeCartItemButtons.length; i++) {
    const removeCartItemButton = removeCartItemButtons[i];

    removeCartItemButton.addEventListener('click', () => {
        console.log('clicked!');
    });
}

console.log(removeCartItemButtons);
console.log(removeCartItemButtons.length);