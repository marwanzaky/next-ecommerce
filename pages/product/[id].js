import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Layout from '../../components/layout';

import ProductComponent from '../../components/product';
import YouMayAlsoLike from '../../components/youMayAlsoLike';

import Settings from '../../utils/settings';

const productDummy = {
    name: '...',
    price: 0,
    priceCompare: 0,
    averageRatings: 5,
    numReviews: 0,
    imgs: null,
    description: '...',
    reviews: [
        {
            user: {
                name: '...'
            }
        }
    ]
}

function App() {
    const router = useRouter();

    const [data, setData] = useState(productDummy)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        let id = window.location.pathname.replace('/product/', '');

        setData(productDummy);
        setLoaded(false);

        fetch(Settings.server + '/products/' + id)
            .then(res => res.json())
            .then(json => {
                setData(json.data.product);
                setLoaded(true);
            });

    }, [router.asPath])

    // if (!loaded)
    //     return <></>

    return <Layout title={data.name}>
        <ProductComponent product={data} />
        <YouMayAlsoLike />
    </Layout>
}

export default App;

// export async function getServerSideProps({ params }) {
//     const req = await fetch(`${Settings.server}/products/${params.id}`);
//     const json = await req.json();

//     return {
//         props: { product: json.data.product }
//     }
// }

// export async function getStaticProps({ params }) {
//     const req = await fetch(`${Settings.server}/products/${params.id}`);
//     const json = await req.json();

//     return {
//         props: { product: json.data.product }
//     }
// }

// export async function getStaticPaths() {
//     const req = await fetch(`${Settings.server}/products`);
//     const json = await req.json();

//     const paths = json.data.products.map(product => {
//         return { params: { id: convertNameToId(product.name) } }
//     });

//     return {
//         paths,
//         fallback: false
//     }
// }