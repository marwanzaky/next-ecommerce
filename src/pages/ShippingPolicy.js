import React from 'react';

import NavigationSection from '../sections/Navigation';
import ShippingPolicySection from '../sections/ShippingPolicy';
import FooterSection from '../sections/Footer';

function ShippingPolicy() {
    return (
        <div className="App">
            <NavigationSection />
            <ShippingPolicySection />
            <FooterSection />
        </div>
    )
}

export default ShippingPolicy;