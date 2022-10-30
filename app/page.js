import Header from '../components/header';
import FeaturedCollection from '../components/featuredCollection';
import WhyChooseUs from '../components/whyChooseUs';
import Testimonials from '../components/testimonials';

export default async function Page() {
    const products = await getData();

    return <div className='App'>
        <Header />
        <FeaturedCollection products={products} />
        <WhyChooseUs />
        <Testimonials />
    </div>
}

async function getData() {
    // const req = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/products`);
    // return req.json();

    const req = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/products`);
    const json = await req.json();

    return json.data.products;
}