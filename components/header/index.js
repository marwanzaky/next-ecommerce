import { useRouter } from 'next/router';

function Header() {
    const router = useRouter();

    const shopNow = event => {
        event.preventDefault();
        router.push('/product/soft-cover-journal');
    }

    const explore = event => {
        event.preventDefault();
        router.push('/shop');
    }

    return (
        <header>
            <div className='xl:container xl:mx-auto header-box'>
                <h1 className='header-text'>Soft Cover Journal.</h1>
                <p className='header-parag mb-[50px]'>This handmade, one-of-a-kind journal is perfect for note taking on the go.</p>

                <div className='flex justify-center'>
                    <button onClick={shopNow} className='btn-base btn-full'>Shop now</button>
                    {/* <button onClick={explore} className='btn-base btn-ghost'>Explore</button> */}
                </div>
            </div>
        </header>
    )
}

export default Header;