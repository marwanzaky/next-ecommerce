import NavigationComponent from '../components/navigation';
import AboutComponent from '../components/about';
import FooterComponent from '../components/footer';

function AboutPage() {
    return <div className="App">
        <NavigationComponent />
        <AboutComponent />
        <FooterComponent />
    </div>
}

export default AboutPage;