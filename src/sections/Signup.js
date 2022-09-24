import React from 'react';
import { InputText } from '../components/Input';
import Settings from '../js/settings';

function Signup() {
    return (
        <section className='section-signup'>
            <div className='xl:container xl:mx-auto'>
                <form className='m-auto max-w-[500px]' action={`${Settings.server}/users/signup`} method='post'>
                    <h3>Sign Up</h3>

                    <InputText type='text' id='fullname' placeholder='Enter Name' icon='person' />
                    <InputText type='text' id='email' placeholder='Enter Email' icon='email' />
                    <InputText type='password' id='password' placeholder='Enter Password' icon='password' />
                    <InputText type='password' id='password' placeholder='Repeat Password' icon='password' />

                    <button type="submit" className='btn-base btn-full mb-[15px]'>Login</button>

                    <label><input type="checkbox" name="remember" /> Remember me</label>
                </form>
            </div>
        </section>
    )
}

export default Signup;