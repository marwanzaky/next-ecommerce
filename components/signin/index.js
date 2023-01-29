'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { InputText } from '@utils/components/input';
import User from '@utils/user';

import { ButtonFull } from '@ui/Button';

const initialState = {
    email: '',
    password: '',
}

export default function Signin() {
    const router = useRouter();
    const [form, setForm] = useState(initialState);

    const handleChange = (event) => {
        event.preventDefault();

        const newForm = { ...form, [event.target.id]: event.target.value };

        setForm(newForm);
    }

    const onSubmit = async event => {
        event.preventDefault();

        const requestOptions = {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        };

        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/users/login`, requestOptions);
        const data = await response.json();

        if (data.token)
            alert('Logged in successfully!');
        else alert(data.message);

        User.login(data.token, data.data.user);
        console.log('login', data);

        router.push('/');
    }

    return <section className='section-signin'>
        <div className='xl:container xl:mx-auto'>
            <form onSubmit={onSubmit} className='m-auto max-w-[500px]'>
                <h4 className='text-center'>Sign In</h4>
                <p className='signin-p'>Sign in to get personalized product recommendations, save and synchronize your data across your devices.</p>

                <InputText type='text' id='email' placeholder='Enter Email' icon='email' onChange={handleChange} />
                <InputText type='password' id='password' placeholder='Enter Password' icon='password' onChange={handleChange} />

                <ButtonFull type='submit' className='w-full block mb-[15px]'>Sign in</ButtonFull>

                <p className='text-center'>
                    Not a member yet?&emsp;<Link href='/signup'><strong>Sign Up</strong></Link>
                </p>
            </form>
        </div>
    </section>
}