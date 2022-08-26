import React from 'react';

import Navigation from '../sections/Navigation';
import YouMayAlsoLike from '../sections/YouMayAlsoLike';
import About from '../sections/About';
import Footer from '../sections/Footer';

import Server from '../js/server';
import CartItems from '../js/cartItems';

const addToCart = async function () {
    const id = new URL(window.location.href).searchParams.get('id') * 1;

    for (let i = 0; i < CartItems.items.length; i++) {
        if (CartItems.items[i]['id'] === id) {
            alert('The item is already added to the cart.');
            return;
        }
    }

    await fetch(Server + '/products/' + id)
        .then((res) => res.json())
        .then((json) => {
            const cartItems = CartItems.items;

            cartItems.unshift(json);
            CartItems.items = cartItems;

            alert('The product is added to the cart.');
        });
}

const purchase = async function () {
    await addToCart();
    window.location.href = '/cart';
}

class Product extends React.Component {
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
        const id = window.location.search.split('=')[1];

        if (!loaded) return <></>

        return <>
            <section className='container product-details-box'>
                <div className='row'>
                    <div className='col-sm-6 p-4'>
                        <div className='product-details-img'>
                            <img className='product-details-preview' src={`${Server}/` + data[id].pictures[0]} alt={data[id].name} />
                            <div className='product-details-pictures'>
                                {data[id].pictures.map(el => <div className='product-details-picture'>
                                    <img src={`${Server}/` + el} alt={data[id].name}></img>
                                </div>)}
                            </div>
                        </div>
                    </div>

                    <div className='col-sm-6 p-4'>
                        <div className='product-details'>
                            <h1 className='product-details-name' >{data[id].name}</h1>
                            <p className='product-details-reviews'>★★★★★ ({data[id].reviews.length})</p>
                            <p className='product-details-price'>${data[id].price / 100}</p>
                            <button className='btn-base btn-ghost-grey' onClick={addToCart}>Add to cart</button>
                            <button className='btn-base btn-full' onClick={purchase}>Buy it now</button>
                            <NewlineText text={data[id].description} />
                        </div>

                        <div className='product-reviews'>
                            <h2>Customer Reviews</h2>

                            {data[id].reviews.map(el => <div className='product-review'>
                                <p className='product-review-fullname'>{el.fullname} - <span>{el.date}</span></p>
                                <p className='product-review-stars'>{el.stars}</p>
                                <p className='product-review-text'>{el.review}</p>
                            </div>)}
                        </div>
                    </div>
                </div>
            </section>

            <YouMayAlsoLike />
        </>;
    }
}

function NewlineText(props) {
    const text = props.text;
    return <div className='product-details-description'>{text}</div>;
}

function App() {
    return (
        <div className="App">
            <Navigation />
            <Product />
            <About />
            <Footer />
        </div>
    )
}

export default App;
