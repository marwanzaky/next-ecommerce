import React from 'react';

import { IonIcon } from '@ionic/react';
import { heartOutline } from 'ionicons/icons'

function Photo(props) {
    return (
        <div className='instagram-photo'>
            <a href={props.url}><img src={'http://127.0.0.1:8000/' + props.src}></img></a>
            <IonIcon className='instagram-icon' src={heartOutline} />
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
        fetch('http://127.0.0.1:8000/instagram')
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
                    {data.map(el => <Photo src={el.src} url={el.url} />)}
                </div>
            </section>
        );
    }
}

export default Instagram;