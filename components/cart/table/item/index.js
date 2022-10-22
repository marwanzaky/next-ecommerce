import React from 'react';
import Link from 'next/link';

import Settings from '../../../../utils/settings';
import Img from '../../../../utils/components/img';

import { convertNameToId } from '../../../../utils/convertStr';
import { removeCartItem } from '../../cart';

function CartTableItem({ id, name, price, src, alt }) {
    const nameId = convertNameToId(name);

    return <tr className='cart-table-item'>
        <th className='cart-table-item-product'>
            <div className='cart-table-item-product-div'>
                <Link href={'/product/' + nameId}><a className='cart-table-item-product-img'><Img src={`${Settings.server}/${src}`} alt={alt} /></a></Link>
                <Link href={'/product/' + nameId}><a className='cart-table-item-product-name'>{name}</a></Link>
            </div>
        </th>
        <th className='cart-table-item-price'>{'$' + price / 100}</th>
        <th className='cart-table-item-quantity'>
            <input className='cart-table-item-quantity-field' type='number' defaultValue='1' min='1' max='100' />
        </th>
        <th className='cart-table-item-total'>{'$' + price / 100}</th>
        <th className='cart-table-item-remove'>
            <button className='btn-base btn-ghost-grey cart-table-item-remove-btn' onClick={event => removeCartItem(event, id)}>Remove</button>
        </th>
    </tr>
}

export default CartTableItem;