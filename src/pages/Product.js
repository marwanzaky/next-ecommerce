import React from 'react';

import Navigation from '../sections/Navigation';
import YouMayAlsoLike from '../sections/YouMayAlsoLike';
import About from '../sections/About';
import Footer from '../sections/Footer';

class Product extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            loaded: false
        };
    }

    componentDidMount() {
        fetch('http://127.0.0.1:8000/products')
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    data: json,
                    loaded: true
                });
            });
    }

    render() {
        const { loaded, data } = this.state;
        const id = window.location.search.split('=')[1];

        if (!loaded) return <section className='container'>
            <h1>Loading...</h1>
        </section>;

        return <>
            <section className='container product-details-box'>
                <div className='row'>
                    <div className='col-sm-6 p-4 product-details-img'>
                        <img src={"http://127.0.0.1:8000/" + data[id].src} />
                    </div>

                    <div className='col-sm-6 p-4 product-details-info'>
                        <h1 className='product-details-name' >{data[id].name}</h1>
                        <p className='product-details-reviews'>★★★★★ ({data[id].reviews})</p>
                        <p className='product-details-price'>${data[id].price}</p>
                        <button className='btn-base btn-ghost-grey'>Add to cart</button>
                        <button className='btn-base btn-full'>Buy it now</button>
                        <NewlineText text={data[id].description} />
                    </div>
                </div>
            </section>

            <YouMayAlsoLike />
        </>;
    }
}

function NewlineText(props) {
    const text = props.text;
    return <div className='product-details-description'>{text}</div>;
}

function App() {
    return (
        <div className="App">
            <Navigation />
            <Product />
            <About />
            <Footer />
        </div>
    )
}

export default App;
