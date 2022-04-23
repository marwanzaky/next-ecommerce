import React from 'react';

import { IonIcon } from '@ionic/react';
import { cartOutline } from 'ionicons/icons'
import { heartOutline } from 'ionicons/icons'

function Nav(props) {
    return <li>
        <button>{props.name}</button>
    </li>
}

function Navigation() {
    return <nav className='container'>
        <div className="main-nav-box">
            <button className="logo">Mamolio</button>

            <ul className="main-nav">
                <Nav name='Home' />
                <Nav name='Shop' />
                <Nav name='Contact' />
            </ul>

            <div>
                <button className='button-icon' ><IonIcon src={heartOutline} /></button>
                <button className='button-icon' ><IonIcon src={cartOutline} /></button>
            </div>
        </div>
    </nav >
}

export default Navigation;