import React from 'react';

import Navigation from '../sections/Navigation';
import YouMayAlsoLike from '../sections/YouMayAlsoLike';
import About from '../sections/About';
import Footer from '../sections/Footer';

const server = 'https://storio-api.herokuapp.com';

class Product extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            loaded: false
        };
    }

    componentDidMount() {
        fetch(server + '/products')
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
                    <div className='col-sm-6 p-4'>
                        <div className='product-details-img'>
                            <img className='product-details-preview' src={`${server}/` + data[id].pictures[0]} alt={data[id].name} />
                            <div className='product-details-pictures'>
                                {data[id].pictures.map(el => <div className='product-details-picture'>
                                    <img src={`${server}/` + el} alt={data[id].name}></img>
                                </div>)}
                            </div>
                        </div>
                    </div>

                    <div className='col-sm-6 p-4'>
                        <div className='product-details-info'>
                            <h1 className='product-details-name' >{data[id].name}</h1>
                            <p className='product-details-reviews'>★★★★★ ({data[id].reviews.length})</p>
                            <p className='product-details-price'>${data[id].price}</p>
                            <button className='btn-base btn-ghost-grey'>Add to cart</button>
                            <button className='btn-base btn-full'>Buy it now</button>
                            <NewlineText text={data[id].description} />
                        </div>

                        <div className='product-details-reviews'>
                            <h2>Customer Reviews</h2>

                            {data[id].reviews.map(el => <div className='product-details-review'>
                                <p className='product-details-review-fullname'>{el.fullname} - <span>{el.date}</span></p>
                                <p className='product-details-review-stars'>{el.stars}</p>
                                <p className='product-details-review-review'>{el.review}</p>
                            </div>)}
                        </div>
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
