import React from 'react';

import Layout from '../../components/layout';

import ProductComponent from '../../components/product';
import YouMayAlsoLike from '../../components/youMayAlsoLike';

import Settings from '../../utils/settings';

function App(data) {
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

export async function getStaticProps({ params }) {
    const req = await fetch(`${Settings.server}/products/${params.id}`);
    const json = await req.json();

    return {
        props: json.data.product
    }
}

export async function getStaticPaths() {
    const req = await fetch(`${Settings.server}/products`);
    const json = await req.json();

    const paths = json.data.products.map(product => {
        return { params: { id: product._id } }
    });

    return {
        paths,
        fallback: false
    }
}