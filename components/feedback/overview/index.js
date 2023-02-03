import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { ButtonFull } from '@ui/Button';

import Review from '@components/review';

import Stars from '@utils/components/stars';
import User from '@utils/user';


function OverviewRating({ avgRatings, numReviews }) {
    return <div className='overview-rating'>
        <div className='overview-rating-value'>{avgRatings.toFixed(2)}</div>
        <div className='overview-rating-stars'><Stars value={avgRatings} displayTotal={false} /></div>
        <div className='overview-rating-total'>{numReviews} reviews</div>
    </div>
}

function OverviewRates() {
    return <div className='overview-rates'>
        <ul className='overview-rates-ul'>
            <OverviewRatesLi stars={1} percent='10%' />
            <OverviewRatesLi stars={2} percent='20%' />
            <OverviewRatesLi stars={3} percent='30%' />
            <OverviewRatesLi stars={4} percent='40%' />
            <OverviewRatesLi stars={5} percent='50%' />
        </ul>
    </div>

    function OverviewRatesLi({ stars, percent }) {
        return <li className='overview-rates-li'>
            <div className='overview-rates-li-star'>★</div>
            <div className='overview-rates-li-stars'>{stars}</div>
            <div className='overview-rates-li-bar'>
                <div className='overview-rates-li-bar-percent' style={{ width: percent }}></div>
            </div>
        </li>
    }
}

export default function Overview({ product }) {
    const router = useRouter();
    const [review, setReview] = useState(false);

    const openReivew = event => {
        event.preventDefault();

        if (!User.getToken())
            return router.push('/signin');

        setReview(true);
    }

    const closeReview = event => {
        event.preventDefault();
        setReview(false);
    }

    return <div className='overview'>
        <div className='grid grid-cols-2 mb-[30px]'>
            <OverviewRating {...product} />
            <OverviewRates />
        </div>

        <div className='flex justify-center'>
            <ButtonFull className='!m-0' onClick={openReivew}>Write a review</ButtonFull>
        </div>

        {review ?
            <Review id={product._id} onClick={closeReview} onSubmit={closeReview} /> :
            <></>}
    </div>
}