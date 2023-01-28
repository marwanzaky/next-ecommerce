import Navigation from '@components/navigation';
import Footer from '@components/footer';

import './globals.scss';

export default function RootLayout({ children }) {
    return <html lang='en'>
        <head />
        <body>
            <Navigation />
            {children}
            <Footer />
        </body>
    </html>
}