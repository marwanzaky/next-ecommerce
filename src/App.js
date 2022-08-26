import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './pages/Home';
import ShopPage from './pages/Shop';
import ProductPage from './pages/Product';
import CartPage from "./pages/Cart";
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import SuccessPage from './pages/Success'
import CancelPage from './pages/Cancel'

function App() {
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

                <Route path="success" element={<SuccessPage />} />
                <Route path="cancel" element={<CancelPage />} />
                {/* </Route> */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;