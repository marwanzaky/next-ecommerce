import Layout from '../components/layout';

import SuccessComponent from '../components/success';
import AboutComponent from '../components/about';

function Success() {
    return <Layout title='Success'>
        <SuccessComponent />
        <AboutComponent />
    </Layout>
}

export default Success;