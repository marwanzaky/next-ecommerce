import React from 'react';
import Product from '../components/product';
import Settings from '../js/settings';

class Products extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            loaded: false
        };
    }

    componentDidMount() {
        fetch(Settings.server + '/products')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    data: json,
                    loaded: true
                });
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