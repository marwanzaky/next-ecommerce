import { useRouter } from 'next/router';

function Header() {
    const router = useRouter();

    const shopNow = event => {
        event.preventDefault();
        router.push('/product/1');
    }

    const explore = event => {
        event.preventDefault();
        router.push('/shop');
    }

    return (
        <header>
            <div className='xl:container xl:mx-auto header-box'>
                <h1 className='header-text'>Anniversary Gift For Him.</h1>
                <p className='header-parag mb-[50px]'>This soft cover journal is a great reminder to never forget how wildly capable you are.</p>

                <div className='flex justify-center'>
                    <button onClick={shopNow} className='btn-base btn-full'>Shop now</button>
                    {/* <button onClick={explore} className='btn-base btn-ghost'>Explore</button> */}
                </div>
            </div>
        </header>
    )
}

export default Header;