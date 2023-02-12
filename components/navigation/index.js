'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import Link from 'next/link';
import Image from 'next/image';

import User from '@utils/user';
import Cart from '@utils/cart';
import Icon from '@ui/Icon';

function Avatar() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        setUser(User.getUser());
    }, []);

    return <Link className='nav-btn' href='/me'>
        <Image className='rounded-full !filter-none' src={`${process.env.NEXT_PUBLIC_SERVER}/imgs/users/${user?.photo}`} width={24} height={24} />
    </Link>
}

function NavBtn({ href, icon }) {
    return <Link className='nav-btn' href={href}>
        <Icon icon={icon} />
    </Link>
}

function NavBtnLength({ href, icon, length }) {
    const lengthStyle = {
        display: length > 0 ? 'flex' : 'none'
    }

    return <Link className='nav-btn nav-btn-length' href={href}>
        <Icon icon={icon} />
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
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        setToken(User.getToken());
        setCartItems(Cart.items);
    }, []);

    return <nav>
        <div className='nav-promo'>Free shipping on orders over $50</div>
        <div className='nav-box'>
            <Link className='logo' href='/'>{process.env.NEXT_PUBLIC_NAME}</Link>

            <ul className='nav-ul'>
                <NavLi href='/' name='Home' />
                <NavLi href='/products' name='Shop' />
                {process.env.NEXT_PUBLIC_ABOUT === 'true' && <NavLi href='/about' name='About' />}
                <NavLi href='/contact' name='Contact' />
            </ul>

            <div className='flex flex-row'>
                {token ?
                    process.env.NEXT_PUBLIC_ACCOUNT === 'true' && <Avatar /> :
                    process.env.NEXT_PUBLIC_ACCOUNT === 'true' && <NavBtn href='/signin' icon='person' />
                }

                <NavBtnLength href='/cart' icon='shopping_cart' length={cartItems.length} />
            </div>
        </div>
    </nav>
}