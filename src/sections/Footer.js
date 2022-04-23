function Footer() {
    return <footer>
        <div className="container footer-box">
            <div className='row'>
                <div className='col-sm-6'>
                    <p>Quick links</p>
                    <ul>
                        <li><a href="/search">Search</a></li>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="#">Refund Policy</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Terms of Service</a></li>
                        <li><a href="#">Shipping Policy</a></li>
                    </ul>
                </div>

                <div className='col-sm-6'>

                </div>
            </div>

            <div className='copyright'>
                <div> <p>Copyright &copy; 2022 Mamolio all rights reserved.</p> </div>
            </div>
        </div>
    </footer>
}

export default Footer;