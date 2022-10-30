import React, { useState } from 'react';
import { useRouter } from 'next/router';

import Stars from '../../utils/components/stars';
import { InputTextarea, InputText } from '../../utils/components/input';
import { BtnIcon } from '../../utils/components/btn';
import User from '../../utils/user';

const initialState = {
    review: 'This review is posted from the front end client',
    rating: 4.5,
}

function ProductReview({ id, onClick, onSubmit }) {
    const router = useRouter();
    const [form, setForm] = useState(initialState);

    const handleChange = (event) => {
        event.preventDefault();

        const newForm = { ...form, [event.target.id]: event.target.value };
        setForm(newForm);
    }

    const submit = async event => {
        event.preventDefault();

        const requestOptions = {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${User.getToken()}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        };

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/products/${id}/reviews`, requestOptions);
        const data = await res.json();

        if (data.status === 'success')
            alert('Your review is sent successfully!');
        else alert(data.message);

        onSubmit();
        router.push(`/product/${id}`);
    }

    return <div className='product-review z-10'>
        <form onSubmit={submit} className='product-review-bg'>
            <BtnIcon className='product-review-close' icon='close' onClick={onClick} />

            <h2>Overall rating</h2>

            <ProductReviewRate />

            <h4>Review title</h4>
            <InputText type='text' placeholder='Example: Easy to use' />

            <h4>Product review</h4>
            <InputTextarea placeholder='Describe your experience...' onChange={handleChange} />

            <button className='btn-base btn-full'>Submit</button>
        </form>
    </div>
}

function ProductReviewRate() {
    return <div className='product-review-rate'>
        <Stars value={3.5} className='text-[200%]' displayTotal={false} />
        <p className='mb-[20px]'>Click to rate</p>
    </div>
}

export default ProductReview;