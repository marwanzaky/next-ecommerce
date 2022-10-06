import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import CartItems from '../../utils/cartItems';
import Settings from '../../utils/settings';

function Nav(props) {
    return (
        <li>
            <Link href={props.href}>
                <a>{props.name}</a>
            </Link>
        </li>
    )
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
        <Link href='/cart'>
            <a className='nav-btn nav-btn-icon'>
                <span className="material-symbols-outlined">shopping_cart</span>
                <div className='nav-button-cart-length' style={buttonCartLengthStyle}>{cartItemsLength}</div>
            </a>
        </Link>
    )
}

function Navigation() {
    return (
        <nav>
            <div className='main-nav-promo'>Welcome to our Store!</div>
            <div className="xl:container xl:mx-auto p-5 main-nav-box">
                <Link href='/'><a className='logo'>{Settings.name}</a></Link>

                <ul className='main-nav'>
                    <Nav href='/' name='Home' />
                    <Nav href='/products' name='Shop' />
                    <Nav href='/about' name='About' />
                    <Nav href='/contact' name='Contact' />
                </ul>

                <div>
                    <NavBtn href='/signin' icon='person' />
                    <ButtonCart />
                </div>
            </div>
        </nav >
    )
}

function NavBtn(props) {
    {/* <a href='/signin' className='nav-btn' ><span className="material-symbols-outlined">person</span></a> */ }
    {/* <a href='/favourite' className='button-icon' ><span className="material-symbols-outlined">favorite</span></a> */ }

    return (
        <Link href={props.href}>
            <a className='nav-btn' >
                <span className="material-symbols-outlined">{props.icon}</span>
            </a>
        </Link>
    )
}

export default Navigation;