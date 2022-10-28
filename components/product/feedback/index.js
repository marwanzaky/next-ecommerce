import React, { useState } from 'react';
import Stars from '../../../utils/components/stars';
import ProductReview from '../../review';

const stringToDate = str => {
    const date = new Date(str);
    return date.toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric" });
}

const shortname = fullname => {
    return fullname.split(' ').map(word => word[0]).join('').toUpperCase();
}

function ProductFeedbackReviews({ product }) {
    return <div className='product-feedback-reviews'>
        {product.reviews.map((item, i) =>
            <div key={`review ${i + 1}`} className='product-feedback-reviews-review'>
                <div className='flex mb-[10px]'>
                    <div className='mr-[15px] shrink-0'>
                        <div className='product-feedback-reviews-review-profile'>{shortname(item.user.name)}</div>
                    </div>

                    <div className='w-auto'>
                        <div className='product-feedback-reviews-review-fullname'>{item.user.name}&ensp;<span>{stringToDate(item.createdAt)}</span></div>
                        <div className='product-feedback-reviews-review-stars'><Stars value={item.rating} displayTotal={false} /></div>
                        <div className='product-feedback-reviews-review-text'>{item.review}</div>
                    </div>
                </div>
            </div>)}
    </div>
}

function ProductFeedbackOverview({ product }) {
    const [review, setReview] = useState(false);

    return <div className='product-feedback-overview'>
        <div className='mb-[30px] grid grid-cols-2'>
            <ProductFeedbackOverviewRating />
            <ProductFeedbackOverviewRates />
        </div>

        <div className='flex justify-center'>
            <button className='btn-base btn-full !m-0' onClick={() => setReview(true)}>Write a review</button>
        </div>

        {review ? <ProductReview onClick={() => setReview(false)} /> : <></>}
    </div>

    function ProductFeedbackOverviewRating() {
        return <div className='product-feedback-overview-rating'>
            <div className='product-feedback-overview-rating-value'>{(Math.round(product.averageRatings * 100) / 100).toFixed(1)}</div>
            <div className='product-feedback-overview-rating-stars'><Stars value={product.averageRatings} displayTotal={false} /></div>
            <div className='product-feedback-overview-rating-total'>{product.numReviews} reviews</div>
        </div>
    }

    function ProductFeedbackOverviewRates() {
        return <div className='product-feedback-overview-rates'>
            <ul className='product-feedback-overview-rates-ul'>
                <ProductFeedbackOverviewRatesLi stars={1} percent='10%' />
                <ProductFeedbackOverviewRatesLi stars={2} percent='20%' />
                <ProductFeedbackOverviewRatesLi stars={3} percent='30%' />
                <ProductFeedbackOverviewRatesLi stars={4} percent='40%' />
                <ProductFeedbackOverviewRatesLi stars={5} percent='50%' />
            </ul>
        </div>

        function ProductFeedbackOverviewRatesLi({ stars, percent }) {
            return <li className='product-feedback-overview-rates-li'>
                <div className='product-feedback-overview-rates-li-star'>★</div>
                <div className='product-feedback-overview-rates-li-stars'>{stars}</div>
                <div className='product-feedback-overview-rates-li-bar'>
                    <div className='product-feedback-overview-rates-li-bar-percent' style={{ width: percent }}></div>
                </div>
            </li>
        }
    }
}

function ProductFeedback({ product }) {
    return <div className='product-feedback'>
        <h4>Rating and reviews</h4>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10'>
            <ProductFeedbackOverview product={product} />
            <ProductFeedbackReviews product={product} />
        </div>
    </div>
}

export default ProductFeedback;