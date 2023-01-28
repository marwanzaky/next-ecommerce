import _Products_ from '@ui/Products';

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

export default function YouMayAlsoLike({ products }) {
    return <_Products_ title='You may also like' data={products} />
}