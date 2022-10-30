'use client';

import { useState, useEffect } from 'react';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

import CartItems from '../../utils/cartItems';
import User from '../../utils/user';

import { BtnImg } from '../../utils/components/btn';
import ListIcon from '../../utils/components/listIcon';

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

function ListIconCart({ length, href, icon }) {
    const lengthStyle = {
        display: 'none'
    };

    if (length > 0)
        lengthStyle.display = 'flex';

    return <ListIcon className='li-icon-cart' href={href} icon={icon}>
        <div className='li-icon-cart-length' style={lengthStyle}>{length}</div>
    </ListIcon>
}

function Navigation() {
    const [token, setToken] = useState('s');
    const [cartItemsLength, setCartItemsLength] = useState(0);

    useEffect(() => {
        setToken(User.getToken());
        setCartItemsLength(CartItems.items.length);
    }, []);

    return <nav>
        <div className='main-nav-promo'>Free shipping on orders over $50</div>
        <div className='xl:container xl:mx-auto p-5 main-nav-box'>
            <Link href='/' className='logo'>{process.env.NEXT_PUBLIC_NAME}</Link>

            <ul className='hidden sm:block main-nav'>
                <List href='/' name='Home' />
                <List href='/products' name='Shop' />
                <List href='/about' name='About' />
                <List href='/contact' name='Contact' />
            </ul>

            <div className='flex flex-row'>
                {/* {token ? <Avatar /> : <ListIcon href='/signin' icon='person' />} */}
                <ListIconCart href='/cart' icon='shopping_cart' length={cartItemsLength} />
            </div>
        </div>
    </nav>

    function List({ href, name }) {
        return <li><Link href={href}>{name}</Link></li>
    }
}

export default Navigation;