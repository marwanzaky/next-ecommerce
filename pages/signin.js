import React from 'react';

import NavigationComponent from '../components/navigation';
import SigninComponent from '../components/signin';
import FooterComponent from '../components/footer';

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