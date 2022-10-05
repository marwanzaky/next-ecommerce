import React from 'react';
import { useRouter } from 'next/router';

import Navigation from '../../src/sections/Navigation';
import YouMayAlsoLike from '../../src/sections/YouMayAlsoLike';
import About from '../../src/sections/About';
import Footer from '../../src/sections/Footer';

import Settings from '../../src/utils/settings';
import CartItems from '../../src/utils/cartItems';
import Stars from '../../src/components/stars';

const addToCart = async function () {
    const id = new URL(window.location.href).searchParams.get('id') * 1;

    for (let i = 0; i < CartItems.items.length; i++) {
        if (CartItems.items[i]['id'] === id) {
            alert('The item is already added to the cart.');
            return;
        }
    }

    await fetch(Settings.server + '/products/' + id)
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
        fetch(Settings.server + '/products')
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
        // const id = window.location.search.split('=')[1];

        const router = useRouter();
        const { id } = router.query;

        if (!loaded) return <></>

        return <>
            <section className='xl:container xl:mx-auto product-details-box'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                    <div>
                        <div className='product-details-img'>
                            <img className='product-details-preview' src={`${Settings.server}/` + data[id].pictures[0]} alt={data[id].name} />
                            <div className='grid grid-cols-4 gap-2 md:gap-4 product-details-pictures'>
                                {data[id].pictures.map(el => <div className='product-details-picture'>
                                    <img src={`${Settings.server}/` + el} alt={data[id].name}></img>
                                </div>)}
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className='product-details'>
                            <h1 className='product-details-name' >{data[id].name}</h1>
                            <Stars reviews={data[id].reviews.length} />

                            <div className='flex flex-row mb-[30px]'>
                                <span className='product-details-price'>{'$' + data[id].price / 100}</span>
                                <span className='product-details-price_compare flex items-center' >{'$' + data[id].priceCompare / 100}</span>
                            </div>

                            <button className='w-full md:w-[400px] btn-base btn-ghost-grey' onClick={addToCart}>Add to cart</button>
                            <button className='w-full md:w-[400px] btn-base btn-full' onClick={purchase}>Buy it now</button>
                            <Description text={data[id].description} />
                        </div>

                        <div className='product-reviews'>
                            <h3>Rating And Reviews</h3>

                            {data[id].reviews.map(el => <div className='product-review'>
                                <div className='product-review-fullname'>{el.fullname} - <span>{el.date}</span></div>
                                <div className='product-review-stars'>{el.stars}</div>
                                <div className='product-review-text'>{el.review}</div>
                            </div>)}
                        </div>
                    </div>
                </div>
            </section>

            <YouMayAlsoLike />
        </>;
    }
}

function Description(props) {
    return <>
        <h3>Description</h3>
        <div className='product-details-description'>{props.text}</div>
    </>;
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

export async function getStaticProps({ params }) {
    const req = await fetch('https://storio-server.herokuapp.com/api/v1/products');
    const data = await req.json();

    return {
        props: { product: data[params.id] }
    }
}

export async function getStaticPaths() {
    const req = await fetch('https://storio-server.herokuapp.com/api/v1/products');
    const data = await req.json();

    const paths = data.map(product => {
        return { params: { id: product.id.toString() } }
    });

    return {
        paths,
        fallback: false
    }
}