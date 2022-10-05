import React from 'react';
import Product from '../../src/components/product';
import Settings from '../../src/utils/settings';

class Products extends React.Component {
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

        if (!loaded)
            return <></>

        return (
            <section className='xl:container xl:mx-auto section-product'>
                <h2>Featured Collection</h2>

                <div className="product-box">
                    {data.map(el => <Product id={el.id} src={el.pictures[0]} name={el.name} reviews={el.reviews.length} price={el.price} priceCompare={el.priceCompare} />)}
                </div>
            </section>
        );
    }
}

export default Products;