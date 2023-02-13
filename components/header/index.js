'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { ButtonFull } from '@ui/Button';

export default function Header({ _id, name, description }) {
    const router = useRouter();

    const shopNow = event => {
        event.preventDefault();
        router.push(`/product/${_id}`);
    }

    const explore = event => {
        event.preventDefault();
        router.push('/shop');
    }

    return <header className='relative'>
        <Image fill priority className='header-img' src='/img/background.jpg' alt='background' />

        <div className='header-box'>
            <h1 className='header-text'>{name}</h1>
            <p className='header-parag'>{description.split('.')[0]}</p>

            <div className='flex justify-center'>
                <ButtonFull onClick={shopNow}>Shop now</ButtonFull>
                {/* <button onClick={explore} className='btn-base btn-ghost'>Explore</button> */}
            </div>
        </div>
    </header>
}