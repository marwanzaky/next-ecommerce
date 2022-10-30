import Item from './item';

function CartTable({ items }) {
    return <table className="cart-table">
        <thead className='cart-table-thead'>
            <tr>
                <th className='cart-table-thead-th-product text-left'>Product</th>
                <th className='cart-table-thead-th-price'>Price</th>
                <th className='cart-table-thead-th-quantity'>Quantity</th>
                <th className='cart-table-thead-th-total'>Total</th>
                <th className='cart-table-thead-th-remove'></th>
            </tr>
        </thead>

        <tbody>
            {items.map(item => <Item key={item.id} id={item.id} src={item.imgs[0]} name={item.name} alt={item.name} price={item.price} />)}
        </tbody>
    </table >
}

export default CartTable;