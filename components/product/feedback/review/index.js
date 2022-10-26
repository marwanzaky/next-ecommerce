import React from 'react';

import Stars from '../../../../utils/components/stars';
import { InputTextarea, InputText } from '../../../../utils/components/input';
import { BtnIcon } from '../../../../utils/components/btn';

function ProductReview() {
    return <div className='product-review z-10'>
        <div className='product-review-bg'>
            <BtnIcon className='product-review-close' icon='close' />

            <h2>Overall rating</h2>

            <ProductReviewRate />

            <h4>Review title</h4>
            <InputText type='text' placeholder='Example: Easy to use' />

            <h4>Product review</h4>
            <InputTextarea placeholder='Describe your experience...' />

            <button className='btn-base btn-full'>Submit</button>
        </div>
    </div>
}

function ProductReviewRate() {
    return <div className='product-review-rate'>
        <Stars value={3.5} className='text-[200%]' displayTotal={false} />
        <p className='mb-[20px]'>Click to rate</p>
    </div>
}

export default ProductReview;