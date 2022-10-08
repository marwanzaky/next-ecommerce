import React from 'react';
import ProductsComponent from '../../utils/components/products';
import Settings from '../../utils/settings';

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

class YouMayAlsoLike extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loaded: false
        };
    }

    async componentDidMount() {
        const res = await fetch(Settings.server + '/products');
        const json = await res.json();

        this.setState({
            data: json.data.products,
            loaded: true
        });
    }

    render() {
        const { loaded, data } = this.state;
        const items = randomItems(data);

        if (!loaded)
            return <></>

        return <ProductsComponent title='You may also like' data={items} />
    }
}

export default YouMayAlsoLike;