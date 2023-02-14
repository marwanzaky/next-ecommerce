'use client';

import { useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Feedback from '@components/feedback';

import Stars from '@utils/components/stars';
import Cart from '@utils/cart';

import { ButtonFull, ButtonGhostGrey } from '@ui/Button';
import Icon from '@ui/Icon';
import Info from '@ui/Info';
import Link from 'next/link';

function Preview({ product }) {
    const [image, setImage] = useState(0);

    return <div className='preview'>
        <div className='product_item-save opacity-0'>
            <Icon icon='favorite' />
        </div>

        <Image className='img' src={`${process.env.NEXT_PUBLIC_SERVER}/${product.imgs[image]}`} alt={product.name} width={512} height={512} />

        <div className='imgs'>
            {product.imgs.map((img, i) => <Image
                className={`imgs-img ${i === image ? 'select' : ''}`}
                key={`${product.name} ${i + 1}`}
                src={`${process.env.NEXT_PUBLIC_SERVER}/${img}`}
                alt={`${product.name} ${i + 1}`}
                onClick={() => setImage(i)}
                width={128}
                height={128}
            />)}
        </div>
    </div >
}

function Details({ product }) {
    const router = useRouter();
    const [quantity, setQuantity] = useState(1);

    const purchase = async event => {
        event.preventDefault();
        await Cart.add(product.id, quantity);
        router.push('/cart');
    }

    const add = event => {
        event.preventDefault();
        Cart.add(product.id, quantity);
    }

    const quantityInput = event => {
        event.preventDefault();
        setQuantity(event.target.value);
    }

    return <div className='details'>
        <div className='location'><Link href='/'>Home</Link> <span>/</span> <Link href='/products'>Products</Link> <span>/</span> <Link href={`/product/${product._id}`}>{product.name}</Link></div>
        <h1 className='name' >{product.name}</h1>

        <div className='price-box'>
            <span className='price'>{'$' + (product.price / 100).toFixed(2)}</span>
            <span className='price_compare' >{'$' + (product.priceCompare / 100).toFixed(2)}</span>
        </div>

        {process.env.NEXT_PUBLIC_REVIEWS === 'true' && <div className='stars-box'>
            <Stars value={product.avgRatings} total={product.numReviews} />
        </div>}

        <label htmlFor='quantity'>Quantity:</label>
        <input className='quantity' id='quantity' type='number' defaultValue={quantity} min='1' max='100' onChange={quantityInput} />

        <ButtonGhostGrey className='w-full md:w-[400px]' onClick={add}>Add to cart</ButtonGhostGrey>
        <ButtonFull className='w-full md:w-[400px]' onClick={purchase}>Buy it now</ButtonFull>

        <Info display={true} title='Description'>
            <p>{product.description}</p>
        </Info>

        <Info title='Shipping and Refund Policy'>
            <h4>Refund Policy</h4>
            <p>
                We have a 30-day return policy, which means you have 30 days after receiving your item to request a return.
                <br />
                <br />
                To be eligible for a return, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You’ll also need the receipt or proof of purchase.
                <br />
                <br />
                To start a return, you can contact us at contact@goodies2buy.com. If your return is accepted, we’ll send you a return shipping label, as well as instructions on how and where to send your package. Items sent back to us without first requesting a return will not be accepted.
                <br />
                <br />
                You can always contact us for any return question at contact@goodies2buy.com.
                <br />
                <br />
            </p>

            <h4>Shipping policy</h4>
            <p>
                All orders are processed within 1 to 3 business days (excluding weekends and holidays) after receiving your order confirmation email. You will receive another notification when your order has shipped.
                <br />
                <br />
                International Shipping
                <br />
                <br />
                We offer international shipping to the following countries: United States, United Kingdom, Australia, Canada, Germany, France, Spain, United Arab Emirates, Indonesia.
                <br />
                <br />
                Your order may be subject to import duties and taxes (including VAT), which are incurred once a shipment reaches your destination country.
                <br />
                <br />
            </p>
        </Info>
    </div>
}

export default function Product({ product }) {
    return <section className='product'>
        <div className={`preview-n-details ${process.env.NEXT_PUBLIC_REVIEWS === 'true' ? 'mb-[30px] md:mb-[50px]' : ''}`}>
            <Preview product={product} />
            <Details product={product} />
        </div>

        {process.env.NEXT_PUBLIC_REVIEWS === 'true' && <Feedback product={product} />}
    </section>
}