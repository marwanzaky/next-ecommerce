import React from 'react';

import NavigationComponent from '../components/navigation';
import TermsOfServiceComponent from '../components/termsOfService';
import FooterComponent from '../components/footer';

function TermsOfService() {
    return (
        <div className="App">
            <NavigationComponent />
            <TermsOfServiceComponent />
            <FooterComponent />
        </div>
    )
}

export default TermsOfService;