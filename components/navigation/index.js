'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import Link from 'next/link';

import User from '@utils/user';
import Cart from '@utils/cart';

import { ButtonIcon, ButtonIconImage } from '@ui/Button';

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
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [token, setToken] = useState('');
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        setUser(User.getUser());
        setToken(User.getToken());
        setCartItems(Cart.items);
    }, []);

    const signin = event => {
        event.preventDefault();
        router.push('/signin');
    }

    const cart = event => {
        event.preventDefault();
        router.push('/cart');
    }

    const me = event => {
        event.preventDefault();
        router.push('/me');
    }

    console.log(cartItems.length)

    return <nav>
        <div className='nav-promo'>Free shipping on orders over $50</div>
        <div className='nav-box'>
            <div className='box-left'>
                <Link className='logo' href='/'>{process.env.NEXT_PUBLIC_NAME}</Link>
            </div>

            <div className='box-center'>
                <ul className='nav-ul'>
                    <NavLi href='/' name='Home' />
                    <NavLi href='/products' name='Shop' />
                    {process.env.NEXT_PUBLIC_ABOUT === 'true' && <NavLi href='/about' name='About' />}
                    <NavLi href='/contact' name='Contact' />
                </ul>
            </div>

            <div className='box-right'>
                <div className='flex flex-row'>
                    {token ?
                        process.env.NEXT_PUBLIC_ACCOUNT === 'true' && <ButtonIconImage src={`${process.env.NEXT_PUBLIC_SERVER}/imgs/users/${user?.photo}`} onClick={me} /> :
                        process.env.NEXT_PUBLIC_ACCOUNT === 'true' && <ButtonIcon icon='person' onClick={signin} />}

                    <ButtonIcon className='btn-cart' icon='shopping_cart' onClick={cart}>
                        <div className='btn-cart-length' style={{ display: cartItems.length > 0 ? 'flex' : 'none' }}>{cartItems.length}</div>
                    </ButtonIcon>
                </div>
            </div>
        </div>
    </nav>
}