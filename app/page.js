import Header from '@components/header';
// import Products from '@components/products';
// import WhyChooseUs from '@components/whyChooseUs';
// import Testimonials from '@components/testimonials';

export default function Page() {
    return <div className='App'>
        <Header />
        {/* <Products products={products} /> */}
        {/* <WhyChooseUs /> */}
        {/* <Testimonials /> */}
    </div>
}

// export async function getStaticProps() {
//     const req = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/products`);
//     const json = await req.json();

//     return {
//         props: {
//             products: json.data.products,
//         }
//     }
// }