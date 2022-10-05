import React, { useState, useEffect } from 'react';

import Navigation from '../../components/navigation';
import ProductComponent from '../../components/product';
import YouMayAlsoLike from '../../components/youMayAlsoLike';
import About from '../../components/about';
import Footer from '../../components/footer';

import Settings from '../../utils/settings';

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
        <ProductComponent id={id} data={data} />
        <YouMayAlsoLike />
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