import React from 'react';
import Settings from '../js/settings';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

function Photo(props) {
    return (
        <div className='instagram-photo'>
            <a href={props.url}><img src={`${Settings.server}/` + props.src} alt={props.alt}></img></a>
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
        fetch(Settings.server + '/instagram')
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
                <div className="instagram-box">
                    {data.map(el => <Photo src={el.src} url={el.url} alt={el.name} />)}
                </div>
            </section>
        );
    }
}

export default Instagram;