import Navigation from './sections/Navigation';
import Header from './sections/Header';
import Products from './sections/Products';
import Testimonials from './sections/Testimonials';
import About from './sections/About';
import Footer from './sections/Footer';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Header />
      <Products />
      <Testimonials />
      <About />
      <Footer />
    </div>
  );
}

export default App;
