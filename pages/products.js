import Layout from '../components/layout';
import ProductsComponent from '../components/products';
import Settings from '../utils/settings';

function Shop({ products }) {
    return <Layout title='Products'>
        <ProductsComponent products={products} />
    </Layout>
}

export default Shop;

export async function getStaticProps() {
    const req = await fetch(`${Settings.server}/products`);
    const json = await req.json();

    return {
        props: {
            products: json.data.products,
        }
    }
}