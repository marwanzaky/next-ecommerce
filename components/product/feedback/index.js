function ProductDetailsFeedbackReviews({ id, data }) {
    return <div className='product-details-feedback-reviews'>
        {data[id].reviews.map((item, i) =>
            <div key={`review ${i + 1}`} className='product-details-feedback-reviews-review'>
                <div className='mr-[15px] shrink-0'>
                    <div className='product-details-feedback-reviews-review-profile'>{Shortname(item.fullname)}</div>
                </div>

                <div className='w-auto'>
                    <div className='product-details-feedback-reviews-review-fullname'>{item.fullname} - <span>{item.date}</span></div>
                    <div className='product-details-feedback-reviews-review-stars'>{item.stars}</div>
                    <div className='product-details-feedback-reviews-review-text'>{item.review}</div>
                </div>
            </div>)}
    </div>
}

function ProductDetailsFeedbackOverview({ id, data }) {
    return <div className='product-details-feedback-overview'>
        <div className='mb-[30px] grid grid-cols-2'>
            <div className='product-details-feedback-overview-rating'>
                <div className='product-details-feedback-overview-rating-value'>4.5</div>
                <div className='product-details-feedback-overview-rating-stars'>★ ★ ★ ★ ★</div>
                <div className='product-details-feedback-overview-rating-total'>
                    <span class='material-symbols-outlined'>person</span>
                    {data[id].reviews.length} total reviews
                </div>
            </div>

            <div className='product-details-feedback-overview-rates'>
                <ul className='product-details-feedback-overview-rates-ul'>
                    <ProductDetailsFeedbackOverviewRatesLi stars={1} percent='10%' />
                    <ProductDetailsFeedbackOverviewRatesLi stars={2} percent='20%' />
                    <ProductDetailsFeedbackOverviewRatesLi stars={3} percent='30%' />
                    <ProductDetailsFeedbackOverviewRatesLi stars={4} percent='40%' />
                    <ProductDetailsFeedbackOverviewRatesLi stars={5} percent='50%' />
                </ul>
            </div>
        </div>

        <div className='flex justify-center'>
            <button className='btn-base btn-full !m-0'>Add review</button>
        </div>
    </div>
}

function ProductDetailsFeedbackOverviewRatesLi({ stars, percent }) {
    return <li className='product-details-feedback-overview-rates-li'>
        <div className='product-details-feedback-overview-rates-li-star'>★</div>
        <div className='product-details-feedback-overview-rates-li-stars'>{stars}</div>
        <div className='product-details-feedback-overview-rates-li-bar'>
            <div className='product-details-feedback-overview-rates-li-bar-percent' style={{ width: percent }}></div>
        </div>
    </li>
}

function ProductDetailsFeedback({ id, data }) {
    return <div className='product-details-feedback'>
        <h4>Rating and reviews</h4>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10'>
            <ProductDetailsFeedbackOverview id={id} data={data} />
            <ProductDetailsFeedbackReviews id={id} data={data} />
        </div>
    </div>
}

function Shortname(fullname) {
    return fullname.split(' ').map(word => word[0]).join('').toUpperCase();
}

export default ProductDetailsFeedback;