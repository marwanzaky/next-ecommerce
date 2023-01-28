import Navigation from '@components/navigation';

import './globals.scss';

export default function RootLayout({ children }) {
    return <html lang='en'>
        <head />
        <body>
            <Navigation />
            {children}
        </body>
    </html>
}