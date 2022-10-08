import NavigationComponent from '../components/navigation';
import CancelComponent from '../components/cancel';
import AboutComponent from '../components/about';
import FooterComponent from '../components/footer';

function Cancel() {
    return <div className='App'>
        <NavigationComponent />
        <CancelComponent />
        <AboutComponent />
        <FooterComponent />
    </div>
}

export default Cancel;