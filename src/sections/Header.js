const shopNow = () => {
    window.location.href = "https://storio.netlify.app/shop";
}

function Header() {
    return <header>
        <div className="container header-box">
            <h1 className="header-text">Anniversary Gift For Him.</h1>
            <p className="header-parag">This soft cover journal is a great reminder to never forget how wildly capable you are.</p>

            <button onClick={shopNow} className="btn-base btn-full">Shop now</button>
        </div>
    </header>
}

export default Header;