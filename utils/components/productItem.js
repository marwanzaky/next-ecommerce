import React from 'react';

import Link from 'next/link';
import Img from './img';

import Settings from '../settings';
import AddToCartFun from '../addToCart';
import Stars from './stars';

import { convertNameToId } from '../convertStr';

function AddToCart({ id, name }) {
    const addToCart = event => {
        AddToCartFun(id, name);
    }

    return <button className='product_item-tag-add btn-base btn-ghost' onClick={addToCart}>
        <span className="material-symbols-outlined">shopping_cart</span>
    </button>
}

function ProductItem({ id, name, img, price, priceCompare, reviews }) {
    return <div className='product_item'>
        <div className='product_item-save'><span className='material-symbols-outlined'>favorite</span></div>

        <Link href={'/product/' + convertNameToId(name)}>
            <a className='product_item-a'><Img src={`${Settings.server}/${img}`} alt={name} /></a>
        </Link>

        <div className='flex flex-col p-2 sm:p-4'>
            <h3>{name}</h3>
            <Stars total={reviews} />

            <div className='product_item-tag'>
                <div className='flex flex-row'>
                    <span className='product_item-tag-price' >{'$' + price / 100}</span>
                    <span className='product_item-tag-price_compare flex items-center' >{'$' + priceCompare / 100}</span>
                </div>

                <AddToCart id={id} name={name} />
            </div>
        </div>
    </div>
}

export default ProductItem;