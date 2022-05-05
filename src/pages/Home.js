import Navigation from '../sections/Navigation';
import Header from '../sections/Header';
import Products from '../sections/Products';
import Testimonials from '../sections/Testimonials';
import Instagram from '../sections/Instagram';
import About from '../sections/About';
import Footer from '../sections/Footer';

function Home() {
    return (
        <div className="App">
            <Navigation />
            <Header />
            <Products />
            <Testimonials />
            <Instagram />
            <About />
            <Footer />
        </div>
    );
}

export default Home;
