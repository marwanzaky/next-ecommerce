import Products from '@components/products';

export default async function Page() {
    const products = await getProducts();

    return <div className='App'>
        <Products products={products} />
    </div>
}

async function getProducts() {
    const req = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/products`);
    const json = await req.json();

    return json.data.products;
}