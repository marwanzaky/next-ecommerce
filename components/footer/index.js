import Link from 'next/link';

function FooterList(props) {
    return <li className='footer-list'>
        <Link href={props.href}>
            <a>{props.text}</a>
        </Link>
    </li>
}

function Footer() {
    return <footer>
        <div className="xl:container xl:mx-auto footer-box">
            <div className='grid grid-cols-1 xl:grid-cols-2 mb-[50px]'>
                <div className='footer-box-child'>
                    <h4 className='footer-title'>Quick links</h4>

                    <ul>
                        {/* <FooterList href='/search' text='Search' /> */}
                        <FooterList href='/about' text='About Us' />
                        <FooterList href='/refund-policy' text='Refund Policy' />
                        <FooterList href='/privacy-policy' text='Privacy Policy' />
                        <FooterList href='/terms-of-service' text='Terms of Service' />
                        <FooterList href='/shipping-policy' text='Shipping Policy' />
                    </ul>
                </div>

                <div className='footer-box-child'>

                </div>
            </div>

            <div className='copyright'>
                <p className='copyright-p'>Copyright &copy; 2022 {process.env.NEXT_PUBLIC_NAME} all rights reserved.</p>
            </div>
        </div>
    </footer>
}

export default Footer;