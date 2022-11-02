import Link from 'next/link';

import CartItems from '../../../utils/cartItems';
import Img from '../../../utils/components/img';

const removeCartTableItem = id => {
    const items = CartItems.items;

    const remove = i => {
        items.splice(i, 1);
        CartItems.items = items;
    }

    for (let i = 0; i < items.length; i++)
        if (items[i]['id'] === id)
            remove(i);
}

function CartTableItem({ id, name, price, src, alt }) {
    return <tr className='cart-table-item'>
        <th className='cart-table-item-product'>
            <div className='cart-table-item-product-div'>
                <Link href={`/product/${id}`} className='cart-table-item-product-img'><Img src={`${process.env.NEXT_PUBLIC_SERVER}/${src}`} alt={alt} /></Link>
                <Link href={`/product/${id}`} className='cart-table-item-product-name'>{name}</Link>
            </div>
        </th>
        <th className='cart-table-item-price'>{'$' + price / 100}</th>
        <th className='cart-table-item-quantity'>
            <input className='cart-table-item-quantity-field' type='number' defaultValue='1' min='1' max='100' />
        </th>
        <th className='cart-table-item-total'>{'$' + price / 100}</th>
        <th className='cart-table-item-remove'>
            <button className='btn-base btn-ghost-grey cart-table-item-remove-btn' onClick={event => removeCartTableItem(id)}>Remove</button>
        </th>
    </tr>
}

export default function CartTable({ items }) {
    return <table className='cart-table'>
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
            {items.map(item => <CartTableItem key={item.id} id={item.id} src={item.imgs[0]} name={item.name} alt={item.name} price={item.price} />)}
        </tbody>
    </table >
}