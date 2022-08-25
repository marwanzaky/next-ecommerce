import React from 'react';
import Product from '../elements/product';

const server = 'https://storio-api.herokuapp.com';

class YouMayAlsoLike extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            loaded: false
        };
    }

    componentDidMount() {
        fetch(server + '/products')
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

        if (!loaded) return <section className='container'>
            <h1>Loading...</h1>
        </section>;

        return (
            <section className='container section-product'>
                <h2>You May Also Like</h2>

                <div className="product-box">
                    {data.map(el => <Product id={el.id} src={el.pictures[0]} name={el.name} reviews={el.reviews.length} price={el.price} />)}
                </div>
            </section>
        );
    }
}

export default YouMayAlsoLike;