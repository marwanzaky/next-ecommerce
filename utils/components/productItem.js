'use client';

import Link from 'next/link';

import Img from './img';
import Stars from './stars';

import AddToCartFun from '../addToCart';
import Image from 'next/image';

function AddToCart({ id }) {
    const addToCart = event => {
        AddToCartFun(id);
    }

    return <button className='product_item-tag-add btn-base btn-ghost' onClick={addToCart}>
        <span className="material-symbols-outlined">shopping_cart</span>
    </button>
}

export default function ProductItem({ id, name, price, priceCompare, img, reviews, averageRating = 5 }) {
    return <div className='product_item'>
        <div className='product_item-save'><span className='material-symbols-outlined'>favorite</span></div>

        <Link href={`/product/${id}`} className='product_item-a'>
            {/* <Img src={`${process.env.NEXT_PUBLIC_SERVER}/${img}`} alt={name} /> */}
            {/* <Image src={src} alt={alt} layout='responsive' width='100' height='100' /> */}
            <Image src={`${process.env.NEXT_PUBLIC_SERVER}/${img}`} alt={name} width={500} height={500} />
        </Link>

        <div className='flex flex-col p-2 sm:p-4'>
            <h3>{name}</h3>
            <Stars value={averageRating} total={reviews} />

            <div className='product_item-tag'>
                <div className='flex flex-row'>
                    <span className='product_item-tag-price' >{'$' + price / 100}</span>
                    <span className='product_item-tag-price_compare flex items-center' >{'$' + priceCompare / 100}</span>
                </div>

                <AddToCart id={id} />
            </div>
        </div>
    </div>
}