import Layout from '../components/layout';
import CancelComponent from '../components/cancel';
import AboutComponent from '../components/about';

function Cancel() {
    return <Layout title='Cancel'>
        <CancelComponent />
        <AboutComponent />
    </Layout>
}

export default Cancel;