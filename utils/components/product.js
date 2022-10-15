import React from 'react';

import Link from 'next/link';
import Img from './img';

import Settings from '../settings';
import Stars from './stars';

import CartItems from '../cartItems';
import { convertNameToId } from '../convertStr';

const addToCart = async (id, name) => {
    for (let i = 0; i < CartItems.items.length; i++)
        if (CartItems.items[i]['name'] === name)
            return alert('The item is already added to the cart.');

    const res = await fetch(Settings.server + '/products/' + id);
    const json = await res.json();

    const cartItems = CartItems.items;
    cartItems.unshift(json.data.product);
    CartItems.items = cartItems;

    alert('The product is added to the cart.');
}

function AddToCart({ id, name }) {
    return <button className='product-tag-add btn-base btn-ghost' onClick={() => addToCart(id, name)}>
        <span class="material-symbols-outlined">shopping_cart</span>
    </button>
}

function Product({ id, name, img, price, priceCompare, reviews }) {
    return <div className='flex flex-col product'>
        <div className='product-save'>
            <span class="material-symbols-outlined product-save-icon">favorite</span>
        </div>

        <Link href={'/product/' + convertNameToId(name)}>
            <a className='product-a'><Img src={`${Settings.server}/${img}`} alt={name} /></a>
        </Link>

        <div className='flex flex-col p-2 sm:p-4'>
            {/* <span className='product-name'>{name}</span> */}
            <h3 className='product-nam'>{name}</h3>
            <Stars reviews={reviews} />

            <div className='product-tag'>
                <div className='flex flex-row'>
                    <span className='product-tag-price' >{'$' + price / 100}</span>
                    <span className='product-tag-price_compare flex items-center' >{'$' + priceCompare / 100}</span>
                </div>

                <AddToCart id={id} name={name} />
            </div>
        </div>
    </div>
}

export default Product;