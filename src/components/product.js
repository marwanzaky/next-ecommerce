import React from 'react';

import { IonIcon } from '@ionic/react';
import { cartOutline } from 'ionicons/icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

import Settings from '../js/settings';
import Stars from './stars';

function Product(props) {
    const styles = {
        fontSize: '24px'
    }

    return <div className='flex flex-col product'>
        <div className='save'>
            {/* <IonIcon className='save-icon' src={heartOutline} /> */}
            <FontAwesomeIcon className='save-icon' icon={faHeart} />
        </div>
        <a className='product-img' href={'/product?id=' + props.id}><img src={`${Settings.server}/${props.src}`} alt={props.name}></img></a>

        <div className='flex flex-col p-2 sm:p-4'>
            <span className='product-name'>{props.name}</span>
            <Stars reviews={props.reviews} />

            <div className='product-tag'>
                <div className='flex flex-row'>
                    <span className='product-tag-price' >{'$' + props.price / 100}</span>
                    <span className='product-tag-price_compare flex items-center' >{'$' + props.priceCompare / 100}</span>
                </div>

                <button className='flex items-center justify-center product-tag-add'><IonIcon class='product-tag-add-icon' style={styles} src={cartOutline} /> </button>
            </div>
        </div>
    </div>
}

export default Product;