import React from 'react';

import { IonIcon } from '@ionic/react';
import { cartOutline } from 'ionicons/icons'
import { heartOutline } from 'ionicons/icons'

function Nav(props) {
    return <li>
        <a href={props.href}>{props.name}</a>
    </li>
}

function Navigation() {
    return <nav className='container'>
        <div className="main-nav-box">
            <a href='/' className="logo">Mamolio</a>

            <ul className="main-nav">
                <Nav href='/' name='Home' />
                <Nav href='/shop' name='Shop' />
                <Nav href='/contact' name='Contact' />
            </ul>

            <div>
                <button className='button-icon' ><IonIcon src={heartOutline} /></button>
                <button className='button-icon' ><IonIcon src={cartOutline} /></button>
            </div>
        </div>
    </nav >
}

export default Navigation;