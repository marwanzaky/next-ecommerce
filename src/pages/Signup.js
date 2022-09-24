import React from 'react';

import NavigationSection from '../sections/Navigation';
import SignupSection from '../sections/Signup';
import FooterSection from '../sections/Footer';

function Signup() {
    return (
        <div className="App">
            <NavigationSection />
            <SignupSection />
            <FooterSection />
        </div>
    )
}

export default Signup;