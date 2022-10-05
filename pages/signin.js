import React from 'react';

import NavigationComponent from '../components/navigation';
import SigninComponent from '../components/Signin';
import FooterComponent from '../components/Footer';

function Signin() {
    return (
        <div className="App">
            <NavigationComponent />
            <SigninComponent />
            <FooterComponent />
        </div>
    )
}

export default Signin;