import React from 'react';
import { useRouter } from 'next/router';

import CartTable from './table';

import { checkout, updateCartSubtotal } from './cart';
import CartItems from '../../utils/cartItems';
import YouMayAlsoLike from '../youMayAlsoLike';

function YourCartIsEmpty() {
    const router = useRouter();

    const continueShopping = event => {
        event.preventDefault();
        router.push('/products');
    }

    return <>
        <h1 className='text-center'>Your cart is empty</h1>

        <div className='flex justify-center'>
            <button className='btn-base btn-full !mr-0' onClick={continueShopping}>Continue shopping</button>
        </div>
    </>
}

function YourCart({ items }) {
    return <>
        <h4 className='text-center'>Your Cart</h4>

        <div className='cart-container'>
            <CartTable items={items} />

            <div className='cart-subtotal'>
                <div className='cart-subtotal-div'>
                    <span className='cart-subtotal-div-title'>Subtotal</span>
                    <span className='cart-subtotal-div-price'>$0 USD</span>
                </div>

                <div className='cart-subtotal-note'>Taxes and shipping calculated at checkout</div>
            </div>

            <div className='cart-item-checkout'>
                <button className='btn-base btn-full cart-item-checkout-btn' onClick={() => checkout()}>Check out</button>
            </div>
        </div>
    </>
}

class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }

    componentDidMount() {
        this.setState({
            items: CartItems.items
        });
    }

    componentDidUpdate() {
        updateCartSubtotal();
    }

    render() {
        const { items } = this.state;

        return <section className='section-cart'>
            <div className='xl:container xl:mx-auto'>
                {items.length > 0 ? <YourCart items={items} /> : <YourCartIsEmpty />}
            </div>

            {items.length <= 0 ? <YouMayAlsoLike /> : <></>}
        </section >
    }
}

export default Cart;