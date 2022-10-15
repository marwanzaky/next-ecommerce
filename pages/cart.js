import Navigation from '../components/navigation';
import CartComponent from "../components/cart";
import Footer from '../components/footer';

function Cart() {
    return <div className="App">
        <Navigation />
        <CartComponent />
        <Footer />
    </div>
}

export default Cart;