import Settings from "../js/settings";

function Footer() {
    return <footer>
        <div className="xl:container xl:mx-auto footer-box">
            <div className='grid grid-cols-1 xl:grid-cols-2'>
                <div className='footer-box-child'>
                    <p>Quick links</p>
                    <ul>
                        {/* <li><a href="/search">Search</a></li> */}
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/refund-policy">Refund Policy</a></li>
                        <li><a href="/privacy-policy">Privacy Policy</a></li>
                        <li><a href="/terms-of-service">Terms of Service</a></li>
                        <li><a href="/shipping-policy">Shipping Policy</a></li>
                    </ul>
                </div>

                <div className='footer-box-child'>

                </div>
            </div>

            <div className='copyright'>
                <div> <p>Copyright &copy; 2022 {Settings.name} all rights reserved.</p> </div>
            </div>
        </div>
    </footer>
}

export default Footer;