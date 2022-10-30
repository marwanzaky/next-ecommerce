import Product from '../../../components/product';
import YouMayAlsoLike from '../../../components/youMayAlsoLike';

export default async function Page() {
    const { product, products } = await getData();

    return <div className='App'>
        <Product product={product} />
        <YouMayAlsoLike products={products} />
    </div>
}

export async function getData() {
    const params = { id: '6349f871cab75287de7915e0' }
    const productReq = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/products/${params.id}`);
    const productJson = await productReq.json();

    const productsReq = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/products`);
    const productsJson = await productsReq.json();

    return {
        product: productJson.data.product,
        products: productsJson.data.products
    }
}

export async function generateStaticParams() {
    const { products } = await getData();

    return products.map(product => ({
        slug: product._id,
    }));
}