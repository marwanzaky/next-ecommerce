import Layout from '../components/layout';

import HeaderComponent from '../components/header';
import ProductsComponent from '../components/products';
import WhyChooseUsComponent from '../components/whyChooseUs';
import TestimonialsComponent from '../components/testimonials';

function Home({ products }) {
  return <Layout>
    <HeaderComponent />
    <ProductsComponent products={products} />
    <WhyChooseUsComponent />
    <TestimonialsComponent />
  </Layout >
}

export default Home;

export async function getStaticProps() {
  const req = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/products`);
  const json = await req.json();

  return {
    props: {
      products: json.data.products,
    }
  }
}