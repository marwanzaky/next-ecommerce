import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import CartItems from '../../utils/cartItems';
import Settings from '../../utils/settings';

function Nav({ href, name }) {
    return <li>
        <Link href={href}>
            <a id={`${name.toLowerCase()}`}>{name}</a>
        </Link>
    </li>
}

function NavBtn(props) {
    return <Link href={props.href}>
        <a className='nav-btn' >
            <span className="material-symbols-outlined">{props.icon}</span>
        </a>
    </Link>
}

function NavBtnCart({ cartItemsLength }) {
    const buttonCartLengthStyle = {
        display: 'none'
    }

    if (cartItemsLength > 0)
        buttonCartLengthStyle.display = 'flex';

    return <Link href='/cart'>
        <a className='nav-btn nav-btn-icon'>
            <span className="material-symbols-outlined">shopping_cart</span>
            <div className='nav-button-cart-length' style={buttonCartLengthStyle}>{cartItemsLength}</div>
        </a>
    </Link>
}

function Navigation() {
    const [cartItemsLength, setCartItemsLength] = useState(0);

    useEffect(() => {
        setCartItemsLength(CartItems.items.length);
    }, []);

    return <nav>
        <div className='main-nav-promo'>Free shipping on orders over $50</div>
        <div className="xl:container xl:mx-auto p-5 main-nav-box">
            <Link href='/'><a className='logo'>{Settings.name}</a></Link>

            <ul className='hidden sm:block main-nav'>
                <Nav href='/' name='Home' />
                <Nav href='/products' name='Shop' />
                <Nav href='/about' name='About' />
                <Nav href='/contact' name='Contact' />
            </ul>

            <div>
                <NavBtn href='/signin' icon='person' />
                <NavBtnCart cartItemsLength={cartItemsLength} />
            </div>
        </div>
    </nav>
}

export default Navigation;