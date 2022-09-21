// React...
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Settings...
import Settings from './js/settings';

// Pages...
import HomePage from './pages/Home';

import ShopPage from './pages/Shop';
import ProductPage from './pages/Product';
import CartPage from "./pages/Cart";

import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';

import RefundPolicyPage from './pages/RefundPolicy';
import ShippingPolicyPage from './pages/ShippingPolicy';
import TermsOfServicePage from './pages/TermsOfService';
import PrivacyPolicyPage from './pages/PrivacyPolicy';

import SuccessPage from './pages/Success'
import CancelPage from './pages/Cancel'

function App() {
    document.title = Settings.name;

    return (
        <BrowserRouter>
            <Routes>
                {/* <Route path="/" element=''> */}
                <Route index element={<HomePage />} />

                <Route path="shop" element={<ShopPage />} />
                <Route path="product" element={<ProductPage />} />
                <Route path="cart" element={<CartPage />} />

                <Route path="contact" element={<ContactPage />} />
                <Route path="about" element={<AboutPage />} />

                <Route path="refund-policy" element={<RefundPolicyPage />} />
                <Route path="shipping-policy" element={<ShippingPolicyPage />} />
                <Route path="terms-of-service" element={<TermsOfServicePage />} />
                <Route path="privacy-policy" element={<PrivacyPolicyPage />} />

                <Route path="success" element={<SuccessPage />} />
                <Route path="cancel" element={<CancelPage />} />
                {/* </Route> */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;