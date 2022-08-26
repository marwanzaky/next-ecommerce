const cartItems = {
    nameStr: 'cartItems',
    get items() {
        const json = window.localStorage.getItem(this.nameStr);
        const obj = JSON.parse(json);
        return Array.isArray(obj) ? obj : [];
    },
    set items(obj) {
        const json = JSON.stringify(obj);
        window.localStorage.setItem(this.nameStr, json);
    }
}

export default cartItems;