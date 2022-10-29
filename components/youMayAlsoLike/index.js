import React from 'react';
import ProductsComponent from '../../utils/components/products';

function randomItems(data) {
    if (data.length <= 0)
        return;

    const MAX_ITEMS = 4;
    let items = [];

    while (items.length < MAX_ITEMS) {
        let item;

        while (!item) {
            const randomItemIndex = Math.floor(Math.random() * data.length);
            const randomItem = data[randomItemIndex];

            if (!items.find(el => el.id === randomItem.id))
                item = randomItem;
        }

        items.push(item);
    }

    return items;
}

function YouMayAlsoLike({ products }) {
    return <ProductsComponent title='You may also like' data={products} />
}

export default YouMayAlsoLike;