import Navigation from '../sections/Navigation';
import CancelSection from '../sections/Cancel';
import About from '../sections/About';
import Footer from '../sections/Footer';

function Cancel() {
    return (
        <div className="App">
            <Navigation />
            <CancelSection />
            <About />
            <Footer />
        </div>
    );
}

export default Cancel;