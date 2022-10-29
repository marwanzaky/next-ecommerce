import Head from 'next/head';
import Navigation from '../navigation';
import Footer from '../footer';
import Settings from '../../utils/settings';

function Layout({ children, title }) {
    return <div className='layout'>
        <Head>
            <title>{title ? `${title} \u2014 ${Settings.name}` : 'Mamolio'}</title>

            <meta charSet='utf-8' />
            <meta name='viewport' content='initial-scale=1.0, width=device-width' />
            {/* <meta name='description' content='Learn how to build a personal website using Next.js' /> */}
        </Head>

        <Navigation />

        {children}

        <Footer />
    </div>
}

export default Layout;