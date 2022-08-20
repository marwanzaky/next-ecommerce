import Navigation from '../sections/Navigation';
import Cart from "../sections/Cart";
import About from '../sections/About';
import Footer from '../sections/Footer';

function CartPage() {
    return (
        <div className="App">
            <Navigation />
            <Cart />
            <About />
            <Footer />
        </div>
    );
}

export default CartPage;