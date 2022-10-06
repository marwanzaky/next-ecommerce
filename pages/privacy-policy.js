import React from 'react';

import NavigationComponent from '../components/navigation';
import PrivacyPolicyComponent from '../components/privacyPolicy';
import FooterComponent from '../components/footer';

function ShippingPolicy() {
    return (
        <div className="App">
            <NavigationComponent />
            <PrivacyPolicyComponent />
            <FooterComponent />
        </div>
    )
}

export default ShippingPolicy;