import NavigationComponent from '../components/navigation';
import SuccessComponent from '../components/success';
import AboutComponent from '../components/about';
import FooterComponent from '../components/footer';

function Success() {
    return <div className='App'>
        <NavigationComponent />
        <SuccessComponent />
        <AboutComponent />
        <FooterComponent />
    </div>
}

export default Success;