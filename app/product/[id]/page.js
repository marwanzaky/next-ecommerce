import Product from '../../../components/product';
import YouMayAlsoLike from '../../../components/youMayAlsoLike';

export default async function Page({ params }) {
    const product = await getProduct(params.id);
    const products = await getProducts();

    return <div className='App'>
        <Product product={product} />
        <YouMayAlsoLike products={products} />
    </div>
}

async function getProduct(productId) {
    const req = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/products/${productId}`);
    const json = await req.json();

    return json.data.product;
}

async function getProducts() {
    const req = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/products`);
    const json = await req.json();

    return json.data.products;
}

export async function generateStaticParams() {
    const products = await getProducts();
    const a = products.map(product => ({
        id: product._id,
    }));
    console.log('test', a);
    return products.map(product => ({
        id: product._id,
    }));
}