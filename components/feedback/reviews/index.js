import Stars from '@utils/components/stars';

const stringToDate = str => {
    const date = new Date(str);
    return date.toLocaleDateString('en-us', { year: 'numeric', month: 'short', day: 'numeric' });
}

const shortname = fullname => {
    return fullname.split(' ').map(word => word[0]).join('').toUpperCase();
}

function Review({ data }) {
    return <div className='review'>
        <div className='flex mb-[10px]'>
            <div className='mr-[15px] shrink-0'>
                <div className='review-profile'>{shortname(data.user.name)}</div>
            </div>

            <div className='w-auto'>
                <div className='review-fullname'>{data.user.name}&ensp;<span>{stringToDate(data.createdAt)}</span></div>
                <div className='review-stars'><Stars size={14} value={data.rating} displayTotal={false} /></div>
                <div className='review-text'>{data.review}</div>
            </div>
        </div>
    </div>
}

export default function Reviews({ product }) {
    return <div className='reviews'>
        {product.reviews.map((review, i) => <Review data={review} key={`review ${i + 1}`} />)}
    </div>
}