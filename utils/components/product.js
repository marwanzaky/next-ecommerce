import React from 'react';

import Link from 'next/link';
import Img from './img';

import Products from '../products';
import Settings from '../settings';
import Stars from './stars';

function AddToCart() {
    return <button className='product-tag-add btn-base btn-ghost' onClick={Products}>
        <span class="material-symbols-outlined">shopping_cart</span>
    </button>
}

function Product({ id, name, src, price, priceCompare, reviews }) {
    return <div className='flex flex-col product'>
        <div className='product-save'>
            <span class="material-symbols-outlined product-save-icon">favorite</span>
        </div>

        <Link href={'/product/' + id}>
            <a className='product-a'><Img src={`${Settings.server}/${src}`} alt={name} /></a>
        </Link>

        <div className='flex flex-col p-2 sm:p-4'>
            <span className='product-name'>{name}</span>
            <Stars reviews={reviews} />

            <div className='product-tag'>
                <div className='flex flex-row'>
                    <span className='product-tag-price' >{'$' + price / 100}</span>
                    <span className='product-tag-price_compare flex items-center' >{'$' + priceCompare / 100}</span>
                </div>

                <AddToCart />
            </div>
        </div>
    </div>
}

export default Product;