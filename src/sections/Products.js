import React from 'react';
import Product from '../elements/product';
import Server from '../js/server';

class Products extends React.Component {
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

        if (!loaded)
            return <></>

        return (
            <section className='container section-product'>
                <h2>Featured Collection</h2>

                <div className="product-box">
                    {data.map(el => <Product id={el.id} src={el.pictures[0]} name={el.name} reviews={el.reviews.length} price={el.price} />)}
                    {data.map(el => <Product id={el.id} src={el.pictures[0]} name={el.name} reviews={el.reviews.length} price={el.price} />)}
                </div>
            </section>
        );
    }
}

export default Products;