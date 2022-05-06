const shopNow = () => {
    window.location.href = "http://localhost:3001/product?id=1";
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