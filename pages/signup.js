import React from 'react';

import NavigationComponent from '../components/navigation';
import SignupComponent from '../components/signup';
import FooterComponent from '../components/footer';

function Signup() {
    return <div className="App">
        <NavigationComponent />
        <SignupComponent />
        <FooterComponent />
    </div>
}

export default Signup;