import Stars from "../../../utils/components/stars";

function ProductDetailsFeedbackReviews({ product }) {
    return <div className='product-details-feedback-reviews'>
        {product.reviews.map((item, i) =>
            <div key={`review ${i + 1}`} className='product-details-feedback-reviews-review'>
                <div className='flex mb-[10px]'>
                    <div className='mr-[15px] shrink-0'>
                        <div className='product-details-feedback-reviews-review-profile'>{shortname(item.user.name)}</div>
                    </div>

                    <div className='w-auto'>
                        <div className='product-details-feedback-reviews-review-fullname'>{item.user.name}&ensp;<span>{stringToDate(item.createdAt)}</span></div>
                        <div className='product-details-feedback-reviews-review-stars'><Stars displayTotal={false} /></div>
                        <div className='product-details-feedback-reviews-review-text'>{item.review}</div>
                    </div>
                </div>
            </div>)}
    </div>
}

function ProductDetailsFeedbackOverview({ product }) {
    return <div className='product-details-feedback-overview'>
        <div className='mb-[30px] grid grid-cols-2'>
            <div className='product-details-feedback-overview-rating'>
                <div className='product-details-feedback-overview-rating-value'>4.5</div>
                <div className='product-details-feedback-overview-rating-stars'><Stars displayTotal={false} /></div>
                <div className='product-details-feedback-overview-rating-total'>{product.reviews.length} reviews</div>
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
            <button className='btn-base btn-full !m-0'>Write a review</button>
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

function ProductDetailsFeedback({ product }) {
    return <div className='product-details-feedback'>
        <h4>Rating and reviews</h4>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10'>
            <ProductDetailsFeedbackOverview product={product} />
            <ProductDetailsFeedbackReviews product={product} />
        </div>
    </div>
}

function stringToDate(string) {
    const date = new Date(string);
    return date.toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric" });
}

function shortname(fullname) {
    return fullname.split(' ').map(word => word[0]).join('').toUpperCase();
}

export default ProductDetailsFeedback;