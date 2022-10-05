import React, { useState, useEffect } from 'react';

import CartItems from '../../utils/cartItems';
import Settings from '../../utils/settings';

function Nav(props) {
    return <li><a href={props.href}>{props.name}</a></li>
}

function ButtonCart() {
    const [cartItemsLength, setCartItemsLength] = useState(0);

    const buttonCartLengthStyle = {
        display: 'none'
    }

    if (cartItemsLength > 0)
        buttonCartLengthStyle.display = 'flex';

    useEffect(() => {
        setCartItemsLength(CartItems.items.length);
    });

    return (
        <a href='/cart' className='nav-btn nav-btn-icon' >
            <span className="material-symbols-outlined">shopping_cart</span>
            <div className='nav-button-cart-length' style={buttonCartLengthStyle}>{cartItemsLength}</div>
        </a>
    )
}

function Navigation() {
    return (
        <nav>
            <div className='main-nav-promo'>Welcome to our Store!</div>
            <div className="xl:container xl:mx-auto p-5 main-nav-box">
                <a href='/' className="logo">{Settings.name}</a>

                <ul className='main-nav'>
                    <Nav href='/' name='Home' />
                    <Nav href='/products' name='Shop' />
                    <Nav href='/about' name='About' />
                    <Nav href='/contact' name='Contact' />
                </ul>

                <div>
                    <a href='/signin' className='nav-btn' ><span className="material-symbols-outlined">person</span></a>
                    {/* <a href='/favourite' className='button-icon' ><span className="material-symbols-outlined">favorite</span></a> */}
                    <ButtonCart />
                </div>
            </div>
        </nav >
    )
}

export default Navigation;