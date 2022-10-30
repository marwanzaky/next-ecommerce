// 'use client';

import Products from '../../utils/components/products';

export default function FeaturedCollection({ products }) {
    console.log('FeaturedCollection:::', products);
    return <Products title='Featured collection' data={products} />
}