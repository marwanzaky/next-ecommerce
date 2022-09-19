import React from 'react';

import NavigationSection from '../sections/Navigation';
import PrivacyPolicySection from '../sections/PrivacyPolicy';
import FooterSection from '../sections/Footer';

function ShippingPolicy() {
    return (
        <div className="App">
            <NavigationSection />
            <PrivacyPolicySection />
            <FooterSection />
        </div>
    )
}

export default ShippingPolicy;