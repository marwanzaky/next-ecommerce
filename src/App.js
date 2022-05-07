import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import ContactPage from './pages/ContactPage';
import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element=''> */}
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="product" element={<Product />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="about" element={<AboutPage />} />

        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
