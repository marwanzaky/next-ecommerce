import Navigation from '../sections/Navigation';
import SuccessSection from '../sections/Success';
import About from '../sections/About';
import Footer from '../sections/Footer';

function Success() {
    return (
        <div className="App">
            <Navigation />
            <SuccessSection />
            <About />
            <Footer />
        </div>
    );
}

export default Success;