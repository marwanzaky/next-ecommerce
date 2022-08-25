import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

const server = 'https://storio-api.herokuapp.com';

function Photo(props) {
    return (
        <div className='instagram-photo'>
            <a href={props.url}><img src={`${server}/` + props.src} alt={props.alt}></img></a>
            <FontAwesomeIcon className='instagram-icon' icon={faInstagram} />
        </div>
    )
}

class Instagram extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            loaded: false
        };
    }

    componentDidMount() {
        fetch(server + '/instagram')
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

        if (!loaded) return <section className='container'>
            <h1>Loading...</h1>
        </section>;

        return (
            <section className="section-instagram">
                <div className="instagram-box">
                    {data.map(el => <Photo src={el.src} url={el.url} alt={el.name} />)}
                </div>
            </section>
        );
    }
}

export default Instagram;