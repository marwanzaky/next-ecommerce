import Layout from '../components/layout';

import Header from '../components/header';
import Products from '../components/products';
import Testimonials from '../components/testimonials';
import WhyChooseUs from '../components/whyChooseUs';

function Home() {
  return <Layout>
    <Header />
    <Products />
    <WhyChooseUs />
    <Testimonials />
  </Layout >
}

export default Home;