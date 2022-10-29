import React, { useState } from 'react';
import { useRouter } from 'next/router';

import ProductFeedback from './feedback';

import Img from '../../utils/components/img';
import Stars from '../../utils/components/stars';

import Settings from '../../utils/settings';
import AddToCart from '../../utils/addToCart';

function ProductPreview({ product }) {
    const [img, setImg] = useState(0);

    const previewImg = img => {
        setImg(img);
    }

    return <div className='product-preview'>
        <div className='product_item-save opacity-0'><span className='material-symbols-outlined'>favorite</span></div>

        <Img class_name='product-preview-img img' src={`${Settings.server}/${product.imgs[img]}`} alt={product.name} />

        <div className='product-preview-imgs'>
            {product.imgs.map((el, i) =>
                <div key={`${product.name} ${i + 1}`} className='product-preview-imgs-img' onClick={() => previewImg(i)}>
                    <Img class_name='img' src={`${Settings.server}/${el}`} alt={`${product.name} ${i + 1}`} />
                </div>)}
        </div>
    </div>
}

function ProductDetails({ product }) {
    const router = useRouter();

    const purchase = async event => {
        event.preventDefault();
        await AddToCart(product.id, product.name);
        router.push('/cart');
    }

    return <div className='product-details'>
        <h1 className='product-details-name' >{product.name}</h1>

        <div className='flex flex-row mb-[5px]'>
            <span className='product-details-price'>{'$' + product.price / 100}</span>
            <span className='product-details-price_compare' >{'$' + product.priceCompare / 100}</span>
        </div>

        <div className='product-details-stars'><Stars value={product.averageRatings} total={product.numReviews} /></div>

        <button className='w-full md:w-[400px] btn-base btn-ghost-grey' onClick={() => AddToCart(product.id)}>Add to cart</button>
        <button className='w-full md:w-[400px] btn-base btn-full' onClick={purchase}>Buy it now</button>

        <h4 className='product-details-des-title'>Description</h4>
        <p className='product-details-des-description'>{product.description}</p>
    </div>
}

function Product({ product }) {
    return <section className='xl:container xl:mx-auto product-box'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5 mb:[30px] md:mb-[50px]'>
            <ProductPreview product={product} />
            <ProductDetails product={product} />
        </div>

        <ProductFeedback product={product} />
    </section>
}

export default Product;