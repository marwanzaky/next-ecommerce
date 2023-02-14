'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { ButtonFull } from '@ui/Button';

export default function Header() {
    const router = useRouter();

    const id = process.env.NEXT_PUBLIC_HEADER_PRODUCT_ID;
    const name = process.env.NEXT_PUBLIC_HEADER_PRODUCT_NAME;
    const description = process.env.NEXT_PUBLIC_HEADER_PRODUCT_DESCRIPTION;

    const shopNow = event => {
        event.preventDefault();
        router.push(`/product/${id}`);
    }

    const explore = event => {
        event.preventDefault();
        router.push('/shop');
    }

    return <header className='relative'>
        <Image fill priority className='header-img' src='/img/background.jpg' alt='background' />

        <div className='header-box'>
            <h1 className='header-text'>{name}</h1>
            <p className='header-parag'>{description}</p>

            <div className='flex justify-center'>
                <ButtonFull onClick={shopNow}>Shop now</ButtonFull>
                {/* <button onClick={explore} className='btn-base btn-ghost'>Explore</button> */}
            </div>
        </div>
    </header>
}