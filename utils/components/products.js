import React from 'react';
import { convertNameToId } from '../convertStr';
import Product from './product';

function Products({ title, data }) {
    return <section className='xl:container xl:mx-auto section-product'>
        <h2>{title}</h2>

        <div className='product-box'>
            {data.map(item => <Product key={item._id} id={convertNameToId(item.name)} img={item.imgs[0]} name={item.name} reviews={item.reviews.length} price={item.price} priceCompare={item.priceCompare} />)}
        </div>
    </section>
}

export default Products;