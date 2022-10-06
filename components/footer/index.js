import Settings from '../../utils/settings';
import Link from 'next/link';

function FooterList(props) {
    return (
        <li>
            <Link href={props.href}><a>{props.text}</a></Link>
        </li>
    )
}

function Footer() {
    return (
        <footer>
            <div className="xl:container xl:mx-auto footer-box">
                <div className='grid grid-cols-1 xl:grid-cols-2'>
                    <div className='footer-box-child'>
                        <p>Quick links</p>
                        <ul>
                            <FooterList href='/search' text='Search' />
                            <FooterList href='/about' text='About Us' />
                            <FooterList href='/refund-policy' text='Refund Policy' />
                            <FooterList href='/privacy-policy' text='Privacy Policy' />
                            <FooterList href='/terms-of-service' text='Terms of Service' />
                            <FooterList href='/shipping-policy' text='Shipping Policy' />

                            {/* <li><a href="/search">Search</a></li>
                            <li><a href="/about">About Us</a></li>
                            <li><a href="/refund-policy">Refund Policy</a></li>
                            <li><a href="/privacy-policy">Privacy Policy</a></li>
                            <li><a href="/terms-of-service">Terms of Service</a></li>
                            <li><a href="/shipping-policy">Shipping Policy</a></li> */}
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
    )
}

export default Footer;