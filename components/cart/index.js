'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

import CartTable from './table';

import CartItems from '@utils/cartItems';

import YouMayAlsoLike from '@components/youMayAlsoLike';

import { ButtonFull } from '@ui/Button';

function YourCartIsEmpty() {
    const router = useRouter();

    const continueShopping = event => {
        event.preventDefault();
        router.push('/products');
    }

    return <div className='yourCartIsEmpty'>
        <h1 className='text-center'>Your cart is empty</h1>

        <div className='flex justify-center'>
            <ButtonFull className='!mr-0' onClick={continueShopping}>Continue shopping</ButtonFull>
        </div>
    </div>
}

function YourCart({ items, setItems }) {
    const subtotalElement = useRef();

    const updateSubtotal = () => {
        if (items.length <= 0)
            return;

        const total = items.map(item => item.price * item.quantity / 100).reduce((a, b) => a + b);
        const totalStr = (Math.round(total * 100) / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        subtotalElement.current.innerHTML = '$' + totalStr + ' USD';
    }

    const checkoutBtn = async event => {
        event.preventDefault();

        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items })
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/payment/create-checkout-session`, options);
        const json = await res.json();

        window.location = json.url;
        window.localStorage.clear();

        setItems(CartItems.items);
    }

    useEffect(() => {
        updateSubtotal();
    });

    return <div className='yourCart'>
        <h4 className='text-center'>Your Cart</h4>

        <div className='cart-container'>
            <CartTable items={items} setItems={setItems} />

            <div className='cart-subtotal'>
                <div className='cart-subtotal-div'>
                    <span className='cart-subtotal-div-title'>Subtotal&emsp;</span>
                    <span className='cart-subtotal-div-price' ref={subtotalElement}>$0 USD</span>
                </div>

                <div className='cart-subtotal-note'>Taxes and shipping calculated at checkout</div>
            </div>

            <div className='flex justify-end items-end'>
                <ButtonFull className='!mr-0' onClick={checkoutBtn}>Check out</ButtonFull>
            </div>
        </div>
    </div>
}

export default function Cart({ products }) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(CartItems.items);
    }, []);

    return <section className='section-cart'>
        <div className='cart-box'>
            {items.length > 0 ?
                <YourCart items={items} setItems={setItems} /> :
                <YourCartIsEmpty />}
        </div>

        {items.length <= 0 ?
            <YouMayAlsoLike products={products} /> :
            <></>}
    </section >
}