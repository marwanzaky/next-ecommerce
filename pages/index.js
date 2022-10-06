import Navigation from '../components/navigation';
import Header from '../components/header';
import Products from '../components/products';
import Testimonials from '../components/testimonials';
import About from '../components/about';
import Footer from '../components/footer';

function Home() {
  return (
    <div className="App">
      <Navigation />
      <Header />
      <Products />
      <Testimonials />
      <About />
      <Footer />
    </div>
  );
}

export default Home;