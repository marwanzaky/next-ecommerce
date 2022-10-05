const shopNow = () => {
    window.location.href = '/product/1';
}

// const explore = () => {
//     window.location.href = '/shop';
// }

function Header() {
    return (
        <header>
            <div className='xl:container xl:mx-auto header-box'>
                <h1 className='header-text'>Anniversary Gift For Him.</h1>
                <p className='header-parag'>This soft cover journal is a great reminder to never forget how wildly capable you are.</p>

                <div className='flex justify-center'>
                    <button onClick={shopNow} className='btn-base btn-full'>Shop now</button>
                    {/* <button onClick={explore} className='btn-base btn-ghost'>Explore</button> */}
                </div>
            </div>
        </header>
    )
}

export default Header;