'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { InputText } from '@utils/components/input';
import { ButtonFull } from '@ui/Button';

const initialState = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: ''
}

export default function Signup() {
    const router = useRouter();
    const [form, setForm] = useState(initialState);

    const handleChange = (event) => {
        event.preventDefault();
        const newForm = { ...form, [event.target.id]: event.target.value };
        setForm(newForm);
    }

    const submit = async (event) => {
        event.preventDefault();

        const requestOptions = {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        };

        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/users/signup`, requestOptions);
        const data = await response.json();

        if (data.token)
            alert('Signed up successfully!');
        else alert(data.message);

        console.log('signup', data);
        router.push('/');
    }

    return <section className='section-signup'>
        <div className='xl:container xl:mx-auto'>
            <form onSubmit={submit} className='m-auto max-w-[500px]'>
                <h4 className='text-center'>Sign Up</h4>
                <p className='signup-p'>Create an account to unlock all the benefits to easily save and synchronize your data across your devices.</p>

                <InputText type='text' id='name' placeholder='Enter Name' icon='person' onChange={handleChange} />
                <InputText type='text' id='email' placeholder='Enter Email' icon='email' onChange={handleChange} />
                <InputText type='password' id='password' placeholder='Enter Password' icon='password' onChange={handleChange} />
                <InputText type='password' id='passwordConfirm' placeholder='Repeat Password' icon='password' onChange={handleChange} />

                <ButtonFull type='submit' className='w-full block mb-[15px]'>Sign up</ButtonFull>

                <p className='text-center'>
                    Have an account?&emsp;<Link href='/signin'><strong>Sign In</strong></Link>
                </p>
            </form>
        </div>
    </section>
}