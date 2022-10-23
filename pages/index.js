import Layout from '../components/layout';

import HeaderComponent from '../components/header';
import ProductsComponent from '../components/products';
import WhyChooseUsComponent from '../components/whyChooseUs';
import TestimonialsComponent from '../components/testimonials';

function Home() {
  return <Layout>
    <HeaderComponent />
    <ProductsComponent />
    <WhyChooseUsComponent />
    <TestimonialsComponent />
  </Layout >
}

export default Home;