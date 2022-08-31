import React from 'react';

import { IonIcon } from '@ionic/react';
import { heartOutline, cartOutline } from 'ionicons/icons'

import Settings from '../js/settings';

function Product(props) {
    const styles = {
        fontSize: '24px'
    }

    return <div className='flex flex-col product'>
        <div className='save'><IonIcon className='save-icon' src={heartOutline} /></div>
        <a className='product-img' href={'/product?id=' + props.id}><img src={`${Settings.server}/${props.src}`} alt={props.name}></img></a>

        <div className='flex flex-col p-4'>
            <span className='product-name'>{props.name}</span>
            <span className='product-stars'>★★★★★ ({props.reviews})</span>

            <div className='product-tag'>
                <p className='product-tag-price' >${props.price / 100}</p>
                <button className='flex items-center justify-center product-tag-add'><IonIcon class='product-tag-add-icon' style={styles} src={cartOutline} /> </button>
            </div>
        </div>
    </div>
}

export default Product;