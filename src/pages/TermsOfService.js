import React from 'react';

import NavigationSection from '../sections/Navigation';
import TermsOfServiceSection from '../sections/TermsOfService';
import FooterSection from '../sections/Footer';

function TermsOfService() {
    return (
        <div className="App">
            <NavigationSection />
            <TermsOfServiceSection />
            <FooterSection />
        </div>
    )
}

export default TermsOfService;