import React from 'react';

import { IonIcon } from '@ionic/react';
import { cartOutline } from 'ionicons/icons';
import { heartOutline } from 'ionicons/icons';

import CartItems from '../js/cartItems';

function Nav(props) {
    return <li><a href={props.href}>{props.name}</a></li>
}

function ButtonCart() {
    const buttonCartLengthStyle = {
        display: 'none'
    }

    if (CartItems.items.length > 0)
        buttonCartLengthStyle.display = 'flex';

    return <a href='/cart' className='button-cart button-icon' >
        <IonIcon src={cartOutline} />
        <div className='button-cart-length' style={buttonCartLengthStyle} >{CartItems.items.length}</div>
    </a>
}

class Navigation extends React.Component {
    // constructor(props) {
    //     super(props);
    //
    //     this.state = {
    //         onChange: false
    //     };
    // }
    //
    // componentDidMount() {
    //     window.addEventListener('storage', () => {
    //         console.log('update!!!!!!');
    //         this.setState({
    //             onChange:true
    //         });
    //     });
    // }

    render() {
        return <nav>
            <div className='main-nav-promo'>Welcome to our Store!</div>
            <div className="container main-nav-box">
                <a href='/' className="logo">Storio</a>

                <ul className="main-nav">
                    <Nav href='/' name='Home' />
                    <Nav href='/shop' name='Shop' />
                    <Nav href='/about' name='About' />
                    <Nav href='/contact' name='Contact' />
                </ul>

                <div>
                    <a href='/favourite' className='button-icon' ><IonIcon src={heartOutline} /></a>
                    <ButtonCart />
                </div>
            </div>
        </nav >
    }
}

export default Navigation;