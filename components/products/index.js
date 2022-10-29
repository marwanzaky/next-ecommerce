import React from 'react';
import ProductsComponent from '../../utils/components/products';

function Products({ products }) {
    return <ProductsComponent title='Featured collection' data={products} />
}

export default Products;