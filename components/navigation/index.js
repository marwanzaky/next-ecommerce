'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import Link from 'next/link';
import Image from 'next/image';

import User from '@utils/user';
import CartItems from '@utils/cartItems';

function Avatar() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        setUser(User.getUser());
    }, []);

    return <Link className='nav-btn' href='/me'>
        <Image className='rounded-full' src={`${process.env.NEXT_PUBLIC_SERVER}/imgs/users/${user?.photo}`} width={24} height={24} />
    </Link>
}

function NavBtn({ href, icon }) {
    return <Link className='nav-btn' href={href}>
        <span className='material-symbols-outlined'>{icon}</span>
    </Link>
}

function NavBtnLength({ href, icon, length }) {
    const lengthStyle = {
        display: length > 0 ? 'flex' : 'none'
    }

    return <Link className='nav-btn nav-btn-length' href={href}>
        <span className='material-symbols-outlined'>{icon}</span>
        <div className='length' style={lengthStyle}>{length}</div>
    </Link>
}

function NavLi({ href, name }) {
    const pathname = usePathname();
    let select = pathname === href;

    if (href === '/products' && pathname.includes('/product'))
        select = true;

    return <li>
        <Link className={select && 'select'} href={href}>{name}</Link>
    </li>
}

export default function Navigation() {
    const [token, setToken] = useState('');
    const [cartItems, setCartItems] = useState(0);

    useEffect(() => {
        setToken(User.getToken());
        setCartItems(CartItems.items);
    }, []);

    return <nav>
        <div className='nav-promo'>Free shipping on orders over $50</div>
        <div className='nav-box'>
            <Link className='logo' href='/'>{process.env.NEXT_PUBLIC_NAME}</Link>

            <ul className='nav-ul'>
                <NavLi href='/' name='Home' />
                <NavLi href='/products' name='Shop' />
                <NavLi href='/about' name='About' />
                <NavLi href='/contact' name='Contact' />
            </ul>

            <div className='flex flex-row'>
                {token ?
                    <Avatar /> :
                    <NavBtn href='/signin' icon='person' />
                }

                <NavBtnLength href='/cart' icon='shopping_cart' length={cartItems.length} />
            </div>
        </div>
    </nav>
}