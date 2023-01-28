'use client';

import { useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

// import ProductFeedback from './feedback';

import Stars from '@utils/components/stars';
import AddToCart from '@utils/addToCart';

import { ButtonFull, ButtonGhostGrey } from '@ui/Button';

function Preview({ product }) {
    const [img, setImg] = useState(0);

    return <div className='preview'>
        <div className='product_item-save opacity-0'>
            <span className='material-symbols-outlined'>favorite</span>
        </div>

        <Image className='img' src={`${process.env.NEXT_PUBLIC_SERVER}/${product.imgs[img]}`} alt={product.name} width={512} height={512} />

        <div className='imgs'>
            {product.imgs.map((img, i) => <Image
                className='imgs-img'
                key={`${product.name} ${i + 1}`}
                src={`${process.env.NEXT_PUBLIC_SERVER}/${img}`}
                alt={`${product.name} ${i + 1}`}
                onClick={() => setImg(i)}
                width={256}
                height={256}
            />)}
        </div>
    </div >
}

function Details({ product }) {
    const router = useRouter();

    const purchase = async event => {
        event.preventDefault();
        await AddToCart(product.id, product.name);
        router.push('/cart');
    }

    const addToCart = event => {
        event.preventDefault();
        AddToCart(product.id);
    }

    return <div className='details'>
        <h1 className='name' >{product.name}</h1>

        <div className='price-box'>
            <span className='price'>{'$' + product.price / 100}</span>
            <span className='price_compare' >{'$' + product.priceCompare / 100}</span>
        </div>

        <div className='stars-box'>
            <Stars value={product.avgRatings} total={product.numReviews} />
        </div>

        <ButtonGhostGrey className='w-full md:w-[400px]' onClick={addToCart}>Add to cart</ButtonGhostGrey>
        <ButtonFull className='w-full md:w-[400px]' onClick={purchase}>Buy it now</ButtonFull>

        <h4>Description</h4>
        <p className='whitespace-pre-wrap'>{product.description}</p>
    </div>
}

export default function Product({ product }) {
    return <section className='product'>
        <div className='preview-n-details'>
            <Preview product={product} />
            <Details product={product} />
        </div>

        {/* <ProductFeedback product={product} /> */}
    </section>
}