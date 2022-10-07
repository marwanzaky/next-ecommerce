import React from 'react';
import Link from 'next/link';

import CartItems from '../../utils/cartItems';
import Settings from '../../utils/settings';

function Nav(props) {
    return <li>
        <Link href={props.href}>
            <a>{props.name}</a>
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

class NavBtnCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cartItemsLength: 0
        };
    }

    componentDidMount() {
        this.setState({
            cartItemsLength: CartItems.items.length
        });
    }

    render() {
        const { cartItemsLength } = this.state;

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
}

function Navigation() {
    return <nav>
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
                <NavBtnCart />
            </div>
        </div>
    </nav>
}

export default Navigation;