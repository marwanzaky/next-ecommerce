import Layout from '@components/layout';
import Product from '@components/product';
import YouMayAlsoLike from '@components/youMayAlsoLike';

export default async function Page({ params }) {
    const product = await getProduct(params.id);
    const products = await getProducts();

    return <Layout title={product.name}>
        <Product product={product} />
        <YouMayAlsoLike products={products} />
    </Layout>
}

async function getProduct(id) {
    const req = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/products/${id}`);
    const json = await req.json();

    return json.data.product;
}

async function getProducts() {
    const req = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/products`);
    const json = await req.json();

    return json.data.products;
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