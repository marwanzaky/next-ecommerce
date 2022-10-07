import React from 'react';

import Navigation from '../../components/navigation';
import ProductComponent from '../../components/product';
import YouMayAlsoLike from '../../components/youMayAlsoLike';
import About from '../../components/about';
import Footer from '../../components/footer';

import Settings from '../../utils/settings';

class Product extends React.Component {
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
        let id = 0;
        const { loaded, data } = this.state;

        if (typeof window !== "undefined")
            id = window.location.pathname.replace('/product/', '') * 1;

        if (!loaded)
            return <></>

        return <>
            <ProductComponent id={id} data={data} />
            <YouMayAlsoLike />
        </>
    }
}

export default function App() {
    return <div className="App">
        <Navigation />
        <Product />
        <About />
        <Footer />
    </div>
}

// export async function getServerSideProps({ params }) {
//     const req = await fetch(`${Settings.server}/products/${params.id}`);
//     const json = await req.json();

//     return {
//         props: { product: json.data.product }
//     }
// }

// export async function getStaticProps({ params }) {
//     const req = await fetch(`https://storio-server.herokuapp.com/api/v1/products/${params.id}`);
//     const data = await req.json();

//     return {
//         props: { product: data }
//     }
// }

// export async function getStaticPaths() {
//     const req = await fetch('https://storio-server.herokuapp.com/api/v1/products');
//     const data = await req.json();

//     const paths = data.map(product => {
//         return { params: { id: product.id.toString() } }
//     });

//     return {
//         paths,
//         fallback: false
//     }
// }