import React from 'react';
import Server from '../js/server';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

function Photo(props) {
    return (
        <div className='instagram-photo'>
            <a href={props.url}><img src={`${Server}/` + props.src} alt={props.alt}></img></a>
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
        fetch(Server + '/instagram')
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

        if (!loaded)
            return <></>;

        return (
            <section className="section-instagram">
                <div className="grid grid-cols-2 md:grid-cols-5 instagram-box">
                    {data.map(el => <Photo src={el.src} url={el.url} alt={el.name} />)}
                </div>
            </section>
        );
    }
}

export default Instagram;