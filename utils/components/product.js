import React from 'react';

import Products from '../products';
import Settings from '../settings';
import Stars from './stars';

function AddToCart() {
    return (
        <button className='product-tag-add btn-base btn-ghost' onClick={Products}>
            <span class="material-symbols-outlined">shopping_cart</span>
        </button>
    )
}

function Product(props) {
    return <div className='flex flex-col product'>
        <div className='product-save'>
            <span class="material-symbols-outlined product-save-icon">favorite</span>
        </div>
        <a className='product-img' href={'/product?id=' + props.id}><img src={`${Settings.server}/${props.src}`} alt={props.name}></img></a>

        <div className='flex flex-col p-2 sm:p-4'>
            <span className='product-name'>{props.name}</span>
            <Stars reviews={props.reviews} />

            <div className='product-tag'>
                <div className='flex flex-row'>
                    <span className='product-tag-price' >{'$' + props.price / 100}</span>
                    <span className='product-tag-price_compare flex items-center' >{'$' + props.priceCompare / 100}</span>
                </div>

                <AddToCart />
            </div>
        </div>
    </div>
}

export default Product;