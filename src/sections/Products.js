import React from 'react';

import { IonIcon } from '@ionic/react';
import { heartOutline } from 'ionicons/icons'

const server = 'https://storio-api.herokuapp.com';

function Product(props) {
    return <div className='product'>
        <div className='save'><IonIcon className='save-icon' src={heartOutline} font-size="48px" /></div>

        <a className='product-img' href={'/product?id=' + props.id}><img src={`${server}/${props.src}`} alt={props.name}></img></a>

        <span className='product-name'>{props.name}</span>
        <span className='product-stars'>★★★★★ ({props.reviews})</span>

        <div className='product-tag'>
            <p className='product-tag-price' >${props.price}</p>
            <button className='btn-base btn-ghost-grey product-tag-add'>Add to card</button>
        </div>
    </div>
}

class Products extends React.Component {
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