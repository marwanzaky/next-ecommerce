import React from 'react';

import NavigationSection from '../sections/Navigation';
import RefundPolicySection from '../sections/RefundPolicy';
import FooterSection from '../sections/Footer';

function RefundPolicy() {
    return (
        <div className="App">
            <NavigationSection />
            <RefundPolicySection />
            <FooterSection />
        </div>
    )
}

export default RefundPolicy;