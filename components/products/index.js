import React from 'react';
import ProductsComponent from '../../utils/components/products';
import Settings from '../../utils/settings';

class Products extends React.Component {
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
        const { loaded, data } = this.state;

        if (!loaded)
            return <></>

        return <ProductsComponent title='Featured Collection' data={data} />
    }
}

export default Products;