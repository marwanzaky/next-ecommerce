import React from 'react';
import Product from '../components/product';

import Server from '../js/server';

function randomItems(data) {
    if (data.length <= 0)
        return;

    const MAX_ITEMS = 4;
    let items = [];

    while (items.length < MAX_ITEMS) {
        let item;

        while (item == null) {
            const randomItemIndex = Math.floor(Math.random() * data.length);
            const randomItem = data[randomItemIndex];

            if (!items.find(el => el.id == randomItem.id))
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

    componentDidMount() {
        fetch(Server + '/products')
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    data: json,
                    loaded: true
                });
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

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 product-box">
                    {items.map(el => <Product id={el.id} src={el.pictures[0]} name={el.name} reviews={el.reviews.length} price={el.price} />)}
                </div>
            </section>
        );
    }
}

export default YouMayAlsoLike;