import NavigationSection from '../sections/Navigation';
import ContactSection from '../sections/Contact';
import FooterSection from '../sections/Footer';

function ContactPage() {
    return (
        <div className="App">
            <NavigationSection />
            <ContactSection />
            <FooterSection />
        </div>
    );
}

export default ContactPage;