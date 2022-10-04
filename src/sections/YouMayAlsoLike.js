import React from 'react';
import Product from '../components/product';
import Settings from '../js/settings';

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
            data: json,
            loaded: true
        });
    }

    render() {
        const { loaded, data } = this.state;
        const items = randomItems(data);

        if (!loaded)
            return <></>

        return (
            <section className='xl:container xl:mx-auto section-product'>
                <h2>You May Also Like</h2>

                <div className="product-box">
                    {items.map(el => <Product id={el.id} src={el.pictures[0]} name={el.name} reviews={el.reviews.length} price={el.price} priceCompare={el.priceCompare} />)}
                </div>
            </section>
        );
    }
}

export default YouMayAlsoLike;