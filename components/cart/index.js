'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

import CartTable from './table';
import { checkout } from './cart';

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
    const cartSubtotalPriceElement = useRef();

    useEffect(() => {
        let subtotal = 0;

        for (let i = 0; i < items.length; i++)
            subtotal = subtotal + items[i].price;

        cartSubtotalPriceElement.current.innerText = '$' + (subtotal / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' USD';
    }, [items]);

    return <>
        <h4 className='text-center'>Your Cart</h4>

        <div className='cart-container'>
            <CartTable items={items} />

            <div className='cart-subtotal'>
                <div className='cart-subtotal-div mb-[10px]'>
                    <span className='cart-subtotal-div-title'>Subtotal&emsp;</span>
                    <span className='cart-subtotal-div-price' ref={cartSubtotalPriceElement}>$0 USD</span>
                </div>

                <div className='cart-subtotal-note'>Taxes and shipping calculated at checkout</div>
            </div>

            <div className='flex justify-end items-end'>
                <button className='btn-base btn-full !mr-0' onClick={() => checkout()}>Check out</button>
            </div>
        </div>
    </>
}

export default function Cart({ products }) {
    const [items, setItems] = useState(CartItems.items);

    // useEffect(() => {
    //     setItems(CartItems.items);
    // }, [])

    // useEffect(() => {
    // console.log('carts');
    // }, [CartItems.items]);
    console.log('items', items.length);

    return <section className='section-cart'>
        <div className='xl:container xl:mx-auto'>
            {items.length > 0 ? <YourCart items={items} /> : <YourCartIsEmpty />}
        </div>

        {items.length <= 0 ? <YouMayAlsoLike products={products} /> : <></>}
    </section >
}