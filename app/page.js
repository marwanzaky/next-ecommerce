// 'use client';

import Header from '@components/header';
import Products from '@components/products';
// import WhyChooseUs from '@components/whyChooseUs';
// import Testimonials from '@components/testimonials';

export default async function Page() {
    const { data } = await getProducts();

    return <div className='App'>
        <Header />
        <Products products={data.products} />
        {/* <WhyChooseUs /> */}
        {/* <Testimonials /> */}
    </div>
}

async function getProducts() {
    const req = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/products`);
    return req.json();
}