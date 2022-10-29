import Layout from '../components/layout';

import HeaderComponent from '../components/header';
import ProductsComponent from '../components/products';
import WhyChooseUsComponent from '../components/whyChooseUs';
import TestimonialsComponent from '../components/testimonials';
import Settings from '../utils/settings';

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
  const req = await fetch(`${Settings.server}/products`);
  const json = await req.json();

  return {
    props: {
      products: json.data.products,
    }
  }
}