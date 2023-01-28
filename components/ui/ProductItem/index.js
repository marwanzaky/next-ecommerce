'use client';

import Link from 'next/link';
import Image from 'next/image';

import Stars from '@utils/components/stars';

import AddToCart from '@utils/addToCart';

export default function ProductItem({ data }) {
    const addToCart = event => {
        event.preventDefault();
        AddToCart(data.id);
    }

    return <div className='productItem'>
        <div className='product_item-save'><span className='material-symbols-outlined'>favorite</span></div>

        <Link className='productItem-a' href={`/product/${data.id}`}>
            <Image src={`${process.env.NEXT_PUBLIC_SERVER}/${data.imgs[0]}`} alt={data.name} width={512} height={512} />
        </Link>

        <div className='flex flex-col p-[8px] sm:p-[16px]'>
            <h3>{data.name}</h3>
            <Stars value={data.avgRatings} total={data.numReviews} />

            <div className='productItem-tag'>
                <div className='flex flex-row'>
                    <span className='productItem-tag-price' >{'$' + data.price / 100}</span>
                    <span className='productItem-tag-price_compare' >{'$' + data.priceCompare / 100}</span>
                </div>

                <button className='productItem-tag-add btn-base btn-ghost' onClick={addToCart}>
                    <span className="material-symbols-outlined">shopping_cart</span>
                </button>
            </div>
        </div>
    </div>
}