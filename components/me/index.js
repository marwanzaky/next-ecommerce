'use client';

import { useEffect, useState } from 'react';

import { InputText } from '@utils/components/input';
import { ButtonFull } from '@ui/Button';

import User from '@utils/user';

const getUser = async onload => {
    const options = {
        headers: {
            'Authorization': `Bearer ${User.getToken()}`,
            'Content-Type': 'application/json'
        }
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/users/me`, options);
    const json = await res.json();

    onload(json);
}

export default function Me() {
    const [user, setUser] = useState(null);
    const [loaded, setLoaded] = useState(false);

    const handleChange = event => {
        event.preventDefault();

        const newUser = { ...user, [event.target.id]: event.target.value };
        setUser(newUser);
    }

    const saveSettings = async event => {
        event.preventDefault();

        const form = {
            name: user.name,
            email: user.email
        }

        const options = {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${User.getToken()}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        };

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/users/updateMe`, options);
        const json = await res.json();

        console.log(json);
    }

    useEffect(() => {
        getUser(json => {
            setUser(json.data.user);
            setLoaded(true);
        });
    }, []);

    if (!loaded)
        return <section className='section-me'>
            <div className='me-box'>
                <h2>loading...</h2>
            </div>
        </section>

    return <section className='section-me'>
        <div className='me-box'>
            <h1>Settings</h1>

            <form>
                <h4 className=''>Your Account Settings</h4>
                <InputText type='text' id='name' placeholder={user.name} icon='person' onChange={handleChange} />
                <InputText type='text' id='email' placeholder={user.email} icon='mail' onChange={handleChange} />

                <ButtonFull onClick={saveSettings}>Save settings</ButtonFull>
            </form>

            <form>
                <h4 className=''>Password Change</h4>
                <InputText type='text' id='curpass' placeholder='Current password' icon='password' />
                <InputText type='text' id='newpass' placeholder='New password' icon='password' />
                <InputText type='text' id='confpass' placeholder='Confirm password' icon='password' />

                <ButtonFull>Save password</ButtonFull>
            </form>
        </div>
    </section>
}