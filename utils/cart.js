const cart = {
    get items() {
        let json = null;

        if (typeof window !== 'undefined')
            json = window.localStorage.getItem('cart-items')

        const obj = JSON.parse(json);
        return Array.isArray(obj) ? obj : [];
    },
    set items(obj) {
        const json = JSON.stringify(obj);

        if (typeof window !== 'undefined')
            window.localStorage.setItem('cart-items', json);
    },
    add: async id => {
        for (let item of cart.items.values())
            if (item['_id'] === id)
                return alert('The product is already added to the cart.');

        const res = await fetch(process.env.NEXT_PUBLIC_SERVER + '/products/' + id);
        const json = await res.json();

        const items = cart.items;
        const item = { ...json.data.product, quantity: 1 };

        items.unshift(item);
        cart.items = items;

        alert('The product is added to the cart.');
    },
    remove: id => {
        const items = cart.items;

        for (let item of items.values()) {
            if (item['_id'] === id) {
                const i = items.indexOf(item);
                items.splice(i, 1)
                cart.items = items;
            }
        }
    }
}

export default cart;