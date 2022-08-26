import NavigationSection from '../sections/Navigation';
import CartSection from "../sections/Cart";
import AboutSection from '../sections/About';
import FooterSection from '../sections/Footer';

function Cart() {
    return (
        <div className="App">
            <NavigationSection />
            <CartSection />
            <AboutSection />
            <FooterSection />
        </div>
    );
}

export default Cart;