import React from 'react';
import Product from './product';

function Products({ title, data }) {
    return <section className='xl:container xl:mx-auto section-product'>
        <h2>{title}</h2>

        <div className='product-box'>
            {data.map(item => <Product key={item.id} id={item.id} img={item.pictures[0]} name={item.name} reviews={item.reviews.length} price={item.price} priceCompare={item.priceCompare} />)}
        </div>
    </section>
}

export default Products;