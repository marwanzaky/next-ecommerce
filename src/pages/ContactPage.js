import NavigationSection from '../sections/Navigation';
import ContactSection from '../sections/Contact';
import AboutSection from '../sections/About';
import FooterSection from '../sections/Footer';

function ContactPage() {
    return (
        <div className="App">
            <NavigationSection />
            <ContactSection />
            <AboutSection />
            <FooterSection />
        </div>
    );
}

export default ContactPage;
