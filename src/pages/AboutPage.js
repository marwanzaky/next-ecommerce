import NavigationSection from '../sections/Navigation';
import AboutSection from '../sections/About';
import FooterSection from '../sections/Footer';

function AboutPage() {
    return (
        <div className="App">
            <NavigationSection />
            <AboutSection />
            <FooterSection />
        </div>
    );
}

export default AboutPage;