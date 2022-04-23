import React from 'react';

import { IonIcon } from '@ionic/react';
import { heartOutline } from 'ionicons/icons'

import Product1 from '../img/products/product-1.png';
import Product2 from '../img/products/product-2.png';
import Product3 from '../img/products/product-3.png';
import Product4 from '../img/products/product-4.png';

function Product(props) {
    return <div className=' product'>
        <div className='save'>
            <IonIcon className='save-icon' src={heartOutline} font-size="48px" />
        </div>
        <img src={props.src}></img>
        <span className='product-name'>{props.name}</span>
        <span className='product-stars'>★★★★★ ({props.reviews})</span>
        <div className='product-tag'>
            <p className='product-price' >${props.price}</p>
            <button className='btn-base btn-ghost-grey produce-button'>Add to card</button>
        </div>
    </div>
}

function Products() {
    return <section className='container section-product'>
        <h2>Featured collection</h2>

        <div className="product-box">
            <Product src={Product1} name='Personalised Notebook' reviews='34' price='9.99' />
            <Product src={Product2} name='Anniversary Gift for Him' reviews='17' price='4.99' />
            <Product src={Product3} name='Spiral Notebook' reviews='72' price='12.99' />
            <Product src={Product4} name='Soft Cover Journal' reviews='9' price='19.99' />
            <Product src={Product1} name='Personalised Notebook' reviews='34' price='9.99' />
            <Product src={Product2} name='Anniversary Gift for Him' reviews='17' price='4.99' />
            <Product src={Product3} name='Spiral Notebook' reviews='72' price='12.99' />
            <Product src={Product4} name='Soft Cover Journal' reviews='9' price='19.99' />
        </div>
    </section>
}

export default Products;