import ProductItem from './productItem';

function Products({ title, data }) {
    return <section className='xl:container xl:mx-auto section-products'>
        <h2>{title}</h2>

        <div className='products-box'>
            {data.map(item => <ProductItem
                key={item._id} id={item._id}
                img={item.imgs[0]}
                name={item.name}
                averageRating={item.averageRatings}
                reviews={item.numReviews}
                price={item.price}
                priceCompare={item.priceCompare} />)}
        </div>
    </section>
}

export default Products;