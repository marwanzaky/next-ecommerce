import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import CartItems from '../../utils/cartItems';
import { BtnImg } from '../../utils/components/btn';
import User from '../../utils/user';

function Avatar() {
    const router = useRouter();
    const [user, setUser] = useState([]);

    const me = event => {
        event.preventDefault();
        router.push('/me');
    }

    useEffect(() => {
        setUser(User.getUser());
    }, []);

    return <BtnImg src={`${process.env.NEXT_PUBLIC_SERVER}/imgs/users/${user.photo}`} onClick={me} />
}

function Nav({ href, name }) {
    return <li>
        <Link href={href}>
            <a id={`${name.toLowerCase()}`}>{name}</a>
        </Link>
    </li>
}

function NavBtn({ href, icon }) {
    return <Link href={href}>
        <a className='nav-btn' >
            <span className='material-symbols-outlined'>{icon}</span>
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
            <span className='material-symbols-outlined'>shopping_cart</span>
            <div className='nav-button-cart-length' style={buttonCartLengthStyle}>{cartItemsLength}</div>
        </a>
    </Link>
}

function Navigation() {
    const [token, setToken] = useState('');
    const [cartItemsLength, setCartItemsLength] = useState(0);

    useEffect(() => {
        setToken(User.getToken());
        setCartItemsLength(CartItems.items.length);
    }, []);

    return <nav>
        <div className='main-nav-promo'>Free shipping on orders over $50</div>
        <div className='xl:container xl:mx-auto p-5 main-nav-box'>
            <Link href='/'><a className='logo'>{process.env.NEXT_PUBLIC_NAME}</a></Link>

            <ul className='hidden sm:block main-nav'>
                <Nav href='/' name='Home' />
                <Nav href='/products' name='Shop' />
                <Nav href='/about' name='About' />
                <Nav href='/contact' name='Contact' />
            </ul>

            <div className='flex flex-row'>
                {token ? <Avatar /> : <NavBtn href='/signin' icon='person' />}
                <NavBtnCart cartItemsLength={cartItemsLength} />
            </div>
        </div>
    </nav>
}

export default Navigation;