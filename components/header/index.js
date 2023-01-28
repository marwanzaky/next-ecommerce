'use client';

import { ButtonFull } from '@ui/Button';
import { useRouter } from 'next/navigation';

export default function Header() {
    const router = useRouter();

    const shopNow = event => {
        event.preventDefault();
        router.push('/product/6349f871cab75287de7915df');
    }

    const explore = event => {
        event.preventDefault();
        router.push('/shop');
    }

    return <header>
        <div className='header-box'>
            <h1 className='header-text'>Soft Cover Journal.</h1>
            <p className='header-parag'>This handmade, one-of-a-kind journal is perfect for note taking on the go.</p>

            <div className='flex justify-center'>
                <ButtonFull onClick={shopNow}>Shop now</ButtonFull>
                {/* <button onClick={explore} className='btn-base btn-ghost'>Explore</button> */}
            </div>
        </div>
    </header>
}