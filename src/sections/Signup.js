import React, { useState } from 'react';
import { InputText } from '../components/Input';
import Settings from '../js/settings';

const initialState = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: ''
}

function Signup() {
    const [form, setForm] = useState(initialState);

    const handleChange = (event) => {
        event.preventDefault();
        const newForm = { ...form, [event.target.id]: event.target.value };
        setForm(newForm);
        console.log(newForm);
    }

    const submit = (event) => {
        event.preventDefault();

        console.log(form);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        };

        fetch(`${Settings.server}/users/signup`, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                window.location.href = '/';
            });
    }

    return (
        <section className='section-signup'>
            <div className='xl:container xl:mx-auto'>
                <form onSubmit={submit} className='m-auto max-w-[500px]'>
                    <h3>Sign Up</h3>

                    <InputText type='text' id='name' placeholder='Enter Name' icon='person' onChange={handleChange} />
                    <InputText type='text' id='email' placeholder='Enter Email' icon='email' onChange={handleChange} />
                    <InputText type='password' id='password' placeholder='Enter Password' icon='password' onChange={handleChange} />
                    <InputText type='password' id='passwordConfirm' placeholder='Repeat Password' icon='password' onChange={handleChange} />

                    <button type="submit" className='btn-base btn-full w-full block mb-[15px]'>Sign up</button>

                    <p className='text-center'>Have an account? <a href='/signin'>Sign In</a></p>
                </form>
            </div>
        </section>
    )
}

export default Signup;