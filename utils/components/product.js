import React from 'react';

import Link from 'next/link';
import Img from './img';

import Settings from '../settings';
import AddToCartFun from '../addToCart';
import Stars from './stars';

import { convertNameToId } from '../convertStr';

function AddToCart({ id, name }) {
    return <button className='product-tag-add btn-base btn-ghost' onClick={() => AddToCartFun(id, name)}>
        <span className="material-symbols-outlined">shopping_cart</span>
    </button>
}

function Product({ id, name, img, price, priceCompare, reviews }) {
    return <div className='flex flex-col product'>
        <div className='product-save'>
            <span className="material-symbols-outlined product-save-icon">favorite</span>
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