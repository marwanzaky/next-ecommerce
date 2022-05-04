import React from 'react';

import { IonIcon } from '@ionic/react';
import { heartOutline } from 'ionicons/icons'

function Product(props) {
    return <div className='product'>
        <div className='save'><IonIcon className='save-icon' src={heartOutline} font-size="48px" /></div>

        <a href={'/product?id=' + props.id}><img src={'http://127.0.0.1:8000/' + props.src}></img></a>

        <span className='product-name'>{props.name}</span>
        <span className='product-stars'>★★★★★ ({props.reviews})</span>

        <div className='product-tag'>
            <p className='product-price' >${props.price}</p>
            <button className='btn-base btn-ghost-grey produce-button'>Add to card</button>
        </div>
    </div>
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
        fetch('http://127.0.0.1:8000/products')
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
                    {data.map(el => <Product id={el.id} src={el.src} name={el.name} reviews={el.reviews} price={el.price} />)}
                </div>
            </section>
        );
    }
}

export default YouMayAlsoLike;