import React from 'react';

import CartItems from '../js/cartItems';
import Settings from '../js/settings';

function Nav(props) {
    return <li><a href={props.href}>{props.name}</a></li>
}

function ButtonCart() {
    const buttonCartLengthStyle = {
        display: 'none'
    }

    if (CartItems.items.length > 0)
        buttonCartLengthStyle.display = 'flex';

    return <a href='/cart' className='nav-button-cart' >
        {/* <IonIcon src={cartOutline} /> */}
        <span class="material-symbols-outlined">shopping_cart</span>
        <div className='nav-button-cart-length' style={buttonCartLengthStyle} >{CartItems.items.length}</div>
    </a>
}

class Navigation extends React.Component {
    render() {
        return (
            <nav>
                <div className='main-nav-promo'>Welcome to our Store!</div>
                <div className="xl:container xl:mx-auto p-5 main-nav-box">
                    <a href='/' className="logo">{Settings.name}</a>

                    <ul className="main-nav">
                        <Nav href='/' name='Home' />
                        <Nav href='/shop' name='Shop' />
                        <Nav href='/about' name='About' />
                        <Nav href='/contact' name='Contact' />
                    </ul>

                    <div>
                        {/* <a href='/favourite' className='button-icon' ><IonIcon src={heartOutline} /></a> */}
                        <ButtonCart />
                    </div>
                </div>
            </nav >
        )
    }
}

export default Navigation;