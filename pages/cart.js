import Layout from '../components/layout';
import CartComponent from "../components/cart";

function Cart({ products }) {
    return <Layout title='Cart'>
        <CartComponent products={products} />
    </Layout>
}

export default Cart;

export async function getStaticProps() {
    const req = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/products`);
    const json = await req.json();

    return {
        props: {
            products: json.data.products,
        }
    }
}