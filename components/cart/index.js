import React from 'react';

import CartTable from './table';

import { checkout, updateCartSubtotal } from './cart';
import CartItems from '../../utils/cartItems';

class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cartItems: null
        };
    }

    componentDidMount() {
        this.setState({
            cartItems: CartItems
        });
    }

    componentDidUpdate() {
        updateCartSubtotal();
    }

    render() {
        const { cartItems } = this.state;

        if (!cartItems)
            return <></>

        return <section className="section-cart">
            <div className="xl:container xl:mx-auto">
                <h4 className='text-center'>Shopping Cart</h4>

                <div className="cart-container">
                    <CartTable items={cartItems.items} />

                    <div className="cart-subtotal">
                        <div className="cart-subtotal-div">
                            <span className="cart-subtotal-div-title">Subtotal</span>
                            <span className="cart-subtotal-div-price">$0 USD</span>
                        </div>

                        <div className="cart-subtotal-note">Taxes and shipping calculated at checkout</div>
                    </div>

                    <div className="cart-item-checkout">
                        <button className='btn-base btn-full cart-item-checkout-btn' onClick={() => checkout()}>Check out</button>
                    </div>
                </div>
            </div>
        </section >
    }
}

export default Cart;