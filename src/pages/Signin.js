import React from 'react';

import NavigationSection from '../sections/Navigation';
import SigninSection from '../sections/Signin';
import FooterSection from '../sections/Footer';

function Signin() {
    return (
        <div className="App">
            <NavigationSection />
            <SigninSection />
            <FooterSection />
        </div>
    )
}

export default Signin;