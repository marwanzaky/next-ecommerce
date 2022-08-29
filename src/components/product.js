import React from 'react';

import { IonIcon } from '@ionic/react';
import { heartOutline, cartOutline } from 'ionicons/icons'

import Server from '../js/server';

function Product(props) {
    const styles = {
        fontSize: '24px'
    }

    return <div className='product'>
        <div className='save'><IonIcon className='save-icon' src={heartOutline} /></div>

        <a className='product-img' href={'/product?id=' + props.id}><img src={`${Server}/${props.src}`} alt={props.name}></img></a>

        <span className='product-name'>{props.name}</span>
        <span className='product-stars'>★★★★★ ({props.reviews})</span>

        <div className='product-tag'>
            <p className='product-tag-price' >${props.price / 100}</p>
            <button className='flex items-center justify-center product-tag-add'><IonIcon class='product-tag-add-icon' style={styles} src={cartOutline} /> </button>
        </div>
    </div>
}

export default Product;