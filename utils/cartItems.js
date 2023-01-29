const cartItems = {
    nameStr: 'cartItems',
    get items() {
        let json = null;

        if (typeof window !== 'undefined')
            json = window.localStorage.getItem(this.nameStr)

        const obj = JSON.parse(json);
        return Array.isArray(obj) ? obj : [];
    },
    set items(obj) {
        const json = JSON.stringify(obj);

        if (typeof window !== 'undefined')
            window.localStorage.setItem(this.nameStr, json);
    }
}

export default cartItems;