import Navigation from '../components/navigation';
import CartComponent from "../components/cart";
import About from '../components/about';
import Footer from '../components/footer';

function Cart() {
    return (
        <div className="App">
            <Navigation />
            <CartComponent />
            <About />
            <Footer />
        </div>
    );
}

export default Cart;