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
    return <nav>
        <div className="container main-nav-box">
            <a href='/' className="logo">Storio</a>

            <ul className="main-nav">
                <Nav href='/' name='Home' />
                <Nav href='/shop' name='Shop' />
                <Nav href='/about' name='About' />
                <Nav href='/contact' name='Contact' />
            </ul>

            <div>
                <a href='/favourite' className='button-icon' ><IonIcon src={heartOutline} /></a>
                <a href='/cart' className='button-icon' ><IonIcon src={cartOutline} /></a>
            </div>
        </div>
    </nav >
}

export default Navigation;