import React from 'react';

import Layout from '../../components/layout';

import ProductComponent from '../../components/product';
import YouMayAlsoLike from '../../components/youMayAlsoLike';

function App(props) {
    return <Layout title={props.product.name}>
        <ProductComponent product={props.product} />
        <YouMayAlsoLike products={props.products} />
    </Layout>
}

export default App;

export async function getStaticProps({ params }) {
    const productReq = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/products/${params.id}`);
    const productJson = await productReq.json();

    const productsReq = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/products`);
    const productsJson = await productsReq.json();

    return {
        props: {
            product: productJson.data.product,
            products: productsJson.data.products
        }
    }
}

export async function getStaticPaths() {
    const req = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/products`);
    const json = await req.json();

    const paths = json.data.products.map(product => {
        return { params: { id: product._id } }
    });

    return {
        paths,
        fallback: false
    }
}