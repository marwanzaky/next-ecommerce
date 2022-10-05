import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Product({ product }) {
    const router = useRouter();
    const { id } = router.query;

    console.log(product);

    return (
        <>
            <Head><title>{product.name}</title></Head>

            <h1>Product {product.name}</h1>
        </>
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