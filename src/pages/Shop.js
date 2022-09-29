import NavigationSection from '../sections/Navigation';
import ProductsSection from '../sections/Products';
import FooterSection from '../sections/Footer';

function Shop() {
    return (
        <div className="App">
            <NavigationSection />
            <ProductsSection />
            <FooterSection />
        </div>
    );
}

export default Shop;
