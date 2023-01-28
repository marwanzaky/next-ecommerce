import ProductItem from '@ui/ProductItem';

export default function Products({ title, data }) {
    return <section className='section-products'>
        <h2>{title}</h2>

        <div className='products-box'>
            {data.map(item => <ProductItem key={item._id} data={item} />)}
        </div>
    </section>
}