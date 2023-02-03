import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Stars from '@utils/components/stars';
import { InputTextarea, InputText } from '@utils/components/input';

import User from '@utils/user';
import { ButtonFull, ButtonIcon } from '@ui/Button';

const initialState = {
    review: '',
    rating: 1,
}

export default function Review({ id, onClick, onSubmit }) {
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
        const json = await res.json();

        console.log('json', json);

        if (json.status === 'success')
            alert('Your review is sent successfully!');
        else alert(json.message);

        onSubmit(event);
        router.push(`/product/${id}`);
    }

    return <div className='panel-review'>
        <form onSubmit={submit} className='review-bg'>
            <ButtonIcon className='review-close' icon='close' onClick={onClick} />

            <h2>Overall rating</h2>
            <Stars value={form.rating} displayTotal={false} size={32} />
            <p className='mb-[20px]'>Click to rate</p>

            <h4>Review title</h4>
            <InputText type='text' placeholder='Example: Easy to use' />

            <h4>Product review</h4>
            <InputTextarea id='review' placeholder='Describe your experience...' onChange={handleChange} />

            <ButtonFull>Submit</ButtonFull>
        </form>
    </div>
}