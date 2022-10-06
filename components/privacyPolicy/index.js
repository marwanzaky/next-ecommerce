import React from 'react';
import Settings from '../../utils/settings';

function PrivacyPolicy() {
    return <section className='section-refund-policy'>
        <div className='xl:container xl:mx-auto'>
            <h2>Privacy Policy</h2>

            <h4>Privacy Policy</h4>
            <p>
                This Privacy Policy describes how {Settings.website} (the “Site” or “we”) collects, uses, and discloses your Personal Information when you visit or make a purchase from the Site.
            </p>

            <h4>Collecting Personal Information</h4>
            <p>
                When you visit the Site, we collect certain information about your device, your interaction with the Site, and information necessary to process your purchases. We may also collect additional information if you contact us for customer support. In this Privacy Policy, we refer to any information that can uniquely identify an individual (including the information below) as “Personal Information”. See the list below for more information about what Personal Information we collect and why.
            </p>
        </div>
    </section>
}

export default PrivacyPolicy;