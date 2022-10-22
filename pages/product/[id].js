import React from 'react';

import Layout from '../../components/layout';

import ProductComponent from '../../components/product';
import YouMayAlsoLike from '../../components/youMayAlsoLike';

import Settings from '../../utils/settings';
import { convertIdToName } from '../../utils/convertStr';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loaded: false
        };
    }

    async componentDidMount() {
        const res = await fetch(Settings.server + '/products');
        const json = await res.json();

        this.setState({
            data: json.data.products,
            loaded: true
        });
    }

    render() {
        let product = {};
        const { loaded, data } = this.state;

        if (loaded && typeof window !== 'undefined') {
            const id = window.location.pathname.replace('/product/', '');
            product = data.find(el => el.name === convertIdToName(id));
        }

        if (!loaded)
            return <></>

        return <Layout title={product.name}>
            <ProductComponent product={product} />
            <YouMayAlsoLike />
        </Layout>
    }
}

export default App;

// export async function getServerSideProps({ params }) {
//     const req = await fetch(`${Settings.server}/products/${params.id}`);
//     const json = await req.json();

//     return {
//         props: { product: json.data.product }
//     }
// }

// export async function getStaticProps({ params }) {
//     const req = await fetch(`${Settings.server}/products/${params.id}`);
//     const json = await req.json();

//     return {
//         props: { product: json.data.product }
//     }
// }

// export async function getStaticPaths() {
//     const req = await fetch(`${Settings.server}/products`);
//     const json = await req.json();

//     const paths = json.data.products.map(product => {
//         return { params: { id: convertNameToId(product.name) } }
//     });

//     return {
//         paths,
//         fallback: false
//     }
// }