import Layout from '@components/layout';
import Products from '@components/products';

export default async function Page() {
    const products = await getProducts();

    return <Layout title='Products'>
        <Products products={products} />
    </Layout>
}

async function getProducts() {
    const req = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/products`);
    const json = await req.json();

    return json.data.products;
}