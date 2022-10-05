import React, { useState, useEffect } from 'react';

import Navigation from '../../components/navigation';
import YouMayAlsoLike from '../../components/youMayAlsoLike';
import About from '../../components/about';
import Footer from '../../components/footer';

import Settings from '../../utils/settings';
import CartItems from '../../utils/cartItems';
import Stars from '../../utils/components/stars';

const addToCart = async function () {
    const id = new URL(window.location.href).searchParams.get('id') * 1;

    for (let i = 0; i < CartItems.items.length; i++) {
        if (CartItems.items[i]['id'] === id) {
            alert('The item is already added to the cart.');
            return;
        }
    }

    const res = await fetch(Settings.server + '/products/' + id);
    const json = await res.json();

    const cartItems = CartItems.items;
    cartItems.unshift(json);
    CartItems.items = cartItems;

    alert('The product is added to the cart.');
}

const purchase = async function () {
    await addToCart();

    if (typeof window !== "undefined")
        window.location.href = '/cart';
}

function Product() {
    const [id, setId] = useState(1);
    const [data, setData] = useState(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        return async () => {
            if (typeof window !== "undefined") {
                const id = window.location.pathname.replace('/product/', '') * 1;
                setId(id);
            }

            const res = await fetch(Settings.server + '/products');
            const json = await res.json();

            setData(json);
            setLoaded(true);
        }
    }, []);

    if (!loaded)
        return <></>

    return <>
        <section className='xl:container xl:mx-auto product-details-box'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                <div>
                    <div className='product-details-img'>
                        <img className='product-details-preview' src={`${Settings.server}/` + data[id].pictures[0]} alt={data[id].name} />
                        <div className='product-details-pictures'>
                            {data[id].pictures.map((el, i) =>
                                <div className='product-details-picture'>
                                    <img src={`${Settings.server}/` + el} alt={`${data[id].name} ${i + 1}`}></img>
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
                            <span className='product-details-price_compare' >{'$' + data[id].priceCompare / 100}</span>
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
    </>
}

function Description(props) {
    return <>
        <h3>Description</h3>
        <div className='product-details-description'>{props.text}</div>
    </>
}

export default function App() {
    return (
        <div className="App">
            <Navigation />
            <Product />
            <About />
            <Footer />
        </div>
    )
}

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