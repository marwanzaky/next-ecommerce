import React from 'react';

import NavigationComponent from '../components/navigation';
import ShippingPolicyComponent from '../components/shippingPolicy';
import FooterComponent from '../components/footer';

function ShippingPolicy() {
    return (
        <div className="App">
            <NavigationComponent />
            <ShippingPolicyComponent />
            <FooterComponent />
        </div>
    )
}

export default ShippingPolicy;