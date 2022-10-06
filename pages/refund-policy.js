import React from 'react';

import NavigationComponent from '../components/navigation';
import RefundPolicyComponent from '../components/refundPolicy';
import FooterComponent from '../components/footer';

function RefundPolicy() {
    return <div className="App">
        <NavigationComponent />
        <RefundPolicyComponent />
        <FooterComponent />
    </div>
}

export default RefundPolicy;